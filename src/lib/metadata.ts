import { siteConfig } from "@/lib/constants";

/** Open Graph fields shared by every page. Pages that override `openGraph`
 * must spread this, because Next.js replaces the object rather than merging. */
export const baseOpenGraph = {
  description: siteConfig.description,
  url: siteConfig.url,
  siteName: siteConfig.name,
  locale: "en_GB",
  type: "website",
} as const;

export const homeTitle = `${siteConfig.name} — Head of Engineering`;
