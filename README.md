# aidan.soares — portfolio

Personal portfolio site for Aidan Soares, Full Stack Engineer. Built from scratch with no frameworks or templates — vanilla HTML, CSS, and JavaScript.

**Live:** [aidansoares.dev](https://aidansoares.vercel.app)

## Stack

- Vanilla HTML / CSS / JavaScript — no build step, no dependencies
- Fonts via Google Fonts (DM Serif Display, DM Mono, Cabinet Grotesk)
- Deployed on Vercel

## Features

- Custom animated cursor with ring follow (desktop only)
- Hero code card with typewriter animation and randomized human-paced delays
- Scroll-triggered reveal animations via IntersectionObserver
- Featured project card with full-width horizontal layout
- Responsive design — collapses cleanly to mobile

## Project structure

```
portfolio/
├── index.html        # Markup
├── style.css         # All styles
├── main.js           # Cursor, nav scroll, scroll reveal, typewriter animation
├── projects/         # Project screenshot images
│   ├── CityInsight.png
│   ├── WildfireCommand.png
│   ├── ExerciseTracker.png
│   └── Portfolio.png
└── public/
    └── favicon/      # Favicon assets
```

## Local development

No build step needed — open `index.html` directly in a browser, or serve it locally:

```bash
npx serve .
```
