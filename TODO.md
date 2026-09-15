# TODO — Content Ideas

Ideas for non-blog, non-game content on the Axiom site. Captured from a
brainstorm; nothing here is committed work yet. Ordered by value-to-effort.

Current routes: `/`, `/team`, `/events`, `/games`, `/newsletter`,
`/colophon`, `/privacy`. The gaps are in reference material, on-ramps, and
community continuity.

## High value, low effort (reuses existing data/components)

- [ ] **Reading Room / Recommended Reading**
      Curated bibliography, not a blog. Group by theme (Ethics, Epistemology,
      Mind, Existentialism, Indian Philosophy). Each entry: title, author,
      1–2 line "why read this", difficulty, free link (SEP/IEP/Gutenberg where
      possible). Static data: `data/reading.js` + one route. Big SEO win.
- [ ] **Glossary / Concept Index**
      Short, stable definition pages: *Ship of Theseus*, *Categorical
      Imperative*, *Qualia*, *Sorites Paradox*, *Veil of Ignorance*. ~150 words
      each. Extract concepts already embedded in the games into something
      linkable; cross-link from newsletter essays and event descriptions.
- [ ] **Start Here / "New to Philosophy" pathway**
      Guided on-ramp: "Never read philosophy? Do these five things in this
      order." Gives the site a non-games entry point; doubles as a membership
      pitch.
- [ ] **Join / Membership page**
      There is currently no obvious "how do I become a member". Include what
      Axiom does, meeting cadence, selection process (if any), and an FAQ.

## Medium effort, strong identity

- [ ] **Reading Group / Seminar Archive**
      Each term's reading, plus the discussion questions used and any notes or
      recordings. Turns one-off events into a durable curriculum.
- [ ] **Long-form Alumni: "Where Are They Now"**
      Upgrade a handful of entries in `data/alumni-quotes.js` into real short
      interviews — what they studied, what they do, how philosophy shaped it.
- [ ] **Visual Archive**
      Dedicated `/gallery` or `/archive` organized by year, separate from the
      utilitarian event list. `GalleryCarousel` and per-event photo folders
      already exist — zero new data needed.
- [ ] **Axiom Timeline / Origin Story**
      Founding (2023) → Axiom Days → Moksha/Nsutthon appearances. All data is
      already in `data/events.json`. Strong "about us" content that isn't a
      blog.

## Higher effort, differentiating

- [ ] **Debates / "Both Sides" pages**
      Structured steelman pages: for each question, the strongest case for and
      against, plus further reading.
- [ ] **Question of the Week / Prompt archive**
      One question, refreshed weekly, with short moderated community answers.
      Gives the site a reason to be revisited.
- [ ] **Talk/Session Library**
      If sessions get recorded, an index with abstracts and speakers instead of
      leaving them buried in the YouTube channel.

## If only three get done

Reading Room, Glossary, and a Join page. Together they convert the site from
"archive of what we did" into "a resource people return to" — all three are
pure static data, so they fit the existing App Router + `data/*.js` pattern
with no new dependencies.

---

# TODO — Asset Optimization Follow-ups

