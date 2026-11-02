import type { Metadata } from "next";
import { FileText, FolderGit2, Mail, Inbox, Sparkles } from "lucide-react";
import { requireAdmin } from "@/lib/admin-auth";
import { getAdminDashboardStats } from "@/services/admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard | Admin Panel",
};

export default async function AdminDashboardPage() {
  await requireAdmin();
  const stats = await getAdminDashboardStats();

  const STAT_CARDS = [
    {
      title: "Total Posts",
      count: stats.postsCount,
      icon: FileText,
      emptyMessage: "0 posts created",
      phaseNote: "CRUD in Phase 5",
    },
    {
      title: "Total Projects",
      count: stats.projectsCount,
      icon: FolderGit2,
      emptyMessage: "0 projects stored",
      phaseNote: "CRUD in Phase 4",
    },
    {
      title: "Unread Messages",
      count: stats.unreadMessagesCount,
      icon: Mail,
      emptyMessage: "0 unread messages",
      phaseNote: "Inbox in Phase 6",
    },
  ] as const;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <span className="text-brand font-mono text-xs tracking-wider uppercase">
          System Overview
        </span>
        <h1 className="text-foreground text-3xl font-semibold tracking-tight">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Real-time database metrics and administrative activity.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-6 sm:grid-cols-3">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="border-border bg-card rounded-xl border p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs font-medium">
                  {card.title}
                </span>
                <div className="border-border bg-muted text-brand rounded-md border p-2">
                  <Icon className="size-4" />
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-foreground text-3xl font-bold tracking-tight">
                  {card.count}
                </span>
                <span className="text-muted-foreground/70 font-mono text-[11px]">
                  {card.count === 0 ? card.emptyMessage : "active"}
                </span>
              </div>

              <div className="border-border/60 text-muted-foreground mt-3 border-t pt-2 font-mono text-[11px]">
                {card.phaseNote}
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity Streams (Recent Posts & Recent Messages) */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Posts */}
        <div className="border-border bg-card space-y-4 rounded-xl border p-6 shadow-sm">
          <div className="border-border/80 flex items-center justify-between border-b pb-3">
            <h2 className="text-foreground text-sm font-semibold">
              Recent Posts
            </h2>
            <span className="text-muted-foreground font-mono text-xs">
              {stats.recentPosts.length} items
            </span>
          </div>

          {stats.recentPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Inbox className="text-muted-foreground/60 size-8" />
              <p className="text-foreground mt-2 text-xs font-medium">
                No blog posts created yet
              </p>
              <p className="text-muted-foreground mt-0.5 text-[11px]">
                Post creation and Tiptap editor arrive in Phase 5.
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {stats.recentPosts.map((post) => (
                <li
                  key={post._id.toString()}
                  className="border-border/60 flex items-center justify-between rounded border p-2 text-xs"
                >
                  <span className="text-foreground max-w-[200px] truncate font-medium">
                    {post.title}
                  </span>
                  <span className="text-brand font-mono text-[10px]">
                    {post.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent Messages */}
        <div className="border-border bg-card space-y-4 rounded-xl border p-6 shadow-sm">
          <div className="border-border/80 flex items-center justify-between border-b pb-3">
            <h2 className="text-foreground text-sm font-semibold">
              Recent Inquiries
            </h2>
            <span className="text-muted-foreground font-mono text-xs">
              {stats.recentMessages.length} items
            </span>
          </div>

          {stats.recentMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Inbox className="text-muted-foreground/60 size-8" />
              <p className="text-foreground mt-2 text-xs font-medium">
                Inbox is empty
              </p>
              <p className="text-muted-foreground mt-0.5 text-[11px]">
                Contact submissions will automatically appear here in Phase 6.
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {stats.recentMessages.map((msg) => (
                <li
                  key={msg._id.toString()}
                  className="border-border/60 flex items-center justify-between rounded border p-2 text-xs"
                >
                  <span className="text-foreground max-w-[180px] truncate font-medium">
                    {msg.name} ({msg.subject})
                  </span>
                  <span className="text-muted-foreground font-mono text-[10px]">
                    {msg.read ? "read" : "new"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Security Architecture Note */}
      <div className="border-border bg-muted/40 text-muted-foreground flex items-center gap-3 rounded-xl border p-4 text-xs">
        <Sparkles className="text-brand size-4 shrink-0" />
        <span>
          <strong className="text-foreground">Phase 3 Security Active:</strong>{" "}
          Protected by Edge middleware and server-side session re-validation
          with single whitelisted administrator access.
        </span>
      </div>
    </div>
  );
}
