# NDW - Florida

A one-page website for a dog walking business in Melbourne, Florida. It is plain HTML, CSS, and a little JavaScript. There is no build step and nothing to install. You can put it online for free with GitHub Pages.

Open `index.html` in a web browser to see the site.

Phone numbers, email addresses, and prices on the page are **placeholders**. Search this project for the word `PLACEHOLDER` and replace them before you share the link.

## What each file does

- `index.html` — the page itself: the words, the sections, and which pictures to show.
- `styles.css` — colors, spacing, and the phone layout. The color names are at the top of the file.
- `script.js` — the mobile menu, the larger photo view, and the contact form check. The form does not send email.
- `images/` — pictures. The files there now are drawings, not real photos. See `images/README.md`.
- `fonts/` — the Fraunces and Nunito typefaces. You can ignore this folder.
- `.nojekyll` — an empty file. It tells GitHub Pages to publish every file as-is. Leave it there.
- `README.md` — this guide.

## Look at the site on your computer

1. Find `index.html` in this folder.
2. Double-click it, or drag it into Chrome, Firefox, Safari, or Edge.
3. To see the phone layout, make the browser window narrow. In Chrome you can also right-click the page, choose **Inspect**, and click the phone-shaped icon.

## Put in your own words, prices, and contact details

Open `index.html` in any text editor (Notepad, TextEdit, VS Code, or the pencil icon on GitHub). Search for `PLACEHOLDER`.

- **Prices.** Each service shows `$XX`. Replace that with your real price, and remove the "placeholder" label when you do.
- **Phone.** Replace `(000) 000-0000`. Also change `tel:+10000000000` to your number. Digits only, with your country code. A US example looks like `tel:+13215551212`.
- **Email.** Replace `you@example.com` in both the link and the `mailto:` part. Then open `script.js` and change `CONTACT_EMAIL` at the top to the same address.
- **About.** Replace the dashed note with a few sentences about you. Do not leave the word "placeholder" on something you want customers to trust.
- **Service area.** The page says Melbourne, Florida. Add neighborhoods only if you really cover them.

Save the file and refresh the browser.

The contact form only checks that a name, email, service, and message are filled in. Then it stops. It does **not** deliver the message. Until you are ready for more, customers can use the phone and email links. If you later want the button to open the visitor's email app, the comments at the bottom of `script.js` show how.

## Swap in real photos

The gallery and the big picture at the top are drawings so the page is not empty.

1. Put your photo in the `images` folder. Example: `images/walk-1.jpg`.
2. In `index.html`, change `src="images/placeholder-walk.svg"` to `src="images/walk-1.jpg"`.
3. Change the `alt` text so it describes that photo.

`images/README.md` lists every picture and which part of the page uses it. Use photos you took or have permission to use.

## Turn on GitHub Pages

GitHub Pages turns this folder into a public website. The files need to be on the `main` branch, which is the usual branch after a pull request is merged.

1. On GitHub, open this repository: [yercyyy/dog-walking-site](https://github.com/yercyyy/dog-walking-site).
2. Click **Settings**.
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
5. Set the branch to **main** and the folder to **/ (root)**.
6. Click **Save**.

Wait a minute or two. GitHub will show a link near the top of the Pages settings. For this repository that address is:

https://yercyyy.github.io/dog-walking-site/

That link is the live site. When you change files on `main`, the site updates after a short wait.

If Pages offers **GitHub Actions** instead of a branch, switch **Source** back to **Deploy from a branch** so it serves this folder directly.
