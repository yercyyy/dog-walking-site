# Photos

The pictures on the site are placeholder drawings, not photos of real dogs. Replace them with your own.

## Where the files are

| File | Used for |
| --- | --- |
| `placeholder-hero.svg` | The big picture at the top of the page |
| `placeholder-walk.svg` | Gallery: daily walk |
| `placeholder-group.svg` | Gallery: group walk |
| `placeholder-puppy.svg` | Gallery: puppy visit |
| `placeholder-sitting.svg` | Gallery: pet sitting |
| `placeholder-park.svg` | Gallery: outdoors |
| `placeholder-portrait.svg` | Gallery: portrait |
| `favicon.svg` | The tiny icon on the browser tab |

## How to use a real photo

1. Copy a photo into this folder. JPG or PNG is fine. Example: `images/walk-1.jpg`.
2. Open `index.html` in a text editor.
3. Find the line that points at the drawing you want to replace. Search for `placeholder-walk.svg` (or whichever file you are replacing).
4. Change the `src` to your file name:

```html
<img src="images/walk-1.jpg" alt="A description of your real photo.">
```

5. Rewrite the `alt` text so it describes that photo. The alt text is what a screen reader reads, and it shows if the picture fails to load.
6. Save the file and refresh the browser.

You can delete a placeholder drawing after nothing in `index.html` points at it. Leave `favicon.svg` unless you want a different browser icon.

Use photos you took, or photos you have permission to use.
