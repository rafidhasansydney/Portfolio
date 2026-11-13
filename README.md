# Rafid Hasan Sydney — Portfolio

A custom, responsive portfolio with dark and light themes. Built as a dependency-free static website, with a small Node.js content generator.

## Run

Use Node.js 24 or later.

    node build.mjs
    node verify.mjs
    node serve.mjs

The preview server runs at http://127.0.0.1:4173. The deployable site is in dist/. Styles and browser JavaScript are in dist/styles.css and dist/app.js. Fonts and artwork are hosted locally. content.json holds the profile and case-study content.

## Confirmed profile

BSc in Software Engineering, Metropolitan University, Sylhet. Admission 2023, fourth year, expected graduation 2027. CGPA is intentionally omitted. No employment, internship, AI-product or automation-product claims are included. Coding agents and tool integration describe the development workflow, not standalone products.

## Content and images

Project content comes from the owner's public GitHub repositories: Social-Events-Client, Bazardor and Fitlog. Development challenges describe documented implementation considerations; future improvements are presented as possible next steps.

Bandhan uses a screenshot captured from its live homepage. BazarDor and FitLog use original artwork from their own repositories, clearly labelled as artwork. Their live links returned HTTP 200 during verification on 13 November 2026. The browser capture session stopped before those two live screenshots could be taken.

The supplied ProfilePic02.png is styled with CSS; the face has not been regenerated. The resume button opens a preparation notice and an email request link, as allowed by the assignment. LinkedIn has not been supplied; no guessed link is shown. The owner requested email and Facebook contact links, with no WhatsApp number. A phone number has not been supplied.

## Visual direction

Original layout using charcoal, soft green, editorial typography, a portrait composition, hover effects and scroll reveals. Motion respects reduced-motion preferences.

References reviewed for composition and interaction ideas, without copying code:

- https://dennissnellenberg.com/
- https://brittanychiang.com/
- https://www.bruno-simon.com/

## Verification limits

Syntax and static structure checks passed. Browser visual and interaction QA was unavailable after browser control stopped because the current URL could not be verified. This remains an explicit verification limit.
