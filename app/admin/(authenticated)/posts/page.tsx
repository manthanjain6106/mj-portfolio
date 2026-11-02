import type { Metadata } from "next";
import Link from "next/link";
import { Plus, FileText, Search } from "lucide-react";
import { requireAdmin } from "@/lib/admin-auth";
import { getAllAdminPosts } from "@/services/posts";
import { Button } from "@/components/ui/button";
import { PostRowActions } from "@/components/admin/post-row-actions";
import type { PostStatus } from "@/models/Post";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog Posts | Admin Panel",
};

interface AdminPostsPageProps {
  readonly searchParams: Promise<{
    status?: "all" | PostStatus;
    search?: string;
  }>;
}

export default async function AdminPostsPage({
  searchParams,
}: AdminPostsPageProps) {
  await requireAdmin();
  const { status, search } = await searchParams;
  const posts = await getAllAdminPosts({ status, search });

  const currentStatus = status || "all";

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Page Header */}
      <div className="border-border flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-brand font-mono text-xs tracking-wider uppercase">
            Editorial Management
          </span>
          <h1 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
            Blog Posts ({posts.length})
          </h1>
        </div>

        <Button
          asChild
          className="bg-brand text-brand-foreground hover:bg-brand/90 font-medium"
        >
          <Link href="/admin/posts/new">
            <Plus className="mr-1.5 size-4" />
            New Post
          </Link>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Status Filter Tabs */}
        <div className="border-border bg-muted/40 inline-flex flex-wrap items-center rounded-lg border p-1 text-xs">
          {[
            { label: "All", value: "all" },
            { label: "Published", value: "published" },
            { label: "Scheduled", value: "scheduled" },
            { label: "Drafts", value: "draft" },
          ].map((tab) => {
            const isActive = currentStatus === tab.value;
            const queryParams = new URLSearchParams();
            if (tab.value !== "all") queryParams.set("status", tab.value);
            if (search) queryParams.set("search", search);
            const href = `/admin/posts${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

            return (
              <Link
                key={tab.value}
                href={href}
                className={`rounded-md px-3 py-1.5 font-medium transition-colors ${
                  isActive
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>

        {/* Search Input Form */}
        <form
          method="GET"
          action="/admin/posts"
          className="relative w-full sm:w-64"
        >
          {status && status !== "all" && (
            <input type="hidden" name="status" value={status} />
          )}
          <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
          <input
            type="search"
            name="search"
            defaultValue={search || ""}
            placeholder="Search by title or slug..."
            className="border-input bg-background text-foreground placeholder:text-muted-foreground/60 focus:border-brand w-full rounded-md border py-1.5 pr-3 pl-8 text-xs focus:outline-none"
          />
        </form>
      </div>

      {/* Posts Table or Empty State */}
      {posts.length === 0 ? (
        <div className="border-border bg-card/60 flex flex-col items-center justify-center rounded-xl border border-dashed p-12 text-center">
          <div className="border-border bg-muted text-brand rounded-full border p-3">
            <FileText className="size-6" />
          </div>
          <h2 className="text-foreground mt-4 text-base font-medium">
            No posts found
          </h2>
          <p className="text-muted-foreground mt-1 max-w-sm text-xs">
            {search
              ? `No articles matched the query "${search}". Try searching with different keywords.`
              : "No articles have been created yet. Draft your first blog post to share insights."}
          </p>
          <Button
            asChild
            size="sm"
            className="bg-brand text-brand-foreground hover:bg-brand/90 mt-5 font-medium"
          >
            <Link href="/admin/posts/new">
              <Plus className="mr-1.5 size-3.5" />
              Write First Post
            </Link>
          </Button>
        </div>
      ) : (
        <div className="border-border bg-card overflow-hidden rounded-xl border shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-border bg-muted/40 text-muted-foreground border-b font-mono text-[11px] uppercase">
                <tr>
                  <th className="px-4 py-3 font-medium">Post Title</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Read Time</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-border/60 divide-y">
                {posts.map((post) => {
                  const displayDate = post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });

                  return (
                    <tr
                      key={post._id}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="text-foreground text-sm font-medium">
                          {post.title}
                        </div>
                        <div className="text-muted-foreground font-mono text-[11px]">
                          /{post.slug}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 font-mono text-[10px] font-medium uppercase ${
                            post.status === "published"
                              ? "bg-brand-muted/40 text-brand border-brand/30 border"
                              : post.status === "scheduled"
                                ? "bg-accent text-accent-foreground border-border border"
                                : "bg-muted text-muted-foreground border-border border"
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="text-muted-foreground px-4 py-3">
                        {displayDate}
                      </td>
                      <td className="text-muted-foreground px-4 py-3">
                        {post.readingTime} min
                      </td>
                      <td className="px-4 py-3 text-right">
                        <PostRowActions post={post} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
