# CLAUDE.md — jbritton.uk

## Project

Personal website and blog for James Britton, Head of Engineering at Cuvva. Live at https://jbritton.uk.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, and MDX. **Fully static** — no server, no database, no CMS. Deployed to Cloudflare Pages.

## Commands

```bash
npm run dev     # Dev server on localhost:3000
npm run build   # Production build → out/ directory
npm run lint    # ESLint
```

There are no tests. Verify changes by running `npm run build` and checking the output.

## Architecture

### Static Export

The site uses `output: "export"` in `next.config.ts`. This means:

- **No API routes** — `src/app/api/` does not exist and must not be created
- **No server actions** — no `"use server"` directives
- **No dynamic rendering** — everything is prerendered at build time
- **No `getServerSideProps`** — this is App Router, use `generateStaticParams()` for dynamic routes
- `sitemap.ts` requires `export const dynamic = "force-static"` to work with static export

### App Router

- Pages are in `src/app/` using the Next.js 15 App Router convention
- NOT the Pages Router (`pages/` directory does not exist)
- Dynamic route params in Next.js 15 are `Promise<{ slug: string }>` — must be awaited

### Server vs Client Components

- **Default**: All components are server components (no directive needed)
- **Add `"use client"` only when** the component uses:
  - React hooks (`useState`, `useEffect`, `usePathname`, etc.)
  - Browser APIs (`window`, `document`, `localStorage`)
  - Framer Motion (`motion.*` components)
  - next-themes (`useTheme` hook)
- Client components: `Header.tsx`, `AnimatedSection.tsx`, `ThemeToggle.tsx`, `experience/Duration.tsx`, `experience/HighlightList.tsx`, `experience/ExperienceTimeline.tsx`

## Styling

### Tailwind v4 — No Config File

There is **no `tailwind.config.js` or `tailwind.config.ts`**. Tailwind v4 is configured entirely in CSS:

- `src/styles/globals.css` uses `@theme { }` to define design tokens
- `@plugin "@tailwindcss/typography"` enables prose styling
- `@custom-variant dark (&:where(.dark, .dark *))` enables dark mode

### Colour Tokens

Always use the semantic colour tokens, never raw hex values. `globals.css` is the only file with colour values (plus `src/lib/tokens.ts`, a light-theme mirror for the build-time share image).

| Token | Usage |
|---|---|
| `bg-background` | Page background |
| `bg-surface` | Cards, header |
| `border-border` | Decorative dividers only |
| `border-border-strong` | Edges that must pass 3:1 (empty-state outline) |
| `border-border-control` | Secondary button edge (soft amber in dark mode) |
| `border-border-control-inverse` | Secondary button on the contact band |
| `text-text-primary` | Headings, body |
| `text-text-secondary` | Supporting copy |
| `text-text-tertiary` | Dates, meta |
| `text-accent` / `bg-accent` | Accent for any **text**: links, active nav, company names, primary button fill |
| `text-accent-hover` / `bg-accent-hover` | Hover and pressed |
| `bg-accent-decor` / `border-accent-decor` | Non-text marks only (dots, rings, rails, underlines), never text |
| `bg-accent-subtle` | Tag fill, icon-button hover tile |
| `text-on-accent-subtle` | Text on `bg-accent-subtle` |
| `text-on-accent` | Text on `bg-accent` |
| `bg-disabled-surface` / `text-disabled-text` | Disabled buttons |
| `bg-inverse-surface`, `text-inverse-text`, `text-inverse-text-secondary` | Contact band (dark in both themes) |
| `bg-inverse-accent`, `bg-inverse-accent-hover`, `text-on-inverse-accent` | Primary button on the contact band (`<Button tone="inverse">`) |

These switch between light and dark mode via CSS variables. Every text token meets 4.5:1 on `background` and `surface` in both themes; control edges, rails and icons meet 3:1. Check with a contrast calculation before changing a value.

### Other Tokens

