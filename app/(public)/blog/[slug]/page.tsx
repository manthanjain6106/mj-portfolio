import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, BookOpen } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { getPublicPostBySlug, getRelatedPosts } from "@/services/posts";
import { extractHeadings } from "@/lib/sanitize";
import { ArticleContent } from "@/components/blog/article-content";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ShareLinks } from "@/components/blog/share-links";
import { PostCard } from "@/components/blog/post-card";

export const revalidate = 60;

interface BlogPostPageProps {
  readonly params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublicPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      tags: post.tags,
      images: post.coverImage?.url
        ? [{ url: post.coverImage.url, alt: post.coverImage.alt }]
        : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPublicPostBySlug(slug);

  // Requirement: Drafts must never be reachable publicly (404 on direct URL)
  if (!post) {
    notFound();
  }

  const [headings, relatedPosts] = await Promise.all([
    extractHeadings(post.content),
    getRelatedPosts(post.slug, post.tags, 3),
  ]);

  const displayDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Navigation & Breadcrumbs */}
      <FadeIn>
        <Link
          href="/blog"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to all articles</span>
        </Link>
      </FadeIn>

      {/* Post Header */}
      <FadeIn delay={0.05} className="mt-8 space-y-4">
        <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
          {displayDate && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              <span>{displayDate}</span>
            </span>
          )}
          {displayDate && <span>•</span>}
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" />
            <span>{post.readingTime} min read</span>
          </span>
        </div>

        <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
          {post.excerpt}
        </p>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}
                className="border-border bg-card text-muted-foreground hover:border-brand/40 hover:text-brand rounded-full border px-3 py-1 font-mono text-xs transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </FadeIn>

      {/* Cover Image */}
      {post.coverImage?.url && (
        <FadeIn delay={0.1} className="mt-8">
          <div className="border-border bg-muted relative aspect-16/9 w-full overflow-hidden rounded-xl border">
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        </FadeIn>
      )}

      {/* Content Layout with Table of Contents Rail */}
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Main Article Body */}
        <div className="lg:col-span-8">
          <ArticleContent content={post.content} />

          {/* Bottom Share Links */}
          <div className="border-border/80 mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
            <ShareLinks title={post.title} slug={post.slug} />
            <Link
              href="/blog"
              className="text-brand inline-flex items-center gap-1 text-xs font-medium hover:underline"
            >
              <span>Explore more articles</span>
              <ArrowLeft className="size-3.5 rotate-180" />
            </Link>
          </div>
        </div>

        {/* Sidebar TOC & Share (Desktop) */}
        <aside className="space-y-8 lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            {headings.length > 0 && <TableOfContents headings={headings} />}
            <div className="border-border bg-card/40 rounded-lg border p-4">
              <ShareLinks title={post.title} slug={post.slug} />
            </div>
          </div>
        </aside>
      </div>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <div className="border-border mt-20 border-t pt-12">
          <div className="flex items-center gap-2">
            <BookOpen className="text-brand size-5" />
            <h2 className="text-foreground text-xl font-semibold tracking-tight">
              Related Articles
            </h2>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((related) => (
              <PostCard key={related._id} post={related} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
