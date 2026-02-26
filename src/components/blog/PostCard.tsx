import Link from "next/link";
import type { Post } from "@/types/blog";
import { formatDate } from "@/lib/blog";
import Tag from "@/components/ui/Tag";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="rounded-lg border border-border bg-surface p-6 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-accent/30 group-hover:shadow-lg">
        <h2 className="text-xl font-semibold text-text-primary transition-colors group-hover:text-accent">
          {post.frontmatter.title}
        </h2>
        <div className="mt-2 flex items-center gap-2 text-sm text-text-tertiary">
          <time dateTime={post.frontmatter.date}>
            {formatDate(post.frontmatter.date)}
          </time>
          <span>&middot;</span>
          <span>{post.frontmatter.readingTime} min read</span>
        </div>
        <p className="mt-3 text-text-secondary">
          {post.frontmatter.excerpt}
        </p>
        {post.frontmatter.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.frontmatter.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        )}
      </article>
    </Link>
  );
}
