# Rafid Hasan Sydney

A responsive scrolling portfolio with light and dark themes, animated project showcases and a 15-second bug-catching game.

## Run locally

Requires Node.js 22 or later. No dependency installation is needed.

```sh
npm run dev
```

Open http://127.0.0.1:4173. On Windows, you can also double-click START_PREVIEW.cmd.

## Build and check

```sh
npm run build
npm run check
```

## Structure

- `src/data/`: profile and project content
- `src/templates/`: shared layout and page templates
- `src/styles/`: page styles and local font declarations
- `src/client/`: theme, navigation, animation and game code
- `public/`: images, fonts and vendor scripts
- `tools/`: build, preview and verification scripts
- `dist/`: generated website, excluded from Git

## Vercel

Import this repository and keep Root Directory at the repository root. The included vercel.json uses `npm run build` and publishes `dist/`. No environment variables are required.

## Content

Edit `src/data/profile.json` for contact information and project details. Page content is in `src/templates/`. The resume button provides an email option until a resume is supplied.

## Third-party files

GSAP and ScrollTrigger are bundled in `public/vendor/`. Their copyright and license notices are preserved. Font metadata is included in the font files.
