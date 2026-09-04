<div align="center">

# jerish.in

**Personal portfolio site for Jerish David — Data Analyst**

[![live](https://img.shields.io/badge/live-jerish.in-b68235?style=flat-square)](https://jerish.in)
[![pages](https://img.shields.io/github/deployments/JerishJerry/jerish.in/github-pages?label=pages&style=flat-square)](https://github.com/JerishJerry/jerish.in/deployments)
[![dependencies](https://img.shields.io/badge/dependencies-none-2ea44f?style=flat-square)](#tech-stack)
[![last commit](https://img.shields.io/github/last-commit/JerishJerry/jerish.in?style=flat-square)](https://github.com/JerishJerry/jerish.in/commits/main)

### [jerish.in →](https://jerish.in)

![Jerish David — Data Analyst](og.png)

</div>

---

## Overview

A single-page portfolio covering services, experience, technical
skills, selected work and contact — plus a downloadable resume.

Built as plain static HTML and CSS. No framework, no bundler, no build step, no
package manager, and no third-party scripts except one Google Fonts stylesheet.
Deploys on push to `main` via GitHub Pages.

| | |
|---|---|
| **First visit** | ~90 KB across 5 requests (HTML + portrait + Google Fonts) |
| **JavaScript** | 5 KB inline, no separate request — scroll reveals, nav state, contact form |
| **Third-party requests** | Google Fonts only (`fonts.googleapis.com` / `fonts.gstatic.com`) — fonts, images and styles otherwise self-hosted |
| **Rendering** | no client-side rendering; full content in the HTML response |
| **Accessibility** | semantic landmarks, alt text, visible focus rings, `prefers-reduced-motion` honoured |
| **SEO** | canonical URL, meta description, Open Graph + Twitter cards, JSON-LD `Person` schema, sitemap |

## Tech stack

Deliberately minimal, because a portfolio should not need a toolchain to stay
online for years:

- **HTML** — one prerendered document, content inline
- **CSS** — a design-token layer (`:root` custom properties for colour ramps,
  type scale and spacing) plus component classes, in a `<style>` block
- **Type** — [Playfair Display](https://fonts.google.com/specimen/Playfair+Display)
  for display serif plus [Montserrat](https://fonts.google.com/specimen/Montserrat)
  for body, loaded from Google Fonts with `preconnect`. Colours: paper `#f3f2f2`,
  ink `#201f1d`, gold `#b68235` / `#e1ad66`, dark hero `#191715`.
- **Images** — WebP, with `width`/`height` set to reserve layout space
- **JavaScript** — one inline IIFE at the end of `index.html`: scroll-driven
  reveals, reading-progress bar, active-section nav, magnetic buttons and
  contact-form delivery. No separate request, no dependencies.

## Project structure

```
.
├── index.html      entire page — markup, design tokens, component CSS
├── 404.html        not-found page, styled to match
├── assets/
│   └── portrait.webp            portrait (sepia-treated, gold-disc hero)
├── uploads/        downloadable resume (.docx)
├── og.png          1200×630 social preview card
├── favicon.svg     JD monogram
├── CNAME           custom domain for GitHub Pages
├── .nojekyll       serve files as-is, skip Jekyll processing
├── robots.txt
└── sitemap.xml
```

## Local development

There is nothing to install. Serve the directory over HTTP — opening
`index.html` as a `file://` URL will break the relative asset paths:

```bash
python3 -m http.server 4173
```

Then visit <http://localhost:4173>.

Edit `index.html` directly. Design tokens live in the `:root` block near the top
of its `<style>` section, so palette and type changes belong there rather than
in individual inline styles.

## Deployment

Pushing to `main` publishes automatically:

```bash
git push origin main
```

GitHub Pages serves from `main` at the repository root. The `CNAME` file pins the
custom domain, so it survives redeploys.

### DNS

`jerish.in` is registered at GoDaddy and points at GitHub Pages:

| Type | Host | Value |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `jerish.in` |

> **Note:** do not re-enable GoDaddy's **Parking** or **Forwarding** features on
> this domain — either one overwrites the `A` records above and takes the site
> offline.

## Contact form

Submission is handled by the inline script at the bottom of `index.html`. It
intercepts the submit event and opens the visitor's mail client with the
subject and body prefilled from the form fields — no third-party service, no
account, and no visitor data leaves their machine until they press send.

The browser enforces the `required` fields and the `type="email"` format before
the handler runs. Email, phone and LinkedIn are also listed as plain links, so
the form is never the only route to a reply.

To swap in a background POST instead, replace the `submit` handler at the end of
`index.html` with a `fetch()` to the endpoint of your choice — the fields are
already named `name`, `email` and `message`.

## How this was built

The page began as a design-tool export: a single self-extracting HTML file that
unpacked itself with JavaScript on load. That form is fine for sharing a preview
and poor for hosting — the document title was `Bundled Page`, nothing rendered
without JavaScript, and the runtime pulled React from a CDN on every visit.

Preparing it for production meant:

- unpacking the bundle into real files
- prerendering the template runtime away, then deleting it (~135 KB of
  JavaScript) along with its React CDN dependency and editor-only CSS
- replacing the drag-and-drop `<image-slot>` widget with a real `<img>` and alt
  text
- wiring the contact form, which was bound to an editor-only handler and so
  reloaded the page and discarded the message on submit
- fixing a mobile defect where the `nowrap` navigation bar forced 161 px of
  horizontal scroll below 600 px wide
- adding the document title, metadata, structured data, icons, social card,
  `robots.txt`, `sitemap.xml` and 404 page

The prerendered output was diffed against the original render and matched on
text content, document height and the geometry of all 16 page sections.

### Classical redesign (v2, current)

The live page is the Classical redesign: a dark `#191715` hero with a gold-disc
portrait, Playfair Display italic accent, a six-cell services grid, sticky
experience entries, a core-stack band plus category rows for skills, a two-card
selected-work section (Home Board mobile app, THAARA studio site), and a dark
contact band with a mail-draft form. Motion (reveals, name rise, portrait
unmask, stat counters, progress bar, magnetic buttons) is the same inline IIFE
pattern, retuned for the gold palette and gated on `prefers-reduced-motion`.

### 2026 rebuild (v1, retired)

The page was then rebuilt around a single-column editorial layout: a sticky
reading-progress bar, section headings that unmask on scroll, animated stat
counters, magnetic buttons and a dark closing call-to-action.

The motion layer is plain DOM — an `IntersectionObserver` for reveals with a
scroll-position sweep as fallback, plus a set of timed catch-up passes so the
page always ends up fully revealed even if the observer never fires. Every
effect is gated on `prefers-reduced-motion`, which short-circuits straight to
the final state. `assets/site.js` was folded into the inline script and removed,
and the unused third Archivo subset was dropped.

## Content

The code in this repository is free to read and learn from. The written content,
resume, portrait and personal details are not licensed for reuse — please don't
republish them as your own.

---

<div align="center">

**Jerish David** · Data Analyst · Chennai, Tamil Nadu

[jerish.in](https://jerish.in) · [LinkedIn](https://linkedin.com/in/jerishdavid) · [jerishdavid23@gmail.com](mailto:jerishdavid23@gmail.com)

</div>
