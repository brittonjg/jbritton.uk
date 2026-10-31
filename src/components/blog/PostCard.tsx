import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/blog";
import Tag from "@/components/ui/Tag";

interface PostCardProps {
  post: BlogPost;
  headingLevel?: "h2" | "h3";
}

/*
 * Blog post preview. The only card that lifts: translateY(-2px) and
 * shadow-raised on hover or keyboard focus, over duration-fast (.lift).
 */
export default function PostCard({ post, headingLevel: Heading = "h2" }: PostCardProps) {
  const card = (
    <article className="lift rounded-lg border border-border bg-surface p-6 shadow-card group-hover:border-accent-decor">
      <div className="flex items-start justify-between gap-3">
        <Heading className="font-display text-title-post text-text-primary transition-colors duration-fast group-hover:text-accent">
          {post.title}
        </Heading>
        {post.source === "substack" && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-accent-subtle px-3 py-1 text-tag text-on-accent-subtle">
            Substack
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
              className="size-3"
            >
              <path d="M4.5 3.25a.75.75 0 0 0 0 1.5h4.69L3.22 10.72a.75.75 0 1 0 1.06 1.06l5.97-5.97v4.69a.75.75 0 0 0 1.5 0v-6.5a.75.75 0 0 0-.75-.75h-6.5Z" />
            </svg>
          </span>
        )}
      </div>
      <div className="mt-2 flex items-center gap-2 text-meta text-text-tertiary">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        {post.source === "local" && (
          <>
            <span aria-hidden="true">&middot;</span>
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

  const linkClasses = "group block rounded-lg";

  if (post.source === "substack") {
    return (
      <a href={post.link} target="_blank" rel="noopener noreferrer" className={linkClasses}>
        {card}
      </a>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className={linkClasses}>
      {card}
    </Link>
  );
}
