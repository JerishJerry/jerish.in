<div align="center">

# jerish.in

**Personal portfolio site for Jerish David — Data Analyst**

[![live](https://img.shields.io/badge/live-jerish.in-ec3013?style=flat-square)](https://jerish.in)
[![pages](https://img.shields.io/github/deployments/JerishJerry/jerish.in/github-pages?label=pages&style=flat-square)](https://github.com/JerishJerry/jerish.in/deployments)
[![dependencies](https://img.shields.io/badge/dependencies-none-2ea44f?style=flat-square)](#tech-stack)
[![last commit](https://img.shields.io/github/last-commit/JerishJerry/jerish.in?style=flat-square)](https://github.com/JerishJerry/jerish.in/commits/main)

### [jerish.in →](https://jerish.in)

![Jerish David — Data Analyst](og.png)

</div>

---

## Overview

A single-page portfolio covering professional summary, experience, technical
skills, education and contact — plus a downloadable resume.

Built as plain static HTML and CSS. No framework, no bundler, no build step, no
package manager, and no third-party scripts. Deploys on push to `main` via
GitHub Pages.

| | |
|---|---|
| **First visit** | 67 KB across 4 requests |
| **JavaScript** | 2 KB gzipped, one file, for the contact form only |
| **Third-party requests** | none — fonts, images and styles are all self-hosted |
| **Rendering** | no client-side rendering; full content in the HTML response |
| **Accessibility** | semantic landmarks, alt text, visible focus rings, `prefers-reduced-motion` honoured |
| **SEO** | canonical URL, meta description, Open Graph + Twitter cards, JSON-LD `Person` schema, sitemap |

## Tech stack

Deliberately minimal, because a portfolio should not need a toolchain to stay
online for years:

- **HTML** — one prerendered document, content inline
- **CSS** — a design-token layer (`:root` custom properties for colour ramps,
  type scale and spacing) plus component classes, in a `<style>` block
- **Type** — [Archivo](https://fonts.google.com/specimen/Archivo), self-hosted
  as `woff2` subsets split by `unicode-range`, so a visitor downloads only the
  glyph ranges the page actually uses
- **Images** — WebP, with `width`/`height` set to reserve layout space
- **JavaScript** — `assets/site.js` only, for contact-form delivery

## Project structure

```
.
├── index.html      entire page — markup, design tokens, component CSS
├── 404.html        not-found page, styled to match
├── assets/
│   ├── site.js     contact-form delivery (the only JavaScript on the site)
│   ├── *.woff2     Archivo subsets
│   └── *.webp      portrait
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

`assets/site.js` handles submission and supports two delivery modes.

**`mailto:` — the current default.** Opens the visitor's mail client with the
message prefilled. No third-party service, no account, and no visitor data
leaves their machine until they press send.

**Background POST.** For a form that submits without leaving the page, get a free
access key from [Web3Forms](https://web3forms.com) and add it to the `<form>`
tag in `index.html`:

```html
<form data-access-key="your-key-here" style="...">
```

`site.js` detects the key and switches to a background POST, falling back to
`mailto:` if the request fails.

Either way the form validates required fields, carries a honeypot field for
bots, and reports status inline. Email, phone and LinkedIn are also listed as
plain links, so the form is never the only route to a reply.

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

## Content

The code in this repository is free to read and learn from. The written content,
resume, portrait and personal details are not licensed for reuse — please don't
republish them as your own.

---

<div align="center">

**Jerish David** · Data Analyst · Chennai, Tamil Nadu

[jerish.in](https://jerish.in) · [LinkedIn](https://linkedin.com/in/jerishdavid) · [jerishdavid23@gmail.com](mailto:jerishdavid23@gmail.com)

</div>
