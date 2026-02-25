# Axiom Web — Deployment & Content Guide

## Architecture

Two build systems, one output:

| System | Pages | Output |
|--------|-------|--------|
| Vite + React + Tailwind | Home, About Us, Events | `react-app/dist/` → `dist/` (repo root) |
| Eleventy | Newsletter | `newsletter/dist/` → merged into `dist/newsletter/` |

The `scripts/postbuild.js` script merges both outputs into `dist/` at the repo root. Vercel deploys from there.

---

## Development

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

This installs dependencies for both workspaces (`react-app` and `newsletter`) and the root.

### Run locally

```bash
npm run dev
```

- React app → `http://localhost:5173`
- Newsletter → `http://localhost:8081`

The React dev server proxies `/newsletter/` to Eleventy, so all links work correctly without a production build.

Navigate between them:
- From React, click the **Newsletter** link in the nav
- From Newsletter, all nav links go back to React hash routes (`/#/about-us`, etc.)

---

## Build

```bash
npm run build
```

This runs in sequence:
1. `vite build` → `dist/` (repo root, via `build.outDir: '../dist'` in vite.config.js)
2. `eleventy` → `newsletter/dist/`
3. `node scripts/postbuild.js` → copies newsletter output into `dist/newsletter/`

### Preview the production build

```bash
npm run preview
```

Serves `dist/` at `http://localhost:4173`. Check that:
- `localhost:4173` — Home page
- `localhost:4173/#/about-us` — About Us
- `localhost:4173/#/events` — Events
- `localhost:4173/newsletter/` — Newsletter index
- `localhost:4173/newsletter/posts/2025-02-what-is-philosophy/` — Sample post

---

## Deploying to Vercel

The repo includes `vercel.json` at the root which configures Vercel automatically:

```json
{
  "framework": null,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/newsletter/(.*)", "destination": "/newsletter/$1" }]
}
```

`"framework": null` is required — without it Vercel auto-detects Vite and overrides `outputDirectory`.

### First-time setup

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import the GitHub repo
4. **Important**: In project settings, ensure **Root Directory** is blank (repo root). If set to `react-app`, only one workspace installs and the newsletter build fails.
5. Vercel will pick up `vercel.json` automatically — no other settings needed
6. Click **Deploy**

### Subsequent deploys

Every push to `main` triggers an automatic redeploy. That's it.

### Custom domain

In Vercel dashboard → project → **Domains** → add your domain.

---

## Adding a New Newsletter Post

All newsletter posts live in `newsletter/src/posts/`. Each post is a Markdown file with frontmatter.

### Step 1: Create the file

Name it `YYYY-MM-slug.md`, e.g.:

```
newsletter/src/posts/2025-03-what-is-justice.md
```

### Step 2: Add frontmatter

```markdown
---
layout: post.njk
title: "What Is Justice, Anyway?"
date: 2025-03-15
author: Your Name
excerpt: "A one-sentence teaser shown on the newsletter index page."
tags:
  - posts
---

Your essay content here...
```

**Required fields:**
- `layout: post.njk` — always include this
- `title` — displayed on the index and at the top of the post
- `date` — used for sorting (newest first on the index)
- `tags` — must include `posts` so Eleventy picks it up in the collection

**Optional:**
- `author` — displayed below the title
- `excerpt` — shown on the index listing; if omitted, only the title appears

### Step 3: Write in Markdown

Standard Markdown is fully supported:

```markdown
## Section Heading

Regular paragraph text.

> A blockquote with a terracotta left border.

1. Ordered list item
2. Another item

*Italic text* and **bold text**.
```

### Step 4: Preview

```bash
npm run dev
```

Open `http://localhost:8081` — your new post should appear at the top of the list. The React home page also pulls the latest 3 posts from `/newsletter/posts.json` automatically.

### Step 5: Deploy

```bash
git add newsletter/src/posts/your-new-post.md
git commit -m "newsletter: add post — Your Title"
git push
```

Vercel redeploys automatically.

---

## Updating Team / Events / Alumni

These are plain JavaScript data files:

| Data | File |
|------|------|
| Team members | `react-app/src/data/team.js` |
| Events | `react-app/src/data/events.js` |
| Alumni testimonials | `react-app/src/data/alumni.js` |

Edit the relevant file, add images to `react-app/public/assets/` (the `team/`, `events/`, `alumni/` subfolders), and push.

### Adding a new team member

In `team.js`, add to the appropriate role group:

```js
{
  name: "Full Name",
  image: "/assets/team/filename.jpg",
  quote: "Their quote here.",
  socials: { linkedin: "https://linkedin.com/in/...", instagram: "https://instagram.com/..." },
}
```

If no image is available, set `image: null` — the card will show a colored initials avatar automatically.

### Adding a new event

In `events.js`, add an object (keep them newest-first):

```js
{
  title: "Event Name",
  date: "March 10, 2026",
  location: "NSUT Campus",
  description: "A short description of the event.",
  images: [
    "/assets/events/folder-name/image1.jpg",
    "/assets/events/folder-name/image2.jpg",
  ],
},
```

Copy event photos to `react-app/public/assets/events/your-folder-name/`. Images that fail to load are hidden automatically — no broken image icons.

---

## Design System

All colors and fonts are defined in `shared/design-tokens.css`. This file is imported by both the React build and the Eleventy build, so changes propagate to both.

| Token | Value | Usage |
|-------|-------|-------|
| `--color-cream` | `#F8F4EC` | Page background |
| `--color-cream-dark` | `#EDE9DF` | Card backgrounds |
| `--color-green` | `#2C4A3E` | Primary text, nav, headings |
| `--color-terracotta` | `#C4704F` | Accents, CTAs, pull-quote borders |
| `--color-gold` | `#C9A44C` | Decorative rules, hover states |
| `--color-ink` | `#1A1A18` | Body text |
| `--font-heading` | Cormorant Garamond | All headings |
| `--font-body` | DM Sans | All body/UI text |
| `--font-mono` | IBM Plex Mono | Labels, metadata, code accents |

Additional font **Doto** is loaded via Google Fonts in `react-app/index.html` for the AXIOM wordmark display effect. It is not part of the design-tokens file.

### Social links

- Instagram: [@axiomnsut](https://www.instagram.com/axiomnsut)
- LinkedIn: [axiom-nsut](https://www.linkedin.com/company/axiom-nsut)
- Branding assets: [Google Drive folder](https://drive.google.com/drive/folders/1ghyc8NSUbn0NVhi1VjHnhtuaOrUcy2FQ)
