import { skillGroups, type SkillGroup, type SkillItem } from "@/content/skills";

export async function getSkillGroups(): Promise<readonly SkillGroup[]> {
  return skillGroups;
}

export async function getSkillsStrip(): Promise<readonly SkillItem[]> {
  // Return key technical skills for the home page strip
  return skillGroups.flatMap((group) => group.skills);
}
