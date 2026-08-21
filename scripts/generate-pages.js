// generate-pages.js
// Runs after the Vite build. Reads dist/index.html and writes a copy for
// each React route with the correct meta tags baked in. This lets social
// crawlers (LinkedIn, Slack, Discord) see per-page OG cards even though
// they don't execute JavaScript.

import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { gamesList } from '../react-app/src/data/gamesList.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')
const distDir = join(rootDir, 'dist')
const dataDir = join(rootDir, 'data')
const serverDistDir = join(__dirname, '..', 'react-app', 'dist-server')

const SITE_URL = 'https://axiomnsut.in'
const SITE_NAME = 'Axiom ⋅ The Philosophy Society'
const DEFAULT_IMAGE = `${SITE_URL}/data/logo.png`
const DEFAULT_DESCRIPTION =
  'Axiom is the philosophy society at NSUT — fostering intellectual curiosity, critical thinking, and philosophical inquiry since 2017.'

// Pick a representative event photo for a given year by scanning events.json
// (newest event first) for an imageFolder that actually exists in data/events.
function eventImageForYear(year) {
  let events
  try {
    events = JSON.parse(
      readFileSync(join(__dirname, '..', 'react-app', 'src', 'data', 'events.json'), 'utf-8')
    )[year]
  } catch {
    return null
  }
  if (!Array.isArray(events)) return null
  for (const event of [...events].reverse()) {
    const folder = join(dataDir, 'events', event.imageFolder)
    if (!existsSync(folder)) continue
    const image = readdirSync(folder).find(f => /\.(jpe?g|png|webp|avif)$/i.test(f))
    if (image) return `${SITE_URL}/data/events/${event.imageFolder}/${encodeURIComponent(image)}`
  }
  return null
}

const GAME_IMAGE_BASE = `${SITE_URL}/data/og/games`

// Each entry: where to write the file (outDir) and what meta tags to inject
const ROUTES = [
  {
    outDir: '',   // dist/index.html  (home page, overwrite existing)
    path: '/',
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
  },
  {
    outDir: 'team',
    path: '/team',
    title: `Team ⋅ ${SITE_NAME}`,
    description: "Meet the Axiom team — our mission, vision, and the people behind NSUT's philosophy society, established in 2017.",
  },
  {
    outDir: 'events',
    path: '/events',
    title: `Events ⋅ ${SITE_NAME}`,
    description: "Chai Pe Charcha, Wheel of Doom, Philo Walk and more — explore all of Axiom's philosophical events at NSUT.",
    image: eventImageForYear('2025'),
  },
  {
    outDir: 'team/2025',
    path: '/team/2025',
    title: `2025 Legacy ⋅ ${SITE_NAME}`,
    description: 'The 2025 executive committee and members of Axiom, the philosophy society at NSUT.',
  },
  {
    outDir: 'team/2024',
    path: '/team/2024',
    title: `Previous Leadership ⋅ 2024 ⋅ ${SITE_NAME}`,
    description: 'The 2024 executive committee and members of Axiom, the philosophy society at NSUT.',
  },
  {
    outDir: 'team/2023',
    path: '/team/2023',
    title: `Previous Leadership ⋅ 2023 ⋅ ${SITE_NAME}`,
    description: 'The 2023 executive committee and members of Axiom, the philosophy society at NSUT.',
  },
  {
    outDir: 'colophon',
    path: '/colophon',
    title: `Colophon ⋅ ${SITE_NAME}`,
    description: 'How the Axiom website was built — typography, tools, colour palette, and deployment details.',
  },
  {
    outDir: 'games',
    path: '/games',
    title: `Philosophy Games ⋅ ${SITE_NAME}`,
    description: 'Four interactive philosophy games — guess a term from clues, classify propositions, identify fallacies, and trace dialectical movements in the history of thought.',
  },
  ...gamesList.map(game => ({
    outDir: `games/${game.path}`,
    path: `/games/${game.path}`,
    title: `${game.title} ⋅ Philosophy Games ⋅ ${SITE_NAME}`,
    description: game.desc,
    image: `${GAME_IMAGE_BASE}/${game.path}.png`,
  })),
  {
    outDir: 'events/2026',
    path: '/events/2026',
    title: `Events 2026 ⋅ ${SITE_NAME}`,
    description: 'Events from 2026.',
    image: eventImageForYear('2026'),
  },
  {
    outDir: 'events/2025',
    path: '/events/2025',
    title: `Events 2025 ⋅ ${SITE_NAME}`,
    description: 'Events from 2025.',
    image: eventImageForYear('2025'),
  },
  {
    outDir: 'events/2024',
    path: '/events/2024',
    title: `Events 2024 ⋅ ${SITE_NAME}`,
    description: 'Events from 2024.',
    image: eventImageForYear('2024'),
  },
  {
    outDir: 'events/2023',
    path: '/events/2023',
    title: `Events 2023 ⋅ ${SITE_NAME}`,
    description: 'Events from 2023.',
    image: eventImageForYear('2023'),
  },
  {
    outDir: 'privacy',
    path: '/privacy',
    title: `Privacy Policy ⋅ ${SITE_NAME}`,
    description: 'Privacy Policy.',
  },
  {
    outDir: '404',
    path: '/404',
    title: `Not Found ⋅ ${SITE_NAME}`,
    description: 'Page not found.',
  }
]

