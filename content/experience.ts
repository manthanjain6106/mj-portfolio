export type ExperienceType =
  "education" | "freelance" | "opensource" | "course";

export interface ExperienceItem {
  readonly id: string;
  readonly type: ExperienceType;
  readonly title: string;
  readonly organization: string;
  readonly location?: string;
  readonly period: string;
  readonly description: string;
  readonly highlights: readonly string[];
  readonly link?: string;
}

export const experiences: readonly ExperienceItem[] = [
  {
    id: "piet-btech-cse",
    type: "education",
    title: "B.Tech in Computer Science & Engineering",
    organization: "Parul Institute of Engineering & Technology (PIET)",
    location: "Vadodara, Gujarat, India",
    period: "2023 – 2027 (Expected)",
    description:
      "Undergraduate engineering student focusing on software engineering, data structures, algorithms, database systems, and artificial intelligence.",
    highlights: [
      "Specialization in full-stack web architectures and intelligent systems.",
      "TODO(manthan): Add academic achievements, GPA/percentage, or department honors.",
    ],
  },
  {
    id: "freelance-videographer-site",
    type: "freelance",
    title: "Freelance Full Stack Developer",
    organization: "Videographer Client Portfolio",
    location: "Remote / Vadodara",
    period: "TODO(manthan): Add dates of freelance engagement",
    description:
      "Designed and delivered a customized, media-optimized portfolio web application for a videographer client showcasing video reels and client inquiries.",
    highlights: [
      "Engineered responsive layout with rich media playback and gallery views.",
      "TODO(manthan): Add measurable client results or specific features delivered.",
    ],
    link: "TODO(manthan): Add live URL or client testimonial if public",
  },
  {
    id: "opensource-contributions",
    type: "opensource",
    title: "Open Source Contributor",
    organization: "Community Open Source Projects",
    period: "2024 – Present",
    description:
      "Contributing bug fixes, enhancements, and documentation to open-source developer tooling and web libraries.",
    highlights: [
      "TODO(manthan): Add names of specific open source repositories contributed to.",
      "TODO(manthan): Add links to notable merged pull requests.",
    ],
  },
  {
    id: "courses-and-certifications",
    type: "course",
    title: "Professional Coursework & Technical Training",
    organization: "Independent Learning / Certifications",
    period: "2023 – 2026",
    description:
      "Completed structured coursework and practical bootcamps covering modern web technologies and applied artificial intelligence.",
    highlights: [
      "TODO(manthan): List specific verified courses, certificates, or competitive programming profiles.",
    ],
  },
];
