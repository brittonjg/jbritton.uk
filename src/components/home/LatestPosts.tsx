import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import PostCard from "@/components/blog/PostCard";

/** Only rendered by the homepage once at least one post exists. */
export default function LatestPosts({ posts }: { posts: BlogPost[] }) {
  return (
    <section aria-labelledby="latest-heading" className="pb-16">
      <h2 id="latest-heading" className="eyebrow">
        Latest writing
      </h2>
      <div className="mt-4 flex flex-col gap-6">
        {posts.slice(0, 3).map((post) => (
          <PostCard
            key={post.source === "local" ? post.slug : post.link}
            post={post}
          />
        ))}
      </div>
      <div className="mt-4">
        <Link
          href="/blog"
          className="inline-flex min-h-11 items-center text-sm font-semibold text-accent hover:text-accent-hover"
        >
          View all writing &rarr;
        </Link>
      </div>
    </section>
  );
}
