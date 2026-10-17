# Portfolio site — notes for Claude Code

Static site (plain HTML/CSS/JS, no build step) hosted on GitHub Pages. Owner: Riki Imamura.

- Content lives only in `data/`: `works.js` (all works; drives index + `work.html?id=`), `profile.js` (About), `site.js` (name, nav, filters, contact, `baseUrl`). Schema is documented in the header comment of each file.
- `assets/js/main.js` renders every page from that data; HTML files are thin shells (`<body data-page="...">`).
- Images: `images/works/<work-id>/` (`cover`, `hero`, `process-NN`, `gallery-NN`), `images/about/`.
- After adding/removing works or changing `baseUrl`, run `node tools/make-sitemap.mjs`.
- Never change a published work `id`, the repo name, or the URL: it is printed as a QR code on business cards.
- Do not add unannounced award results or unverified biography entries. Keep empty sections as `[]`.
- Design rules: white background, black/dark-grey text, system sans-serif, no shadows/gradients/rounded buttons, subtle motion only (respect `prefers-reduced-motion`).
- Preview: `python3 -m http.server 8000` in this folder.
- Work only inside this folder; never touch sibling projects (`../pattern-am-cad`, etc.).
