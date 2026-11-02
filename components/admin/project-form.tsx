"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ImageUploader,
  type UploadedImage,
} from "@/components/admin/image-uploader";
import { slugify } from "@/lib/slug";
import { projectSchema, type ProjectInput } from "@/lib/validations/project";
import {
  createProjectAction,
  updateProjectAction,
} from "@/app/actions/projects";

interface ProjectFormProps {
  readonly initialData?: ProjectInput & { _id?: string };
  readonly isEditing?: boolean;
}

export function ProjectForm({
  initialData,
  isEditing = false,
}: ProjectFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const [error, setError] = React.useState<string | null>(null);

  const [title, setTitle] = React.useState(initialData?.title || "");
  const [slug, setSlug] = React.useState(initialData?.slug || "");
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] =
    React.useState(isEditing);
  const [summary, setSummary] = React.useState(initialData?.summary || "");
  const [problem, setProblem] = React.useState(initialData?.problem || "");
  const [solution, setSolution] = React.useState(initialData?.solution || "");
  const [role, setRole] = React.useState(initialData?.role || "");
  const [techStackText, setTechStackText] = React.useState(
    initialData?.techStack?.join(", ") || ""
  );
  const [category, setCategory] = React.useState<ProjectInput["category"]>(
    initialData?.category || "fullstack"
  );
  const [images, setImages] = React.useState<UploadedImage[]>(
    (initialData?.images as UploadedImage[]) || []
  );
  const [liveUrl, setLiveUrl] = React.useState(initialData?.liveUrl || "");
  const [repoUrl, setRepoUrl] = React.useState(initialData?.repoUrl || "");
  const [featured, setFeatured] = React.useState(
    initialData?.featured ?? false
  );
  const [order, setOrder] = React.useState(initialData?.order ?? 0);
  const [status, setStatus] = React.useState<ProjectInput["status"]>(
    initialData?.status || "draft"
  );

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isSlugManuallyEdited) {
      setSlug(slugify(val));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const techStack = techStackText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: ProjectInput = {
      title,
      slug,
      summary,
      problem,
      solution,
      role,
      techStack,
      category,
      images,
      liveUrl: liveUrl.trim() || undefined,
      repoUrl: repoUrl.trim() || undefined,
      featured,
      order,
      status,
    };

    const parsed = projectSchema.safeParse(payload);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || "Validation failed");
      return;
    }

    startTransition(async () => {
      try {
        if (isEditing && initialData?._id) {
          await updateProjectAction(initialData._id, parsed.data);
        } else {
          await createProjectAction(parsed.data);
        }
        router.push("/admin/projects");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save project");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="border-border flex items-center justify-between border-b pb-4">
        <Link
          href="/admin/projects"
          className="text-muted-foreground hover:text-foreground inline-flex items-center text-xs"
        >
          <ArrowLeft className="mr-1.5 size-3.5" />
          Back to projects
        </Link>
        <Button
          type="submit"
          disabled={isPending}
          className="bg-brand text-brand-foreground hover:bg-brand/90"
        >
          {isPending ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <Save className="mr-2 size-4" />
          )}
          {isEditing ? "Update Project" : "Create Project"}
        </Button>
      </div>

      {error && (
        <div className="border-destructive/40 bg-destructive/10 text-destructive rounded-lg border p-3 text-xs">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1 sm:col-span-2">
          <label className="text-foreground text-xs font-medium">
            Project Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="e.g. LeadAI"
            className="border-input bg-background text-foreground focus:border-brand w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-foreground text-xs font-medium">
            Slug (URL identifier) *
          </label>
          <input
            type="text"
            required
            value={slug}
            onChange={(e) => {
              setIsSlugManuallyEdited(true);
              setSlug(e.target.value);
            }}
            placeholder="lead-ai"
            className="border-input bg-background text-foreground focus:border-brand w-full rounded-md border px-3 py-2 font-mono text-sm focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-foreground text-xs font-medium">
            Category *
          </label>
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as ProjectInput["category"])
            }
            className="border-input bg-background text-foreground focus:border-brand w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
          >
            <option value="fullstack">Full Stack</option>
            <option value="ai">AI</option>
            <option value="hardware">Hardware</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-foreground text-xs font-medium">
          Short Summary *
        </label>
        <textarea
          rows={2}
          required
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="One-line summary for cards and lists..."
          className="border-input bg-background text-foreground focus:border-brand w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-foreground text-xs font-medium">Role *</label>
          <input
            type="text"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Full Stack Developer"
            className="border-input bg-background text-foreground focus:border-brand w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-foreground text-xs font-medium">
            Tech Stack (comma-separated) *
          </label>
          <input
            type="text"
            required
            value={techStackText}
            onChange={(e) => setTechStackText(e.target.value)}
            placeholder="Next.js, TypeScript, Tailwind, MongoDB"
            className="border-input bg-background text-foreground focus:border-brand w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-foreground text-xs font-medium">
          Problem Description *
        </label>
        <textarea
          rows={3}
          required
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="What problem or user challenge did this project address?"
          className="border-input bg-background text-foreground focus:border-brand w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
        />
      </div>

      <div className="space-y-1">
        <label className="text-foreground text-xs font-medium">
          Solution Description *
        </label>
        <textarea
          rows={3}
          required
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          placeholder="How did you architect and implement the solution?"
          className="border-input bg-background text-foreground focus:border-brand w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
        />
      </div>

      <div className="border-border bg-muted/20 rounded-lg border p-4">
        <ImageUploader images={images} onChange={setImages} maxImages={4} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-foreground text-xs font-medium">
            Live Demo URL
          </label>
          <input
            type="text"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            placeholder="https://..."
            className="border-input bg-background text-foreground focus:border-brand w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-foreground text-xs font-medium">
            GitHub Repo URL
          </label>
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/..."
            className="border-input bg-background text-foreground focus:border-brand w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
          />
        </div>
      </div>

      <div className="border-border flex flex-wrap items-center gap-6 border-t pt-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="featured"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="border-input text-brand focus:ring-brand size-4 rounded"
          />
          <label
            htmlFor="featured"
            className="text-foreground cursor-pointer text-xs font-medium"
          >
            Featured on Home
          </label>
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="order"
            className="text-foreground text-xs font-medium"
          >
            Display Order:
          </label>
          <input
            type="number"
            id="order"
            value={order}
            onChange={(e) => setOrder(parseInt(e.target.value, 10) || 0)}
            className="border-input bg-background text-foreground focus:border-brand w-20 rounded border px-2 py-1 text-xs focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="status"
            className="text-foreground text-xs font-medium"
          >
            Status:
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as ProjectInput["status"])
            }
            className="border-input bg-background text-foreground focus:border-brand rounded border px-2.5 py-1 text-xs focus:outline-none"
          >
            <option value="draft">Draft (Private)</option>
            <option value="published">Published (Public)</option>
          </select>
        </div>
      </div>
    </form>
  );
}
