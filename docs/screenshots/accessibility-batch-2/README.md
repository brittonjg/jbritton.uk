# Accessibility batch 2: before and after

Rendered from fixture builds of `main` (left) and this branch (right) with Playwright (Chromium), using the DevTools emulations each fix is checked with. The draft post `hello-world` was published for the build only, so the Writing page has a card.

| Image | Emulation | What it shows |
|---|---|---|
| `1-large-text-700-header-open.png` | Default font size 24px ("Very large"), window 700px, menu opened then closed | Before, the nav stays open and the menu button does nothing; after, it opens and closes. |
| `1-large-text-700-rail.png` | Same, scrolled to the timeline | Before, the rail sits 186px away from the dots; after, it runs through them. |
| `2-forced-colors-dark-experience.png`, `2-forced-colors-light-experience.png` | `forced-colors: active` | After: current-page underline, the rail and its fill, reached dots, bullet dots and button edges are drawn with system colours. |
| `3-print-cv-dark.png` | Print media, dark theme | Before, pale grey text on white; after, the light palette. |
| `4-post-card-focus.png` | Keyboard focus on the first post card | One focus ring around the whole card, which lifts as it does on hover. The link's accessible name is now just the title. |
| `5-find-hidden-highlight.png` | Text-fragment link to a collapsed highlight | After, the list opens and the button reads "Show less". |

At default settings, 20 page × width (390, 1280) × theme combinations are pixel-identical before and after.
