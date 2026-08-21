// make-og-images.mjs
// Renders a 1200x630 PNG social card per game into data/og/games/<slug>.png.
// Dark green background (#0E1A14) with the game title centered via an SVG
// string composited by sharp. Uses generic 'Georgia, serif' since librsvg may
// not have access to local fonts.
//
// Runs BEFORE generate-pages.js so the prerendered meta tags can reference
// the generated cards.

import { mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { gamesList } from '../react-app/src/data/gamesList.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'data', 'og', 'games')

const WIDTH = 1200
const HEIGHT = 630

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// Naive word-wrap so longer titles don't overflow the card.
function wrapText(text, maxCharsPerLine) {
  const words = text.split(/\s+/)
  const lines = []
  let current = ''
  for (const word of words) {
    if (current && (current + ' ' + word).length > maxCharsPerLine) {
      lines.push(current)
      current = word
    } else {
      current = current ? `${current} ${word}` : word
    }
  }
  if (current) lines.push(current)
  return lines.slice(0, 3)
}

const svgTemplate = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#0E1A14" />
  <rect x="24" y="24" width="${WIDTH - 48}" height="${HEIGHT - 48}" fill="none" stroke="#C9A44C" stroke-width="2" />
  <text x="${WIDTH / 2}" y="200" text-anchor="middle"
    font-family="Georgia, serif" font-size="26" letter-spacing="8"
    fill="#C9A44C">PHILOSOPHY GAMES</text>
  {titleLines}
</svg>
`

function titleLinesSvg(title) {
  const lines = wrapText(title, 18)
  const fontSize = lines.length >= 3 ? 68 : 80
  const lineHeight = fontSize * 1.15
  const startY = HEIGHT / 2 - ((lines.length - 1) * lineHeight) / 2 + fontSize * 0.35
  return lines
    .map(
      (line, i) => `<text x="${WIDTH / 2}" y="${Math.round(startY + i * lineHeight)}" text-anchor="middle"
    font-family="Georgia, serif" font-weight="bold" font-size="${fontSize}"
    fill="#DDD8CD">${escapeXml(line)}</text>`
    )
    .join('\n  ')
}

mkdirSync(outDir, { recursive: true })

for (const game of gamesList) {
  const svg = svgTemplate.replace('{titleLines}', titleLinesSvg(game.title))
  const outPath = join(outDir, `${game.path}.png`)
  await sharp(Buffer.from(svg)).png().toFile(outPath)
  console.log(`[make-og-images] ${outPath.replace(__dirname, 'scripts')}`)
}

console.log(`[make-og-images] Done — ${gamesList.length} cards generated.`)
