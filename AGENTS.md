# AGENTS.md

Instructions for any Cursor agent working on this repository. Read this file before you change anything. The owner's short guide is `README.md`. This file is the operating manual.

## Hard rule: do not act on your own

Never make a change on your own initiative. Act only when the owner explicitly asks for a specific change, and only within that request.

No proactive fixes, refactors, cleanups, dependency updates, content updates, or "improvements" unless the owner asked for that exact thing. If you notice a problem, you may mention it. Do not change it until the owner says yes.

Every change still goes on a branch and a pull request against `main`. Never push straight to `main`. Nothing merges, and nothing goes live, without the owner's explicit approval.

## What this site is

NDW Florida is the one-page website for Neighborhood Dog Walkers in Melbourne, Florida.

- Public name on the page: Neighborhood Dog Walkers, and NDW Florida.
- City: Melbourne, Florida.
- Live site: https://ndwflorida.com
- Repo: `yercyyy/dog-walking-site` on GitHub.
- What they sell: 30-minute walks ($25), 1-hour walks ($45), group walks (from $10 per dog), pet sitting for dogs and cats ($15 per hour), and dog bathing ($20 per dog).
- Phone: 929-782-5530 (`tel:+19297825530`).
- Email: njahshaun@gmail.com.

Do not invent a street address, hours, zip code, or prices that are not already on the page.

## Stack and file layout

Plain HTML, CSS, and JavaScript. There is no build step, no package manager, and no framework.

| Path | What it is |
| --- | --- |
| `index.html` | The only page: words, prices, contact details, gallery, SEO tags. |
| `styles.css` | All styling. Color names are in `:root` at the top (`--ocean` is the header, `--pine` is the deep green). |
| `script.js` | Mobile menu, photo dialog, price-card call sheet, and contact form. |
| `images/` | Photos, WebP copies, short videos, posters, favicon, and decorative SVGs. See `images/README.md`. |
| `fonts/` | Self-hosted Poppins (`.woff2`). Leave this folder alone unless the typeface itself is the task. |
| `robots.txt` | Allows all crawlers and points at the sitemap. |
| `sitemap.xml` | One URL: `https://ndwflorida.com/`. |
| `CNAME` | One line: `ndwflorida.com`. |
| `.nojekyll` | Empty file. Tells GitHub Pages to publish every file as-is. Do not delete it. |
| `README.md` | Short guide written for the owner. |
| `AGENTS.md` | This file. |

## GitHub Pages

The live site is GitHub Pages from this repo.

- Source: **Deploy from a branch**, branch **main**, folder **/ (root)**.
- `CNAME` is what serves the site at ndwflorida.com. Do not change it unless the owner asks for a new domain.
- `.nojekyll` must stay. Without it, Pages may hide files that start with `_` or run Jekyll.

Merging into `main` is what makes a change live. A branch or an open pull request does not.

After a merge to `main`:

1. Wait about a minute.
2. Open https://ndwflorida.com and hard-refresh.
3. Confirm the change you merged is actually visible.
4. If the Pages source was ever switched, set it back to **Deploy from a branch**, **main**, **/ (root)**.

## Run it locally

From the repo root:

```bash
python3 -m http.server 8765
```

Open http://127.0.0.1:8765/

Opening `index.html` as a file shows most of the page. Use the local server when you check the gallery, videos, or the form.

## Workflow

The hard rule above comes first. Within a request the owner actually made:

- Start from a fresh `origin/main` (`git fetch origin main` first).
- Do the work on a new branch. Open a pull request against `main`.
- Never push straight to `main`. Never merge unless the owner explicitly says to merge.
- The owner confirms before anything goes live. Say that clearly in the pull request.
- Keep pull request descriptions in plain language: what changed, what the owner must do, and how you checked it.
- No code changes means no drive-by edits. If the task is docs, do not restyle the site.

## Conventions

Keep the visual design. Colors, type, spacing, and the beach layout stay as they are unless the owner asks for a new look. Change colors only in `:root`, and keep `<meta name="theme-color" content="#0e6e7a">` matched to the header (`--ocean` is `#0e6e7a`, not the footer pine `#143f3b`).

Images:

