import { connectToDatabase } from "@/lib/mongodb";
import { Project, type IProject, type ProjectCategory } from "@/models/Project";

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
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean<IProject[]>();
    return projects;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Could not fetch recent projects from database:", error);
    }
    return [];
  }
}

export async function getPublishedProjects(
  category?: string
): Promise<IProject[]> {
  try {
    await connectToDatabase();
    const filter: Record<string, unknown> = { status: "published" };
    if (category && category !== "all") {
      filter.category = category;
    }

    return await Project.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .lean<IProject[]>();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Could not fetch published projects from database:", error);
    }
    return [];
  }
}

export async function getFeaturedProjects(): Promise<IProject[]> {
  try {
    await connectToDatabase();
    return await Project.find({ status: "published", featured: true })
      .sort({ order: 1, createdAt: -1 })
      .limit(3)
      .lean<IProject[]>();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Could not fetch featured projects from database:", error);
    }
    return [];
  }
}

export async function getPublishedProjectBySlug(
  slug: string
): Promise<IProject | null> {
  try {
    await connectToDatabase();
    return await Project.findOne({
      slug,
      status: "published",
    }).lean<IProject>();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Could not fetch published project (${slug}):`, error);
    }
    return null;
  }
}

export async function getAllAdminProjects(): Promise<IProject[]> {
  try {
    await connectToDatabase();
    return await Project.find()
      .sort({ order: 1, createdAt: -1 })
      .lean<IProject[]>();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Could not fetch admin projects from database:", error);
    }
    return [];
  }
}

export async function getAdminProjectById(
  id: string
): Promise<IProject | null> {
  try {
    await connectToDatabase();
    return await Project.findById(id).lean<IProject>();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Could not fetch project by id (${id}):`, error);
    }
    return null;
  }
}