function buildMetaBlock(route) {
  const canonicalUrl = `${SITE_URL}${route.path}`
  const image = route.image || DEFAULT_IMAGE
  const isCustomImage = Boolean(route.image)
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
    <meta property="og:image:width" content="${isCustomImage ? '1200' : '512'}" />
    <meta property="og:image:height" content="${isCustomImage ? '630' : '512'}" />
    <meta property="og:image:alt" content="${route.title}" />
    <meta name="twitter:card" content="${isCustomImage ? 'summary_large_image' : 'summary'}" />
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

// Import the SSR bundle
const { render } = await import(new URL('file://' + join(serverDistDir, 'entry-server.js')))

for (const route of ROUTES) {
  const metaBlock = buildMetaBlock(route)
  let html = stripped.replace('</head>', `${metaBlock}\n  </head>`)

  // Render the React app to string for this route
  const { body: appHtml, head: helmetHead } = render(route.path)
  if (helmetHead) {
    html = html.replace('</head>', `${helmetHead}\n  </head>`)
  }
  html = html.replace('<!--app-html-->', appHtml)

  const outPath = route.outDir
    ? join(distDir, route.outDir, 'index.html')
    : join(distDir, 'index.html')

  if (route.outDir) {
    mkdirSync(join(distDir, route.outDir), { recursive: true })
  }

  writeFileSync(outPath, html, 'utf-8')
  console.log(`[generate-pages] Written: ${outPath.replace(distDir, 'dist')}`)

  // Vercel serves dist/404.html for genuine 404 responses — copy the
  // pre-rendered 404 page there so we don't get soft-404s.
  if (route.outDir === '404') {
    copyFileSync(outPath, join(distDir, '404.html'))
    console.log('[generate-pages] Written: dist/404.html')
  }
}

// Generate sitemap.xml from the same ROUTES list so it never goes stale.
// Newsletter post URLs are appended from dist/newsletter/posts.json (written
// by Eleventy and copied into dist/newsletter by postbuild.js, which runs
// before this script). The 404 page is excluded — never indexed.
const lastmod = new Date().toISOString().slice(0, 10)

function readNewsletterPosts() {
  const postsJsonPath = join(distDir, 'newsletter', 'posts.json')
  try {
    const posts = JSON.parse(readFileSync(postsJsonPath, 'utf-8'))
    return posts
      .filter(post => typeof post.url === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(post.date ?? ''))
      .map(post => ({ loc: `${SITE_URL}${post.url}`, lastmod: post.date }))
  } catch {
    console.log('[generate-pages] No dist/newsletter/posts.json found — skipping newsletter URLs in sitemap.')
    return []
  }
}

const newsletterUrls = readNewsletterPosts()
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES
  .filter(route => route.path !== '/404')
  .map(route => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`)
  .concat(
    newsletterUrls.map(post => `  <url>
    <loc>${post.loc}</loc>
    <lastmod>${post.lastmod}</lastmod>
  </url>`)
  )
  .join('\n')}
</urlset>
`
writeFileSync(join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8')
console.log(`[generate-pages] Written: dist/sitemap.xml (${newsletterUrls.length} newsletter URLs included)`)

console.log(`[generate-pages] Done — ${ROUTES.length} pages pre-rendered.`)
