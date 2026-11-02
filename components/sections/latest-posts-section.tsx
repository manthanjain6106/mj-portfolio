import Link from "next/link";
import { BookOpen, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export function LatestPostsSection() {
  return (
    <section
      aria-labelledby="latest-posts-heading"
      className="border-border border-b py-16 sm:py-20"
    >
      <FadeIn className="space-y-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-brand font-mono text-xs tracking-wider uppercase">
              Writings & Insights
            </span>
            <h2
              id="latest-posts-heading"
              className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Latest Articles
            </h2>
          </div>

          <Link
            href="/blog"
            className="text-muted-foreground hover:text-brand inline-flex items-center text-sm font-medium transition-colors"
          >
            Visit blog archive
          </Link>
        </div>

        {/* Empty state per PRD Rule 6 & 10 (Blog publishing in Phase 5) */}
        <div className="border-border bg-card/50 flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center sm:p-12">
          <div className="border-border bg-muted text-brand rounded-full border p-3">
            <BookOpen className="size-6" />
          </div>
          <h3 className="text-foreground mt-4 text-base font-medium">
            Articles in preparation
          </h3>
          <p className="text-muted-foreground mt-2 max-w-md text-sm">
            Deep dives into full-stack engineering, Next.js architecture, and
            applied AI development will be published here soon.
          </p>
          <div className="border-brand/20 bg-brand-muted/40 text-brand mt-5 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs">
            <Sparkles className="size-3.5" />
            <span>Publishing flow arrives in Phase 5</span>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
