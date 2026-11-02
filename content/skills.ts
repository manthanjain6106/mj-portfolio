export type SkillCategory =
  "Frontend" | "Backend" | "Databases" | "AI" | "Tools";

export interface SkillItem {
  readonly name: string;
  readonly description?: string;
}

export interface SkillGroup {
  readonly category: SkillCategory;
  readonly description: string;
  readonly skills: readonly SkillItem[];
}

export const skillGroups: readonly SkillGroup[] = [
  {
    category: "Frontend",
    description:
      "Responsive, accessible, and high-performance user interfaces.",
    skills: [
      { name: "Next.js (App Router)" },
      { name: "React 19" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "shadcn/ui" },
      { name: "Framer Motion" },
      { name: "HTML5 / Semantic Web" },
    ],
  },
  {
    category: "Backend",
    description: "Scalable server architectures, APIs, and business logic.",
    skills: [
      { name: "Node.js" },
      { name: "Next.js Route Handlers" },
      { name: "Next.js Server Actions" },
      { name: "REST APIs" },
      { name: "Auth.js / NextAuth v5" },
      { name: "Zod (Schema Validation)" },
    ],
  },
  {
    category: "Databases",
    description: "Data modeling, schema design, and query optimization.",
    skills: [
      { name: "MongoDB" },
      { name: "MongoDB Atlas" },
      { name: "Mongoose ODM" },
    ],
  },
  {
    category: "AI",
    description:
      "AI model integration, prompt engineering, and intelligent systems.",
    skills: [
      { name: "Full Stack AI Development" },
      { name: "LLM API Integrations" },
      { name: "AI Agent Workflows" },
    ],
  },
  {
    category: "Tools",
    description:
      "Development, version control, testing, and deployment tooling.",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Vercel" },
      { name: "Cloudinary" },
      { name: "Resend" },
      { name: "ESLint & Prettier" },
      { name: "TODO(manthan): Add other development tools used" },
    ],
  },
];
