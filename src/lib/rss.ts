/**
 * Substack RSS integration stub.
 *
 * To activate:
 * 1. Set SUBSTACK_URL below to your Substack RSS feed URL
 * 2. Call getSubstackPosts() from a server component or generateStaticParams
 * 3. Substack posts will appear in the blog index with an external link badge
 *
 * For automatic rebuilds, set up a GitHub Actions cron or
 * Cloudflare Pages deploy hook triggered by Substack's webhook.
 */

const SUBSTACK_URL = "https://brittonj.substack.com/feed"; // e.g. "https://yourname.substack.com/feed"

export interface SubstackPost {
  title: string;
  link: string;
  date: string;
  excerpt: string;
}

export async function getSubstackPosts(): Promise<SubstackPost[]> {
  if (!SUBSTACK_URL) return [];

  // Uncomment when ready to activate:
  // const Parser = (await import("rss-parser")).default;
  // const parser = new Parser();
  // const feed = await parser.parseURL(SUBSTACK_URL);
  //
  // return (feed.items ?? []).map((item) => ({
  //   title: item.title ?? "",
  //   link: item.link ?? "",
  //   date: item.isoDate ?? item.pubDate ?? "",
  //   excerpt: item.contentSnippet?.slice(0, 200) ?? "",
  // }));

  return [];
}
