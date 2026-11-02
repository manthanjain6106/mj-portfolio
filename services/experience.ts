import {
  experiences,
  type ExperienceItem,
  type ExperienceType,
} from "@/content/experience";

export async function getExperiences(): Promise<readonly ExperienceItem[]> {
  return experiences;
}

export async function getExperiencesByType(
  type: ExperienceType
): Promise<readonly ExperienceItem[]> {
  return experiences.filter((exp) => exp.type === type);
}
