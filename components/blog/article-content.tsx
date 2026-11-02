"use client";

import * as React from "react";
import hljs from "highlight.js";
import { renderArticleHtml } from "@/lib/sanitize";

interface ArticleContentProps {
  readonly content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const cleanHtml = React.useMemo(() => renderArticleHtml(content), [content]);

  React.useEffect(() => {
    if (containerRef.current) {
      const codeBlocks = containerRef.current.querySelectorAll("pre code");
      codeBlocks.forEach((block) => {
        try {
          hljs.highlightElement(block as HTMLElement);
        } catch {
          // If already highlighted or unsupported language, ignore gracefully
        }
      });
    }
  }, [cleanHtml]);

  return (
    <div
      ref={containerRef}
      className="article-prose"
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
