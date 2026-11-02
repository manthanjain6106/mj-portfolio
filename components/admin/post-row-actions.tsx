"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit2, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deletePostAction, togglePostStatusAction } from "@/app/actions/posts";
import type { SerializedPost } from "@/services/posts";
import type { PostStatus } from "@/models/Post";

interface PostRowActionsProps {
  readonly post: SerializedPost;
}

export function PostRowActions({ post }: PostRowActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isToggling, setIsToggling] = React.useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${post.title}"?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      await deletePostAction(post._id);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete post");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value as PostStatus;
    setIsToggling(true);
    try {
      await togglePostStatusAction(post._id, newStatus);
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to change status");
    } finally {
      setIsToggling(false);
    }
  };

  const isPublicNow =
    post.status === "published" ||
    (post.status === "scheduled" &&
      post.publishedAt &&
      new Date(post.publishedAt) <= new Date());

  return (
    <div className="flex items-center justify-end gap-2">
      {/* Quick Status Select */}
      <select
        value={post.status}
        onChange={handleStatusChange}
        disabled={isToggling}
        className="border-input bg-background text-foreground focus:border-brand rounded border px-2 py-1 text-xs focus:outline-none"
        aria-label="Change publication status"
      >
        <option value="draft">Draft</option>
        <option value="scheduled">Scheduled</option>
        <option value="published">Published</option>
      </select>

      {/* View Live if public */}
      {isPublicNow && (
        <Button variant="ghost" size="icon-sm" asChild title="View public post">
          <Link
            href={`/blog/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View public post"
          >
            <ExternalLink className="size-3.5" />
          </Link>
        </Button>
      )}

      {/* Edit */}
      <Button variant="ghost" size="icon-sm" asChild title="Edit post">
        <Link href={`/admin/posts/${post._id}/edit`} aria-label="Edit post">
          <Edit2 className="size-3.5" />
        </Link>
      </Button>

      {/* Delete */}
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-muted-foreground hover:text-destructive"
        title="Delete post"
        aria-label="Delete post"
      >
        {isDeleting ? (
          <Loader2 className="size-3.5 animate-spin" />
        ) : (
          <Trash2 className="size-3.5" />
        )}
      </Button>
    </div>
  );
}
