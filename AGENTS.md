This is the website for **Axiom**, the philosophy society at NSUT. Built with React + Vite + Tailwind (main site, statically pre-rendered via SSR) and Eleventy (newsletter).

## Architecture & Build Process

Two build systems, one merged output, statically pre-rendered:

```
axiom-web/
├── data/               # Static assets (images, fonts, logos) served directly
├── react-app/          # Vite + React + Tailwind (Home, Team, Events, Games)
│   ├── src/entry-client.jsx  # Client hydration entry
│   └── src/entry-server.jsx  # SSR entry for pre-rendering
├── newsletter/         # Eleventy (newsletter index + posts)
├── shared/             # design-tokens.css (shared by both)
├── scripts/            # Build scripts (generate-pages.js, postbuild.js)
├── dist/               # Final merged output at repo root (deployed to Vercel)
└── dist-server/        # Temporary SSR bundle used during build
```

**Build Pipeline:**
1. Vite builds the client bundle (`dist/`) and the SSR bundle (`dist-server/`).
2. Eleventy builds the newsletter to `newsletter/dist/`.
3. `scripts/postbuild.js` copies `newsletter/dist/` into `dist/newsletter/` and symlinks/copies the root `data/` folder to `dist/data/`.
4. `scripts/generate-pages.js` uses the SSR bundle (`dist-server/entry-server.js`) to generate static HTML pages (SSG) for all React routes, injecting specific OpenGraph meta tags so social crawlers can read them.


## Commands

Run from the repo root:

```bash
bun install            # Install all workspace dependencies
bun run dev            # React :5173 + Eleventy :8081 in parallel (serves /data dynamically)
bun run build          # Full production build (both systems + postbuild SSG)
bun run preview        # Serve dist/ at :4173
```

Installing packages for the React app specifically:
```bash
bun install <pkg> --workspace=react-app --legacy-peer-deps
```
Always use `--legacy-peer-deps` when installing into the react-app workspace.

## Tech Stack

| Tool | Version | Role |
|------|---------|------|
| React | ^18.3.1 | UI (Client + SSR) |
| React Router | ^6.28.0 | BrowserRouter — clean URL routing (`/team`, `/events`, `/privacy`) |
| Vite | ^6.0.5 | Dev server + bundler |
| Tailwind CSS | ^3.4.16 | Utility CSS |
| Eleventy | ^3.0.0 | Newsletter static site |
| Concurrently | ^8.2.2 | Parallel dev scripts |

**Do not install three.js / @react-three/fiber.** The Canvas element captures pointer events and can crash the React tree without an ErrorBoundary.

## Routing

React uses **BrowserRouter** — routes are `/`, `/team`, `/team/:year`, `/events`, `/events/:year`, `/colophon`, `/privacy`. A catch-all `path="*"` renders the 404 page. The static pre-rendering in `generate-pages.js` ensures every route has a physical `index.html` file in `dist/`.

The Newsletter link in the React nav is a plain `<a href="/newsletter/">` (not a `<Link>`), crossing the build-system boundary.

## Design System

**Single source of truth**: `shared/design-tokens.css` — imported by `react-app/src/index.css` AND inlined in `newsletter/src/_includes/base.njk`.

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
- `label-mono`: defined in `index.css` for eyebrow labels (`font-mono text-xs tracking-[0.2em] uppercase text-gold`).
- Section headings: `font-heading font-light text-green` at `clamp(2rem, 4vw, 3rem)`.

## Images and Assets

**CRITICAL:** Assets (images, fonts, logos) are **NO LONGER in `react-app/public/assets/`**. 
They are located in the **root `/data/` directory**.

```
axiom-web/data/
├── logo.png / logo.svg / logo-axiom.svg
├── portraits/      — team member portraits
├── alumni/         — alumni headshots
├── events/         — event photos
├── gallery/        — carousel images
└── fonts/          — local fonts
```

**How they are served:**
During dev, `vite.config.js` uses a custom middleware to serve requests to `/data/*` directly from the root `/data/` directory. In production, `postbuild.js` symlinks (or copies) `/data/` to `dist/data/`.
**Usage in code:** Reference paths as `/data/portraits/filename.jpg`. *Never import images through Vite*.

## Content Data Files

Content files are located in `react-app/src/data/`:

| File | Content |
|------|---------|
| `team-2024.js`, `team-2025.js` | Executive committee members for specific years |
| `2026.js`, `2027.js`, etc. | General members by batch year |
| `events.json` | All events data |
| `alumni-quotes.js` | Testimonials from alumni |

## Games

Route: `/games` (index) and `/games/<slug>`.
Game components and their respective data logic are located in `react-app/src/pages/games/`.

### Game Roster
| Component | Route |
|-----------|-------|
| `Hermeneutic.jsx` | `/games/hermeneutic` |
| `Epoche.jsx` | `/games/epoche` |
| `Fallacy.jsx` | `/games/fallacy` |
| `Dialectic.jsx` | `/games/dialectic` |
| `Sorites.jsx` | `/games/sorites` |
| `Repugnant.jsx` | `/games/repugnant` |
| `Philosophle.jsx` | `/games/philosophle` |
| `ButterflyJob.jsx` | `/games/butterfly-job` |
| `FallacyDetective.jsx`| `/games/fallacy-detective` |
| `PhilosopherMatch.jsx`| `/games/philosopher-match` |
| `ConceptMap.jsx` | `/games/concept-map` |
| `ArgumentReconstruction.jsx`| `/games/argument-reconstruction`|
| `ParadigmShift.jsx` | `/games/paradigm-shift` |

**Puzzle Data:** Unlike other content, game data files (e.g., `dialectic.js`, `epoche.js`, `philosophle.js`) are co-located with the game components inside `react-app/src/pages/games/`. Fallacy Detective cases live in `react-app/src/pages/games/cases/*.md`.

**Design system exception:** Individual game pages are exempt from the Axiom design system.

## Newsletter Posts

Create: `newsletter/src/posts/YYYY-MM-slug.md`

- **Required frontmatter:** `layout: post.njk`, `title`, `date`, `tags: [posts]`
- Posts are automatically sorted newest-first on the index.
- Uses `markdown-it` configured in `.eleventy.js`.

The React app fetches the recent newsletter posts via `/newsletter/posts.json` (generated by `posts.json.11ty.js`). During dev, Vite proxies `/newsletter/` to the Eleventy dev server (`http://localhost:8081`).

## Deployment (Vercel)

Vercel reads `vercel.json` at the repo root.
- `"framework": null` is required to prevent Vercel from overriding `outputDirectory`.
- The **Root Directory** setting in the Vercel dashboard must be empty (repo root), not `react-app`.