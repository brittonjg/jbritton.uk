import { describe, it, expect, vi, beforeEach } from "vitest";
import { formatDate, getReadingTime, getAllPosts, getAllBlogPosts } from "./blog";

// Mock fs and path for getAllPosts
vi.mock("fs", () => ({
  default: {
    existsSync: vi.fn(),
    readdirSync: vi.fn(),
    readFileSync: vi.fn(),
  },
}));

vi.mock("gray-matter", () => ({
  default: vi.fn(),
}));

vi.mock("@/lib/rss", () => ({
  getSubstackPosts: vi.fn(),
}));

describe("formatDate", () => {
  it("formats an ISO date to en-GB long format", () => {
    const result = formatDate("2024-06-15");
    expect(result).toBe("15 June 2024");
  });

  it("formats a different date correctly", () => {
    const result = formatDate("2023-01-01");
    expect(result).toBe("1 January 2023");
  });
});

describe("getReadingTime", () => {
  it("calculates reading time at 200 wpm", () => {
    const words = Array(400).fill("word").join(" ");
    expect(getReadingTime(words)).toBe(2);
  });

  it("returns a minimum of 1 minute", () => {
    expect(getReadingTime("short")).toBe(1);
  });

  it("rounds up to the next minute", () => {
    const words = Array(201).fill("word").join(" ");
    expect(getReadingTime(words)).toBe(2);
  });

  it("handles empty content", () => {
    expect(getReadingTime("")).toBe(1);
  });
});

describe("getAllPosts", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns empty array when content directory does not exist", async () => {
    const fs = await import("fs");
    vi.mocked(fs.default.existsSync).mockReturnValue(false);

    const posts = getAllPosts();
    expect(posts).toEqual([]);
  });

  it("excludes drafts (published: false)", async () => {
    const fs = await import("fs");
    const matter = await import("gray-matter");

    vi.mocked(fs.default.existsSync).mockReturnValue(true);
    vi.mocked(fs.default.readdirSync).mockReturnValue(
      ["draft.mdx", "published.mdx"] as unknown as ReturnType<typeof fs.default.readdirSync>
    );
    vi.mocked(fs.default.readFileSync).mockReturnValue("content");
    vi.mocked(matter.default)
      .mockReturnValueOnce({
        data: {
          title: "Draft Post",
          date: "2024-01-01",
          excerpt: "draft",
          tags: [],
          published: false,
        },
        content: "draft content",
      } as ReturnType<typeof matter.default>)
      .mockReturnValueOnce({
        data: {
          title: "Published Post",
          date: "2024-02-01",
          excerpt: "published",
          tags: ["test"],
          published: true,
        },
        content: "published content",
      } as ReturnType<typeof matter.default>);

    const posts = getAllPosts();
    expect(posts).toHaveLength(1);
    expect(posts[0].frontmatter.title).toBe("Published Post");
  });

  it("sorts posts by date descending", async () => {
    const fs = await import("fs");
    const matter = await import("gray-matter");

    vi.mocked(fs.default.existsSync).mockReturnValue(true);
    vi.mocked(fs.default.readdirSync).mockReturnValue(
      ["old.mdx", "new.mdx"] as unknown as ReturnType<typeof fs.default.readdirSync>
    );
    vi.mocked(fs.default.readFileSync).mockReturnValue("content");
    vi.mocked(matter.default)
      .mockReturnValueOnce({
        data: {
          title: "Old Post",
          date: "2023-01-01",
          excerpt: "old",
          tags: [],
          published: true,
        },
        content: "old content",
      } as ReturnType<typeof matter.default>)
      .mockReturnValueOnce({
        data: {
          title: "New Post",
          date: "2024-06-01",
          excerpt: "new",
          tags: [],
          published: true,
        },
        content: "new content",
      } as ReturnType<typeof matter.default>);

    const posts = getAllPosts();
    expect(posts[0].frontmatter.title).toBe("New Post");
    expect(posts[1].frontmatter.title).toBe("Old Post");
  });
});

describe("getAllBlogPosts", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns local posts only when Substack returns empty", async () => {
    const fs = await import("fs");
    const matter = await import("gray-matter");
    const { getSubstackPosts } = await import("@/lib/rss");

    vi.mocked(fs.default.existsSync).mockReturnValue(true);
    vi.mocked(fs.default.readdirSync).mockReturnValue(
      ["post.mdx"] as unknown as ReturnType<typeof fs.default.readdirSync>
    );
    vi.mocked(fs.default.readFileSync).mockReturnValue("content");
    vi.mocked(matter.default).mockReturnValue({
      data: {
        title: "Local Post",
        date: "2024-03-01",
        excerpt: "local",
        tags: ["test"],
        published: true,
      },
      content: "local content",
    } as ReturnType<typeof matter.default>);
    vi.mocked(getSubstackPosts).mockResolvedValue([]);

    const posts = await getAllBlogPosts();
    expect(posts).toHaveLength(1);
    expect(posts[0].source).toBe("local");
    expect(posts[0].title).toBe("Local Post");
  });

  it("returns Substack posts only when no local MDX files exist", async () => {
    const fs = await import("fs");
    const { getSubstackPosts } = await import("@/lib/rss");

    vi.mocked(fs.default.existsSync).mockReturnValue(false);
    vi.mocked(getSubstackPosts).mockResolvedValue([
      {
        title: "Substack Post",
        link: "https://brittonj.substack.com/p/test",
        date: "2024-04-01",
        excerpt: "substack",
      },
    ]);

    const posts = await getAllBlogPosts();
    expect(posts).toHaveLength(1);
    expect(posts[0].source).toBe("substack");
    expect(posts[0].title).toBe("Substack Post");
  });

  it("merges and sorts mixed posts by date descending", async () => {
    const fs = await import("fs");
    const matter = await import("gray-matter");
    const { getSubstackPosts } = await import("@/lib/rss");

    vi.mocked(fs.default.existsSync).mockReturnValue(true);
    vi.mocked(fs.default.readdirSync).mockReturnValue(
      ["local.mdx"] as unknown as ReturnType<typeof fs.default.readdirSync>
    );
    vi.mocked(fs.default.readFileSync).mockReturnValue("content");
    vi.mocked(matter.default).mockReturnValue({
      data: {
        title: "Older Local Post",
        date: "2024-01-15",
        excerpt: "local",
        tags: [],
        published: true,
      },
      content: "local content",
    } as ReturnType<typeof matter.default>);
    vi.mocked(getSubstackPosts).mockResolvedValue([
      {
        title: "Newer Substack Post",
        link: "https://brittonj.substack.com/p/newer",
        date: "2024-06-01",
        excerpt: "substack",
      },
    ]);

    const posts = await getAllBlogPosts();
    expect(posts).toHaveLength(2);
    expect(posts[0].title).toBe("Newer Substack Post");
    expect(posts[0].source).toBe("substack");
    expect(posts[1].title).toBe("Older Local Post");
    expect(posts[1].source).toBe("local");
  });

  it("returns empty array when both sources are empty", async () => {
    const fs = await import("fs");
    const { getSubstackPosts } = await import("@/lib/rss");

    vi.mocked(fs.default.existsSync).mockReturnValue(false);
    vi.mocked(getSubstackPosts).mockResolvedValue([]);

    const posts = await getAllBlogPosts();
    expect(posts).toEqual([]);
  });
});
