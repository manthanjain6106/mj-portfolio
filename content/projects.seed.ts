export type ProjectCategory = "fullstack" | "ai" | "hardware" | "other";
export type ProjectStatus = "draft" | "published";

export interface ProjectImage {
  readonly url: string;
  readonly publicId: string;
  readonly alt: string;
}

export interface ProjectItem {
  readonly title: string;
  readonly slug: string;
  readonly summary: string;
  readonly problem: string;
  readonly solution: string;
  readonly role: string;
  readonly techStack: readonly string[];
  readonly category: ProjectCategory;
  readonly images: readonly ProjectImage[];
  readonly liveUrl: string;
  readonly repoUrl: string;
  readonly featured: boolean;
  readonly order: number;
  readonly status: ProjectStatus;
}

export const seedProjects: readonly ProjectItem[] = [
  {
    title: "LeadAI",
    slug: "lead-ai",
    summary: "AI-driven lead qualification and intelligence platform.",
    problem:
      "TODO(manthan): Describe the specific business/technical problem LeadAI solves.",
    solution:
      "TODO(manthan): Detail the AI architecture, models used, and workflow implemented.",
    role: "Lead Full Stack & AI Developer",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "AI APIs", "Node.js"],
    category: "ai",
    images: [
      {
        url: "/images/projects/leadai-placeholder.png",
        publicId: "placeholder-leadai",
        alt: "LeadAI platform interface preview",
      },
    ],
    liveUrl: "TODO(manthan): Add live demo URL for LeadAI",
    repoUrl: "TODO(manthan): Add GitHub repository URL for LeadAI",
    featured: true,
    order: 1,
    status: "published",
  },
  {
    title: "Mini Jarvis",
    slug: "mini-jarvis",
    summary:
      "Personal AI assistant with multimodal reasoning and automated task execution.",
    problem:
      "TODO(manthan): Describe the user challenges Mini Jarvis was built to automate.",
    solution:
      "TODO(manthan): Detail how the assistant processes prompts, functions, or external tools.",
    role: "AI Developer & Architect",
    techStack: ["Python / Node.js", "TypeScript", "LLM APIs", "WebSockets"],
    category: "ai",
    images: [
      {
        url: "/images/projects/mini-jarvis-placeholder.png",
        publicId: "placeholder-mini-jarvis",
        alt: "Mini Jarvis interface preview",
      },
    ],
    liveUrl: "TODO(manthan): Add live URL or video demo for Mini Jarvis",
    repoUrl: "TODO(manthan): Add GitHub repository URL for Mini Jarvis",
    featured: true,
    order: 2,
    status: "published",
  },
  {
    title: "Mavrox",
    slug: "mavrox",
    summary:
      "Modern full-stack web application with responsive UI and secure backend services.",
    problem:
      "TODO(manthan): Describe the core problem and use case addressed by Mavrox.",
    solution:
      "TODO(manthan): Detail the architectural design, database modeling, and frontend UX.",
    role: "Full Stack Developer",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Auth"],
    category: "fullstack",
    images: [
      {
        url: "/images/projects/mavrox-placeholder.png",
        publicId: "placeholder-mavrox",
        alt: "Mavrox web application dashboard preview",
      },
    ],
    liveUrl: "TODO(manthan): Add live URL for Mavrox",
    repoUrl: "TODO(manthan): Add GitHub repository URL for Mavrox",
    featured: true,
    order: 3,
    status: "published",
  },
  {
    title: "Videographer Client Portfolio",
    slug: "videographer-portfolio",
    summary:
      "High-performance media portfolio for showcasing film reels and capturing client inquiries.",
    problem:
      "TODO(manthan): Describe the client's needs around fast video streaming and brand presentation.",
    solution:
      "TODO(manthan): Describe the customized responsive design and video loading optimization.",
    role: "Full Stack Freelance Developer",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Video Streaming"],
    category: "fullstack",
    images: [
      {
        url: "/images/projects/videographer-placeholder.png",
        publicId: "placeholder-videographer",
        alt: "Videographer portfolio preview",
      },
    ],
    liveUrl: "TODO(manthan): Add client website URL",
    repoUrl: "TODO(manthan): Add repository URL (or indicate private)",
    featured: false,
    order: 4,
    status: "published",
  },
  {
    title: "GTA LFG App",
    slug: "gta-lfg-app",
    summary:
      "Real-time Looking-For-Group application enabling players to team up for game sessions.",
    problem:
      "TODO(manthan): Explain the matchmaking friction GTA players encounter.",
    solution:
      "TODO(manthan): Detail the real-time lobby system, filtering, and player status synchronization.",
    role: "Full Stack Developer",
    techStack: ["React", "TypeScript", "Node.js", "WebSockets / Realtime"],
    category: "fullstack",
    images: [
      {
        url: "/images/projects/gta-lfg-placeholder.png",
        publicId: "placeholder-gta-lfg",
        alt: "GTA LFG platform preview",
      },
    ],
    liveUrl: "TODO(manthan): Add live link for GTA LFG App",
    repoUrl: "TODO(manthan): Add GitHub link for GTA LFG App",
    featured: false,
    order: 5,
    status: "published",
  },
];
