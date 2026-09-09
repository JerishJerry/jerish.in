# jerish.in

Personal site for Jerish David — Data Analyst and AI-augmented engineer.

**Live:** [jerish.in](https://jerish.in)

A hand-written static site: one HTML file, no framework, no dependencies, no build step. Deployed by GitHub Pages from `main`.

---

## Stack

| | |
|---|---|
| Markup / styles / behaviour | One `index.html` — 623 lines, ~64 KB |
| CSS | Inline styles plus a small `<style>` block for state and hover rules. No preprocessor, no utility framework |
| JavaScript | 215 lines of vanilla ES5 in a single IIFE. No bundler, no polyfills |
| Type | Playfair Display (display) and Montserrat (body/UI), from Google Fonts |
| Forms | [Web3Forms](https://web3forms.com) — no backend |
| Hosting | GitHub Pages, custom domain via `CNAME` |

There is no `package.json` and nothing to install. Open `index.html` in a browser and it runs.

## Layout

```
index.html                 the entire site — markup, styles, script
404.html                   error page, same design language
assets/portrait.webp       hero portrait (560×840)
uploads/                   résumé download
favicon.svg                icon
apple-touch-icon.png       iOS home-screen icon
og.png                     social share image
CNAME                      jerish.in
robots.txt  sitemap.xml    indexing
.nojekyll                  serve files as-is, skip Jekyll processing
```

## Page structure

Five sections, numbered in the design and addressable by anchor:

`#top` · `#services` (01) · `#experience` (02) · `#skills` (03) · `#work` (04) · `#contact` (05)

## Behaviour

All JavaScript is driven by `data-` attributes rather than classes, so behaviour can be attached in markup without touching the script:

| Attribute | Effect |
|---|---|
| `data-reveal` / `data-reveal-delay` | Fade-and-rise on scroll, via `IntersectionObserver`. Optional stagger in ms |
| `data-rise` / `data-unmask` | Clip-path reveals for headings and the portrait |
| `data-count` / `data-prefix` / `data-suffix` | Animated stat numerals |
| `data-magnetic` | Cursor-follow on hover — gated behind `(hover: hover)`, so it never fires on touch |
| `data-progress` | Scroll-progress bar in the nav |
| `data-navtoggle` / `data-menu` / `data-menuitem` | Mobile menu |
| `data-navlinks` / `data-navlink` | Desktop nav and scrollspy |

## Responsive system

Four media queries total. One breakpoint governs the whole mobile/desktop split:

| Query | Purpose |
|---|---|
| `max-width: 819px` | Hide desktop nav links, show the hamburger, stack `.splitrow` rows, drop the nav's `backdrop-filter` |
| `min-width: 820px` | Hide the mobile menu overlay entirely |
| `max-width: 479px` | Stack the contact list from two columns to one |
| `prefers-reduced-motion: reduce` | Disable smooth scrolling and menu/burger transitions |

Everything else is fluid — `clamp()` for type and spacing, and auto-fitting grids.

**Grid idiom.** Every responsive grid uses:

```css
grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
```

The `min(100%, …)` wrapper is load-bearing. A bare `minmax(320px, 1fr)` cannot shrink below 320px and overflows the viewport on a narrow phone. Keep the wrapper on any grid you add.

## Accessibility

- Mobile menu: `aria-expanded` / `aria-controls`, focus moves to the first item on open and returns to the toggle on close, Tab is trapped across the toggle and menu items with both wrap edges handled, Escape closes, body scroll locks while open.
- Interactive controls meet the 44px minimum touch target. The contact links use an `::after` overlay to extend the hit area without displacing their underline.
- `prefers-reduced-motion` is honoured throughout.
- The viewport meta tag deliberately omits `maximum-scale` so pinch-zoom keeps working.

## Performance notes

- The Google Fonts request lists only the five faces actually used (Playfair 400/600/italic-400, Montserrat 400/600). **If you introduce a new weight in CSS, add it to the font URL** or it will silently fall back.
- The scroll handler is batched into a single `requestAnimationFrame` — reads and writes are grouped to avoid forcing synchronous layout twice per event.
- `sweep()` retires itself once every reveal and counter has fired.
- The nav's `backdrop-filter` is dropped below 820px, where re-compositing a blurred backdrop every frame is expensive. The background is 92% opaque, so it looks the same.
- The portrait carries intrinsic `width`/`height` so its box is reserved before the image loads.

## Maintenance notes

Non-obvious constraints. Each of these was a real bug:

1. **`sweep()` must stay in the scroll loop.** The stat counters carry `data-count`, not `data-reveal`, and the `IntersectionObserver` only observes `data-reveal`. `sweep()` is their only trigger — removing it as "redundant" stops the counters animating.
2. **Form controls must stay at 16px or larger.** iOS Safari auto-zooms any focused input below 16px and does not zoom back out on blur, stranding the visitor on a zoomed, horizontally scrolling page. Fix the font size; never add `maximum-scale=1` to the viewport tag.
3. **`scroll-padding-top` must exceed the nav height.** The nav occupies 69px (68px + border). Without the 80px `scroll-padding-top` on `html`, every anchor jump lands underneath it and the target heading is clipped.
4. **819/820 is a shared boundary.** The nav links, the hamburger, `.splitrow` stacking and the nav background all switch there. Changing one without the others leaves a width where the layout is desktop but the navigation is missing.
5. **The menu overlay must remain the first child of `<nav>`.** The nav bar paints above it by DOM order, which is what keeps the toggle usable as the close button rather than being covered by its own menu.

## Contact form

Posts to Web3Forms — no server, no backend. The public access key lives in the hidden `access_key` input inside `#jd-form` in `index.html`. To change the receiving address, create a new key at [web3forms.com](https://web3forms.com) and replace that value. A hidden `botcheck` honeypot field guards against basic spam.

## Local preview

No tooling required. Open the file directly:

```bash
start index.html
```

Anchor links, the mobile menu and the contact form all work from `file://`. To test over HTTP instead:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`. Use your browser's device toolbar to check 320px, 390px, 819px and 820px — the widths where the layout changes.

## Deploying

Push to `main`. GitHub Pages rebuilds and serves jerish.in within a minute or two. Bump `<lastmod>` in `sitemap.xml` when content changes materially.
