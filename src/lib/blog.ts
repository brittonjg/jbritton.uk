import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post, Frontmatter, BlogPost } from "@/types/blog";
import { getSubstackPosts } from "@/lib/rss";

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

export function getAllSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const filePath = path.join(CONTENT_DIR, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);
      const frontmatter = data as Frontmatter;

      if (!frontmatter.published) return null;

      return {
        slug,
        frontmatter: {
          ...frontmatter,
          readingTime: getReadingTime(content),
        },
        content,
      };
    })
    .filter((post) => post !== null) as Post[];

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const frontmatter = data as Frontmatter;

  if (!frontmatter.published) return null;

  return {
    slug,
    frontmatter: {
      ...frontmatter,
      readingTime: getReadingTime(content),
    },
    content,
  };
}

export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const [localPosts, substackPosts] = await Promise.all([
    Promise.resolve(getAllPosts()),
    getSubstackPosts(),
  ]);

  const local: BlogPost[] = localPosts.map((post) => ({
    source: "local" as const,
    slug: post.slug,
    title: post.frontmatter.title,
    date: post.frontmatter.date,
    excerpt: post.frontmatter.excerpt,
    tags: post.frontmatter.tags,
    readingTime: post.frontmatter.readingTime ?? getReadingTime(post.content),
  }));

  const substack: BlogPost[] = substackPosts.map((post) => ({
    source: "substack" as const,
    title: post.title,
    link: post.link,
    date: post.date,
    excerpt: post.excerpt,
  }));

  return [...local, ...substack].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
