# jerish.in

Personal portfolio site for **Jerish David — Data Analyst**.

### [jerish.in →](https://jerish.in)

![Jerish David — Data Analyst](og.png)

---

## About

Single-page portfolio: services, experience, technical skills, selected work
and contact — plus a downloadable resume.

No framework, no bundler, no build step. Plain static HTML/CSS with one small
inline script (scroll reveals, stat counters, progress bar, contact form).
Pushing to `main` publishes via GitHub Pages.

## Stack

- **HTML** — one document, all content inline, no client-side rendering
- **CSS** — design tokens in `:root`, component styles in one `<style>` block
- **Type** — [Playfair Display](https://fonts.google.com/specimen/Playfair+Display)
  + [Montserrat](https://fonts.google.com/specimen/Montserrat) via Google Fonts
  (the only third-party request)
- **Images** — self-hosted WebP portrait, SVG favicon, PNG social card
- **JS** — one inline IIFE, no dependencies; honours `prefers-reduced-motion`
- **SEO** — canonical URL, meta description, Open Graph + Twitter cards,
  JSON-LD `Person` schema, sitemap, `robots.txt`

## Structure

```
.
├── index.html      entire page — markup, tokens, styles, script
├── 404.html        not-found page, styled to match
├── assets/
│   └── portrait.webp
├── uploads/        downloadable resume (.docx)
├── og.png          1200×630 social preview card
├── favicon.svg     JD monogram
├── apple-touch-icon.png
├── CNAME           custom domain (survives redeploys — don't delete)
├── .nojekyll       serve as-is, skip Jekyll
├── robots.txt
└── sitemap.xml
```

## Run locally

Nothing to install — serve over HTTP (`file://` breaks relative paths):

```bash
python3 -m http.server 4173
```

Then visit <http://localhost:4173>. Edit `index.html` directly.

## Deploy

```bash
git push origin main
```

Pages serves `main` at the repo root. `jerish.in` is registered at GoDaddy
with `A` records to GitHub Pages and a `www` CNAME — don't re-enable GoDaddy
Parking/Forwarding, it overwrites the records and takes the site offline.

## Contact form

The inline script opens the visitor's mail client with the message prefilled —
no backend, no account, nothing leaves their machine until they press send.
Email, phone and LinkedIn are also plain links, so the form is never the only
way to reply.

## Content

Code is free to read and learn from. The writing, resume, portrait and personal
details are not licensed for reuse — please don't republish them as your own.

---

**Jerish David** · Data Analyst · Chennai, Tamil Nadu

[jerish.in](https://jerish.in) · [LinkedIn](https://linkedin.com/in/jerishdavid) · [jerishdavid23@gmail.com](mailto:jerishdavid23@gmail.com)
