# jerish.in — personal site

Single-page portfolio for **Jerish David**, Data Analyst. Static HTML, no build
step, no framework, no runtime dependencies. Served by GitHub Pages at
<https://jerish.in>.

## Layout

```
index.html      the whole page (prerendered, self-contained markup + CSS)
404.html        not-found page, styled to match
assets/
  site.js       contact-form delivery (the only JavaScript on the site)
  *.woff2       Archivo subsets, self-hosted
  *.webp        portrait
uploads/        downloadable resume
CNAME           custom domain for GitHub Pages
og.png          1200x630 social preview card
favicon.svg     JD monogram
robots.txt, sitemap.xml
```

## Editing

`index.html` is plain HTML with inline styles and a `<style>` block of design
tokens — edit it directly. Commits to `main` publish automatically.

## The contact form

`assets/site.js` handles submission. It has two modes:

- **`mailto:` (current default)** — opens the visitor's mail client with the
  message prefilled. No third-party service, no account, nothing leaves the
  visitor's machine until they press send.
- **Background POST** — for a form that submits without leaving the page.
  Get a free access key at <https://web3forms.com> (it is emailed to you), then
  add it to the `<form>` tag in `index.html`:

  ```html
  <form data-access-key="your-key-here" style="...">
  ```

  `site.js` detects the key and switches to a real background POST, with the
  `mailto:` path as the fallback if the request fails.

The form validates required fields, has a honeypot for bots, and shows status
inline. Contact details are also listed as plain links, so the form is never the
only way to get in touch.

## Provenance

The page was exported from a design tool as a single self-extracting bundle that
unpacked itself with JavaScript at runtime. For hosting it was prerendered to
static HTML: the editor runtime (~135KB of JS), a React CDN dependency, the
drag-and-drop image widget and the editor-only CSS were all removed, the
`<image-slot>` became a real `<img>` with alt text, and SEO/social metadata was
added. Rendered output was verified identical — same text, same document
height, same geometry for all 16 page sections.