- **Radius**: `rounded-sm` 6px (link focus outlines, skip link), `rounded-md` 12px (buttons, icon tiles), `rounded-lg` 16px (cards, panels, contact band), `rounded-full` (tags, avatar, dots).
- **Shadows**: `shadow-card` (every card), `shadow-raised` (post card hover, open mobile menu), `shadow-header` (scrolled header), `shadow-avatar`, `shadow-control` (none in light, amber glow in dark), `shadow-control-inverse`.
- **Spacing**: 4px base. Padding, margin and gap stay on 1 2 3 4 5 6 7 8 10 12 16 24 (4–96px). No `0.5`, `1.5`, `2.5` or `3.5` steps.
- **Layout**: `max-w-reading` 768px (`Container` default), `max-w-wide` 1040px (`<Container width="wide">`, Experience page), header `h-17` (68px), avatar 160px (144px on phones), date rail 104px (`grid-cols-entry`). Every interactive element is at least 44×44px (`min-h-11`, `size-11`; inline links use the `tap-target` utility).
- **Motion**: `duration-fast` 150ms (hover, colour, press, arrow nudge), `duration-base` 250ms (opening things, theme crossfade, header shadow), `duration-slow` 400ms (things appearing), `ease-standard` for everything (also the default for `transition`).

### Type Styles

DM Serif Display styles are paired with `font-display`: `text-display` (60/60, −0.5px), `text-heading-1` (48/52), `text-heading-2` (36/40), `text-heading-section` (32/37), `text-title-post` (24/29), `text-mark` (22/28).

Quicksand styles carry their own weight: `text-heading-3` (20/28, 700), `text-title` (16/22, 700), `text-body-large` (18/30, 500), `text-body` (16/26, 500, the body default), `text-label` (15/22, 600), `text-nav` (15/20, 600), `text-button` (15/20, 700), `text-small` (14/22, 500), `text-meta` (14/22, 600, use with `text-text-tertiary`), `text-tag` (12/16, 600). Section labels use the `eyebrow` utility. Never use Quicksand 400 at 14px or smaller.

### Motion Rules

- Animate only `opacity` and `transform` (plus grid-row height for panels that open).
- Entrances play once; nothing loops (the optional "Currently" dot pulse is off by default).
- All movement sits inside `@media (prefers-reduced-motion: no-preference)` or is removed by the reduced-motion block in `globals.css`.
- Content must be visible if an animation never runs: hidden starting states are added by script, never in the markup.

### Dark Mode

Managed by `next-themes` with class strategy. The `.dark` class on `<html>` overrides CSS variables. System preference detection is enabled. No manual dark: prefixes needed — the CSS variable approach handles it.

### Typography

- Font: **Quicksand** (self-hosted via `next/font/local`, 5 weights: 300–700)
- Blog prose uses `@tailwindcss/typography` with `prose prose-neutral dark:prose-invert`
- Prose links styled with `prose-a:text-accent prose-a:no-underline hover:prose-a:text-accent-hover`

### Print Styles

`@media print` rules in `globals.css` hide the header, footer, and `.no-print` elements. Used for the CV page.

## Component Conventions

- **Filenames**: PascalCase (`PostCard.tsx`, `AnimatedSection.tsx`)
- **Organisation**: Group by feature (`blog/`, `experience/`, `cv/`, `home/`, `layout/`, `ui/`)
- **Props interfaces**: Define inline in the component file. Only use `src/types/` for interfaces shared across multiple files.
- **Icons**: Inline SVG elements — do not add icon libraries (Lucide, Heroicons, etc.)
- **Animations**: CSS only (keyframes and classes in `globals.css`). Use the `AnimatedSection` wrapper for the scroll-triggered section reveal. Framer Motion is not installed.
- **Layout wrapping**: Use `Container` component (`max-w-reading px-6`, or `width="wide"`) for page content width
- **Names**: components and their CSS class names match (`Header` → `.header`, `MobileMenu` → `.mobile-menu`, `SkipLink` → `.skip-link`, and so on)

### Key Reusable Components

- `Container` — max-width content wrapper, used on every page
- `SkipLink` — first focusable element, jumps to `<main id="main-content">`
- `Header` + `MobileMenu` — one copy of the nav; under 640px it collapses into a grid-row panel. `is-scrolled` adds `shadow-header` past 8px
- `Footer` — © year, then text links to every social profile
- `Button` — primary / secondary, `tone="inverse"` for the contact band, with `disabled` and `loading` states (`ui/Button.tsx`)
- `TextLink` — accent "→" link with the arrow nudge
- `Tag` — `bg-accent-subtle text-on-accent-subtle` pill
- `SectionHeader` — eyebrow plus optional section title
- `SocialLinks` — icon row (Last.fm is footer-only, flagged `footerOnly` in `constants.ts`)
- `ThemeToggle` — label names the theme it switches to; View Transition crossfade
- `AnimatedSection` — section reveal (fade and rise 8px, once)
- `Hero`, `TimelineRow`, `ContactBand` — homepage pieces
- `RoleCard` — role card (not a link, never lifts) used by the Experience page and the homepage "Currently" section
- `ExperienceTimeline` + `ExperienceEntry` — Experience page rail that draws with scroll (`--rail-fill`)
- `PostCard` — blog post preview; the only card that lifts on hover

