import { connectToDatabase } from "@/lib/mongodb";
import { Project, type IProject } from "@/models/Project";
import {
  seedProjects,
  type ProjectItem,
  type ProjectCategory,
} from "@/content/projects.seed";

export async function getProjectsCount(): Promise<number> {
  try {
    await connectToDatabase();
    return await Project.countDocuments();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Could not fetch projects count from database:", error);
    }
    return 0;
  }
}

export async function getRecentProjects(limit = 5): Promise<IProject[]> {
  try {
    await connectToDatabase();
    return await Project.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean<IProject[]>();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Could not fetch recent projects from database:", error);
    }
    return [];
  }
}

// Public static seed queries (active until Phase 4 admin CRUD & DB integration)
export async function getAllProjects(): Promise<readonly ProjectItem[]> {
  return seedProjects;
}

export async function getFeaturedProjects(): Promise<readonly ProjectItem[]> {
  return seedProjects
    .filter((project) => project.featured && project.status === "published")
    .slice(0, 3);
}

export async function getProjectsByCategory(
  category: ProjectCategory
): Promise<readonly ProjectItem[]> {
  return seedProjects.filter(
    (project) => project.category === category && project.status === "published"
  );
}

export async function getProjectBySlug(
  slug: string
): Promise<ProjectItem | undefined> {
  return seedProjects.find((project) => project.slug === slug);
}
