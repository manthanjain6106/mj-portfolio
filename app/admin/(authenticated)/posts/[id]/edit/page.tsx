import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { getAdminPostById } from "@/services/posts";
import { PostForm } from "@/components/admin/post-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Blog Post | Admin Panel",
};

interface EditAdminPostPageProps {
  readonly params: Promise<{ id: string }>;
}

export default async function EditAdminPostPage({
  params,
}: EditAdminPostPageProps) {
  await requireAdmin();
  const { id } = await params;

  const post = await getAdminPostById(id);
  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="border-border border-b pb-4">
        <span className="text-brand font-mono text-xs tracking-wider uppercase">
          Editing Article
        </span>
        <h1 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
          Edit &ldquo;{post.title}&rdquo;
        </h1>
      </div>

      <PostForm initialPost={post} />
    </div>
  );
}
