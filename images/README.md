# Photos and videos

- `favicon.svg` is the small icon on the browser tab.
- Each walk photo has a JPG (the fallback, about 1200 pixels wide) and two WebP files: the full photo, and a `-720.webp` copy for the grid.
- The MP4 files are short clips. Each one has a `-poster.jpg` still frame. In `index.html` the video uses `muted`, `playsinline`, `controls`, `preload="none"`, and `poster`.

The hero photo is `walk-on-the-path`. To swap it, change that image in the hero in `index.html` and keep a short `alt` description.
