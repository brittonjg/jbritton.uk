# jbritton.uk

Personal website and blog for [James Britton](https://jbritton.uk) — Head of Engineering at [Cuvva](https://www.cuvva.com).

Built with Next.js 15, TypeScript, and Tailwind CSS v4. Statically exported and deployed to Cloudflare Pages.

---

## Tech Stack

| Dependency | Version | Purpose |
|---|---|---|
| Next.js | 15 | App Router, static export, metadata API |
| React | 19 | UI framework |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Utility-first styling (CSS-based config, no `tailwind.config.js`) |
| @tailwindcss/typography | 0.5 | Prose styling for blog content |
| Framer Motion | 11 | Scroll-triggered animations, hero stagger |
| next-themes | 0.4 | Dark / light mode with system preference |
| next-mdx-remote | 5 | Server-side MDX rendering for blog posts |
| gray-matter | 4 | YAML frontmatter parsing |
| remark-gfm | 4 | GitHub Flavoured Markdown (tables, strikethrough, etc.) |
| rehype-pretty-code | 0.14 | Syntax highlighting via Shiki |
| shiki | 1 | Syntax highlighter engine |
| rss-parser | 3.13 | Substack RSS integration (stubbed, not yet active) |

---

## Getting Started

```bash
# Clone the repo
git clone git@github.com:brittonjg/jbritton.uk.git
cd jbritton.uk

# Install dependencies
npm install

# Start the dev server (http://localhost:3000)
npm run dev

# Production build (outputs to out/)
npm run build

# Lint
npm run lint
```

Node 20+ is recommended.

---

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout: fonts, ThemeProvider, Header, Footer
│   ├── page.tsx                # Home: Hero + LatestPosts
│   ├── sitemap.ts              # Dynamic sitemap generation
│   ├── not-found.tsx           # Custom 404
│   ├── blog/
│   │   ├── page.tsx            # Blog index
│   │   └── [slug]/page.tsx     # Individual blog post (MDX)
│   ├── experience/page.tsx     # Career timeline
│   └── cv/page.tsx             # Web resume + PDF download
│
├── components/
│   ├── layout/                 # Header, Footer, Container
│   ├── home/                   # Hero, LatestPosts
│   ├── blog/                   # PostCard, PostList, mdx/ (Callout etc.)
│   ├── experience/             # Timeline, TimelineEntry
│   ├── cv/                     # ResumeSection, DownloadButton
│   └── ui/                     # AnimatedSection, ThemeToggle, SocialLinks, Tag
│
├── content/
│   ├── blog/                   # MDX blog posts
│   │   └── hello-world.mdx
│   └── experience.json         # Professional history + education
│
├── lib/
│   ├── blog.ts                 # getAllPosts(), getPostBySlug(), formatDate(), getReadingTime()
│   ├── experience.ts           # getExperience(), formatDateRange(), getDuration()
│   ├── constants.ts            # siteConfig, socialLinks, navItems
│   └── rss.ts                  # Substack RSS stub (inactive)
│
├── styles/
│   └── globals.css             # Tailwind v4 @theme, CSS variables, dark mode, print styles
│
└── types/
    ├── blog.ts                 # Frontmatter, Post
    └── experience.ts           # Company, Role, Education, ExperienceData
```

---

## Pages & Routes

| Route | Description |
|---|---|
| `/` | Homepage — animated hero, social links, latest 3 blog posts |
| `/blog` | Blog index — all published posts sorted by date |
| `/blog/[slug]` | Individual blog post — MDX rendered with prose styling |
| `/experience` | Career timeline — alternating layout on desktop, stacked on mobile |
| `/cv` | Web resume with PDF download button, print-friendly CSS |
| `/sitemap.xml` | Auto-generated sitemap |

---

## Content Management

### Adding a Blog Post

Create a new `.mdx` file in `src/content/blog/`:

```mdx
---
title: "Your Post Title"
date: "2026-03-15"
excerpt: "A short description shown in post cards."
tags: ["leadership", "engineering"]
published: true
---

Your content here. Supports **bold**, *italic*, [links](https://example.com),
code blocks, tables (via remark-gfm), and custom components like:

<Callout type="info">
  This is a highlighted callout.
</Callout>
```

**Frontmatter fields:**

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | string | Yes | Post title |
| `date` | string | Yes | ISO date (`YYYY-MM-DD`). Used for sorting and display. |
| `excerpt` | string | Yes | Short description for cards and meta tags |
| `tags` | string[] | Yes | Tag labels shown as orange pills |
| `published` | boolean | Yes | Set `false` to keep as draft (excluded from build) |
| `coverImage` | string | No | Path relative to `/public/images/blog/` |

Posts are sorted by date (newest first). Reading time is calculated automatically at 200 words/minute.

### Updating Experience Data

Edit `src/content/experience.json`. The schema:

```jsonc
{
  "roles": [
    {
      "title": "Head of Engineering",
      "company": { "name": "Cuvva", "url": "https://www.cuvva.com" },
      "startDate": "2023-01",    // YYYY or YYYY-MM
      "endDate": null,           // null = "Present"
      "location": "London, UK",
      "description": "Leading engineering across...",
      "highlights": ["Led migration to...", "Grew team from..."],
      "tags": ["leadership", "fintech"]
    }
  ],
  "education": [
    {
      "institution": "Newcastle University",
      "degree": "BSc (Hons)",
      "field": "Computer Science",
      "startDate": "2013",
      "endDate": "2016",
      "location": "Newcastle upon Tyne, UK"
    }
  ]
}
```

### Replacing the CV PDF

Drop the new file at `public/pdf/JBrittonCV.pdf` (same filename). The download button and link will pick it up automatically.

---

## Styling

### Tailwind v4 (CSS-based config)

There is **no `tailwind.config.js`**. Tailwind v4 is configured entirely in `src/styles/globals.css` using the `@theme` directive:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --font-sans: "Quicksand", ui-sans-serif, system-ui, sans-serif;
  --color-background: #fafafa;
  --color-surface: #ffffff;
  --color-text-primary: #37474f;
  --color-text-secondary: #6b7c87;
  --color-accent: #d97706;
  --color-accent-hover: #b45309;
  --color-border: #e5e7eb;
}
```

### Dark Mode

Dark mode colours are set via CSS variable overrides on the `.dark` class:

```css
.dark {
  --color-background: #111827;
  --color-surface: #1f2937;
  --color-text-primary: #e5e7eb;
  --color-text-secondary: #9ca3af;
  --color-accent: #f59e0b;
  --color-accent-hover: #d97706;
  --color-border: #374151;
}
```

Use the semantic tokens in Tailwind classes (e.g. `text-text-primary`, `bg-surface`, `border-border`, `text-accent`) — they automatically switch between light and dark.

### Adding a New Colour

1. Add a CSS variable in the `@theme` block in `globals.css`
2. Add a dark mode override in the `.dark` block
3. Reference it in Tailwind classes as `text-{name}` / `bg-{name}`

---

## Components

### Conventions

- **Filenames**: PascalCase (`PostCard.tsx`, `AnimatedSection.tsx`)
- **Grouping**: By feature area (`blog/`, `experience/`, `cv/`, `home/`, `layout/`, `ui/`)
- **Server by default**: All components are server components unless they need client features
- **Client components**: Add `"use client"` only when using React hooks, browser APIs, or Framer Motion
- **Props**: Define interfaces inline in the component file. Use shared types from `src/types/` when the type is used across multiple components.
- **Icons**: SVG elements inline — no external icon libraries

### Key Reusable Components

| Component | Path | Description |
|---|---|---|
| `Container` | `layout/Container.tsx` | Max-width wrapper (`max-w-3xl px-6`) |
| `AnimatedSection` | `ui/AnimatedSection.tsx` | Framer Motion scroll-triggered fade-in |
| `Tag` | `ui/Tag.tsx` | Orange pill badge for labels |
| `SocialLinks` | `ui/SocialLinks.tsx` | Row of social media SVG icons |
| `ThemeToggle` | `ui/ThemeToggle.tsx` | Dark/light mode toggle button |

---

## Deployment

### Cloudflare Pages (CI/CD)

Pushes to `main` automatically deploy via `.github/workflows/deploy.yml`.

**Required GitHub secrets:**

| Secret | Description |
|---|---|
| `CLOUDFLARE_API_TOKEN` | API token with Cloudflare Pages edit permission |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID |

The workflow runs `npm ci && npm run build`, then deploys the `out/` directory to the `jbritton-uk` Cloudflare Pages project.

### Manual Deploy

```bash
npm run build
npx wrangler pages deploy out --project-name=jbritton-uk
```

### Custom Domain

Configure `jbritton.uk` as a custom domain in the Cloudflare Pages project settings. DNS is already on Cloudflare.

---

## Future: Substack RSS

A stub exists at `src/lib/rss.ts`. To activate:

1. Set the `SUBSTACK_URL` constant to your feed URL (e.g. `https://yourname.substack.com/feed`)
2. Call `getSubstackPosts()` from the blog index page
3. Render external posts alongside local MDX posts with a badge linking to the original
4. For automatic rebuilds on new Substack posts, add a GitHub Actions cron or Cloudflare Pages deploy hook
