# NDW Florida

A one-page website for Neighborhood Dog Walkers in Melbourne, Florida. It is plain HTML, CSS, and a little JavaScript. There is no build step.

Open `index.html` in a web browser to see the site. The live site is [https://ndwflorida.com](https://ndwflorida.com). A change shows up there after it is merged into `main`.

## What each file does

- `index.html` — the page: words, prices, contact details, and the gallery.
- `styles.css` — colors, spacing, and the phone layout. Color names are at the top.
- `script.js` — the mobile menu, the larger photo view, and the contact form. The form opens the visitor's email app with a message to `njahshaun@gmail.com`.
- `images/` — photos, short videos, and the browser icon. See `images/README.md`.
- `fonts/` — the Poppins typeface. You can ignore this folder.
- `.nojekyll` — an empty file. It tells GitHub Pages to publish every file as-is. Leave it there.
- `CNAME` — one line, `ndwflorida.com`. It tells GitHub Pages to serve this site on that domain.
- `README.md` — this guide.

## Change a price or a sentence

Open `index.html` in a text editor. The prices are in the Services section. The About Us text is three paragraphs. The phone number is `929-782-5530` (`tel:+19297825530`) and the email is `njahshaun@gmail.com`. The same email is at the top of `script.js` as `CONTACT_EMAIL`.

## Add or replace a photo

1. Put the photo in the `images` folder. JPG is fine.
2. In the gallery in `index.html`, copy one of the existing photo blocks and change `src` and the `alt` text.
3. Save and refresh the browser.

Videos use a `<video>` tag with `muted`, `playsinline`, and `controls`.

## GitHub Pages

This repository already publishes the `main` branch from the folder `/` (root). After a pull request is merged, wait a minute and reload:

https://ndwflorida.com

If the Pages source was changed, set it back to **Deploy from a branch**, branch **main**, folder **/ (root)**.
