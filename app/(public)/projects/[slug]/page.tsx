import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  FolderGit2,
  CheckCircle2,
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { Button } from "@/components/ui/button";
import {
  getPublishedProjectBySlug,
  getPublishedProjects,
} from "@/services/projects";

export const revalidate = 60;

interface ProjectPageProps {
  readonly params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.summary,
  };
}

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectCaseStudyPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <FadeIn className="border-border space-y-6 border-b pb-8">
        <Link
          href="/projects"
          className="text-muted-foreground hover:text-foreground inline-flex items-center text-xs font-medium transition-colors"
        >
          <ArrowLeft className="mr-1.5 size-3.5" />
          Back to all projects
        </Link>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="bg-brand/10 border-brand/30 text-brand rounded border px-2.5 py-0.5 font-mono text-xs tracking-wider uppercase">
              {project.category}
            </span>
            <span className="text-muted-foreground font-mono text-xs">
              Role: {project.role}
            </span>
          </div>

          <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {project.title}
          </h1>

          <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
            {project.summary}
          </p>
        </div>

        {/* Live / Source CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.liveUrl && project.liveUrl.startsWith("http") && (
            <Button
              asChild
              size="default"
              className="bg-brand text-brand-foreground hover:bg-brand/90 font-medium"
            >
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Live Demo</span>
                <ExternalLink className="ml-2 size-3.5" />
              </a>
            </Button>
          )}

          {project.repoUrl && project.repoUrl.startsWith("http") && (
            <Button asChild variant="outline" size="default">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FolderGit2 className="mr-2 size-3.5" />
                <span>Source Code</span>
              </a>
            </Button>
          )}
        </div>
      </FadeIn>

      <div className="mt-12 space-y-12">
        {/* Tech Stack Strip */}
        <FadeIn
          delay={0.05}
          className="border-border bg-card rounded-xl border p-6"
        >
          <h2 className="text-muted-foreground mb-3 font-mono text-xs tracking-wider uppercase">
            Technologies & Tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="border-border bg-muted/60 text-foreground rounded-md border px-3 py-1 font-mono text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* Problem & Solution Case Study */}
        <div className="grid gap-8 md:grid-cols-2">
          <FadeIn
            delay={0.1}
            className="border-border bg-card space-y-4 rounded-xl border p-6 sm:p-8"
          >
            <h2 className="text-foreground border-border/80 border-b pb-3 text-lg font-semibold tracking-tight">
              The Challenge / Problem
            </h2>
            <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
              {project.problem}
            </div>
          </FadeIn>

          <FadeIn
            delay={0.15}
            className="border-border bg-card space-y-4 rounded-xl border p-6 sm:p-8"
          >
            <h2 className="text-foreground border-border/80 flex items-center gap-2 border-b pb-3 text-lg font-semibold tracking-tight">
              <CheckCircle2 className="text-brand size-4" />
              <span>Architectural Solution</span>
            </h2>
            <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
              {project.solution}
            </div>
          </FadeIn>
        </div>

        {/* Image Gallery */}
        {project.images && project.images.length > 0 && (
          <FadeIn delay={0.2} className="space-y-4">
            <h2 className="text-foreground text-xl font-semibold tracking-tight">
              Screenshots & Interface
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {project.images.map((image, idx) => (
                <div
                  key={image.publicId || idx}
                  className="group border-border bg-card relative overflow-hidden rounded-xl border"
                >
                  <div className="bg-muted relative aspect-video w-full">
                    <Image
                      src={image.url}
                      alt={
                        image.alt || `${project.title} screenshot ${idx + 1}`
                      }
                      fill
                      className="object-cover transition-transform group-hover:scale-[1.02]"
                    />
                  </div>
                  {image.alt && (
                    <div className="text-muted-foreground border-border border-t p-3 text-xs">
                      {image.alt}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>
        )}
      </div>
    </article>
  );
}
