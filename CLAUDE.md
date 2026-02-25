# Axiom Web — CLAUDE.md

This is the website for **Axiom**, the philosophy society at NSUT (Netaji Subhas University of Technology). Built with React + Vite + Tailwind (main site) and Eleventy (newsletter).

---

## Architecture

Two build systems, one merged output:

```
axiom-web/
├── react-app/          # Vite + React + Tailwind (Home, About Us, Events)
├── newsletter/         # Eleventy (newsletter index + posts)
├── shared/             # design-tokens.css (shared by both)
├── scripts/            # postbuild.js (Node.js, cross-platform)
└── dist/               # Final merged output at repo root (deployed to Vercel)
```

The postbuild step copies `newsletter/dist/` into `dist/newsletter/` so the entire site ships from one directory. Vite outputs to `../dist` (repo root) via `build.outDir` in `vite.config.js`.

---

## Commands

Run from the repo root:

```bash
npm install            # Install all workspace dependencies
npm run dev            # React :5173 + Eleventy :8081 in parallel
npm run build          # Full production build (both systems + postbuild)
npm run preview        # Serve dist/ at :4173
```

Workspace-specific (rarely needed directly):

```bash
npm run dev --workspace=react-app
npm run build --workspace=newsletter
```

---

## Tech Stack

| Tool | Version | Role |
|------|---------|------|
| React | ^18.3.1 | UI |
| React Router | ^6.28.0 | Hash-based routing (`/#/about-us`) |
| Vite | ^6.0.5 | Dev server + bundler |
| Tailwind CSS | ^3.4.16 | Utility CSS |
| Eleventy | ^3.0.0 | Newsletter static site |
| Concurrently | ^8.2.2 | Parallel dev scripts |

---

## Routing

React uses **HashRouter** — all routes are `/#/`, `/#/about-us`, `/#/events`. This works on static hosts without rewrite rules.

The Newsletter link in the React nav is a plain `<a href="/newsletter/">` (not a `<Link>`), crossing the build-system boundary. Eleventy nav links back to React using absolute hash paths (`/#/about-us`).

---

## Design System

**Single source of truth**: `shared/design-tokens.css` — imported by `react-app/src/index.css` AND inlined in `newsletter/src/_includes/base.njk`.

### Palette

| Name | Hex | Usage |
|------|-----|-------|
| `cream` | `#F8F4EC` | Page background |
| `cream-dark` | `#EDE9DF` | Card backgrounds |
| `green` | `#2C4A3E` | Primary text, nav, headings |
| `terracotta` | `#C4704F` | CTAs, pull-quote borders, hover accents |
| `gold` | `#C9A44C` | Decorative rules, dates, dividers |
| `ink` | `#1A1A18` | Body text |

### Typography

- **Headings**: Cormorant Garamond — `font-heading`, typically `font-light` (300)
- **Body/UI**: DM Sans — `font-body`, weights 300–600
- **Tech accent**: IBM Plex Mono — `font-mono`, used for labels, numbers, metadata

### Tailwind utilities

Custom tokens are mapped into Tailwind (`tailwind.config.js`), so use `text-green`, `bg-terracotta`, `border-gold`, `font-mono`, etc. directly.

The `label-mono` CSS class (defined in `index.css`) combines `font-mono text-xs tracking-[0.2em] uppercase text-gold` — use it for eyebrow labels and metadata tags.

### Decorative conventions

- Horizontal rules: 0.5px gold (`border-gold/20`, `border-gold/30`)
- Pull quotes: 4px terracotta left border, italic Cormorant Garamond
- Eyebrow labels: `label-mono` class or `text-xs tracking-[0.3em] uppercase text-gold`
- Section headings: `font-heading font-light text-green` at `clamp(2rem, 4vw, 3rem)`
- Large monospace numerals (01, 02, 03…) used as editorial decorations on event cards and CTA sections

---

## Images

All images live in `react-app/public/assets/` and are referenced as absolute paths — **never import images through Vite**:

```
public/assets/
├── logo.png / logo.svg
├── team/           — team member portraits
├── alumni/         — alumni headshots
├── events/
│   ├── cpc/
│   ├── farewell-24/
│   ├── jagriti/
│   ├── philo-walk/
│   ├── scribble-and-scramble/
│   ├── trustfall/
│   └── wheel-of-doom/
└── gallery/        — carousel images (gal1.jpg–gal5.jpg + 3 numbered)
```

Reference in code: `<img src="/assets/team/nikita.jpeg" />` or as a string in data files.

If a photo is missing, `TeamCard` and `AlumniCard` render a colored **initials avatar** automatically via their `onError` handler.

