# Axiom backend plan

Target: Google login with guest/member/admin roles, comments, reactions, game
scoreboards, and an `/admin` portal for newsletters and events — on Cloudflare's
free tier, with no budget.

## Constraints

- Zero budget. Vercel Hobby is non-commercial only; Vercel Pro is $20/mo.
- Workers Free: 100,000 requests/day, 10 ms CPU per request, 128 MB memory.
- Requests to static assets are free and unlimited and do not invoke the Worker.
- D1 Free: 5M rows read/day, 100k rows written/day, 5 GB total, 500 MB per
  database, 10 databases. Exceeding daily read or write limits fails queries
  until 00:00 UTC.
- Rows read is the limit reached first; every filtered column needs an index or
  the query becomes a full scan.

## Decisions

- Host on Cloudflare Workers via OpenNext. One deployable, no CORS.
- D1 for runtime data: members, comments, reactions, scores.
- R2 for admin-uploaded images (10 GB-month, 1M Class A ops, 10M Class B ops,
  zero egress).
- All pages stay prerendered. No per-request SSR anywhere.
- Only `/api/*` invokes the Worker. Everything else is a static file.
- `/admin` is a static shell that hydrates and fetches from `/api/*`. Security
  is enforced in the API handlers, not the page.
- Newsletter posts and events stay git-backed and build at deploy time. Their
  pages remain static, which keeps them off the CPU budget.
- Scoreboards and comments load client-side from `/api/*`; page content does
  not wait on them.
- Client-submitted game scores are treated as untrusted but accepted, with rate
  limiting. Server-side replay validation is out of scope.

## Data model

- `members(email, name, batch, role, is_admin, is_active)` — the authority for
  roles. Seeded from `data/*.js` plus collected emails; those files hold no
  addresses today.
- `users` — auth provider identity.
- `comments(target_type, target_id, user_id, body, status, created_at)`
- `reactions(user_id, target_type, target_id, kind)` with a uniqueness
  constraint so one user cannot repeat a reaction.
- `scores(user_id, game_slug, score, meta, created_at)` with an index on
  `(game_slug, score DESC)`.
- Indexes on every filtered column. A leaderboard read is ~20 rows.

## Open

- Auth: Clerk or Auth.js.
  - Clerk: free to 50,000 monthly retained users. Sessions live on Clerk's side,
    so no D1 write per request. Prebuilt login UI. Costs a vendor dependency and
    a CSP/proxy configuration.
  - Auth.js: no third party. Login UI and session handling are ours, and
    database sessions consume the 100,000/day write budget.
- Member emails are not collected yet. This blocks role assignment.
- Turso as a fallback if D1 daily caps are reached: also SQLite, 500M rows
  read/month and 10M rows written/month (roughly 3x D1), HTTP driver works from
  Workers. Costs a second vendor and a network hop, which does not count
  against CPU.
- Workers Paid at $5/mo as a fallback if API handlers exceed 10 ms CPU: 30s
  CPU, 10M requests/month. The architecture does not change if this is needed.

## Phases

1. Auth, `members` table, `/api/me`, nav avatar.
2. `scores` table, `/api/scores`, leaderboard on game pages. No auth on reads.
3. Comments and reactions, with rate limiting and a moderation queue in place
   before opening to guests.
4. `/admin` shell: member management, comment moderation.
5. Newsletter and event editor that commits markdown to the repo via the GitHub
   API, triggering a rebuild.

## Risk

A Next.js route handler plus JWT verification may approach the 10 ms CPU
ceiling. Measure with `wrangler tail` after the first deploy. The mitigation is
Workers Paid at $5/mo, not a rewrite, because the architecture is the same on
both plans.

## Rejected

- Vercel plus Neon or Supabase: Vercel Hobby is non-commercial, Pro is $20/mo.
  Neon Free is 0.5 GB and fails writes at the cap. Supabase Free is 500 MB and
  pauses projects after 7 days of inactivity.
- Firebase and Firestore: 50,000 reads/day and 20,000 writes/day, roughly 100x
  less read headroom than D1. Document model fits a relational schema poorly.
  Adds a second auth system alongside Clerk.
- MongoDB Atlas: M0 is free forever at 512 MB but capped near 100 ops/sec. The
  HTTP Data API reached end of life, so Workers would need the wire protocol,
  which has no connection pooling across invocations. Document model fits
  poorly.
- PlanetScale: free tier retired, now from $5/mo.
- CockroachDB: 30-day trial only, no free tier.
- Xata: 14-day trial, only self-hosted is free.
- Calling D1 from Vercel over the REST API: a cross-vendor round trip per query,
  no transactions.
- SSR for `/admin`: exceeds the CPU budget for no benefit at this admin count.
- Cloudflare KV as a primary store: 1,000 writes/day. Use it only for config and
  caching.
- Images in D1: wrong tool, 500 MB per-database cap.
- Reading posts from D1 at request time: forces SSR and gives up static
  delivery, which is what keeps the free tier viable.
- Implementing authentication ourselves: excluded by explicit decision.
