# Aidan Soares — portfolio

A React site (Vite, plain CSS, Lucide icons) with two pages: the portfolio (`index.html`) and the City Insight case study (`city-insight/index.html`, served at `/city-insight/`). There is no backend, CMS, or router.

```bash
npm install
npm run dev       # local development
npm run build     # production build into dist/
npm run preview   # serve the production build
```

## Where things live

```
src/
  content/        ← all copy, links, and image slots (edit here, not in components)
    profile.js      name, intro, email, GitHub/LinkedIn/résumé links, About copy
    projects.js     City Insight (homepage summary + case study), Wildfire Command, REDevs
    media.js        the three nature photographs
  components/
    sections/     one file per page section (+ its CSS)
  pages/          the City Insight case study page
    ui/           small shared pieces: Media, Screenshot, ArrowLink, Reveal, DetailList…
  styles/
    tokens.css    colors, type scale, spacing, motion
    global.css    base styles and layout/typography primitives
DESIGN.md         the design system and the reasoning behind it
```

## Adding or replacing images

1. Put the full-size original in `image-sources/`.
2. Add an entry for it in `scripts/optimize-images.mjs` (or reuse an existing name to replace one).
3. Run `npm run images`. This writes resized WebP files to `public/images/`.
   The Wildfire Command clip is built separately from recorded frames with `npm run clip`.
4. Reference it in `src/content/` with `responsive(name, widths)` and write its `alt` text.

A slot without a `src` renders a labelled placeholder describing what belongs there.

## Before publishing

Search the code for `TODO`. The remaining items are:

- the résumé PDF (`public/resume.pdf`), linked from the hero, header and contact sections
