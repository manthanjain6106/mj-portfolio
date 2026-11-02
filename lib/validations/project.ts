import { z } from "zod";

export const projectImageSchema = z.object({
  url: z.string().url("Must be a valid image URL"),
  publicId: z.string().min(1, "Public ID is required"),
  alt: z.string().default(""),
});

export const projectSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(120, "Title must be under 120 characters")
    .trim(),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(120, "Slug must be under 120 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase alphanumeric characters separated by single dashes"
    )
    .trim(),
  summary: z
    .string()
    .min(1, "Summary is required")
    .max(300, "Summary must be under 300 characters")
    .trim(),
  problem: z.string().min(1, "Problem description is required").trim(),
  solution: z.string().min(1, "Solution description is required").trim(),
  role: z
    .string()
    .min(1, "Role is required")
    .max(100, "Role must be under 100 characters")
    .trim(),
  techStack: z
    .array(z.string().min(1, "Technology item cannot be empty"))
    .min(1, "At least one technology is required in tech stack"),
  category: z.enum(["fullstack", "ai", "hardware", "other"], {
    error: "Category must be one of: fullstack, ai, hardware, other",
  }),
  images: z.array(projectImageSchema).default([]),
  liveUrl: z.string().trim().optional(),
  repoUrl: z.string().trim().optional(),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
  status: z.enum(["draft", "published"]).default("draft"),
});

export type ProjectInput = z.infer<typeof projectSchema>;
