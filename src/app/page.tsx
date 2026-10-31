import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import Hero from "@/components/home/Hero";
import Currently from "@/components/home/Currently";
import CareerGlance from "@/components/home/CareerGlance";
import LatestPosts from "@/components/home/LatestPosts";
import ContactBand from "@/components/home/ContactBand";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { getAllBlogPosts } from "@/lib/blog";
import { getExperience } from "@/lib/experience";
import { siteConfig } from "@/lib/constants";
import { baseOpenGraph, homeTitle } from "@/lib/metadata";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  openGraph: { ...baseOpenGraph, title: homeTitle },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: siteConfig.description,
  },
};

export default async function Home() {
  const posts = await getAllBlogPosts();
  const { roles, education } = getExperience();
  const currentRole = roles.find((role) => !role.endDate);

  return (
    <Container>
      <Hero />
      <div aria-hidden="true" className="flex items-center justify-center gap-3 pb-12">
        <div className="h-px w-12 bg-border" />
        <div className="size-1.5 rounded-full bg-accent-decor" />
        <div className="h-px w-12 bg-border" />
      </div>
      {/* TODO(james): optional section titles (heading-section style) under the
          "Currently" and "Career at a glance" eyebrows. Pass `title` to
          SectionHeader once you have the words. */}
      {currentRole && (
        <AnimatedSection>
          <Currently role={currentRole} />
        </AnimatedSection>
      )}
      <AnimatedSection>
        <CareerGlance roles={roles} education={education} />
      </AnimatedSection>
      {posts.length > 0 && <LatestPosts posts={posts} />}
      <AnimatedSection>
        <ContactBand />
      </AnimatedSection>
    </Container>
  );
}
