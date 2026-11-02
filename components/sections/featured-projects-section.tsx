import Link from "next/link";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import type { ProjectItem } from "@/content/projects.seed";

interface FeaturedProjectsSectionProps {
  readonly projects: readonly ProjectItem[];
}

export function FeaturedProjectsSection({
  projects,
}: FeaturedProjectsSectionProps) {
  return (
    <section
      aria-labelledby="featured-projects-heading"
      className="border-border border-b py-16 sm:py-20"
    >
      <FadeIn className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="text-brand font-mono text-xs tracking-wider uppercase">
            Proof of Work
          </span>
          <h2
            id="featured-projects-heading"
            className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Featured Projects
          </h2>
        </div>

        <Link
          href="/projects"
          className="group text-muted-foreground hover:text-brand inline-flex items-center text-sm font-medium transition-colors"
        >
          <span>All projects</span>
          <ArrowUpRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </FadeIn>

      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((project, index) => (
          <FadeIn
            key={project.slug}
            delay={index * 0.1}
            className="group border-border bg-card hover:border-brand/40 flex flex-col justify-between rounded-lg border p-6 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="border-border bg-muted/50 text-muted-foreground inline-flex items-center rounded border px-2 py-0.5 font-mono text-[11px] tracking-wide uppercase">
                  {project.category}
                </span>
                <span className="text-muted-foreground font-mono text-xs">
                  0{index + 1}
                </span>
              </div>

              <h3 className="text-foreground group-hover:text-brand text-lg font-semibold tracking-tight transition-colors">
                {project.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {project.summary}
              </p>
            </div>

            <div className="border-border/60 mt-6 space-y-3 border-t pt-4">
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="bg-muted text-muted-foreground rounded px-2 py-0.5 font-mono text-[11px]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-2 text-xs font-medium">
                {project.repoUrl.startsWith("http") ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                  >
                    <FolderGit2 className="size-3.5" />
                    <span>Source</span>
                  </a>
                ) : (
                  <span className="text-muted-foreground/70 font-mono text-[11px]">
                    Source in progress
                  </span>
                )}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
