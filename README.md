# portfolio.nkitch.com

A clean, minimal Next.js + Tailwind CSS + Framer Motion for my portfolio, export-ready for shared hosting.

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
