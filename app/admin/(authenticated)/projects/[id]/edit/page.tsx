import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { getAdminProjectById } from "@/services/projects";
import { ProjectForm } from "@/components/admin/project-form";
import type { ProjectInput } from "@/lib/validations/project";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Project | Admin Panel",
};

interface EditProjectPageProps {
  readonly params: Promise<{ id: string }>;
}

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  await requireAdmin();
  const { id } = await params;
  const project = await getAdminProjectById(id);

  if (!project) {
    notFound();
  }

  const formData: ProjectInput & { _id: string } = {
    _id: project._id.toString(),
    title: project.title,
    slug: project.slug,
    summary: project.summary,
    problem: project.problem,
    solution: project.solution,
    role: project.role,
    techStack: project.techStack,
    category: project.category,
    images: project.images.map((img) => ({
      url: img.url,
      publicId: img.publicId,
      alt: img.alt,
    })),
    liveUrl: project.liveUrl,
    repoUrl: project.repoUrl,
    featured: project.featured,
    order: project.order,
    status: project.status,
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <span className="text-brand font-mono text-xs tracking-wider uppercase">
          Edit Case Study
        </span>
        <h1 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
          Edit: {project.title}
        </h1>
        <p className="text-muted-foreground mt-1 text-xs">
          Update project specifications, media screenshots, or publishing
          status.
        </p>
      </div>

      <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
        <ProjectForm initialData={formData} isEditing={true} />
      </div>
    </div>
  );
}
