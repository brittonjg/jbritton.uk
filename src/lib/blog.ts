import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post, Frontmatter } from "@/types/blog";

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

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

  return {
    slug,
    frontmatter: {
      ...frontmatter,
      readingTime: getReadingTime(content),
    },
    content,
  };
}

function getReadingTime(content: string): number {
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
