import type { Metadata } from "next";
import { Download, FileText, AlertCircle } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import { getSiteConfig } from "@/services/site";
import { getSkillGroups } from "@/services/skills";
import { getFeaturedProjects } from "@/services/projects";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Curriculum Vitae and professional resume of Manthan, Full Stack & AI Developer.",
};

export default async function ResumePage() {
  const [site, skillGroups, featuredProjects] = await Promise.all([
    getSiteConfig(),
    getSkillGroups(),
    getFeaturedProjects(),
  ]);

  const hasDirectPdf = site.resumeUrl.endsWith(".pdf");

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <FadeIn className="border-border flex flex-col gap-4 border-b pb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-brand font-mono text-xs tracking-wider uppercase">
            Curriculum Vitae
          </span>
          <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
            Resume
          </h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Professional background, technical stack, and verified project
            milestones.
          </p>
        </div>

        <div>
          {hasDirectPdf ? (
            <Button
              asChild
              size="lg"
              className="bg-brand text-brand-foreground hover:bg-brand/90 font-medium"
            >
              <a href={site.resumeUrl} download="Manthan_Resume.pdf">
                <Download className="mr-2 size-4" />
                Download PDF
              </a>
            </Button>
          ) : (
            <Button
              size="lg"
              variant="outline"
              disabled
              title="Resume PDF file upload pending"
            >
              <Download className="mr-2 size-4" />
              Download PDF (Upload Pending)
            </Button>
          )}
        </div>
      </FadeIn>

      {!hasDirectPdf && (
        <FadeIn
          delay={0.05}
          className="border-border/80 bg-muted/40 mt-6 flex items-start gap-3 rounded-lg border p-4"
        >
          <AlertCircle className="text-brand mt-0.5 size-5 shrink-0" />
          <div className="text-muted-foreground text-xs sm:text-sm">
            <span className="text-foreground font-semibold">
              Note for Reviewer:
            </span>{" "}
            Official PDF upload pending in content:{" "}
            <code className="text-brand font-mono text-xs">
              {site.resumeUrl}
            </code>
            . Below is the full inline view formatted directly from the verified
            content source of truth.
          </div>
        </FadeIn>
      )}

      {/* Inline Resume Document View */}
      <FadeIn
        delay={0.1}
        className="border-border bg-card mt-8 space-y-10 rounded-xl border p-6 shadow-sm sm:p-12"
      >
        {/* Document Header */}
        <div className="border-border flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <h2 className="text-foreground text-2xl font-bold tracking-tight">
              {site.name}
            </h2>
            <p className="text-brand mt-0.5 font-mono text-sm">{site.role}</p>
          </div>
          <div className="text-muted-foreground space-y-1 text-left font-mono text-xs sm:text-right">
            <p>{site.location}</p>
            <p>{site.availability}</p>
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-3">
          <h3 className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
            Education
          </h3>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h4 className="text-foreground text-sm font-semibold">
              Parul Institute of Engineering & Technology (PIET)
            </h4>
            <span className="text-muted-foreground font-mono text-xs">
              2023 – 2027
            </span>
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm">
            B.Tech in Computer Science & Engineering • Vadodara, Gujarat, India
          </p>
        </div>

        {/* Technical Skills Section */}
        <div className="space-y-4">
          <h3 className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
            Technical Stack
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <div key={group.category} className="space-y-1">
                <span className="text-foreground text-xs font-medium">
                  {group.category}:
                </span>
                <p className="text-muted-foreground text-xs">
                  {group.skills.map((s) => s.name).join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Projects in Resume */}
        <div className="space-y-4">
          <h3 className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
            Key Projects
          </h3>
          <div className="space-y-4">
            {featuredProjects.map((project) => (
              <div
                key={project.slug}
                className="border-border space-y-1 border-l-2 pl-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-foreground text-sm font-semibold">
                    {project.title}
                  </h4>
                  <span className="text-muted-foreground font-mono text-[11px] uppercase">
                    {project.category}
                  </span>
                </div>
                <p className="text-muted-foreground text-xs">
                  {project.summary}
                </p>
                <p className="text-muted-foreground/80 font-mono text-[11px]">
                  Stack: {project.techStack.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-border/80 text-muted-foreground flex items-center justify-between border-t pt-6 text-xs">
          <div className="flex items-center gap-1.5">
            <FileText className="text-brand size-4" />
            <span>Inline verified CV snapshot</span>
          </div>
          <span className="font-mono text-[11px]">mj-portfolio v1.0</span>
        </div>
      </FadeIn>
    </div>
  );
}
