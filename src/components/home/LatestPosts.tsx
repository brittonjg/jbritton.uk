import type { BlogPost } from "@/types/blog";
import PostCard from "@/components/blog/PostCard";
import SectionHeader from "@/components/ui/SectionHeader";
import TextLink from "@/components/ui/TextLink";

/** Only rendered by the homepage once at least one post exists. */
export default function LatestPosts({ posts }: { posts: BlogPost[] }) {
  return (
    <section aria-labelledby="latest-heading" className="pb-16">
      <SectionHeader id="latest-heading" eyebrow="Latest writing" />
      <div className="mt-4 flex flex-col gap-6">
        {posts.slice(0, 3).map((post) => (
          <PostCard
            key={post.source === "local" ? post.slug : post.link}
            post={post}
            headingLevel="h3"
          />
        ))}
      </div>
      <div className="mt-4">
        <TextLink href="/blog">View all writing</TextLink>
      </div>
    </section>
  );
}
