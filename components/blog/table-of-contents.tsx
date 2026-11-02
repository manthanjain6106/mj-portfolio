"use client";

import * as React from "react";
import type { HeadingItem } from "@/lib/sanitize";

interface TableOfContentsProps {
  readonly headings: readonly HeadingItem[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -75% 0px" }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="border-border bg-card/40 rounded-lg border p-4 backdrop-blur-xs"
    >
      <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
        On this page
      </p>
      <ul className="mt-3 space-y-2 text-xs">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <li
              key={heading.id}
              className={heading.level === 3 ? "pl-3" : undefined}
            >
              <a
                href={`#${heading.id}`}
                className={`block transition-colors ${
                  isActive
                    ? "text-brand font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

