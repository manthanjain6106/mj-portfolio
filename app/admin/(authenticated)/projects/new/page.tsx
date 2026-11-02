import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin-auth";
import { ProjectForm } from "@/components/admin/project-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "New Project | Admin Panel",
};

export default async function NewProjectPage() {
  await requireAdmin();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <span className="text-brand font-mono text-xs tracking-wider uppercase">
          Create Case Study
        </span>
        <h1 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
          New Project
        </h1>
        <p className="text-muted-foreground mt-1 text-xs">
          Enter project details, technical solution, screenshots, and live/repo
          links.
        </p>
      </div>

      <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
        <ProjectForm />
      </div>
    </div>
  );
}
