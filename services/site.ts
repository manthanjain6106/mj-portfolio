import { siteConfig, type SiteConfig } from "@/content/site";

export async function getSiteConfig(): Promise<SiteConfig> {
  return siteConfig;
}