- Every photo has a JPG fallback (about 1200px wide), a full `.webp`, and a `-720.webp` for the grid.
- Gallery images use `<picture>`, `loading="lazy"`, and `decoding="async"`. The hero photo is not lazy. It is the first thing on the page.
- The large photo dialog uses the full WebP (`data-full` on the `<img>`). Do not bring back `data-caption`.
- Every photo has a short `alt` that describes that picture. Every video has an `aria-label` that describes that clip. Do not use "Dog photo" or "Dog video".
- Videos use `muted`, `playsinline`, `controls`, `preload="none"`, and a `-poster.jpg` so the file does not download until play.

Phone and email are written in `index.html` in these places, and they must stay in agreement:

- Contact cards `#site-phone` and `#site-email` (this is what `script.js` reads).
- Footer phone link.
- The `<noscript>` note under the form.
- The form's `mailto:` action.
- The `LocalBusiness` JSON-LD block in the page head.

Do not put a second copy of the address in `script.js`.

Price cards (`#services .price-row`):

- The service name is a real heading, not a link and not a fake button.
- The visible button text is exactly `Contact us`.
- Each button has an `aria-label` that names the plan (for example `Contact us about the 30-minute walk`).
- The button opens `#call-sheet` (the phone number and Call / Cancel). `script.js` fills that sheet from `#site-phone`.

SEO, and keep these in sync when the name, city, phone, email, or hero photo changes:

- `<title>`, meta description, and `<link rel="canonical" href="https://ndwflorida.com/">`.
- Open Graph and Twitter card tags, including `og:image` (absolute URL of `images/walk-on-the-path.jpg`).
- `theme-color`.
- The `LocalBusiness` JSON-LD. Use only facts already on the site. Do not add a street, hours, or map pin.
- `robots.txt` and `sitemap.xml` (the only URL is `https://ndwflorida.com/`). Update `lastmod` when the page content changes.

## Formspree

The form does not send mail by itself until a real Formspree id is set.

In `index.html`:

```html
<meta name="ndw-formspree-id" content="">
```

Leave `content` empty until the owner creates a form at https://formspree.io and gives you the id. The id is only the characters after `https://formspree.io/f/`. Do not invent one. A full Formspree URL in that attribute is accepted by `script.js`, but the owner should paste the id alone.

While it is empty:

- Submit opens the visitor's email app with the note addressed to njahshaun@gmail.com.
- The phone and email stay visible on the page, and the status message repeats them.

After a real id is saved and merged:

- Submit posts to `https://formspree.io/f/<id>`.
- If that request fails, the page opens the email app and still shows the phone and email.

## Copy

Never rewrite the owner's wording without asking. Prices, About paragraphs, and service descriptions stay as written. Fixing a typo the owner asked for is fine. "Improving" a sentence is not.

Open questions. Do not change these until the owner decides:

- About: "the occasional street rat a dog would love to chase."
- About: "scared or aggressive" dogs.
- Group walks: "Varies" / "by how many dogs".

## Pre-merge checklist

Before you say a site change is ready:

- Serve the site locally and look at it at a desktop width and at a phone width (about 390px).
- Click through the menu, a price-card **Contact us** button (call sheet opens and Cancel closes it), a gallery photo (large view opens and closes), and a video poster (the clip is not a blank box).
- Submit the contact form empty (field errors, nothing sent) and filled (email-app message, or a real send only if an id is set).
- No broken images, fonts, or other files. No console errors.
- Phone, email, and city still match in the contact cards, footer, noscript note, mailto action, and JSON-LD.
- If you touched copy, you did not silently rewrite the owner.

## Owner preferences

- Answer the owner in short, simple sentences. Skip jargon unless they ask how something works.
- Do not merge, and do not push to `main`, until they say so.
- Do not delete or merge these remote branches unless the owner asks. They are not on `main` yet: `cursor/owner-content-81ff`, `cursor/gallery-no-text-81ff`, `cursor/custom-domain-81ff`.

## Branches that are not live

These remote branches still exist. Leave them alone unless the owner asks to merge or delete them:

- `cursor/owner-content-81ff`
- `cursor/gallery-no-text-81ff`
- `cursor/custom-domain-81ff`
