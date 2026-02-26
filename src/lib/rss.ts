const SUBSTACK_URL = "https://brittonj.substack.com/feed";

export interface SubstackPost {
  title: string;
  link: string;
  date: string;
  excerpt: string;
}

export async function getSubstackPosts(): Promise<SubstackPost[]> {
  if (!SUBSTACK_URL) return [];

  try {
    const Parser = (await import("rss-parser")).default;
    const parser = new Parser();
    const feed = await parser.parseURL(SUBSTACK_URL);

    return (feed.items ?? []).map((item) => ({
      title: item.title ?? "",
      link: item.link ?? "",
      date: item.isoDate ?? item.pubDate ?? "",
      excerpt: item.contentSnippet?.slice(0, 200) ?? "",
    }));
  } catch {
    return [];
  }
}
