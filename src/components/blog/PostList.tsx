import type { Post } from "@/types/blog";
import PostCard from "./PostCard";

export default function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <p className="text-text-secondary">No posts yet. Check back soon.</p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
