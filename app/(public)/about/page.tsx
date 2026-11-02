import type { Metadata } from "next";
import Link from "next/link";
import {
  GraduationCap,
  MapPin,
  Sparkles,
  User,
  ArrowRight,
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { getSiteConfig } from "@/services/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Manthan, a B.Tech CSE student at PIET and developer specializing in Full Stack and AI applications.",
};

export default async function AboutPage() {
  const site = await getSiteConfig();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <FadeIn className="border-border space-y-4 border-b pb-8">
        <span className="text-brand font-mono text-xs tracking-wider uppercase">
          Background & Story
        </span>
        <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
          About Me
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Full Stack & AI Developer focusing on high-impact products and clean
          code.
        </p>
      </FadeIn>

      <div className="mt-10 grid gap-12 md:grid-cols-[1fr_280px]">
        {/* Main story */}
        <FadeIn
          delay={0.1}
          className="text-muted-foreground space-y-6 text-sm leading-relaxed sm:text-base"
        >
          <p>
            Hello! I&apos;m{" "}
            <span className="text-foreground font-medium">{site.name}</span>, a
            pre-final year undergraduate pursuing a Bachelor of Technology in
            Computer Science & Engineering (Batch 2023–2027) based in{" "}
            <span className="text-foreground font-medium">{site.location}</span>
            .
          </p>

          <p>
            My work is centered at the intersection of full-stack web
            engineering and practical AI systems. I enjoy building things
            end-to-end: from designing accessible, performant user interfaces
            with Next.js and Tailwind CSS to architecting typed backend APIs,
            database models, and integrating intelligent LLM workflows.
          </p>

          <div className="border-border bg-card space-y-3 rounded-lg border p-6">
            <div className="text-foreground flex items-center gap-2 text-sm font-medium">
              <Sparkles className="text-brand size-4" />
              <span>What I Like Building</span>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Production web applications with type safety, minimal editorial
              design, and practical AI tooling that automates repetitive tasks
              or delivers intelligent user insights.
            </p>
          </div>

          <div className="border-border bg-card space-y-3 rounded-lg border p-6">
            <div className="text-foreground flex items-center gap-2 text-sm font-medium">
              <GraduationCap className="text-brand size-4" />
              <span>Education</span>
            </div>
            <div>
              <h3 className="text-foreground text-sm font-medium">
                Parul Institute of Engineering & Technology (PIET)
              </h3>
              <p className="text-muted-foreground text-xs">
                B.Tech in Computer Science & Engineering (2023–2027)
              </p>
              <p className="text-muted-foreground/80 mt-1 font-mono text-[11px]">
                Vadodara, Gujarat, India
              </p>
            </div>
          </div>

          <div className="border-border bg-card space-y-3 rounded-lg border p-6">
            <div className="text-foreground flex items-center gap-2 text-sm font-medium">
              <MapPin className="text-brand size-4" />
              <span>Current Focus & Availability</span>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Actively preparing and interviewing for Full Stack Developer and
              AI Developer roles. Ready for internships, full-time
              opportunities, and challenging freelance projects.
            </p>
          </div>

          <div className="pt-4">
            <Button
              asChild
              size="lg"
              className="bg-brand text-brand-foreground hover:bg-brand/90 font-medium"
            >
              <Link href="/contact">
                Contact Me Directly
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </FadeIn>

        {/* Sidebar / Photo Card */}
        <FadeIn delay={0.2} className="space-y-6">
          <div className="border-border bg-card flex flex-col items-center justify-center rounded-xl border p-6 text-center">
            {/* Profile photo placeholder per Rule 2 */}
            <div className="border-border bg-muted/60 text-muted-foreground flex size-36 items-center justify-center rounded-full border-2 border-dashed">
              <User className="text-muted-foreground/70 size-16 stroke-1" />
            </div>

            <h2 className="text-foreground mt-4 text-base font-semibold">
              {site.name}
            </h2>
            <p className="text-brand font-mono text-xs">{site.role}</p>
            <p className="text-muted-foreground mt-2 text-xs">
              {site.location}
            </p>

            <div className="border-border/80 bg-muted/40 mt-5 w-full rounded border p-2 text-left">
              <span className="text-muted-foreground block font-mono text-[10px] uppercase">
                Status
              </span>
              <p className="text-foreground mt-0.5 text-xs font-medium">
                Seeking Dev Roles
              </p>
            </div>

            <p className="text-muted-foreground/60 mt-4 font-mono text-[11px]">
              TODO(manthan): Profile photo
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
