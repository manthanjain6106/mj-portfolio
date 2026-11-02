"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProjectCaseStudyError({
  error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) {
  useEffect(() => {
    console.error("Project case study error:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
      <div className="mx-auto max-w-md space-y-4">
        <div className="border-destructive/30 bg-destructive/10 text-destructive mx-auto inline-flex size-12 items-center justify-center rounded-full border">
          <AlertCircle className="size-6" />
        </div>
        <h2 className="text-foreground text-xl font-semibold tracking-tight">
          Failed to load project case study
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm">
          {error.message ||
            "An unexpected error occurred while fetching project details."}
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button onClick={() => reset()} variant="outline" size="sm">
            <RotateCcw className="mr-1.5 size-3.5" />
            Try again
          </Button>
          <Button asChild size="sm">
            <Link href="/projects">
              <ArrowLeft className="mr-1.5 size-3.5" />
              All Projects
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
