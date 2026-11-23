# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static multi-page marketing site for **MI Consulting Group LLC — Manufacturing Intelligence**: SQF consulting (a fractional "corporate food safety team") plus HACCP / PCQI / SQF training and FSMA 204 advisory. Deployed at `https://manufacturingintelligence.ai` (Vercel). There is no build system, framework, package manager, or test suite.

The site was generated in Perplexity and copied in as-is (Nov 2026), replacing the earlier single-page landing. The old site is in git history.

## Running / developing

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

Nothing to build, lint, or test.

## Layout

- `index.html` — home: hero, problem, services, approach, 3-tier pricing (BUILD $5,000 → GROWTH $2,500 → SUSTAIN $1,500 /mo), process, about Sam Peña, an interactive "How SQF-Ready Is Your Facility?" quiz (`#assessment`, recommends a tier), FAQ, contact form.
- `sqf.html`, `haccp.html`, `pcqi.html`, `fsma-204.html` — topic pages.
- `enroll-sqf.html`, `enroll-haccp.html`, `enroll-pcqi.html` — training enrollment guides; they link to `training-inquiry.html?course=<id>`.
- `training-inquiry.html` — training inquiry form.
- `privacy.html` — privacy policy (added after the import; linked from every page's `.footer-bottom` and in `sitemap.xml`). It names the services the site actually uses (Formspree, Vercel Analytics, Calendly, Google Fonts) — update it if those change.
- `base.css` (reset) + `style.css` (all components). Each page also has inline script.
- **Design:** `style.css` ends with a "DESIGN LAYER" block that re-skins Perplexity's markup with the earlier consultwithmi.com look: navy `#0A2540` / green `#1B9E77` (gold only as a small accent on dark), Montserrat for h1/h2 (forced with `!important` because many h2s carry inline `font-family`), Fraunces for h3/h4/prices/numbers (`--font-display`), Archivo for body (`--font-body`); pill buttons with a green glow; white cards with soft navy shadows; home hero on MI navy `#0A2540` (both themes): white/ice copy left-aligned in a ~60ch column on a navy panel that fades out mid-hero, plant photo sharp (no blur/wash) on the right; navy page heroes with green/gold glows; navy footer. Primary buttons (`.btn-navy`, `.btn-white`) both render as the green pill. Make visual changes in that block, not by editing the markup or copy — deleting the block restores the Perplexity look. Every page loads Fraunces + Archivo + Montserrat from Google Fonts.
- Section backgrounds alternate on every page so each section reads as a change: white (`.section` / `.page-section`) ↔ cloud (`--alt`), with navy for the hero, "Built for the Future" and the testimonial; the home stat bar is white. Keep the alternation when adding or reordering sections.
- Do **not** add Sam's photo (the old hero cutout) back — the client asked for it to stay out.
- `assets/hero.webp` (2400px, q86) and `assets/services.webp` (1920px) — page photos, compressed from Perplexity's ~6 MB PNGs. `assets/hero.jpg` (1200×630) is the social preview image for `og:image` / `twitter:image` / JSON-LD — keep those pointing at the JPG. `logo_mi.png` / `logo_mi_blanco.png` at root are the old site's wordmark and ARE the logo: header uses `logo_mi.png` (61px tall, swaps to the white one in dark mode), footer uses `logo_mi_blanco.png`. Perplexity's SVG shield logo was replaced on purpose — don't bring it back. Favicons (`favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`) live in `assets/`, restored from the old site.
- `sitemap.xml`, `robots.txt`.

## External services

- Forms POST to **Formspree**: contact form `https://formspree.io/f/mlgoqzvq` (index), training form `https://formspree.io/f/xdapqbjj`.
- Booking links go to `https://calendly.com/consultwithmi/discovery-call-fractional-food-safety-department` (chosen over the old prescreening event, Nov 2026).
- Both forms show a consent line linking `privacy.html` (`.form-consent`) under the submit button.
- Pages load `/_vercel/insights/script.js` (only works when served by Vercel).
- Contact email is mostly `info@manufacturingintelligence.ai` (10 `mailto:` links across pages), plus one `sam@consultwithmi.com`; search-and-replace to change it.

Shared chunks (header/nav, footer) are duplicated in every HTML file — edit all pages when changing them.
