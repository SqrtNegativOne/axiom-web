This is the website for **Axiom**, the philosophy society at NSUT. Built with Next.js (App Router, React 19) + Tailwind CSS + MDX.

## Architecture & Build Process

Unified Next.js App Router project:

```
axiom-web/
├── app/                # Next.js App Router (pages, layouts, route handlers)
│   ├── layout.jsx      # Root layout (theme init script, nav, main, footer)
│   ├── page.jsx        # Home page
│   ├── team/           # /team and /team/[year]
│   ├── events/         # /events and /events/[year]
│   ├── games/          # /games and /games/[slug]
│   ├── newsletter/     # /newsletter, /newsletter/[slug], feed.xml/
│   ├── colophon/       # /colophon
│   ├── privacy/        # /privacy
│   └── globals.css     # Global Tailwind styles & typography
├── components/         # Reusable React components (NavBar, Footer, Hero, ThemeToggle, etc.)
├── content/            # Newsletter markdown files (content/newsletter/*.md)
├── data/               # Data files (events.json, team-*.js, alumni-quotes.js, gamesList.js)
├── lib/                # Utilities & helpers (lib/mdx.js for MDX compilation & post loading)
├── public/             # Static assets served at root (public/data/ for images, icons)
├── shared/             # design-tokens.css
└── utils/              # Client-side helper functions (bloomFilter.js)
```

## Commands

Run from the repo root:

```bash
bun install            # Install all dependencies
bun dev                # Next.js dev server (http://localhost:3000)
bun run build          # Full production build (SSG prerendering)
bun start              # Serve production build locally
bun run lint           # Run ESLint
```

## Tech Stack

| Tool | Version | Role |
|------|---------|------|
| Next.js | ^16.3.2 | Framework (App Router, Turbopack, SSG prerendering, RSC) |
| React | ^19.2.8 | UI (Server Components + Client Components) |
| Tailwind CSS | ^4.3.3 | Utility CSS (via @tailwindcss/postcss) |
| MDX / Remark | ^6.0.0 / ^4.0.1 | Markdown/MDX parser for newsletter (`next-mdx-remote`) |
| Bun | ^1.3.11 | Package manager & runtime |

**Do not install three.js / @react-three/fiber.** The Canvas element captures pointer events and can crash the React tree without an ErrorBoundary.

## Routing

Next.js App Router file-system routing:
- Clean URLs: `/`, `/team`, `/team/:year`, `/events`, `/events/:year`, `/games`, `/games/:slug`, `/newsletter`, `/newsletter/:slug`, `/colophon`, `/privacy`.
- Dynamic routes use `generateStaticParams()` to pre-render static HTML at build time.
- Catch-all not-found handled by `app/not-found.jsx`.
- Internal links use Next.js `<Link href="...">` for client-side transitions.
- The newsletter Atom feed is served at `/newsletter/feed.xml`.

## Design System

**Single source of truth**: Theme definitions in `app/globals.css` and tokens in `shared/design-tokens.css`.

### Palette

| Name | Light hex | Dark hex | Usage |
|------|-----------|----------|-------|
| `cream` | `#F8F4EC` | (fixed) | Footer/hero text, decorative elements — NOT remapped |
| `cream-dark` | `#EDE9DF` | `#142219` | Card/elevated backgrounds |
| `green` | `#2C4A3E` | `#9DBFB5` | Primary text, nav, headings |
| `terracotta` | `#C4704F` | (fixed) | CTAs, pull-quote borders, hover accents |
| `gold` | `#C9A44C` | (fixed) | Decorative rules, dates, dividers |
| `ink` | `#1A1A18` | `#DDD8CD` | Body text |

### Dark mode
- `darkMode: 'class'` in `tailwind.config.js`. Toggle via `dark` class on `<html>`.
- Handled by `ThemeToggle.jsx`. Persists via `localStorage` as `axiom-theme`.
- Page backgrounds using `cream` need explicit `dark:bg-[#0E1A14]`.

