import type { Metadata } from "next";
import {
  Briefcase,
  Calendar,
  ExternalLink,
  GraduationCap,
  GitPullRequest,
  Award,
} from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { getExperiences } from "@/services/experience";
import type { ExperienceType } from "@/content/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Open source contributions, freelance client engagements, university education, and courses.",
};

const TYPE_CONFIG: Record<
  ExperienceType,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  education: { label: "Education", icon: GraduationCap },
  freelance: { label: "Freelance", icon: Briefcase },
  opensource: { label: "Open Source", icon: GitPullRequest },
  course: { label: "Training", icon: Award },
};

export default async function ExperiencePage() {
  const experiences = await getExperiences();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <FadeIn className="border-border space-y-4 border-b pb-8">
        <span className="text-brand font-mono text-xs tracking-wider uppercase">
          Trajectory & Milestones
        </span>
        <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
          Experience
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Education, open-source work, freelance deliveries, and technical
          training.
        </p>
      </FadeIn>

      <div className="mt-12 space-y-8">
        {experiences.map((exp, index) => {
          const config = TYPE_CONFIG[exp.type];
          const Icon = config.icon;
          return (
            <FadeIn
              key={exp.id}
              delay={index * 0.08}
              className="border-border bg-card relative rounded-xl border p-6 sm:p-8"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="border-border bg-muted/60 text-muted-foreground inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px]">
                      <Icon className="text-brand size-3" />
                      <span>{config.label}</span>
                    </span>
                    {exp.location && (
                      <span className="text-muted-foreground font-mono text-xs">
                        • {exp.location}
                      </span>
                    )}
                  </div>

                  <h2 className="text-foreground pt-1 text-xl font-semibold tracking-tight">
                    {exp.title}
                  </h2>
                  <p className="text-brand text-sm font-medium">
                    {exp.organization}
                  </p>
                </div>

                <div className="text-muted-foreground inline-flex shrink-0 items-center gap-1.5 font-mono text-xs">
                  <Calendar className="size-3.5" />
                  <span>{exp.period}</span>
                </div>
              </div>

              <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                {exp.description}
              </p>

              {exp.highlights.length > 0 && (
                <ul className="border-border/60 text-muted-foreground mt-4 list-disc space-y-2 border-t pt-4 pl-5 text-xs sm:text-sm">
                  {exp.highlights.map((highlight) => (
                    <li key={highlight} className="leading-relaxed">
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}

              {exp.link && (
                <div className="mt-4 pt-3">
                  {exp.link.startsWith("http") ? (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand inline-flex items-center gap-1.5 text-xs font-medium hover:underline"
                    >
                      <span>Visit reference</span>
                      <ExternalLink className="size-3" />
                    </a>
                  ) : (
                    <span className="text-muted-foreground/70 font-mono text-[11px]">
                      Link: {exp.link}
                    </span>
                  )}
                </div>
              )}
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
