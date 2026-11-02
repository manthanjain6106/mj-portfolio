import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin-auth";
import { PostForm } from "@/components/admin/post-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "New Blog Post | Admin Panel",
};

export default async function NewAdminPostPage() {
  await requireAdmin();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="border-border border-b pb-4">
        <span className="text-brand font-mono text-xs tracking-wider uppercase">
          New Article
        </span>
        <h1 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
          Write a Blog Post
        </h1>
      </div>

      <PostForm />
    </div>
  );
}

