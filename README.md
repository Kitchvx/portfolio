# Nathan Kitching — Portfolio

responsive, minimal, and fast portfolio site to showcase my projects, tech stack, and development work.

Built with **Next.js**, **Tailwind CSS**, and **Framer Motion** — designed for speed, simplicity, and static export hosting (I'm a cheapskate).

**Live Site:** [portfolio.nkitch.com](https://portfolio.nkitch.com)

---

## Features

- **Responsive design** with clean, minimal styling.
- **Dynamic project pages** generated from `projects.json`:
  - Title, summary, and detailed description.
  - Tags for quick tech stack reference.
  - Optional repo and live demo links.
  - Optional image gallery per project.
- **Project listing page** with:
  - Tag filter dropdown (alphabetically sorted, “All” always first).
  - Summaries for quick project previews.
- **Home page** with featured sections and recent GitHub commits.
- **GitHub commits widget** (fetches latest commits for configured repos, home page only).
- **SEO-friendly metadata** for each project (dynamic `<title>` and `<meta>` description tags).
- **404 / Not Found page** for undefined routes.
- **Static export support** for deployment to static web hosting.
- **Optimised build setup** with `.gitignore` tuned for Next.js static export.
- **Clean project structure** under `app/(site)/` with components, data, and pages well separated.

---

## Tech Stack

- **Next.js** (App Router)
- **Tailwind CSS**
- **Framer Motion**
- **React Hooks** (`useMemo`, `useEffect`, `usePathname`)
- **GitHub REST API** (latest commits)
- **Static site export** for deployment
- Hosted using static web hosting under my subdomain

---

## Quickstart

```bash
npm install
npm run dev
# http://localhost:3000
```

## Build (static export)

This project is configured with `output: 'export'`, `assetPrefix: './'`, comment these out when running `npm run dev`, make sure `trailingSlash: true` is set.

(I run the portfolio on a static IONOS web host and not a VPS or service like Vercel.)

```bash
npm run build
# Upload the *contents* of /out to your hosting root (in my case [IONOS ROOT]/portfolio)
```

## Where to edit

- `app/(site)/*` — your pages
- `data/projects.json` — edit/add projects
- `app/(site)/contact/page.js` — replace Formspree action with your endpoint
- `public/og.png` — replace your social card
- `public/sitemap.xml` — adjust URLs if needed

## Common gotchas

- If CSS/JS are missing on shared hosting, ensure you uploaded the **contents** of `/out` (not the folder) and kept paths relative.
- Avoid `next/font/google` in static export when using `assetPrefix: './'` — link Inter via `<head>` instead.

## Deploy on Vercel

Zero-config:

1. Push to GitHub
2. Import in Vercel → Deploy
3. Point `YOUR.SITE` to Vercel