From an adversarial review of `5a15b62` ("Optimize assets: remove duplicate
images, standardize on WebP, and bypass Vercel image quotas") on 2026-09-14.
Three reviewers: correctness/regressions, data/manifest integrity,
verification/build.

Verdict: **no P0, two P1, several P2.** Build passes 33/33, lint clean,
`data/images-manifest.json` reproduces byte-for-byte from disk, all 61
`/data/...` references resolve, all 277 deletions have a same-stem `.webp`
survivor, all 151 WebP files decode. The dedup/WebP migration itself is sound
and `/_next/image` is fully eliminated (the quota goal is met). **Nothing below
has been applied yet.**

## Fix before release (P1)

- [ ] **Re-encode the hero image (`icarus.png` → WebP).**
      `components/Hero.jsx:123` serves `/data/icarus.png` with **no `loading`
      attribute** (eager) and above the fold. Source is 1024×1024 PNG with
      alpha, **680,206 B**. `images.unoptimized: true`
      (`next.config.mjs:3-5`) stops the optimizer, so it now ships verbatim.
      A 1024px WebP q80 is **107,870 B (−84%)** — alpha preserved.
      Homepage image payload is 0.93 MB, 72% of it this one file.
      Fix: emit `public/data/icarus.webp` and repoint `Hero.jsx:123`.
- [ ] **Restore responsive image delivery / portrait thumbnails.**
      Global `unoptimized` removes `srcset` entirely — verified: 0 `srcset`
      attributes in any built HTML, `.next/server/app/team.html` has 34
      portrait `<img>` and `team/2025.html` has 60, all pointing at 700–1600px
      files rendered at 80–128px (`TeamPortraitCard.jsx` `w-20 h-20` /
      `w-32 h-32`). Unique-image weight: `/team` 6.50 MB, `/team/2025`
      2.74 MB, portraits 3.95 MB, events 25.35 MB. Portraits/alumni are
      `loading="lazy"`, so this is scroll-through weight, not initial load.
      Fix: generate `*-256.webp` thumbnails and reference them in
      `data/202*.js` + `data/alumni-quotes.js` (keeps the optimizer off, so
      no quota regression).
- [ ] **Add long-lived cache headers for `/data/*`.**
      Now that images bypass `/_next/image`, they are served by the static
      handler: `curl -sSI /data/the-thinker.webp` →
      `Cache-Control: public, max-age=0` (so is `/data/icarus.png`), while the
      HTML route gets `s-maxage=31536000`. Every repeat visit revalidates
      every asset. The `headers()` block in `next.config.mjs` already matches
      `/data/*` (CSP/CORP are applied) but sets no cache directive.
      Fix: add `{ source: '/data/(.*)', headers: [{ key: 'Cache-Control',
      value: 'public, max-age=86400, stale-while-revalidate=604800' }] }`.

## Hygiene (P2, trivial and actively misleading)

- [ ] **Update stale `AGENTS.md` portrait docs.**
      `AGENTS.md:98` lists portraits as `(.jpg, .webp, .avif)` and
      `AGENTS.md:106` tells readers to reference
      `/data/portraits/filename.jpg`. Every non-WebP portrait was deleted, so
      following the doc now yields a 404 plus a silent fallback avatar.
- [ ] **Clean up `scripts/generate-image-manifest.js`.**
      Header docstring (`:8`, `:12`) still claims it collects
      `.jpg/.jpeg/.JPG/.png/.webp/.avif` and that "the portraits key is left
      untouched"; `readFileSync` (`:14`) is now unused; the portraits loop
      hardcodes `.endsWith(".webp")` (`:50`) while events use
      `IMAGE_EXTENSIONS` (`:25`) — two copies of one policy. `bun run lint`
      passes, so nothing catches this.

## Optional improvements (defer unless wanted)

- [ ] **Add an asset-existence guard + CI.**
      No gate exists for dangling `public/` references: `build` and `lint`
      both pass silently, and runtime swallows failures
      (`TeamPortraitCard` `onError` → `DefaultAvatar`,
      `EventCarousel`/`GalleryCarousel` → `display: none`). There is no
      `.github/`, no `vercel.json`, and no test script. A
      `scripts/check-assets.js` wired to `bun run check:assets` would pass on
      the current tree today.
- [ ] **Split the manifest so client code imports only `events`.**
      The 40-entry `portraits` array has **no consumer** (`EventCard.jsx` is
      the only reader, it uses `.events`, and the component is `"use client"`),
      so it ships unused JSON to browsers.
- [ ] **Drop the now-unused `sharp` dependency.**
      It stays in `dependencies`, `ignoreScripts`, and `trustedDependencies`
      even though nothing imports it and no `placeholder="blur"` exists — only
      the image optimizer used it, which this commit disables. Re-verify
      before removing if the optimizer might ever be re-enabled.
- [ ] **Pin the locale in `naturalSort`.**
      `scripts/generate-image-manifest.js:31` passes `undefined` as the
      locale, so regenerating the manifest on a different ICU locale can
      reorder mixed-delimiter names (`arnav khare.webp` vs `arnav-gupta.webp`)
      and produce a spuriously dirty tracked artifact. Pass `"en"`.
- [ ] **Scope `unoptimized` per-image instead of globally.**
      Architectural, and in tension with the quota goal until thumbnails
      exist — listed for completeness, not recommended alone.

## Pre-existing, not from `5a15b62` — separate ticket

- [ ] **Fix broken images in `content/newsletter/what-is-philosophy.md`.**
      Lines 24, 56, and 81 reference `../whatisphilosophy.jpg`,
      `../berries.png`, and `../matrixmeal.jpg`. All three are missing on disk
      and were **never tracked in any commit**. `content/` was untouched by the
      asset commit, so this is unrelated — but it is a live broken-image bug in
      a published post.
- [ ] **Three event folders referenced by `data/events.json` have no images.**
      `photoshoot-24`, `ethnic-day-24`, and `ethnic-day-25` are absent from
      `data/images-manifest.json`, so `EventCard` renders no carousel for them.
      Also absent at `HEAD~1`, so pre-existing.

## Explicitly not worth acting on

- The verification reviewer's `BLOCK` verdict — it contradicts its own P1
  labels and its "no blockers" summary; no P0 exists.
- `app/page.jsx` declaring `width={500} height={500}` for `the-thinker.webp`
  (actual 1200×1634) — pre-existing, same aspect as the old PNG, no new
  layout shift.
- The commit message claiming gallery duplicates were deleted — gallery files
  were only recompressed. Cosmetic, and the commit is already pushed.
- Dropping high-res masters — acceptable; recoverable via
  `git show HEAD~1:<path>`.
