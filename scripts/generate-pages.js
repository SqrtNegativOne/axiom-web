// generate-pages.js
// Runs after the Vite build. Reads dist/index.html and writes a copy for
// each React route with the correct meta tags baked in. This lets social
// crawlers (LinkedIn, Slack, Discord) see per-page OG cards even though
// they don't execute JavaScript.

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')

const SITE_URL = 'https://axiomnsut.in'
const SITE_NAME = 'Axiom — The Philosophy Society'
const DEFAULT_IMAGE = `${SITE_URL}/assets/logo.png`
const DEFAULT_DESCRIPTION =
  'Axiom is the philosophy society at NSUT — fostering intellectual curiosity, critical thinking, and philosophical inquiry since 2017.'

// Each entry: where to write the file (outDir) and what meta tags to inject
const ROUTES = [
  {
    outDir: '',   // dist/index.html  (home page, overwrite existing)
    path: '/',
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
  },
  {
    outDir: 'about',
    path: '/about',
    title: `About Us — ${SITE_NAME}`,
    description: "Meet the Axiom team — our mission, vision, and the people behind NSUT's philosophy society, established in 2017.",
  },
  {
    outDir: 'events',
    path: '/events',
    title: `Events — ${SITE_NAME}`,
    description: "Chai Pe Charcha, Wheel of Doom, Philo Walk and more — explore all of Axiom's philosophical events at NSUT.",
  },
  {
    outDir: 'about/2024',
    path: '/about/2024',
    title: `Previous Leadership — 2024 — ${SITE_NAME}`,
    description: 'The 2024 executive committee and members of Axiom, the philosophy society at NSUT.',
  },
  {
    outDir: 'about/2023',
    path: '/about/2023',
    title: `Previous Leadership — 2023 — ${SITE_NAME}`,
    description: 'The 2023 executive committee and members of Axiom, the philosophy society at NSUT.',
  },
  {
    outDir: 'colophon',
    path: '/colophon',
    title: `Colophon — ${SITE_NAME}`,
    description: 'How the Axiom website was built — typography, tools, colour palette, and deployment details.',
  },
]

function buildMetaBlock(route) {
  const canonicalUrl = `${SITE_URL}${route.path}`
  const image = DEFAULT_IMAGE
  return `
    <title>${route.title}</title>
    <meta name="description" content="${route.description}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="512" />
    <meta property="og:image:height" content="512" />
    <meta property="og:image:alt" content="${SITE_NAME} logo" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />
    <meta name="twitter:image" content="${image}" />`
}

// Read the compiled index.html from Vite
const template = readFileSync(join(distDir, 'index.html'), 'utf-8')

// Strip existing <title> and <meta name="description"> — we'll replace them
const stripped = template
  .replace(/<title>[^<]*<\/title>/, '')
  .replace(/<meta name="description"[^>]*>/, '')

for (const route of ROUTES) {
  const metaBlock = buildMetaBlock(route)
  const html = stripped.replace('</head>', `${metaBlock}\n  </head>`)

  const outPath = route.outDir
    ? join(distDir, route.outDir, 'index.html')
    : join(distDir, 'index.html')

  if (route.outDir) {
    mkdirSync(join(distDir, route.outDir), { recursive: true })
  }

  writeFileSync(outPath, html, 'utf-8')
  console.log(`[generate-pages] Written: ${outPath.replace(distDir, 'dist')}`)
}

console.log(`[generate-pages] Done — ${ROUTES.length} pages pre-rendered.`)
