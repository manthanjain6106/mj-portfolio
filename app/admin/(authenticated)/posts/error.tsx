"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminPostsErrorProps {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

export default function AdminPostsError({
  error,
  reset,
}: AdminPostsErrorProps) {
  useEffect(() => {
    console.error("Admin posts error:", error);
  }, [error]);

  return (
    <div className="border-border bg-card mx-auto flex max-w-xl flex-col items-center justify-center rounded-xl border p-8 text-center sm:p-12">
      <div className="border-destructive/20 bg-destructive/10 text-destructive rounded-full border p-3">
        <AlertCircle className="size-6" />
      </div>
      <h2 className="text-foreground mt-4 text-base font-semibold">
        Failed to load blog posts
      </h2>
      <p className="text-muted-foreground mt-1 max-w-sm text-xs">
        {error.message || "An unexpected error occurred while loading posts."}
      </p>
      <Button
        onClick={() => reset()}
        variant="outline"
        size="sm"
        className="mt-5"
      >
        <RotateCcw className="mr-1.5 size-3.5" />
        Retry
      </Button>
    </div>
  );
}
