# Design system

The site's rule is "less, but much better." Typography, photography, and spacing carry the design. Decoration doesn't.

## Typography

| Role | Face | Why |
| --- | --- | --- |
| Display (name, project titles, the lede in About, contact email) | **Gambetta** (Fontshare), weights 400 and 500 | A warm, sturdy serif with a bookish but confident character. Chosen after comparing about 30 options on the live page; it reads as crafted rather than template-default. |
| Everything else (UI, body, labels, metadata) | **General Sans** (Fontshare), weights 400–600 | A clean contemporary grotesk that pairs with Gambetta and avoids the Inter/Geist SaaS look. |

Both are self-hosted from `src/styles/fonts/` (about 110 KB total) under the free ITF license.
The serif is used sparingly: the hero name, project titles, the About lede, and the contact email. Nothing else.

Scale (fluid, in `src/styles/tokens.css`):

- `--text-xs` 0.75rem: uppercase labels, tracked +0.14em
- `--text-sm` 0.875rem: metadata, captions
- `--text-base` 1.0625rem: body
- `--text-lg` 1.25rem: role line, ledes in sans
- `--display-sm` ~1.75 → 2.5rem: section-level serif
- `--display-project` ~2.25 → 3.25rem: secondary project titles
- `--display-md` ~2.75 → 5rem: City Insight title
- `--display-xl` ~4 → 11.5rem: hero name

Body line length is capped at `--measure` (≈ 36rem).

## Color

A warm stone ground with near-black ink and one deep forest-olive accent. There is no dark mode and no gradients except inside image placeholders.

| Token | Hex | Use |
| --- | --- | --- |
| `--stone-50` | `#f7f4ef` | page |
| `--stone-100` | `#efebe4` | alternate band (client work, diagram panel) |
| `--stone-200` | `#e4ded4` | hairlines on bands, placeholders |
| `--stone-300` | `#d2cabd` | rules |
| `--ink` | `#1d1e1a` | text |
| `--ink-muted` | `#55564f` | secondary text (≈7:1) |
| `--ink-subtle` | `#65655d` | metadata (≥4.5:1 on both grounds) |
| `--forest` | `#34432f` | labels, icons, focus ring, the one accent |

The page has a barely visible grain (3% opacity SVG noise).

## Layout and spacing

- Content width is `--page-max` (1240px) with fluid gutters (`--gutter`).
- A 12-column grid is used inside sections. Sections break it on purpose: the City Insight lead screenshot is wider than the page, the hero photo bleeds to the right edge, and the contact photo spans full width.
- Section rhythm is `--section-space` (≈ 6 → 11rem). There are no empty 100vh sections.
- Radii: 4px (`--radius-sm`) for images and 8px (`--radius-md`) for frames. Almost nothing is a card.

## Photography (misty pines)

Photos appear in two places only:

1. **Hero**: a misty pine forest with a path leading in, as a tall crop bleeding off the right edge. On load the fog "clears" (blur, brightness, and scale settle over 2.4s), and on scroll the photo drifts at 15% of scroll speed. A faint warm multiply wash ties its cool greys to the stone ground.
2. **Contact**: a misty pine valley whose top dissolves into the page (CSS mask), echoing the hero.

The work sections contain no nature imagery. All image slots live in `src/content/media.js` and `src/content/projects.js`. Originals live in `image-sources/`, and `npm run images` generates responsive WebP files. A slot without a `src` renders a labelled placeholder that describes what should go there.

## Icons

Lucide only: 1.75 stroke, 15–18px, colored `currentColor` or forest. GitHub and LinkedIn are drawn in the same stroke style in `BrandIcons.jsx`, because Lucide no longer ships brand marks.

## Motion

- **Scroll reveal**: 14px rise plus fade over 800ms with an ease-out curve. It runs once.
- **Hero entrance**: the name lines rise in sequence while the photo clears out of the fog. The photo then drifts gently with scroll.
- **City Insight**: a sticky stage crossfades between four visuals (600ms). The active chapter text is full ink and the others dim.
- **Hovers**: link underlines darken, and arrow icons move 2px.
- `prefers-reduced-motion` turns all of it off. Content never depends on animation to be visible.

## Responsive

- **Below 960px**, the City Insight sticky stage is removed and each chapter shows its own visual inline.
- **Below 820px**, the hero photo becomes a full-bleed band above the name.
- The Capabilities grid goes from 5 columns to 3, then 2.
