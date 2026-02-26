import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const blogEntries = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
  }));

  return [
    { url: siteConfig.url, lastModified: new Date() },
    { url: `${siteConfig.url}/blog`, lastModified: new Date() },
    { url: `${siteConfig.url}/experience`, lastModified: new Date() },
    { url: `${siteConfig.url}/cv`, lastModified: new Date() },
    ...blogEntries,
  ];
}
