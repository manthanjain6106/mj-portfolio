import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { getPublishedProjects } from "@/services/projects";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Curated software engineering case studies, full-stack web applications, and AI systems built by Manthan.",
};

const CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "fullstack", label: "Full Stack" },
  { id: "ai", label: "AI" },
  { id: "hardware", label: "Hardware" },
  { id: "other", label: "Other" },
] as const;

interface ProjectsPageProps {
  readonly searchParams: Promise<{
    category?: string;
  }>;
}

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const { category = "all" } = await searchParams;
  const projects = await getPublishedProjects(category);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <FadeIn className="border-border space-y-4 border-b pb-8">
        <span className="text-brand font-mono text-xs tracking-wider uppercase">
          Proof of Work
        </span>
        <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
          Projects & Case Studies
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Explore real problems solved with full-stack engineering and
          intelligent AI systems.
        </p>
      </FadeIn>

      {/* Category Filter Navigation */}
      <FadeIn delay={0.05} className="mt-8 flex flex-wrap items-center gap-2">
        {CATEGORIES.map((cat) => {
          const isActive = category === cat.id;
          return (
            <Link
              key={cat.id}
              href={
                cat.id === "all" ? "/projects" : `/projects?category=${cat.id}`
              }
              className={`rounded-full px-4 py-1.5 font-mono text-xs transition-colors ${
                isActive
                  ? "bg-brand text-brand-foreground font-semibold"
                  : "border-border bg-card text-muted-foreground hover:border-brand/40 hover:text-foreground border"
              }`}
            >
              {cat.label}
            </Link>
          );
        })}
      </FadeIn>

      {/* Projects Grid */}
      <div className="mt-10">
        {projects.length === 0 ? (
          <FadeIn className="border-border bg-card/40 flex flex-col items-center justify-center rounded-xl border border-dashed p-12 text-center">
            <div className="border-border bg-muted text-brand rounded-full border p-3">
              <FolderGit2 className="size-6" />
            </div>
            <h2 className="text-foreground mt-4 text-base font-medium">
              No published projects found
            </h2>
            <p className="text-muted-foreground mt-1 max-w-sm text-xs">
              {category !== "all"
                ? `No published projects under the "${category}" filter.`
                : "Projects are currently in draft status in the admin panel and will be published shortly."}
            </p>
            {category !== "all" && (
              <Link
                href="/projects"
                className="text-brand mt-4 font-mono text-xs hover:underline"
              >
                Clear category filter
              </Link>
            )}
          </FadeIn>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <FadeIn
                key={project._id.toString()}
                delay={index * 0.06}
                className="group border-border bg-card hover:border-brand/40 flex flex-col justify-between rounded-xl border p-6 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-muted text-muted-foreground rounded px-2 py-0.5 font-mono text-[11px] tracking-wide uppercase">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="text-brand border-brand/30 bg-brand/10 py-0.2 rounded border px-1.5 font-mono text-[10px]">
                        Featured
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="group block"
                  >
                    <h2 className="text-foreground group-hover:text-brand flex items-center justify-between text-lg font-semibold tracking-tight transition-colors">
                      <span>{project.title}</span>
                      <ArrowUpRight className="text-brand size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </h2>
                  </Link>

                  <p className="text-muted-foreground line-clamp-3 text-xs leading-relaxed">
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

                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-brand inline-flex items-center pt-1 text-xs font-medium hover:underline"
                  >
                    <span>Read case study</span>
                    <ArrowUpRight className="ml-1 size-3.5" />
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
