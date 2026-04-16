# Fallacy Detective

A browser-based game where players identify logical fallacies in real-world documents.

## Running

Requires a local HTTP server — `file://` won't work (fetch is blocked).

```bash
npx serve .
# or
python -m http.server
```

## Architecture

```
fallacy-detective.html   UI shell + CSS (no logic)
data.js                  FALLACIES array (52 entries) + CASE_FILES manifest
game.js                  MD parser + game state + DOM logic
cases/*.md               One case per file, CriticMarkup format
```

## Adding a case

1. Create `cases/your-case.md` (see format below)
2. Add the path to `CASE_FILES` in `data.js`

## Case file format (CriticMarkup)

```markdown
---
id: unique_id
label: Display label (shown in sidebar)
title: Document Title
context: One-line description shown under the title.
---

Plain sentence — no fallacy.
{==Fallacy sentence.==}{>>fallacy_id | Explanation shown after correct answer.<<}
{==First sentence of a multi-sentence fallacy,==}
{==second sentence — the comment closes the group.==}{>>fallacy_id | Explanation.<<}
```

- Every `{== ==}` block is one sentence. Plain lines are also sentences.
- A `{>> <<}` comment closes the nearest preceding highlight group.
- Consecutive highlights without a comment form a multi-sentence fallacy (`sis:[i, i+1, ...]`).
- `fallacy_id` must match an `id` in `FALLACIES` in `data.js`.

## Fallacy IDs

See `data.js` → `FALLACIES`. 52 entries across: appeals, ad hominem family, causation/evidence, generalisation, structure/framing, and formal fallacies.

## Design notes

- Fallacy count is **not revealed** during play — only found fallacies appear in the sidebar.
- The combobox filters all 52 fallacies by name or description as you type.
- Multi-sentence fallacies: selecting any one sentence from the group is sufficient to identify it.
