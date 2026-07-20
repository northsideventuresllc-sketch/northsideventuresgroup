# Northside Ventures Group

Landing site for [northsideventuresgroup.com](https://northsideventuresgroup.com) — a simple house overview, holographic venture carousel, scrolling logo banner, and project glossary.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

- Home: `/`
- Glossary: `/projects`

## Add a company or product

See **[ADDING-A-PROJECT.md](./ADDING-A-PROJECT.md)**.  
Edit **`src/data/ventures.ts`** and drop a transparent logo in **`public/logos/`** — carousel, banner, and glossary stay in sync.

## Contact

Footer **Contact** opens the user’s mail client to `jb@northsideventuresgroup.com`.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4
