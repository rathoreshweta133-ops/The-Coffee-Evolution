# The Coffee Evolution Nizamabad

Premium cafe marketing site built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, GSAP ScrollTrigger, Lenis, and `next/image`.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Replace content and assets

- Logo: replace `public/images/logo/reallogo.jpeg`, then update `src/config/site.ts` if the filename changes.
- Menu data: edit `src/data/menu.ts`.
- Gallery data: edit `src/data/gallery.ts`.
- Site name and canonical metadata: edit `src/config/site.ts`.
- Hours, address, and stats: edit `src/data/site.ts`.
- Image folders are already prepared under `public/images/logo`, `public/images/menu`, `public/images/gallery`, `public/images/hero`, and `public/images/about`.

Menu items are sourced from the uploaded menu-board photos. Items without a matching polished photo render as clean typography rows, and unclear source text is marked with `TODO: confirm` in `src/data/menu.ts`.

## Update brand styling

Design tokens live in `src/app/globals.css` under `:root`. Keep the palette compact: `--ink`, `--paper`, `--cream`, `--accent`, `--accent-soft`, `--accent-dark`, `--muted`, and divider colors.

Fonts are loaded in `src/app/layout.tsx` with `next/font`.

## Features included

- First-session hero pour animation with reduced-motion/session fallback.
- Interactive 3D menu book with category tabs, page-turn transition, search, and vegan filter.
- GSAP pinned story sequence.
- Masonry gallery with full-screen lightbox navigation.
- Sticky scroll-aware nav, mobile menu, scroll progress bar, custom desktop cursor, magnetic CTAs, reveal animations, testimonial marquee, live open/closed badge, reservation/newsletter stubs, SEO files, and styled 404.

## Deploy

Deploy directly to Vercel. Replace the temporary `.example` domain in `src/config/site.ts`, `public/robots.txt`, and `public/sitemap.xml` before production.
