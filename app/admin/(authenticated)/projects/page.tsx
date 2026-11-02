import type { Metadata } from "next";
import Link from "next/link";
import { Plus, FolderGit2 } from "lucide-react";
import { requireAdmin } from "@/lib/admin-auth";
import { getAllAdminProjects } from "@/services/projects";
import { Button } from "@/components/ui/button";
import { ProjectRowActions } from "@/components/admin/project-row-actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects | Admin Panel",
};

export default async function AdminProjectsPage() {
  await requireAdmin();
  const projects = await getAllAdminProjects();

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="border-border flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-brand font-mono text-xs tracking-wider uppercase">
            Portfolio Management
          </span>
          <h1 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
            Projects ({projects.length})
          </h1>
        </div>

        <Button
          asChild
          className="bg-brand text-brand-foreground hover:bg-brand/90 font-medium"
        >
          <Link href="/admin/projects/new">
            <Plus className="mr-1.5 size-4" />
            New Project
          </Link>
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="border-border bg-card/60 flex flex-col items-center justify-center rounded-xl border border-dashed p-12 text-center">
          <div className="border-border bg-muted text-brand rounded-full border p-3">
            <FolderGit2 className="size-6" />
          </div>
          <h2 className="text-foreground mt-4 text-base font-medium">
            No projects in database
          </h2>
          <p className="text-muted-foreground mt-1 max-w-sm text-xs">
            Create your first project manually, or run the seed script to import
            initial drafts.
          </p>
          <Button
            asChild
            size="sm"
            className="bg-brand text-brand-foreground hover:bg-brand/90 mt-5 font-medium"
          >
            <Link href="/admin/projects/new">
              <Plus className="mr-1.5 size-3.5" />
              Add Project
            </Link>
          </Button>
        </div>
      ) : (
        <div className="border-border bg-card overflow-hidden rounded-xl border shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-border bg-muted/40 text-muted-foreground border-b font-mono text-[11px] uppercase">
                <tr>
                  <th className="px-4 py-3 font-medium">Project</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Tech Stack</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-border/60 divide-y">
                {projects.map((project) => (
                  <tr
                    key={project._id.toString()}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="text-foreground text-sm font-medium">
                        {project.title}
                      </div>
                      <div className="text-muted-foreground font-mono text-[11px]">
                        /{project.slug}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-muted text-muted-foreground rounded px-2 py-0.5 font-mono text-[11px] uppercase">
                        {project.category}
                      </span>
                    </td>
                    <td className="text-muted-foreground max-w-xs truncate px-4 py-3">
                      {project.techStack.join(", ")}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <ProjectRowActions
                        id={project._id.toString()}
                        slug={project.slug}
                        featured={project.featured}
                        status={project.status}
                        order={project.order}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
