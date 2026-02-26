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
