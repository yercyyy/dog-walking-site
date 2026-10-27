# NDW Florida

A one-page website for Neighborhood Dog Walkers in Melbourne, Florida. It is plain HTML, CSS, and a little JavaScript. There is no build step.

Open `index.html` in a web browser to see the site. The live site is [https://ndwflorida.com](https://ndwflorida.com). A change shows up there after it is merged into `main`.

## What each file does

- `index.html` — the page: words, prices, contact details, and the gallery.
- `styles.css` — colors, spacing, and the phone layout. Color names are at the top.
- `script.js` — the mobile menu, the larger photo view, the price-card call sheet, and the contact form. It reads the phone and email from the contact cards. It does not keep its own copy.
- `images/` — photos, short videos, and the browser icon. See `images/README.md`.
- `fonts/` — the Poppins typeface. You can ignore this folder.
- `robots.txt` and `sitemap.xml` — tell search engines the site is public and that the only page is the home page.
- `.nojekyll` — an empty file. It tells GitHub Pages to publish every file as-is. Leave it there.
- `CNAME` — one line, `ndwflorida.com`. It tells GitHub Pages to serve this site on that domain.
- `README.md` — this guide.

## Change a price or a sentence

Open `index.html` in a text editor. The prices are in the Services section. The About Us text is three paragraphs.

The phone number is `929-782-5530` (`tel:+19297825530`) and the email is `njahshaun@gmail.com`. They are written in a few places that have to stay in the file itself (so the page still works with JavaScript off, and so Google can read them):

- the two contact cards (`site-phone` and `site-email`)
- the footer phone link
- the note inside `<noscript>` under the form
- the form's `mailto:` action
- the `LocalBusiness` block in the page head

`script.js` copies the cards into the call sheet and the form. You do not edit the phone or email in `script.js`.

## Contact form

The form checks the fields in the browser. Until a Formspree id is set, it opens the visitor's email app, and the phone number and email stay on the page.

In `index.html`, find the tag `ndw-formspree-id`. Leave `content=""` empty for now.

When you want messages to send without an email app:

1. Create a form at [https://formspree.io](https://formspree.io).
2. Copy only the form id (the letters and numbers after `https://formspree.io/f/`).
3. Paste that id into `content=""` on the `ndw-formspree-id` tag.
4. Save, and merge to `main`.

Do not invent an id. An empty value is the safe fallback. If the form service does not answer, the page opens the email app and still shows the phone and email.

## Add or replace a photo

1. Put the photo in the `images` folder as a JPG, and add a WebP copy with the same name (plus a `-720.webp` copy about 720 pixels wide, for phones and the grid).
2. In the gallery in `index.html`, copy one of the existing photo blocks. Change the file names and write a short `alt` description of that photo.
3. Save and refresh the browser.

Videos use a `<video>` tag with `muted`, `playsinline`, `controls`, `preload="none"`, and a `poster` image. The poster is a still frame so the clip does not download until someone presses play.

## GitHub Pages

This repository already publishes the `main` branch from the folder `/` (root). After a pull request is merged, wait a minute and reload:

https://ndwflorida.com

If the Pages source was changed, set it back to **Deploy from a branch**, branch **main**, folder **/ (root)**.
