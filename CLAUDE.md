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

### Intake form (the core interactive feature)

Six questions in the hero, one per screen, and the only route to Sam's calendar. Nothing qualifies or disqualifies anyone: the answers exist so Sam can work out the plant's Food Sector Category before the call. State is `currentStep` plus the `answers` object; key functions `goToStep`, `nextStep`, `previousStep`, `resetForm`, `answerText`, `buildBookingUrl`, and the `initIntake` IIFE that wires the inputs.

Q1 and Q4 are single-choice and advance on the tap; Q4 stops to ask for the number when the answer is "I know it". Q3 is multi-select with an "Other" field. **Only Q2 and Q3 are required** (`validate`) — they are what the FSC is read from, and every extra required field costs bookings.

The answers reach Calendly as its `a1..a6` prefill params, mapped **by position**: `a1` is the first Invitee Question on the Calendly event, `a2` the second, and so on. Reorder the questions in Calendly and this mapping silently points at the wrong fields. `answerText()` flattens Q3 to a comma-joined list and Q4 to `FSC <n>`; Calendly only prefills a multi-select when the strings match its options exactly.

The stepper it replaced was a 4-question YES/NO gate (manufacturer / SQF / cannabis / budget) that routed to a contact form or to a "not a fit" screen. `FORM_FLOW.md` still describes that flow and is out of date.

### Booking — IMPORTANT

Finishing the questions shows `step-done`, which is a single link: `Book Your Free 30-Minute Session`, a plain `<a target="_blank">` to Sam's Calendly, its href rebuilt with the prefill params on the way in. **Nothing from calendly.com loads on this page** — no `widget.js`, no `widget.css`, no inline iframe, no preconnects. That was deliberate (Sep 2026): the embed was 13 requests and held `load` at ~7s; without it the page settles in ~2s.

Every other "book" button on the page (tiers, final CTA, footer) is `.js-to-quiz`: `href="#lead"` plus a handler that scrolls `#qualForm` into view. Nobody reaches the calendar without going through the six questions, so **do not** point a button straight at Calendly.

There is no lead capture on this page. The contact form that POSTed to FormSubmit.co, its state/city cascade, the phone formatter and `step-success` were removed with the embed; a visitor who answers all six and never books leaves no trace here. If a form is ever wanted back, it is in the history, not commented out in the file.

## Common edits

- **Contact email** is hardcoded as `sam@consultwithmi.com` in multiple `mailto:` links — search-and-replace all occurrences to change it.
- **Tier pricing** ($1,500 / $2,500 / $5,000) is in the `.tier-price` / `tier-card` blocks under `#tiers`.
- **Pillar cards** all share `--green`; per the project history, gold/per-card accents were intentionally removed — keep them uniform.
- Markdown files (`QUICK_START.md`, `FORM_FLOW.md`, `SETUP_GUIDE.md`) are human-facing notes about the page, not code.

Note: the repo contains Windows `*.Zone.Identifier` files (WSL artifacts) — ignore them; they are not part of the project.
