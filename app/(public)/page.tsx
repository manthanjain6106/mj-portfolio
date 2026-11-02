import type { Metadata } from "next";
import { getSiteConfig } from "@/services/site";
import { getFeaturedProjects } from "@/services/projects";
import { getSkillsStrip } from "@/services/skills";
import { HeroSection } from "@/components/sections/hero-section";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";
import { SkillsStripSection } from "@/components/sections/skills-strip-section";
import { LatestPostsSection } from "@/components/sections/latest-posts-section";
import { ClosingCtaSection } from "@/components/sections/closing-cta-section";

export const metadata: Metadata = {
  title: "Manthan | Full Stack & AI Developer",
  description:
    "Personal portfolio and proof of work for Manthan, a Full Stack Developer and AI Developer based in Vadodara, Gujarat, India.",
};

export default async function HomePage() {
  const [site, featuredProjects, skillsStrip] = await Promise.all([
    getSiteConfig(),
    getFeaturedProjects(),
    getSkillsStrip(),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <HeroSection site={site} />
      <SkillsStripSection skills={skillsStrip} />
      <FeaturedProjectsSection projects={featuredProjects} />
      <LatestPostsSection />
      <ClosingCtaSection site={site} />
    </div>
  );
}
