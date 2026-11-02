"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";
import { LinkedinIcon, TwitterIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

interface ShareLinksProps {
  readonly title: string;
  readonly slug: string;
}

export function ShareLinks({ title, slug }: ShareLinksProps) {
  const [copied, setCopied] = React.useState(false);
  const [url, setUrl] = React.useState("");

  React.useEffect(() => {
    setUrl(window.location.origin + `/blog/${slug}`);
  }, [slug]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard write failures gracefully
    }
  };

  const shareTwitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(url)}`;

  const shareLinkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url
  )}`;

  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground text-xs font-medium">Share:</span>
      <Button
        variant="outline"
        size="icon-sm"
        asChild
        title="Share on X / Twitter"
      >
        <a
          href={shareTwitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X / Twitter"
        >
          <TwitterIcon className="size-3.5" />
        </a>
      </Button>

      <Button
        variant="outline"
        size="icon-sm"
        asChild
        title="Share on LinkedIn"
      >
        <a
          href={shareLinkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
        >
          <LinkedinIcon className="size-3.5" />
        </a>
      </Button>

      <Button
        variant="outline"
        size="icon-sm"
        onClick={handleCopy}
        title={copied ? "Link copied" : "Copy link"}
        aria-label={copied ? "Link copied" : "Copy link"}
      >
        {copied ? (
          <Check className="text-brand size-3.5" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </Button>
    </div>
  );
}
