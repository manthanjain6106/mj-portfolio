import type { Metadata } from "next";
import Link from "next/link";
import { Search, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { getPublicPosts, getAllPublicTags } from "@/services/posts";
import { PostCard } from "@/components/blog/post-card";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog & Articles",
  description:
    "Insights, technical tutorials, and architecture deep dives on full-stack engineering, Next.js, TypeScript, and AI systems.",
};

interface BlogPageProps {
  readonly searchParams: Promise<{
    page?: string;
    search?: string;
    tag?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page, search, tag } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);

  const [postsResult, tags] = await Promise.all([
    getPublicPosts({
      page: currentPage,
      limit: 6,
      search,
      tag,
    }),
    getAllPublicTags(),
  ]);

  const { posts, total, totalPages } = postsResult;

  // Build pagination link helpers
  const createPageLink = (targetPage: number) => {
    const params = new URLSearchParams();
    if (targetPage > 1) params.set("page", targetPage.toString());
    if (search) params.set("search", search);
    if (tag) params.set("tag", tag);
    const query = params.toString();
    return `/blog${query ? `?${query}` : ""}`;
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Page Header */}
      <FadeIn className="border-border space-y-4 border-b pb-8">
        <span className="text-brand font-mono text-xs tracking-wider uppercase">
          Writings & Thoughts
        </span>
        <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
          Articles & Technical Notes
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Deep dives into modern web architecture, agentic AI development, and
          practical engineering lessons.
        </p>
      </FadeIn>

      {/* Filter and Search Bar */}
      <FadeIn delay={0.05} className="mt-8 space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Tag filter pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <Link
              href="/blog"
              className={`rounded-full px-3.5 py-1 font-mono text-xs transition-colors ${
                !tag
                  ? "bg-brand text-brand-foreground font-semibold"
                  : "border-border bg-card text-muted-foreground hover:border-brand/40 hover:text-foreground border"
              }`}
            >
              All Topics
            </Link>
            {tags.map((t) => {
              const isActive = tag?.toLowerCase() === t.toLowerCase();
              return (
                <Link
                  key={t}
                  href={`/blog?tag=${encodeURIComponent(t.toLowerCase())}`}
                  className={`rounded-full px-3 py-1 font-mono text-xs transition-colors ${
                    isActive
                      ? "bg-brand text-brand-foreground font-semibold"
                      : "border-border bg-card text-muted-foreground hover:border-brand/40 hover:text-foreground border"
                  }`}
                >
                  #{t}
                </Link>
              );
            })}
          </div>

          {/* Search bar */}
          <form method="GET" action="/blog" className="relative w-full sm:w-64">
            {tag && <input type="hidden" name="tag" value={tag} />}
            <Search className="text-muted-foreground absolute top-1/2 left-3 size-3.5 -translate-y-1/2" />
            <input
              type="search"
              name="search"
              defaultValue={search || ""}
              placeholder="Search articles..."
              className="border-input bg-card text-foreground placeholder:text-muted-foreground/60 focus:border-brand w-full rounded-full border py-1.5 pr-4 pl-8 text-xs focus:outline-none"
            />
          </form>
        </div>
      </FadeIn>

      {/* Posts Grid or Empty State */}
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
              {search || tag
                ? "No published articles matched your search or tag criteria."
                : "Articles are currently in preparation and will be published shortly."}
            </p>
            {(search || tag) && (
              <Link
                href="/blog"
                className="text-brand mt-4 font-mono text-xs hover:underline"
              >
                Clear filters
              </Link>
            )}
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
                  Showing page {currentPage} of {totalPages} ({total} articles)
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

