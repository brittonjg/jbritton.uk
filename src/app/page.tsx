import Container from "@/components/layout/Container";
import Hero from "@/components/home/Hero";
import LatestPosts from "@/components/home/LatestPosts";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { getAllBlogPosts } from "@/lib/blog";

export default async function Home() {
  const posts = await getAllBlogPosts();

  return (
    <Container>
      <Hero />
      <div className="flex items-center justify-center gap-3 py-12">
        <div className="h-px w-12 bg-border" />
        <div className="h-1.5 w-1.5 rounded-full bg-accent/40" />
        <div className="h-px w-12 bg-border" />
      </div>
      <AnimatedSection>
        <LatestPosts posts={posts} />
      </AnimatedSection>
    </Container>
  );
}
