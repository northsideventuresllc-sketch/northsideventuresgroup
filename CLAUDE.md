# CLAUDE.md — northsideventuresgroup

This repo had no written agent rules at all before this file (no `.cursor/`, no `AGENTS.md`) —
the only Cursor trace was its landing-page PR being built via Cursor's background-agent
workflow, not local rule files. This seeds the baseline every other NORTHSiDE Ventures repo
already has.

## What this is

Landing site for northsideventuresgroup.com — a single-page holographic venture carousel +
scrolling logo banner + `/projects` glossary. One file drives the whole site:
`src/data/ventures.ts` (the `VENTURE_TREE`). Adding a new company/product means editing that
file and dropping a transparent logo in `public/logos/` — see `ADDING-A-PROJECT.md` for the
exact node shape. No other files need touching for a new venture entry.

## Brand rules (org-wide, same as every other NV repo)

- `NORTHSiDE` — exact casing, always.
- Operator is **Jonny (JB)** — never "Jonathan".
- No backend, database, auth, or payment surface in this repo (confirmed by initial audit) —
  it's a static-ish marketing site. Risk from a bad merge here is a visual regression or broken
  build, not data loss or a security incident.

## Deploy

Push to `main` → Vercel git-integration auto-deploy (zero-config Next.js, no `vercel.json` in
this repo). No CI workflow currently configured — `npm run lint` / `npm run build` before
merging is manual discipline, not an enforced gate.
