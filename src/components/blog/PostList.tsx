import type { BlogPost } from "@/types/blog";
import PostCard from "./PostCard";
import EmptyState from "./EmptyState";

export default function PostList({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <PostCard
          key={post.source === "local" ? post.slug : post.link}
          post={post}
        />
      ))}
    </div>
  );
}
