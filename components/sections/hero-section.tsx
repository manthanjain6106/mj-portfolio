import Link from "next/link";
import { ArrowRight, FileDown, Mail } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import type { SiteConfig } from "@/content/site";

interface HeroSectionProps {
  readonly site: SiteConfig;
}

export function HeroSection({ site }: HeroSectionProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="border-border relative flex flex-col justify-center border-b py-16 sm:py-24"
    >
      <FadeIn className="max-w-3xl space-y-6">
        <div className="border-border bg-muted/60 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
          <span className="bg-brand size-2 rounded-full" aria-hidden="true" />
          <span>{site.role}</span>
        </div>

        <h1
          id="hero-heading"
          className="text-foreground text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
        >
          Hi, I&apos;m{" "}
          <span className="text-brand decoration-brand/30 underline underline-offset-4">
            {site.name}
          </span>
          .
        </h1>

        <p className="text-muted-foreground text-lg leading-relaxed sm:text-xl">
          {site.tagline}
        </p>

        <p className="text-muted-foreground/90 max-w-2xl text-sm leading-relaxed sm:text-base">
          {site.bioSummary}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button
            asChild
            size="lg"
            className="bg-brand text-brand-foreground hover:bg-brand/90 font-medium"
          >
            <Link href="/projects">
              View Projects
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href="/resume">
              <FileDown className="mr-2 size-4" />
              Download Resume
            </Link>
          </Button>

          <Button asChild variant="ghost" size="lg">
            <Link href="/contact">
              <Mail className="mr-2 size-4" />
              Contact
            </Link>
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}
