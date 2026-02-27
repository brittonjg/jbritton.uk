import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Container from "@/components/layout/Container";
import Tag from "@/components/ui/Tag";
import { mdxComponents } from "@/components/blog/mdx";
import { getAllSlugs, getPostBySlug, formatDate } from "@/lib/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <Container>
      <article className="py-16">
        <Link
          href="/blog"
          className="text-sm text-text-secondary transition-colors hover:text-accent"
        >
          &larr; Back to writing
        </Link>

        <header className="mt-8">
          <h1 className="font-display text-3xl leading-tight text-text-primary sm:text-4xl">
            {post.frontmatter.title}
          </h1>
          <div className="mt-4 flex items-center gap-2 text-sm text-text-tertiary">
            <time dateTime={post.frontmatter.date}>
              {formatDate(post.frontmatter.date)}
            </time>
            <span>&middot;</span>
            <span>{post.frontmatter.readingTime} min read</span>
          </div>
          {post.frontmatter.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.frontmatter.tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
          )}
        </header>

        <hr className="my-8 border-border" />

        <div className="prose prose-neutral prose-lg max-w-none dark:prose-invert prose-headings:font-display prose-headings:tracking-tight prose-p:leading-relaxed prose-a:text-accent prose-a:no-underline hover:prose-a:text-accent-hover prose-blockquote:border-accent prose-blockquote:not-italic">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </div>
      </article>
    </Container>
  );
}
