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
- Client components: `Header.tsx`, `Hero.tsx`, `AnimatedSection.tsx`, `ThemeToggle.tsx`

## Styling

### Tailwind v4 — No Config File

There is **no `tailwind.config.js` or `tailwind.config.ts`**. Tailwind v4 is configured entirely in CSS:

- `src/styles/globals.css` uses `@theme { }` to define design tokens
- `@plugin "@tailwindcss/typography"` enables prose styling
- `@custom-variant dark (&:where(.dark, .dark *))` enables dark mode

### Colour Tokens

Always use the semantic colour tokens, never raw hex values:

| Token | Usage |
|---|---|
| `bg-background` | Page background |
| `bg-surface` | Card / elevated surface background |
| `text-text-primary` | Main body text |
| `text-text-secondary` | Muted / meta text |
| `text-accent` / `bg-accent` | Orange accent — links, markers, tags |
| `text-accent-hover` | Hover state for accent elements |
| `border-border` | Borders and dividers |

These automatically switch between light and dark mode via CSS variables.

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
- **Animations**: Use `AnimatedSection` wrapper for scroll-triggered fade-in. Framer Motion for anything more complex.
- **Layout wrapping**: Use `Container` component (`max-w-3xl px-6`) for page content width

### Key Reusable Components

- `Container` — max-width content wrapper, used on every page
- `AnimatedSection` — Framer Motion `whileInView` fade-in with configurable delay
- `Tag` — orange pill badge (`bg-accent/10 text-accent`)
- `SocialLinks` — row of social SVG icons from `constants.ts`
- `PostCard` — blog post preview card with hover lift

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
- Used by: `/experience` page (timeline) and `/cv` page (resume)

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
6. **Substack RSS**: `src/lib/rss.ts` is a stub — `rss-parser` is installed but the integration is commented out. Set `SUBSTACK_URL` and uncomment to activate.

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
