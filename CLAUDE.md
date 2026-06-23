# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page marketing landing page for **MI Consulting** — an SQF (Safe Quality Food) consulting/coaching service for food manufacturers. There is no build system, framework, package manager, or test suite. The entire site is one self-contained `index.html` (~1100 lines) with inline `<style>` and `<script>` blocks. Images live in `images/`.

## Running / developing

Open `index.html` directly in a browser, or serve the directory:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

There is nothing to build, lint, or test. Changes to HTML/CSS/JS are visible on browser refresh.

## Architecture

Everything is in `index.html`, in three parts:

1. **`<style>` (top)** — all CSS. Design tokens are CSS variables in `:root` (line ~12): the brand is built on `--green` (`#1B9E77`) with `--ink` text on light sections. A single responsive breakpoint at `@media(max-width:768px)`. Sections alternate `.section-white` / `.section-light`. Scroll-reveal uses the `.reveal` → `.in` class transition.

2. **`<body>`** — stacked `<section>` blocks, each with an `id` used by the nav anchors: hero/`#lead` (contains the qualification form), `#holding-back`, `#consulting-vs-coaching`, `#tiers`, `#faq`, and the final CTA. Mobile nav is a `.burger` toggle.

3. **`<script>` (bottom)** — vanilla JS, no dependencies. Mobile nav toggle, IntersectionObserver scroll-reveal (with a `failsafe()`/`setTimeout` safety net so nothing stays hidden on fast scroll), and the qualification stepper.

### Qualification stepper (the core interactive feature)

A 4-question YES/NO gate in the hero that decides whether to show the contact form. State lives in two module-level vars: `currentStep` and the `answers` object. Key functions: `answerQuestion(step, answer)`, `goToStep(step)`, `updateStepper()`, and `resetForm()`.

The qualifying path is hardcoded: **Q1=YES, Q2=YES, Q3=NO, Q4=YES** routes to `step-contact`; any other combination routes to `step-disqualified`. This pattern is duplicated in `answerQuestion` (lines ~987 and ~994) — if you change the questions or the qualifying answers, update **both** checks. The semantic meaning: Q1 manufacturer, Q2 SQF focus, Q3 cannabis/THC (YES disqualifies — cannot serve), Q4 budget $1.5k+. See `FORM_FLOW.md`.

### Form submission — IMPORTANT

The contact form does **not** submit anywhere. On valid submit it only `console.log`s the lead payload (name/email/phone/company/city/state + `answers` + timestamp) and shows `step-success`. To actually capture leads, wire it to a backend / Zapier / FormSubmit.co — see `SETUP_GUIDE.md`.

## Common edits

- **Contact email** is hardcoded as `sam@consultwithmi.com` in multiple `mailto:` links — search-and-replace all occurrences to change it.
- **Tier pricing** ($1,500 / $2,500 / $5,000) is in the `.tier-price` / `tier-card` blocks under `#tiers`.
- **Pillar cards** all share `--green`; per the project history, gold/per-card accents were intentionally removed — keep them uniform.
- Markdown files (`QUICK_START.md`, `FORM_FLOW.md`, `SETUP_GUIDE.md`) are human-facing notes about the page, not code.

Note: the repo contains Windows `*.Zone.Identifier` files (WSL artifacts) — ignore them; they are not part of the project.