---

## Content Data Files

Edit these to update site content — no component changes needed:

| File | Content |
|------|---------|
| `react-app/src/data/team.js` | 10 members in 7 role groups |
| `react-app/src/data/events.js` | 7 events, newest-first order |
| `react-app/src/data/alumni.js` | 9 alumni with batch year + testimonial |

### Team entry shape

```js
{
  name: "Full Name",
  image: "/assets/team/filename.jpg",  // null → initials avatar
  quote: "Their quote.",
  socials: { linkedin: "https://...", instagram: "https://..." }
}
```

### Event entry shape

```js
{
  title: "Event Name",
  date: "May 5, 2025",           // or "Weekly"
  location: "NSUT Campus",
  description: "...",
  images: ["/assets/events/folder/img.jpg", ...]
}
```

---

## Newsletter Posts

Create: `newsletter/src/posts/YYYY-MM-slug.md`

**Required frontmatter:**

```markdown
---
layout: post.njk
title: "Post Title"
date: 2025-03-15
tags:
  - posts
---
```

**Optional frontmatter:**

```markdown
author: Author Name
excerpt: "One sentence shown on the index listing."
```

Posts are automatically sorted newest-first on the index. The `tags: [posts]` entry is required for Eleventy to include the file in the `posts` collection.

### Newsletter posts JSON endpoint

`newsletter/src/posts.json.11ty.js` generates `/newsletter/posts.json` — a machine-readable list of all posts consumed by the React Home page to show recent articles. It uses a `.11ty.js` JavaScript template (not `.njk`) because Nunjucks HTML-encodes JSON output (`&quot;` instead of `"`).

During dev, `react-app/vite.config.js` proxies `/newsletter/` → `http://localhost:8081` so `fetch('/newsletter/posts.json')` works without a production build.

### Eleventy URL gotcha

In Eleventy v3, `page.url` in templates does **not** include `pathPrefix`. Always use the `withPrefix` filter when building hrefs to posts:

```njk
<a href="{{ post.url | withPrefix }}">...</a>
```

The filter is defined in `.eleventy.js` as `(url) => \`/newsletter\${url}\``.

**Markdown support**: headings, paragraphs, blockquotes (renders with terracotta border), ordered/unordered lists, bold, italic, horizontal rules (renders as gold line).

---

## Components

| Component | Purpose |
|-----------|---------|
| `NavBar.jsx` | Sticky nav; `<Link>` for internal routes, `<a>` for newsletter |
| `Footer.jsx` | Green footer with nav + social links |
| `TeamCard.jsx` | Circular photo + name + quote; initials fallback |
| `AlumniCard.jsx` | Alumni photo, batch, testimonial |
| `EventCard.jsx` | Date, location, description, scrollable image strip, lightbox |
| `GalleryCarousel.jsx` | Auto-advancing image carousel (pauses on hover) |
| `SectionDivider.jsx` | Thin 0.5px gold horizontal rule |
| `PullQuote.jsx` | Blockquote with terracotta left border |
| `DitherCanvas.jsx` | Canvas with Bayer ordered dithering on a green radial gradient; used as hero background |
| `SpotlightCard.jsx` | Wrapper that stores mouse position in CSS custom properties (`--x`, `--y`) for a zero-rerender spotlight effect via `::before` gradient |

---

## Deployment

Vercel reads `vercel.json` at the repo root:

```json
{
  "framework": null,
  "installCommand": "npm install",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/newsletter/(.*)", "destination": "/newsletter/$1" }]
}
```

`"framework": null` is required — without it Vercel auto-detects Vite and overrides `outputDirectory` with its own preset.

**Critical Vercel setting**: The project's **Root Directory** must be empty (repo root), not `react-app`. If Root Directory is set to `react-app`, only 135 packages install (one workspace) instead of ~280, and the newsletter build never runs. This setting lives on the Vercel project server-side and can be cleared via the dashboard or via the REST API:

```bash
# One-time fix if the dashboard setting is wrong:
curl -X PATCH https://api.vercel.com/v9/projects/<projectId>?teamId=<teamId> \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"rootDirectory": null}'
```

The auth token is at `%APPDATA%/com.vercel.cli/Data/auth.json` after `vercel login`. Project/team IDs are in `.vercel/project.json`.

Every push to `main` triggers an automatic redeploy. See `DEPLOYMENT.md` for full setup instructions and a guide to adding content.

---

## Source Reference

Original content (team, events, alumni data and images) was ported from `../axiom-nsut/`. That repo remains as reference — do not modify it.
