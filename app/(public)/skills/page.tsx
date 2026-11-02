import type { Metadata } from "next";
import { Cpu, Database, Layout, Server, Wrench } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";
import { getSkillGroups } from "@/services/skills";
import type { SkillCategory } from "@/content/skills";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Comprehensive technical skills grouped across Frontend, Backend, Databases, AI, and Tools.",
};

const CATEGORY_ICONS: Record<
  SkillCategory,
  React.ComponentType<{ className?: string }>
> = {
  Frontend: Layout,
  Backend: Server,
  Databases: Database,
  AI: Cpu,
  Tools: Wrench,
};

export default async function SkillsPage() {
  const groups = await getSkillGroups();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <FadeIn className="border-border space-y-4 border-b pb-8">
        <span className="text-brand font-mono text-xs tracking-wider uppercase">
          Technical Capabilities
        </span>
        <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
          Skills & Technologies
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Grouped technical stack for modern full-stack systems and applied AI.
        </p>
      </FadeIn>

      <div className="mt-12 space-y-10">
        {groups.map((group, groupIndex) => {
          const Icon = CATEGORY_ICONS[group.category];
          return (
            <FadeIn
              key={group.category}
              delay={groupIndex * 0.08}
              className="border-border bg-card rounded-xl border p-6 sm:p-8"
            >
              <div className="border-border/80 flex flex-col gap-2 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="border-border bg-muted text-brand rounded-md border p-2">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h2 className="text-foreground text-xl font-semibold tracking-tight">
                      {group.category}
                    </h2>
                    <p className="text-muted-foreground text-xs sm:text-sm">
                      {group.description}
                    </p>
                  </div>
                </div>

                <span className="text-muted-foreground font-mono text-xs">
                  {group.skills.length} competencies
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="border-border/70 bg-background hover:border-brand/40 flex items-center justify-between rounded-lg border px-3.5 py-2.5 transition-colors"
                  >
                    <span className="text-foreground text-sm font-medium">
                      {skill.name}
                    </span>
                    <span
                      className="bg-brand/60 size-1.5 rounded-full"
                      aria-hidden="true"
                    />
                  </div>
                ))}
              </div>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}
