export interface Frontmatter {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  published: boolean;
  coverImage?: string;
  readingTime?: number;
}

export interface Post {
  slug: string;
  frontmatter: Frontmatter;
  content: string;
}

export interface LocalBlogPost {
  source: "local";
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: number;
}

export interface SubstackBlogPost {
  source: "substack";
  title: string;
  link: string;
  date: string;
  excerpt: string;
}

export type BlogPost = LocalBlogPost | SubstackBlogPost;
