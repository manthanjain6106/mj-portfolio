export interface SiteSocials {
  readonly github: string;
  readonly linkedin: string;
  readonly email: string;
}

export interface SiteConfig {
  readonly name: string;
  readonly shortName: string;
  readonly role: string;
  readonly tagline: string;
  readonly bioSummary: string;
  readonly location: string;
  readonly educationSummary: string;
  readonly availability: string;
  readonly resumeUrl: string;
  readonly socials: SiteSocials;
}

export const siteConfig: SiteConfig = {
  name: "Manthan",
  shortName: "MJ",
  role: "Full Stack & AI Developer",
  tagline:
    "Pre-final year B.Tech CSE student building modern web applications and AI-driven products.",
  bioSummary:
    "Pre-final year B.Tech CSE student (batch 2023-2027) based in Vadodara, Gujarat, India. Passionate about building performant full-stack systems and integrating practical AI solutions that solve real problems.",
  location: "Vadodara, Gujarat, India",
  educationSummary:
    "B.Tech in Computer Science & Engineering, Parul Institute of Engineering & Technology (PIET), 2023–2027",
  availability:
    "Available for Full Stack Developer & AI Developer internships and roles.",
  resumeUrl:
    "TODO(manthan): Add resume PDF link or upload path to /public/resume.pdf",
  socials: {
    github: "TODO(manthan): Add GitHub profile URL",
    linkedin: "TODO(manthan): Add LinkedIn profile URL",
    email: "TODO(manthan): Add contact email address",
  },
};
