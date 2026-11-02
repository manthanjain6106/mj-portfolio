import Link from "next/link";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export interface FeaturedProjectItem {
  readonly title: string;
  readonly slug: string;
  readonly summary: string;
  readonly category: string;
  readonly techStack: readonly string[];
  readonly repoUrl?: string;
}

interface FeaturedProjectsSectionProps {
  readonly projects: readonly FeaturedProjectItem[];
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

      {projects.length === 0 ? (
        <FadeIn className="border-border bg-card/40 flex flex-col items-center justify-center rounded-xl border border-dashed p-12 text-center">
          <div className="border-border bg-muted text-brand rounded-full border p-3">
            <FolderGit2 className="size-6" />
          </div>
          <h3 className="text-foreground mt-4 text-base font-medium">
            No featured projects published yet
          </h3>
          <p className="text-muted-foreground mt-1 max-w-sm text-xs">
            Projects can be seeded as drafts and published in the admin panel.
          </p>
          <Link
            href="/projects"
            className="text-brand mt-4 font-mono text-xs hover:underline"
          >
            Explore all project archives
          </Link>
        </FadeIn>
      ) : (
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

                <Link href={`/projects/${project.slug}`} className="block">
                  <h3 className="text-foreground group-hover:text-brand text-lg font-semibold tracking-tight transition-colors">
                    {project.title}
                  </h3>
                </Link>

                <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
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

                <div className="flex items-center justify-between pt-2 text-xs font-medium">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-brand inline-flex items-center gap-1 hover:underline"
                  >
                    <span>Case study</span>
                    <ArrowUpRight className="size-3.5" />
                  </Link>

                  {project.repoUrl && project.repoUrl.startsWith("http") ? (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                    >
                      <FolderGit2 className="size-3.5" />
                      <span>Code</span>
                    </a>
                  ) : (
                    <span className="text-muted-foreground/70 font-mono text-[10px]">
                      Private / in dev
                    </span>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      )}
    </section>
  );
}
