import {
  seedProjects,
  type ProjectItem,
  type ProjectCategory,
} from "@/content/projects.seed";

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
