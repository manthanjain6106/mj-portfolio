"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogErrorProps {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

export default function BlogError({ error, reset }: BlogErrorProps) {
  useEffect(() => {
    console.error("Blog page error:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6">
      <div className="border-border bg-card/60 mx-auto flex max-w-lg flex-col items-center justify-center rounded-xl border p-8 text-center sm:p-12">
        <div className="border-destructive/20 bg-destructive/10 text-destructive rounded-full border p-3">
          <AlertCircle className="size-6" />
        </div>
        <h1 className="text-foreground mt-4 text-lg font-semibold tracking-tight">
          Unable to load articles
        </h1>
        <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
          {error.message ||
            "We encountered an issue loading blog posts. Please try again."}
        </p>

        <div className="mt-6 flex items-center gap-3">
          <Button onClick={() => reset()} variant="outline" size="sm">
            <RotateCcw className="mr-1.5 size-3.5" />
            Try again
          </Button>
          <Button asChild size="sm">
            <Link href="/">
              <Home className="mr-1.5 size-3.5" />
              Return home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
