"use client";

import * as React from "react";
import Link from "next/link";
import { Edit, Trash2, Star, Loader2, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  toggleProjectFeaturedAction,
  toggleProjectStatusAction,
  deleteProjectAction,
  reorderProjectAction,
} from "@/app/actions/projects";

interface ProjectRowActionsProps {
  readonly id: string;
  readonly slug: string;
  readonly featured: boolean;
  readonly status: "draft" | "published";
  readonly order: number;
}

export function ProjectRowActions({
  id,
  featured,
  status,
  order,
}: ProjectRowActionsProps) {
  const [isPending, startTransition] = React.useTransition();

  const handleToggleFeatured = () => {
    startTransition(async () => {
      await toggleProjectFeaturedAction(id);
    });
  };

  const handleToggleStatus = () => {
    startTransition(async () => {
      await toggleProjectStatusAction(id);
    });
  };

  const handleReorder = (delta: number) => {
    startTransition(async () => {
      await reorderProjectAction(id, order + delta);
    });
  };

  const handleDelete = () => {
    if (
      confirm(
        "Are you sure you want to delete this project? Images will also be removed from Cloudinary."
      )
    ) {
      startTransition(async () => {
        await deleteProjectAction(id);
      });
    }
  };

  return (
    <div className="flex items-center justify-end gap-1.5">
      {/* Reorder Buttons */}
      <div className="border-border mr-1 flex items-center gap-0.5 border-r pr-1">
        <button
          type="button"
          onClick={() => handleReorder(-1)}
          disabled={isPending}
          className="text-muted-foreground hover:text-foreground p-1 disabled:opacity-50"
          title="Move up in order"
        >
          <ArrowUp className="size-3" />
        </button>
        <span className="text-muted-foreground w-4 text-center font-mono text-[11px]">
          {order}
        </span>
        <button
          type="button"
          onClick={() => handleReorder(1)}
          disabled={isPending}
          className="text-muted-foreground hover:text-foreground p-1 disabled:opacity-50"
          title="Move down in order"
        >
          <ArrowDown className="size-3" />
        </button>
      </div>

      {/* Featured Toggle */}
      <button
        type="button"
        onClick={handleToggleFeatured}
        disabled={isPending}
        className={`rounded p-1.5 transition-colors ${
          featured
            ? "text-brand hover:text-brand/80"
            : "text-muted-foreground/50 hover:text-foreground"
        }`}
        title={
          featured
            ? "Featured on Home (Click to unfeature)"
            : "Not featured (Click to feature)"
        }
      >
        <Star className={`size-3.5 ${featured ? "fill-brand" : ""}`} />
      </button>

      {/* Status Toggle */}
      <button
        type="button"
        onClick={handleToggleStatus}
        disabled={isPending}
        className={`rounded border px-2 py-0.5 font-mono text-[10px] uppercase transition-colors ${
          status === "published"
            ? "border-brand/40 bg-brand/10 text-brand"
            : "border-border bg-muted text-muted-foreground"
        }`}
        title="Click to toggle Draft / Published"
      >
        {status}
      </button>

      {/* Edit Link */}
      <Button asChild variant="ghost" size="icon-xs" title="Edit project">
        <Link href={`/admin/projects/${id}/edit`}>
          <Edit className="size-3.5" />
        </Link>
      </Button>

      {/* Delete Button */}
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="text-muted-foreground hover:text-destructive p-1.5 transition-colors disabled:opacity-50"
        title="Delete project"
      >
        {isPending ? (
          <Loader2 className="size-3.5 animate-spin" />
        ) : (
          <Trash2 className="size-3.5" />
        )}
      </button>
    </div>
  );
}
