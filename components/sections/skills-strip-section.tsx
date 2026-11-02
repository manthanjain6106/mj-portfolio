import Link from "next/link";
import { ArrowRight, Code2 } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import type { SkillItem } from "@/content/skills";

interface SkillsStripSectionProps {
  readonly skills: readonly SkillItem[];
}

export function SkillsStripSection({ skills }: SkillsStripSectionProps) {
  // Extract distinct primary skills for the home strip
  const featuredSkills = skills.slice(0, 14);

  return (
    <section
      aria-labelledby="skills-strip-heading"
      className="border-border border-b py-12 sm:py-16"
    >
      <FadeIn className="space-y-4">
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <Code2 className="text-brand size-4" />
            <h2
              id="skills-strip-heading"
              className="text-muted-foreground text-sm font-semibold tracking-wider uppercase"
            >
              Core Technologies & Stack
            </h2>
          </div>

          <Link
            href="/skills"
            className="group text-muted-foreground hover:text-brand inline-flex items-center text-xs font-medium transition-colors"
          >
            <span>View all grouped skills</span>
            <ArrowRight className="ml-1 size-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {featuredSkills.map((skill) => (
            <span
              key={skill.name}
              className="border-border bg-card text-foreground hover:border-brand/40 inline-flex items-center rounded-md border px-3 py-1.5 font-mono text-xs transition-colors"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
