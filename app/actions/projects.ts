"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongodb";
import { Project } from "@/models/Project";
import { projectSchema, type ProjectInput } from "@/lib/validations/project";
import { requireAdmin } from "@/lib/admin-auth";
import { deleteCloudinaryImage } from "@/lib/cloudinary";

export async function createProjectAction(data: ProjectInput) {
  await requireAdmin();
  const validated = projectSchema.parse(data);

  await connectToDatabase();

  const existingSlug = await Project.findOne({ slug: validated.slug });
  if (existingSlug) {
    throw new Error(
      `A project with the slug "${validated.slug}" already exists.`
    );
  }

  const project = await Project.create(validated);

  revalidatePath("/projects");
  revalidatePath("/");
  revalidatePath("/admin/projects");
  revalidatePath("/admin");

  return { success: true, id: project._id.toString() };
}

export async function updateProjectAction(id: string, data: ProjectInput) {
  await requireAdmin();
  const validated = projectSchema.parse(data);

  await connectToDatabase();

  const existingSlug = await Project.findOne({
    slug: validated.slug,
    _id: { $ne: id },
  });
  if (existingSlug) {
    throw new Error(
      `Another project with the slug "${validated.slug}" already exists.`
    );
  }

  const project = await Project.findByIdAndUpdate(id, validated, {
    new: true,
    runValidators: true,
  });

  if (!project) {
    throw new Error("Project not found");
  }

  revalidatePath("/projects");
  revalidatePath(`/projects/${project.slug}`);
  revalidatePath("/");
  revalidatePath("/admin/projects");
  revalidatePath("/admin");

  return { success: true };
}

export async function deleteProjectAction(id: string) {
  await requireAdmin();
  await connectToDatabase();

  const project = await Project.findById(id);
  if (!project) {
    throw new Error("Project not found");
  }

  // Delete attached images from Cloudinary
  if (project.images && project.images.length > 0) {
    for (const img of project.images) {
      if (img.publicId && !img.publicId.startsWith("placeholder-")) {
        await deleteCloudinaryImage(img.publicId);
      }
    }
  }

  await Project.findByIdAndDelete(id);

  revalidatePath("/projects");
  revalidatePath(`/projects/${project.slug}`);
  revalidatePath("/");
  revalidatePath("/admin/projects");
  revalidatePath("/admin");

  return { success: true };
}

export async function toggleProjectFeaturedAction(id: string) {
  await requireAdmin();
  await connectToDatabase();

  const project = await Project.findById(id);
  if (!project) {
    throw new Error("Project not found");
  }

  project.featured = !project.featured;
  await project.save();

  revalidatePath("/projects");
  revalidatePath(`/projects/${project.slug}`);
  revalidatePath("/");
  revalidatePath("/admin/projects");

  return { success: true, featured: project.featured };
}

export async function toggleProjectStatusAction(id: string) {
  await requireAdmin();
  await connectToDatabase();

  const project = await Project.findById(id);
  if (!project) {
    throw new Error("Project not found");
  }

  project.status = project.status === "published" ? "draft" : "published";
  await project.save();

  revalidatePath("/projects");
  revalidatePath(`/projects/${project.slug}`);
  revalidatePath("/");
  revalidatePath("/admin/projects");

  return { success: true, status: project.status };
}

export async function reorderProjectAction(id: string, newOrder: number) {
  await requireAdmin();
  await connectToDatabase();

  await Project.findByIdAndUpdate(id, { order: newOrder });

  revalidatePath("/projects");
  revalidatePath("/");
  revalidatePath("/admin/projects");

  return { success: true };
}
