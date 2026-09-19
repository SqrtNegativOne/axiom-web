// Fetch the Material Icons Outlined subset used by the site.
//
// Usage (run from the project root):
//   node scripts/fetch-material-icons.mjs
//
// The icon list lives in data/icons.js. Google Fonts is asked for only those
// glyphs (`icon_names`), so the self-hosted woff2 stays a couple of KB instead
// of the multi-MB full font. Re-run this after adding a name to ICON_NAMES.

import { writeFileSync } from 'fs'
import { join, resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { ICON_NAMES, ICON_FONT_CSS_URL } from '../data/icons.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const OUT = join(ROOT, 'public', 'data', 'fonts', 'material-icons-outlined.woff2')

// Google serves woff2 only to browsers that advertise support.
const UA =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'

const cssRes = await fetch(ICON_FONT_CSS_URL, { headers: { 'User-Agent': UA } })
if (!cssRes.ok) {
    throw new Error(`Font CSS request failed: ${cssRes.status}`)
}
const css = await cssRes.text()

const match = css.match(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/)
if (!match) {
    throw new Error('Could not find a font URL in the Google Fonts CSS response')
}

const fontRes = await fetch(match[1], { headers: { 'User-Agent': UA } })
if (!fontRes.ok) {
    throw new Error(`Font download failed: ${fontRes.status}`)
}
const buffer = Buffer.from(await fontRes.arrayBuffer())
writeFileSync(OUT, buffer)

console.log(`Wrote ${OUT}`)
console.log(`${ICON_NAMES.length} icon(s), ${buffer.length} bytes`)
