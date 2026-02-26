import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PostList from "@/components/blog/PostList";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing about engineering leadership, technology, and building teams.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Container>
      <section className="py-16">
        <h1 className="font-display text-3xl text-text-primary">Writing</h1>
        <div className="mt-8">
          <PostList posts={posts} />
        </div>
      </section>
    </Container>
  );
}
