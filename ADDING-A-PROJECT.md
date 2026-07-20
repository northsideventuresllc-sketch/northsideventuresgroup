# Adding a project to the Northside Ventures Group site

Tell the agent (or edit yourself) using this checklist. **One file drives the whole site:** `src/data/ventures.ts`.

## What you say

> Add **[Company Name]** under **[Parent]** (e.g. Northside Intelligence).  
> Repo: `https://github.com/...`  
> Live URL: `https://...` (or “URL not ready yet”)  
> Logo: in the repo at `path/to/logo` (or attach the file)

## What the agent does

1. **Open the company repo** and grab the official logo (prefer SVG; else PNG).
2. **Make it transparent** (remove solid backgrounds) and save to:
   `public/logos/<kebab-slug>.svg` (or `.png`)
3. **Add a node** in `VENTURE_TREE` under the correct parent in `src/data/ventures.ts`:

```ts
{
  id: "my-product",
  name: "My Product",
  href: "https://example.com", // or null if placeholder
  logo: "/logos/my-product.svg",
  status: "live", // or "placeholder"
  blurb: "One short line.",
  isIntelligenceTool: true, // only for NI Intelligence Tools (ITs)
},
```

4. No other files need edits. These update automatically:
   - Holographic carousel on the home page
   - Moving logo banner on the home page
   - Glossary at `/projects` (“See all projects”)

## Intelligence Tools (ITs)

New ITs under **Northside Intelligence** must set `isIntelligenceTool: true` and include `logo` + `href` (when live). They appear in the carousel and banner with Match Fit, StreamPass, WavScope, AXON, and the rest.

## Placeholders

If the URL is not ready: set `href: null` and `status: "placeholder"`. The logo still shows in the carousel and banner; the glossary marks it **Soon**.
