# Rafid Hasan Sydney — Portfolio

A static personal portfolio with a monochrome layout, a blue accent, light/dark themes and locally bundled GSAP motion.

## Development

    node build.mjs
    node verify.mjs
    node serve.mjs

The server prints http://127.0.0.1:4173. Deploy dist/ as static assets. content.json stores confirmed profile and project information; build.mjs generates the homepage, three project pages and 404 page. Styles and browser behavior are in dist/styles.css and dist/app.js.

## Redesign — 13 November 2026

The previous green palette, serif headlines, decorative quotation copy and project-artwork cards were replaced. The redesign uses Manrope and IBM Plex Mono, direct biographical copy and actual website captures.

Motion includes GSAP masked title entrances, ScrollTrigger image/reveal motion, Flip gallery/index transitions and native cross-document view transitions where supported. Motion is reduced when the visitor requests reduced motion. Page content stays accessible when animation scripts are unavailable. GSAP 3.15.1 is bundled in dist/vendor with original copyright/license headers.

## Sources and assets

- Bandhan: desktop screenshot from its live homepage.
- BazarDor: actual desktop and mobile homepage captures.
- FitLog: actual mobile homepage captures. The taller image is also a mobile viewport; it is not represented as a desktop capture.
- Portrait: supplied ProfilePic02.png, converted to grayscale WebP with the face preserved.

Project descriptions and development considerations are grounded in the owner’s GitHub repositories. Future development is labelled as possible next steps. No invented employment, AI products, proficiency percentages or testimonials are included. Education: BSc in Software Engineering, Metropolitan University, 2023–2027, currently fourth year. CGPA omitted.

LinkedIn and a finished résumé have not been supplied. The résumé button displays an honest preparation notice. Email and Facebook are the requested contact methods; no guessed phone or WhatsApp number is shown.

## Design research

Primary author case studies reviewed for layout and motion principles, not copied code:

- Joffrey Spitzer, minimalist portfolio with masked reveals and Flip transitions: https://tympanus.net/codrops/2026/02/18/joffrey-spitzer-portfolio-a-minimalist-astro-gsap-build-with-reveals-flip-transitions-and-subtle-motion/
- Andrea Aurelio Napoli, grid and motion: https://tympanus.net/codrops/2026/11/09/au-rel-io/
- Arnaud Rocca, neutral project pages and reusable motion: https://tympanus.net/codrops/2026/03/31/arnaud-roccas-portfolio-from-a-gsap-powered-motion-system-to-fluid-webgl/
- https://emilkowal.ski/
- https://rauno.me/

## Verification

Static checks cover page sections, anchors, local assets, fonts, project links and case-study content. DOM interaction checks run with jsdom and reduced motion, including theme persistence and blocked-storage fallback, menu state, Escape, layout controls, résumé buttons, email copy and clock.

To run interaction checks with a separate jsdom installation:

    node verify-interactions.cjs PATH_TO_JSDOM_INSTALL_DIRECTORY

The interaction harness does not simulate browser rendering. Browser screenshots of the source projects were captured, but browser control subsequently stopped because the current browser URL could not be verified. Visual review of the redesigned site and its animation timing is therefore unverified.
