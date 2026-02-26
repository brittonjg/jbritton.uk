import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/blog";
import Tag from "@/components/ui/Tag";

export default function PostCard({ post }: { post: BlogPost }) {
  const card = (
    <article className="rounded-lg border border-border bg-surface p-6 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-accent/30 group-hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-xl font-semibold text-text-primary transition-colors group-hover:text-accent">
          {post.title}
        </h2>
        {post.source === "substack" && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-accent/15 bg-accent/8 px-2.5 py-0.5 text-xs font-medium text-accent/90">
            Substack
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-3 w-3"
            >
              <path d="M4.5 3.25a.75.75 0 0 0 0 1.5h4.69L3.22 10.72a.75.75 0 1 0 1.06 1.06l5.97-5.97v4.69a.75.75 0 0 0 1.5 0v-6.5a.75.75 0 0 0-.75-.75h-6.5Z" />
            </svg>
          </span>
        )}
      </div>
      <div className="mt-2 flex items-center gap-2 text-sm text-text-tertiary">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        {post.source === "local" && (
          <>
            <span>&middot;</span>
            <span>{post.readingTime} min read</span>
          </>
        )}
      </div>
      <p className="mt-3 text-text-secondary">{post.excerpt}</p>
      {post.source === "local" && post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      )}
    </article>
  );

  if (post.source === "substack") {
    return (
      <a
        href={post.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        {card}
      </a>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      {card}
    </Link>
  );
}
