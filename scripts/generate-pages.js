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
const serverDistDir = join(__dirname, '..', 'react-app', 'dist-server')

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
    outDir: 'team',
    path: '/team',
    title: `Team — ${SITE_NAME}`,
    description: "Meet the Axiom team — our mission, vision, and the people behind NSUT's philosophy society, established in 2017.",
  },
  {
    outDir: 'events',
    path: '/events',
    title: `Events — ${SITE_NAME}`,
    description: "Chai Pe Charcha, Wheel of Doom, Philo Walk and more — explore all of Axiom's philosophical events at NSUT.",
  },
  {
    outDir: 'team/2025-legacy',
    path: '/team/2025-legacy',
    title: `2025 Legacy — ${SITE_NAME}`,
    description: 'The 2025 executive committee and members of Axiom, the philosophy society at NSUT.',
  },
  {
    outDir: 'team/2024',
    path: '/team/2024',
    title: `Previous Leadership — 2024 — ${SITE_NAME}`,
    description: 'The 2024 executive committee and members of Axiom, the philosophy society at NSUT.',
  },
  {
    outDir: 'team/2023',
    path: '/team/2023',
    title: `Previous Leadership — 2023 — ${SITE_NAME}`,
    description: 'The 2023 executive committee and members of Axiom, the philosophy society at NSUT.',
  },
  {
    outDir: 'colophon',
    path: '/colophon',
    title: `Colophon — ${SITE_NAME}`,
    description: 'How the Axiom website was built — typography, tools, colour palette, and deployment details.',
  },
  {
    outDir: 'games',
    path: '/games',
    title: `Philosophy Games — ${SITE_NAME}`,
    description: 'Four interactive philosophy games — guess a term from clues, classify propositions, identify fallacies, and trace dialectical movements in the history of thought.',
  },
  {
    outDir: 'games/hermeneutic',
    path: '/games/hermeneutic',
    title: `Hermeneutic — Philosophy Games — ${SITE_NAME}`,
    description: 'Guess the philosophical term from progressively revealing clues. Each wrong answer unveils another layer of context.',
  },
  {
    outDir: 'games/epoche',
    path: '/games/epoche',
    title: `Époche — Philosophy Games — ${SITE_NAME}`,
    description: 'Classify a philosophical proposition across four axes: analytic/synthetic, a priori/a posteriori, necessary/contingent, descriptive/normative.',
  },
  {
    outDir: 'games/fallacy',
    path: '/games/fallacy',
    title: `Fallacy — Philosophy Games — ${SITE_NAME}`,
    description: 'Identify the logical fallacy in a philosophical argument. Hints reveal whether your guess shares the right family or class.',
  },
  {
    outDir: 'games/dialectic',
    path: '/games/dialectic',
    title: `Dialectic — Philosophy Games — ${SITE_NAME}`,
    description: 'Match a philosophical thesis to its historical antithesis, then identify the synthesis that resolved the contradiction.',
  },
  {
    outDir: 'games/sorites',
    path: '/games/sorites',
    title: `Sorites — Philosophy Games — ${SITE_NAME}`,
    description: 'Where does red end? Classify 34 colour patches and discover the Sorites paradox — the contradiction hiding in your own judgements about vagueness.',
  },
  {
    outDir: 'games/philosophle',
    path: '/games/philosophle',
    title: `Philosophle — Philosophy Games — ${SITE_NAME}`,
    description: 'A Wordle-style game using philosophical terms — concepts, thinkers, and Greek roots from 3 to 7 letters.',
  },
  {
    outDir: 'games/butterfly-job',
    path: '/games/butterfly-job',
    title: `Butterfly Job — Philosophy Games — ${SITE_NAME}`,
    description: 'Butterfly Job Game.',
  },
  {
    outDir: 'games/fallacy-detective',
    path: '/games/fallacy-detective',
    title: `Fallacy Detective — Philosophy Games — ${SITE_NAME}`,
    description: 'Fallacy Detective Game.',
  },
  {
    outDir: 'games/philosopher-match',
    path: '/games/philosopher-match',
    title: `Philosopher Match — Philosophy Games — ${SITE_NAME}`,
    description: 'Philosopher Match Game.',
  },
  {
    outDir: 'games/concept-map',
    path: '/games/concept-map',
    title: `Concept Map — Philosophy Games — ${SITE_NAME}`,
    description: 'Concept Map Game.',
  },
  {
    outDir: 'games/argument-reconstruction',
    path: '/games/argument-reconstruction',
    title: `Argument Reconstruction — Philosophy Games — ${SITE_NAME}`,
    description: 'Argument Reconstruction Game.',
  },
  {
    outDir: 'games/paradigm-shift',
    path: '/games/paradigm-shift',
    title: `Paradigm Shift — Philosophy Games — ${SITE_NAME}`,
    description: 'Paradigm Shift Game.',
  },
  {
    outDir: 'events/2026',
    path: '/events/2026',
    title: `Events 2026 — ${SITE_NAME}`,
    description: 'Events from 2026.',
  },
  {
    outDir: 'events/2025',
    path: '/events/2025',
    title: `Events 2025 — ${SITE_NAME}`,
    description: 'Events from 2025.',
  },
  {
    outDir: 'events/2024',
    path: '/events/2024',
    title: `Events 2024 — ${SITE_NAME}`,
    description: 'Events from 2024.',
  },
  {
    outDir: 'events/2023',
    path: '/events/2023',
    title: `Events 2023 — ${SITE_NAME}`,
    description: 'Events from 2023.',
  },
  {
    outDir: 'privacy',
    path: '/privacy',
    title: `Privacy Policy — ${SITE_NAME}`,
    description: 'Privacy Policy.',
  },
  {
    outDir: '404',
    path: '/404',
    title: `Not Found — ${SITE_NAME}`,
    description: 'Page not found.',
  }
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

// Import the SSR bundle
const { render } = await import(new URL('file://' + join(serverDistDir, 'entry-server.js')))

for (const route of ROUTES) {
  const metaBlock = buildMetaBlock(route)
  let html = stripped.replace('</head>', `${metaBlock}\n  </head>`)
  
  // Render the React app to string for this route
  const appHtml = render(route.path)
  html = html.replace('<!--app-html-->', appHtml)

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
