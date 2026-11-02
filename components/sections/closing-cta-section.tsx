import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import type { SiteConfig } from "@/content/site";

interface ClosingCtaSectionProps {
  readonly site: SiteConfig;
}

export function ClosingCtaSection({ site }: ClosingCtaSectionProps) {
  return (
    <section aria-labelledby="closing-cta-heading" className="py-20 sm:py-28">
      <FadeIn className="border-border bg-card gap-8 rounded-2xl border p-8 text-center sm:p-12 md:flex md:items-center md:justify-between md:text-left">
        <div className="max-w-xl space-y-3">
          <span className="text-brand font-mono text-xs tracking-wider uppercase">
            Open for Opportunities
          </span>
          <h2
            id="closing-cta-heading"
            className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Looking for a dedicated developer for your team or product?
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            {site.availability} Located in {site.location}, open to remote and
            on-site roles.
          </p>
        </div>

        <div className="mt-6 flex shrink-0 flex-col items-center justify-center gap-3 sm:flex-row md:mt-0">
          <Button
            asChild
            size="lg"
            className="bg-brand text-brand-foreground hover:bg-brand/90 w-full font-medium sm:w-auto"
          >
            <Link href="/contact">
              <Mail className="mr-2 size-4" />
              Get in Touch
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link href="/projects">
              View All Work
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
