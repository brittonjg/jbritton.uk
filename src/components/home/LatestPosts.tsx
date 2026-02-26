import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import PostCard from "@/components/blog/PostCard";

export default function LatestPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="pb-16">
      <h2 className="text-center text-2xl font-semibold text-text-primary">
        Latest Writing
      </h2>
      <div className="mt-8 flex flex-col gap-6">
        {posts.slice(0, 3).map((post) => (
          <PostCard
            key={post.source === "local" ? post.slug : post.link}
            post={post}
          />
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link
          href="/blog"
          className="text-sm font-medium text-accent hover:text-accent-hover"
        >
          View all posts &rarr;
        </Link>
      </div>
    </section>
  );
}
