"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminProjectsError({
  error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin projects error:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-5xl py-16 text-center">
      <div className="border-border bg-card mx-auto max-w-md space-y-4 rounded-xl border p-8">
        <div className="border-destructive/30 bg-destructive/10 text-destructive mx-auto inline-flex size-12 items-center justify-center rounded-full border">
          <AlertCircle className="size-6" />
        </div>
        <h2 className="text-foreground text-lg font-semibold tracking-tight">
          Database Query Failed
        </h2>
        <p className="text-muted-foreground text-xs">
          {error.message || "Failed to load projects from MongoDB Atlas."}
        </p>
        <div className="pt-2">
          <Button onClick={() => reset()} variant="outline" size="sm">
            <RotateCcw className="mr-1.5 size-3.5" />
            Retry Query
          </Button>
        </div>
      </div>
    </div>
  );
}