## Content System

### Blog Posts

- Location: `src/content/blog/*.mdx`
- Parsed by: `src/lib/blog.ts` using `gray-matter`
- Rendered by: `next-mdx-remote/rsc` with `remarkGfm`
- Custom MDX components: `src/components/blog/mdx/index.ts` (currently exports `Callout`)

Frontmatter schema:
```yaml
title: string        # Required
date: string         # Required — YYYY-MM-DD, used for sorting
excerpt: string      # Required — shown in post cards and meta tags
tags: string[]       # Required — rendered as Tag pills
published: boolean   # Required — false = draft, excluded from build and sitemap
coverImage?: string  # Optional — path relative to /public/images/blog/
```

Reading time is calculated automatically (200 words/minute) — do not set it in frontmatter.

### Experience Data

- Location: `src/content/experience.json`
- Types: `src/types/experience.ts` (Role, Company, Education, ExperienceData)
- Loaded by: `src/lib/experience.ts`
- Used by: `/experience` page (timeline), `/cv` page (resume) and the homepage ("Currently" and "Career at a glance")
- Date helpers live in `src/lib/dates.ts` (no data import, so safe for client components). "Present" durations are recalculated in the browser by `Duration.tsx`, because the static build would otherwise freeze them

### Constants

`src/lib/constants.ts` contains:
- `siteConfig` — name, title, description, URL
- `socialLinks` — array of { name, url, icon } for LinkedIn, GitHub, Instagram, Last.fm
- `navItems` — array of { label, href } for navigation

## Known Quirks

1. **Static sitemap**: `src/app/sitemap.ts` must export `const dynamic = "force-static"` or the build fails with static export
2. **Async params**: Next.js 15 blog route uses `params: Promise<{ slug: string }>` — must `await params` before accessing `.slug`
3. **Post type cast**: In `blog.ts`, the `.filter()` result uses `as Post[]` because `readingTime` is optional in `Frontmatter` but always set during mapping
4. **Font loading**: Quicksand is loaded via `next/font/local` with explicit paths to 5 `.ttf` files in `public/fonts/quicksand/`
5. **Output tracing**: `outputFileTracingRoot: __dirname` in `next.config.ts` silences a workspace root warning
6. **Share image**: `src/app/opengraph-image.tsx` renders the 1200×630 PNG at build time. Next.js writes it without a file extension, so `public/_headers` sets its `Content-Type` for Cloudflare
7. **Substack RSS**: `src/lib/rss.ts` is a stub — `rss-parser` is installed but the integration is commented out. Set `SUBSTACK_URL` and uncomment to activate.

## Do Not

- Add API routes or server actions — this is a static export
- Use `getServerSideProps` or `getStaticProps` — this is App Router (use `generateStaticParams`)
- Import from a `tailwind.config` file — it doesn't exist; Tailwind v4 uses `@theme` in CSS
- Add external icon libraries — keep SVGs inline for zero-dependency icons
- Add a database or CMS — content is file-based by design
- Use raw hex colours in components — use the semantic tokens (`text-accent`, `bg-surface`, etc.)
- Set `readingTime` in blog frontmatter — it's calculated automatically by `getReadingTime()`

## File Quick Reference

| Need to... | Look at... |
|---|---|
| Add a page | `src/app/` — create a directory with `page.tsx` |
| Add a component | `src/components/` — pick the right feature directory |
| Change site metadata | `src/lib/constants.ts` → `siteConfig` |
| Change nav links | `src/lib/constants.ts` → `navItems` |
| Change social links | `src/lib/constants.ts` → `socialLinks` |
| Change colours | `src/styles/globals.css` → `@theme` block + `.dark` overrides |
| Add a blog post | `src/content/blog/` — new `.mdx` file with frontmatter |
| Add an MDX component | `src/components/blog/mdx/` — create component, add to `index.ts` |
| Update experience | `src/content/experience.json` |
| Update CV PDF | Replace `public/pdf/JBrittonCV.pdf` |
