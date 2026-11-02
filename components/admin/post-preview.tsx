"use client";

import Image from "next/image";
import { Clock, Calendar } from "lucide-react";
import { ArticleContent } from "@/components/blog/article-content";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { extractHeadings, calculateReadingTime } from "@/lib/sanitize";

interface PostPreviewProps {
  readonly title: string;
  readonly excerpt: string;
  readonly content: string;
  readonly coverImage?: { url: string; alt: string };
  readonly tags: readonly string[];
  readonly publishedAt?: string;
}

export function PostPreview({
  title,
  excerpt,
  content,
  coverImage,
  tags,
  publishedAt,
}: PostPreviewProps) {
  const headings = extractHeadings(content);
  const readingTime = calculateReadingTime(content);
  const displayDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

  return (
    <div className="border-border bg-background rounded-xl border p-6 sm:p-10">
      <div className="border-brand/40 bg-brand-muted/30 text-brand mb-6 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs">
        <span>Article Live Preview</span>
      </div>

      <header className="space-y-4">
        <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            <span>{displayDate}</span>
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" />
            <span>{readingTime} min read</span>
          </span>
        </div>

        <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
          {title || "Untitled Article"}
        </h1>

        {excerpt && (
          <p className="text-muted-foreground text-lg leading-relaxed">
            {excerpt}
          </p>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="border-border bg-muted/60 text-muted-foreground rounded-full border px-2.5 py-0.5 font-mono text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {coverImage?.url && (
        <div className="bg-muted border-border relative my-8 aspect-16/9 w-full overflow-hidden rounded-xl border">
          <Image
            src={coverImage.url}
            alt={coverImage.alt || title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <ArticleContent
            content={content || "<p>No content written yet.</p>"}
          />
        </div>

        {headings.length > 0 && (
          <aside className="hidden lg:col-span-1 lg:block">
            <div className="sticky top-24">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
