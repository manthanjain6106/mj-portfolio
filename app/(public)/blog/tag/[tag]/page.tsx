import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { getPublicPosts } from "@/services/posts";
import { PostCard } from "@/components/blog/post-card";

export const revalidate = 60;

interface TagPageProps {
  readonly params: Promise<{ tag: string }>;
  readonly searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `#${decodedTag} Articles`,
    description: `Browse all articles, tutorials, and technical insights tagged with #${decodedTag}.`,
  };
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { tag } = await params;
  const { page } = await searchParams;
  const decodedTag = decodeURIComponent(tag);
  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);

  const postsResult = await getPublicPosts({
    tag: decodedTag,
    page: currentPage,
    limit: 6,
  });

  const { posts, total, totalPages } = postsResult;

  const createPageLink = (targetPage: number) => {
    return `/blog/tag/${encodeURIComponent(tag)}${targetPage > 1 ? `?page=${targetPage}` : ""}`;
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Breadcrumb Navigation */}
      <FadeIn>
        <Link
          href="/blog"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to all articles</span>
        </Link>
      </FadeIn>

      {/* Header */}
      <FadeIn
        delay={0.05}
        className="border-border mt-6 space-y-3 border-b pb-8"
      >
        <div className="flex items-center gap-2">
          <span className="text-brand font-mono text-xs tracking-wider uppercase">
            Topic Archive
          </span>
        </div>
        <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
          #{decodedTag}
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Showing {total} {total === 1 ? "article" : "articles"} filed under
          this topic.
        </p>
      </FadeIn>

      {/* Posts */}
      <div className="mt-10">
        {posts.length === 0 ? (
          <FadeIn className="border-border bg-card/40 flex flex-col items-center justify-center rounded-xl border border-dashed p-12 text-center">
            <div className="border-border bg-muted text-brand rounded-full border p-3">
              <BookOpen className="size-6" />
            </div>
            <h2 className="text-foreground mt-4 text-base font-medium">
              No articles found
            </h2>
            <p className="text-muted-foreground mt-1 max-w-sm text-xs">
              No published articles are currently tagged with #{decodedTag}.
            </p>
            <Link
              href="/blog"
              className="text-brand mt-4 font-mono text-xs hover:underline"
            >
              View all topics
            </Link>
          </FadeIn>
        ) : (
          <div className="space-y-10">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <FadeIn key={post._id} delay={index * 0.05}>
                  <PostCard post={post} priority={index === 0} />
                </FadeIn>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="border-border flex items-center justify-between border-t pt-6 text-xs">
                <span className="text-muted-foreground">
                  Showing page {currentPage} of {totalPages}
                </span>

                <div className="flex items-center gap-2">
                  {currentPage > 1 ? (
                    <Link
                      href={createPageLink(currentPage - 1)}
                      className="border-border bg-card hover:border-brand/40 hover:text-foreground inline-flex items-center gap-1 rounded-md border px-3 py-1.5 font-medium transition-colors"
                    >
                      <ChevronLeft className="size-3.5" />
                      <span>Previous</span>
                    </Link>
                  ) : (
                    <span className="border-border/40 text-muted-foreground/40 inline-flex cursor-not-allowed items-center gap-1 rounded-md border px-3 py-1.5 font-medium">
                      <ChevronLeft className="size-3.5" />
                      <span>Previous</span>
                    </span>
                  )}

                  {currentPage < totalPages ? (
                    <Link
                      href={createPageLink(currentPage + 1)}
                      className="border-border bg-card hover:border-brand/40 hover:text-foreground inline-flex items-center gap-1 rounded-md border px-3 py-1.5 font-medium transition-colors"
                    >
                      <span>Next</span>
                      <ChevronRight className="size-3.5" />
                    </Link>
                  ) : (
                    <span className="border-border/40 text-muted-foreground/40 inline-flex cursor-not-allowed items-center gap-1 rounded-md border px-3 py-1.5 font-medium">
                      <span>Next</span>
                      <ChevronRight className="size-3.5" />
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
