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

2. **`<body>`** — stacked `<section>` blocks, each with an `id` used by the nav anchors: hero/`#lead` (contains the booking card), `#holding-back`, `#consulting-vs-coaching`, `#tiers`, `#faq`, and the final CTA. Mobile nav is a `.burger` toggle.

3. **`<script>` (bottom)** — vanilla JS, no dependencies. Mobile nav toggle, IntersectionObserver scroll-reveal (with a `failsafe()`/`setTimeout` safety net so nothing stays hidden on fast scroll), the nav dropdowns and the FAQ accordion. Nothing on the page needs JS to book.

### Booking — IMPORTANT

There is no form on this page any more. The hero's right column is `.qual-form#qualForm`, a static card with one link in it: `Book Your Free 30-Minute Session`, a plain `<a target="_blank">` to Sam's Calendly. Every other "book" button (tiers, booking prompt, final CTA, footer) is the same link, so any of them opens the calendar directly. There is no JS behind them.

The screening questions live on the Calendly event itself (Sep 2026), under Event Types → Invitee Questions. Do not add them back to the page: the client maintains them there, and asking twice is what got the hero's intake removed.

**Nothing from calendly.com loads on this page** — no `widget.js`, no `widget.css`, no inline iframe, no preconnects. That was deliberate: the embed was 13 requests and held `load` at ~7s; without it the page settles in ~2s.

There is no lead capture here. The six-question intake (`currentStep`, `goToStep`, `buildBookingUrl`, the `a1..a6` prefill), the 4-question YES/NO gate before it, the contact form that POSTed to FormSubmit.co, its state/city cascade and the phone formatter are all in the history, not commented out in the file. `FORM_FLOW.md`, `QUICK_START.md` and `SETUP_GUIDE.md` still describe those flows and are out of date.

One structural quirk to know before editing the hero: the markup closes `.wrap` before `<picture>`, so the photo is a direct child of `<section class="hero">`, not of `.wrap`. The mobile layout is tuned to that. Balancing those tags "correctly" makes the credentials list overlap the headline at 390px.

## Common edits

- **Contact email** is hardcoded as `sam@consultwithmi.com` in multiple `mailto:` links — search-and-replace all occurrences to change it.
- **Tier pricing** ($1,500 / $2,500 / $5,000) is in the `.tier-price` / `tier-card` blocks under `#tiers`.
- **Pillar cards** all share `--green`; per the project history, gold/per-card accents were intentionally removed — keep them uniform.
- Markdown files (`QUICK_START.md`, `FORM_FLOW.md`, `SETUP_GUIDE.md`) are human-facing notes about the page, not code.

Note: the repo contains Windows `*.Zone.Identifier` files (WSL artifacts) — ignore them; they are not part of the project.
