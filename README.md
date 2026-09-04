# jerish.in

Personal site for Jerish David — Data Analyst and AI-augmented engineer.
Static, no framework, no build step. Deployed with GitHub Pages on the `main` branch.

## Structure

    index.html      the whole site (one file: markup, styles, script)
    404.html        error page
    assets/         portrait
    uploads/        resume download
    favicon.svg     icons
    apple-touch-icon.png
    og.png          social share image
    CNAME           jerish.in
    robots.txt
    sitemap.xml
    .nojekyll       serve files as-is

## Type

Playfair Display (display) and Montserrat (interface and body), loaded from Google Fonts.

## Contact form

The form posts to [Web3Forms](https://web3forms.com) — no server, no backend.
The access key lives in the hidden `access_key` input inside `#jd-form` in `index.html`.
To change the receiving address, create a new key at web3forms.com and replace that value.

## Deploying

Push to `main`. GitHub Pages rebuilds and serves jerish.in within a minute or two.
