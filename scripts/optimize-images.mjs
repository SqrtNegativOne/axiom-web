/**
 * optimize-images.mjs
 *
 * For every .jpg/.jpeg/.png photo under data/events, data/portraits,
 * data/alumni and data/gallery, emits an .avif (quality 50) and a .webp
 * (quality 75) sibling next to the original, preserving dimensions.
 *
 * Idempotent: conversion is skipped when an output already exists AND is
 * newer than its source file.
 *
 * Run manually from the repo root:
 *   node scripts/optimize-images.mjs
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve(import.meta.dirname, '..')
const TARGET_DIRS = ['events', 'portraits', 'alumni', 'gallery'].map((d) =>
    path.join(ROOT, 'data', d),
)
const SOURCE_RE = /\.(jpe?g|png)$/i

async function collectFiles(dir) {
    const out = []
    let entries = []
    try {
        entries = await fs.readdir(dir, { withFileTypes: true })
    } catch {
        return out
    }
    for (const entry of entries) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) out.push(...(await collectFiles(full)))
        else if (SOURCE_RE.test(entry.name)) out.push(full)
    }
    return out
}

/** Returns true if the output exists and is newer than the source. */
async function isFresh(outputPath, sourceStat) {
    try {
        const stat = await fs.stat(outputPath)
        return stat.mtimeMs > sourceStat.mtimeMs
    } catch {
        return false
    }
}

async function main() {
    const files = (
        await Promise.all(TARGET_DIRS.map(collectFiles))
    ).flat()

    let bytesBefore = 0
    let bytesAfter = 0
    let converted = 0
    let skippedFresh = 0
    const failures = []

    for (const src of files) {
        const base = src.replace(SOURCE_RE, '')
        const stat = await fs.stat(src)
        bytesBefore += stat.size

        for (const [ext, opts] of [
            ['.avif', { quality: 50 }],
            ['.webp', { quality: 75 }],
        ]) {
            const out = base + ext
            if (await isFresh(out, stat)) {
                skippedFresh++
                bytesAfter += (await fs.stat(out)).size
                continue
            }
            try {
                const info = await sharp(src)[ext.slice(1)](opts).toFile(out)
                converted++
                bytesAfter += info.size
            } catch (err) {
                failures.push(`${path.relative(ROOT, src)} -> ${ext}: ${err.message}`)
            }
        }
    }

    // Include already-fresh sources' original size in "before" only once;
    // report savings across the set of originals vs their best derivatives.
    console.log(`Sources scanned : ${files.length}`)
    console.log(`Outputs written : ${converted}`)
    console.log(`Outputs skipped (already fresh): ${skippedFresh}`)
    console.log(
        `Originals       : ${(bytesBefore / 1024 / 1024).toFixed(2)} MB`,
    )
    console.log(
        `Derivatives     : ${(bytesAfter / 1024 / 1024).toFixed(2)} MB`,
    )
    const saved = bytesBefore - bytesAfter
    if (saved > 0) {
        console.log(
            `Savings         : ${(saved / 1024 / 1024).toFixed(2)} MB (${((saved / bytesBefore) * 100).toFixed(1)}% smaller)`,
        )
    } else {
        console.log('No net change (derivatives up to date).')
    }

    if (failures.length) {
        console.error('\nFailures:')
        for (const f of failures) console.error(`  ${f}`)
        process.exitCode = 1
    }
}

main()
