/**
 * Bloom filter runtime — mirrors the hash scheme in scripts/build-bloom.js.
 *
 * Usage:
 *   import { loadBloomFilter } from '../utils/bloomFilter'
 *   const bloom = await loadBloomFilter('/assets/words.bloom')
 *   bloom.has('karma')  // → true/false, synchronous
 *
 * File format expected (little-endian):
 *   [0..3]  m  – uint32
 *   [4]     k  – uint8
 *   [5..]   bit array
 */

// Seeds must be identical to build-bloom.js
const SEED1 = 2166136261
const SEED2 = 0x811c9dc5

function fnv1a(str, seed) {
    let h = seed >>> 0
    for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i)
        h = Math.imul(h, 16777619) >>> 0
    }
    return h
}

/**
 * Fetch the bloom binary and return a checker object.
 * Rejects if the fetch fails; callers should handle errors gracefully.
 */
export async function loadBloomFilter(url) {
    const buf = await fetch(url).then((r) => {
        if (!r.ok) throw new Error(`Failed to load bloom filter: ${r.status}`)
        return r.arrayBuffer()
    })

    const view = new DataView(buf)
    const m = view.getUint32(0, true)
    const k = view.getUint8(4)
    const bits = new Uint8Array(buf, 5)

    return {
        has(word) {
            const lower = word.toLowerCase()
            const h1 = fnv1a(lower, SEED1)
            const h2 = fnv1a(lower, SEED2)
            for (let i = 0; i < k; i++) {
                const pos = (h1 + i * h2) % m
                if (!(bits[pos >> 3] & (1 << (pos & 7)))) return false
            }
            return true
        },
    }
}
