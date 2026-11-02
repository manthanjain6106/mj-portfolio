import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  MONGODB_URI: z
    .string()
    .min(1, "MONGODB_URI is required for MongoDB Atlas database connection"),
  AUTH_SECRET: z
    .string()
    .min(1, "AUTH_SECRET is required for Auth.js session signing"),
  ADMIN_EMAIL: z
    .string()
    .email("ADMIN_EMAIL must be a valid email for administrator access"),
  AUTH_GITHUB_ID: z
    .string()
    .min(1, "AUTH_GITHUB_ID is required for GitHub OAuth provider"),
  AUTH_GITHUB_SECRET: z
    .string()
    .min(1, "AUTH_GITHUB_SECRET is required for GitHub OAuth provider"),
  CLOUDINARY_CLOUD_NAME: z
    .string()
    .min(1, "CLOUDINARY_CLOUD_NAME is required for media management"),
  CLOUDINARY_API_KEY: z
    .string()
    .min(1, "CLOUDINARY_API_KEY is required for media management"),
  CLOUDINARY_API_SECRET: z
    .string()
    .min(1, "CLOUDINARY_API_SECRET is required for media management"),
  RESEND_API_KEY: z
    .string()
    .min(1, "RESEND_API_KEY is required for sending emails via Resend"),
  CONTACT_TO_EMAIL: z
    .string()
    .email("CONTACT_TO_EMAIL must be a valid destination email address"),
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url("NEXT_PUBLIC_SITE_URL must be a valid URL")
    .default("http://localhost:3000"),
});

export type Env = z.infer<typeof envSchema>;

let cachedEnv: Env | null = null;

export function validateEnv(): Env {
  if (cachedEnv) return cachedEnv;

  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    if (
      process.env.SKIP_ENV_VALIDATION === "true" ||
      process.env.NODE_ENV === "test" ||
      process.env.npm_lifecycle_event === "build"
    ) {
      return process.env as unknown as Env;
    }
    const formattedErrors = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(
      `\n==============================================================================\n` +
        `[mj-portfolio] MISSING OR INVALID ENVIRONMENT VARIABLES:\n` +
        `==============================================================================\n` +
        `${formattedErrors}\n\n` +
        `Please create or update your .env.local file with these variables.\n` +
        `See .env.example for reference.\n` +
        `==============================================================================\n`
    );
  }

  cachedEnv = result.data;
  return cachedEnv;
}

export const env: Env = new Proxy({} as Env, {
  get(_target, prop: string | symbol) {
    if (typeof prop !== "string") return undefined;
    const values = validateEnv();
    return values[prop as keyof Env];
  },
});
