import sanitizeHtmlPackage from "sanitize-html";
import { slugify } from "@/lib/slug";

export const ALLOWED_TAGS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "blockquote",
  "p",
  "a",
  "ul",
  "ol",
  "li",
  "b",
  "i",
  "strong",
  "em",
  "strike",
  "code",
  "hr",
  "br",
  "pre",
  "img",
  "span",
  "div",
];

export const ALLOWED_ATTRIBUTES: Record<string, string[]> = {
  a: ["href", "name", "target", "rel"],
  img: ["src", "alt", "title", "width", "height", "loading"],
  code: ["class"],
  pre: ["class"],
  h2: ["id"],
  h3: ["id"],
  h4: ["id"],
};

/**
 * Pure function: Sanitizes HTML using strict allowlist rules
 * Safe to execute on server save and client render.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return "";

  return sanitizeHtmlPackage(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtmlPackage.simpleTransform("a", {
        rel: "noopener noreferrer",
        target: "_blank",
      }),
    },
  });
}

/**
 * Pure function: Calculates reading time in whole minutes based on word count.
 * Average reading speed: 200 words per minute. Minimum 1 minute for non-empty text.
 */
export function calculateReadingTime(htmlOrText: string): number {
  if (!htmlOrText) return 1;

  // Strip HTML tags to count only textual content
  const cleanText = htmlOrText.replace(/<[^>]*>/g, " ");
  const words = cleanText.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) return 1;

  const wordsPerMinute = 200;
  const minutes = Math.ceil(words.length / wordsPerMinute);
  return Math.max(1, minutes);
}

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Pure function: Injects id attributes into h2, h3, h4 tags for anchor jumping
 * if an id attribute is not already present.
 */
export function injectHeadingIds(html: string): string {
  if (!html) return "";

  return html.replace(
    /<h([2-4])(.*?)>(.*?)<\/h\1>/gi,
    (match, level, attrs, content) => {
      if (/id="[^"]*"/i.test(attrs)) {
        return match;
      }
      const rawText = content.replace(/<[^>]*>/g, "").trim();
      if (!rawText) return match;
      const id = slugify(rawText);
      return `<h${level}${attrs} id="${id}">${content}</h${level}>`;
    }
  );
}

/**
 * Pure function: Prepares HTML for rendering in article views.
 * Runs allowlist sanitization and injects heading IDs for TOC navigation.
 */
export function renderArticleHtml(html: string): string {
  if (!html) return "";
  const sanitized = sanitizeHtml(html);
  return injectHeadingIds(sanitized);
}

/**
 * Pure function: Extracts h2 and h3 headings from HTML for Table of Contents.
 */
export function extractHeadings(html: string): HeadingItem[] {
  if (!html) return [];

  const headingRegex = /<h([2-3])(?:\s+id="([^"]*)")?[^>]*>(.*?)<\/h\1>/gi;
  const headings: HeadingItem[] = [];
  let match;

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const existingId = match[2];
    const rawText = match[3].replace(/<[^>]*>/g, "").trim();

    if (rawText) {
      const id = existingId || slugify(rawText);
      headings.push({ id, text: rawText, level });
    }
  }

  return headings;
}