### Typography
- **Headings**: Cormorant Garamond (`font-heading`, weight 300)
- **Body/UI**: DM Sans (`font-body`, weights 300–600)
- **Tech accent**: IBM Plex Mono (`font-mono`, labels/metadata)

### Tailwind utilities & Custom conventions
- Use mapped colors: `text-green`, `bg-terracotta`, `border-gold`.
- `label-mono`: defined in `globals.css` for eyebrow labels (`font-mono text-xs tracking-[0.2em] uppercase text-gold`).
- Section headings: `font-heading font-light text-green` at `clamp(2rem, 4vw, 3rem)`.

## Images and Assets

Static assets (images, fonts, logos) are located in **`public/data/`**:

```
axiom-web/public/data/
├── logo.png / logo.svg / logo-axiom.svg
├── portraits/      — team member portraits (.jpg, .webp, .avif)
├── alumni/         — alumni headshots
├── events/         — event photos
├── gallery/        — carousel images
└── fonts/          — local fonts
```

**How they are served:**
Next.js serves everything inside `public/` directly at the root. Reference paths as `/data/portraits/filename.jpg` using Next.js `<Image>`.

## Content Data Files

Content data files are located in root **`data/`**:

| File | Content |
|------|---------|
| `team-2024.js`, `team-2025.js`, `team-2026.js` | Executive committee members for specific years |
| `2026.js`, `2027.js`, `2028.js`, `2029.js` | General members by batch year |
| `events.json` | All events data |
| `alumni-quotes.js` | Testimonials from alumni |
| `gamesList.js`, `externalGamesList.js` | Games directory data |
| `socials.json`, `navLinks.js` | Social links and navigation items |

## Games

Route: `/games` (index) and `/games/<slug>`.
Game components and their respective data logic are located in `app/games/`.

### Game Roster
| Component | Route |
|-----------|-------|
| `Hermeneutic.jsx` | `/games/hermeneutic` |
| `Epoche.jsx` | `/games/epoche` |
| `Fallacy.jsx` | `/games/fallacy` |
| `Dialectic.jsx` | `/games/dialectics` |
| `NegativeDialectic.jsx` | `/games/negative-dialectics` |
| `Sorites.jsx` | `/games/sorites` |
| `Repugnant.jsx` | `/games/repugnant` |
| `Philosophle.jsx` | `/games/philosophle` |
| `ButterflyJob.jsx` | `/games/butterfly-job` |
| `FallacyDetective.jsx`| `/games/fallacy-detective` |
| `PhilosopherMatch.jsx`| `/games/philosopher-match` |
| `ConceptMap.jsx` | `/games/concept-map` |
| `ArgumentReconstruction.jsx`| `/games/argument-reconstruction`|
| `ParadigmShift.jsx` | `/games/paradigm-shift` |

**Puzzle Data:** Game data files (e.g., `dialectic.js`, `epoche.js`, `philosophle.js`) are co-located with the game components inside `app/games/`. Fallacy Detective cases live in `app/games/cases/*.js` (JS modules exporting raw markdown strings).

**Design system exception:** Individual game pages are exempt from the Axiom design system.

## Newsletter Posts

Create: `content/newsletter/slug.md` (or `YYYY-MM-slug.md`)

- **Required frontmatter:**
  ```yaml
  ---
  title: "Essay Title"
  date: "2025-02-28"
  description: "Short excerpt or summary"
  ---
  ```
- Posts are automatically retrieved, sorted newest-first, and compiled via `lib/mdx.js`.
- Renders dynamically or statically at `/newsletter` and `/newsletter/[slug]`.
- Atom feed served at `/newsletter/feed.xml`.

## Deployment (Vercel)

Vercel deployment:
- Framework preset: Next.js (automatically detected).
- The **Root Directory** setting in the Vercel dashboard must be empty (repo root).