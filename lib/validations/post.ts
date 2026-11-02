import { z } from "zod";

export const postCoverImageSchema = z.object({
  url: z.string().url("Must be a valid image URL"),
  publicId: z.string().min(1, "Public ID is required"),
  alt: z.string().default(""),
});

export const postSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(140, "Title must be under 140 characters")
      .trim(),
    slug: z
      .string()
      .min(1, "Slug is required")
      .max(140, "Slug must be under 140 characters")
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug must be lowercase alphanumeric characters separated by single dashes"
      )
      .trim(),
    excerpt: z
      .string()
      .min(1, "Excerpt is required")
      .max(300, "Excerpt must be under 300 characters")
      .trim(),
    content: z.string().min(1, "Content is required"),
    coverImage: postCoverImageSchema.optional(),
    tags: z
      .union([
        z.array(z.string().trim()),
        z.string().transform((val) =>
          val
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        ),
      ])
      .default([]),
    status: z.enum(["draft", "scheduled", "published"]).default("draft"),
    publishedAt: z.string().optional(),
    seoTitle: z
      .string()
      .max(60, "SEO title should be under 60 characters")
      .trim()
      .optional()
      .or(z.literal("")),
    seoDescription: z
      .string()
      .max(160, "SEO description should be under 160 characters")
      .trim()
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.status === "scheduled" && !data.publishedAt) {
        return false;
      }
      return true;
    },
    {
      message: "Scheduled posts require a publication date and time.",
      path: ["publishedAt"],
    }
  );

export type PostInput = z.infer<typeof postSchema>;
