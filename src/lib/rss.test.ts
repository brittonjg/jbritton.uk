import { describe, it, expect, vi, beforeEach } from "vitest";
import { getSubstackPosts } from "./rss";

vi.mock("rss-parser", () => {
  const MockParser = vi.fn();
  MockParser.prototype.parseURL = vi.fn();
  return { default: MockParser };
});

async function getMockParser() {
  const { default: Parser } = await import("rss-parser");
  return Parser.prototype.parseURL as ReturnType<typeof vi.fn>;
}

describe("getSubstackPosts", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("parses RSS feed items into SubstackPost[]", async () => {
    const mockParseURL = await getMockParser();
    mockParseURL.mockResolvedValue({
      items: [
        {
          title: "My First Post",
          link: "https://brittonj.substack.com/p/first",
          isoDate: "2024-03-15T10:00:00.000Z",
          contentSnippet: "This is the first post content preview.",
        },
        {
          title: "My Second Post",
          link: "https://brittonj.substack.com/p/second",
          isoDate: "2024-04-01T12:00:00.000Z",
          contentSnippet: "This is the second post content preview.",
        },
      ],
    });

    const posts = await getSubstackPosts();
    expect(posts).toHaveLength(2);
    expect(posts[0]).toEqual({
      title: "My First Post",
      link: "https://brittonj.substack.com/p/first",
      date: "2024-03-15T10:00:00.000Z",
      excerpt: "This is the first post content preview.",
    });
  });

  it("returns empty array when feed has no items", async () => {
    const mockParseURL = await getMockParser();
    mockParseURL.mockResolvedValue({ items: [] });

    const posts = await getSubstackPosts();
    expect(posts).toEqual([]);
  });

  it("returns empty array on network failure", async () => {
    const mockParseURL = await getMockParser();
    mockParseURL.mockRejectedValue(new Error("Network error"));

    const posts = await getSubstackPosts();
    expect(posts).toEqual([]);
  });

  it("truncates excerpt to 200 characters", async () => {
    const longContent = "A".repeat(300);
    const mockParseURL = await getMockParser();
    mockParseURL.mockResolvedValue({
      items: [
        {
          title: "Long Post",
          link: "https://brittonj.substack.com/p/long",
          isoDate: "2024-05-01T00:00:00.000Z",
          contentSnippet: longContent,
        },
      ],
    });

    const posts = await getSubstackPosts();
    expect(posts[0].excerpt).toHaveLength(200);
  });

  it("handles missing optional fields gracefully", async () => {
    const mockParseURL = await getMockParser();
    mockParseURL.mockResolvedValue({
      items: [
        {
          // All fields missing
        },
      ],
    });

    const posts = await getSubstackPosts();
    expect(posts).toHaveLength(1);
    expect(posts[0]).toEqual({
      title: "",
      link: "",
      date: "",
      excerpt: "",
    });
  });

  it("falls back to pubDate when isoDate is missing", async () => {
    const mockParseURL = await getMockParser();
    mockParseURL.mockResolvedValue({
      items: [
        {
          title: "Fallback Date Post",
          link: "https://brittonj.substack.com/p/fallback",
          pubDate: "Fri, 01 Mar 2024 00:00:00 GMT",
          contentSnippet: "A post with pubDate.",
        },
      ],
    });

    const posts = await getSubstackPosts();
    expect(posts[0].date).toBe("Fri, 01 Mar 2024 00:00:00 GMT");
  });

  it("returns empty array when feed items is undefined", async () => {
    const mockParseURL = await getMockParser();
    mockParseURL.mockResolvedValue({});

    const posts = await getSubstackPosts();
    expect(posts).toEqual([]);
  });
});
