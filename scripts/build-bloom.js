/**
 * Build script: generate a Bloom filter binary from SCOWL + english-words.
 *
 * Output: react-app/public/assets/words.bloom
 *
 * File format (little-endian):
 *   [0..3]  m  – uint32 – number of bits in the filter
 *   [4]     k  – uint8  – number of hash functions
 *   [5..]   bit array   – Uint8Array of ceil(m/8) bytes
 *
 * Hash scheme: double hashing using two FNV-1a seeds.
 *   pos(i) = ( fnv1a(word, SEED1) + i * fnv1a(word, SEED2) ) % m
 * Both seeds are hard-coded here and mirrored in the runtime module.
 */

import { createRequire } from 'module'
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const require = createRequire(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))

// ── Collect words ─────────────────────────────────────────────────────────────

const wordSet = new Set()

// 1. SCOWL via wordlist-english (all regional variants merged)
try {
  const wl = require('wordlist-english')
  const keys = Object.keys(wl)
  for (const key of keys) {
    const arr = wl[key]
    if (Array.isArray(arr)) {
      for (const w of arr) wordSet.add(w.toLowerCase())
    }
  }
  console.log(`wordlist-english: ${wordSet.size} words so far`)
} catch (e) {
  console.warn('wordlist-english unavailable:', e.message)
}

// 2. an-array-of-english-words (broader coverage including informal)
try {
  const arr = require('an-array-of-english-words')
  for (const w of arr) wordSet.add(w.toLowerCase())
  console.log(`+an-array-of-english-words: ${wordSet.size} words so far`)
} catch (e) {
  console.warn('an-array-of-english-words unavailable:', e.message)
}

// Filter to 3–7 letter alpha-only words
const words = [...wordSet].filter(w => /^[a-z]{3,7}$/.test(w))
console.log(`After 3–7 alpha filter: ${words.length} words`)

if (words.length === 0) {
  console.error('No words collected — aborting.')
  process.exit(1)
}

// ── Bloom filter parameters ───────────────────────────────────────────────────

const n = words.length
const p = 0.01                                           // 1 % false-positive rate
const m = Math.ceil(-n * Math.log(p) / Math.log(2) ** 2)
const k = Math.max(1, Math.round((m / n) * Math.log(2)))
const byteLen = Math.ceil(m / 8)

console.log(
  `Bloom params: n=${n}, p=${p}  →  m=${m} bits (${(byteLen / 1024).toFixed(1)} KB), k=${k}`,
)

// ── Hash functions ────────────────────────────────────────────────────────────
// FNV-1a, 32-bit. These seeds must match bloomFilter.js exactly.

const SEED1 = 2166136261  // FNV offset basis
const SEED2 = 0x811c9dc5  // alternate start

function fnv1a(str, seed) {
  let h = seed >>> 0
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619) >>> 0
  }
  return h
}

// ── Build the bit array ───────────────────────────────────────────────────────

const bits = new Uint8Array(byteLen)

for (const word of words) {
  const h1 = fnv1a(word, SEED1)
  const h2 = fnv1a(word, SEED2)
  for (let i = 0; i < k; i++) {
    const pos = (h1 + i * h2) % m
    bits[pos >> 3] |= 1 << (pos & 7)
  }
}

// ── Write output ──────────────────────────────────────────────────────────────

const outDir = resolve(__dirname, '../react-app/public/assets')
mkdirSync(outDir, { recursive: true })
const outPath = resolve(outDir, 'words.bloom')

const header = Buffer.alloc(5)
header.writeUInt32LE(m, 0)
header.writeUInt8(k, 4)
const output = Buffer.concat([header, Buffer.from(bits)])

writeFileSync(outPath, output)
console.log(`Written: ${outPath} (${output.length} bytes total)`)
