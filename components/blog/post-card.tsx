import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar } from "lucide-react";
import type { SerializedPost } from "@/services/posts";

interface PostCardProps {
  readonly post: SerializedPost;
  readonly priority?: boolean;
}

export function PostCard({ post, priority = false }: PostCardProps) {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Draft";

  return (
    <article className="border-border bg-card/60 hover:border-brand/40 group flex flex-col justify-between overflow-hidden rounded-xl border transition-colors">
      <Link href={`/blog/${post.slug}`} className="block">
        {post.coverImage?.url && (
          <div className="bg-muted relative aspect-16/9 w-full overflow-hidden">
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        )}

        <div className="p-5 sm:p-6">
          <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              <span>{formattedDate}</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" />
              <span>{post.readingTime} min read</span>
            </span>
          </div>

          <h3 className="text-foreground group-hover:text-brand mt-3 line-clamp-2 text-lg font-semibold tracking-tight transition-colors">
            {post.title}
          </h3>

          <p className="text-muted-foreground mt-2 line-clamp-3 text-sm leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </Link>

      {post.tags && post.tags.length > 0 && (
        <div className="border-border/60 flex flex-wrap items-center gap-1.5 border-t px-5 py-3 sm:px-6">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}
              className="border-border bg-muted/60 text-muted-foreground hover:border-brand/40 hover:text-brand rounded-full border px-2 py-0.5 font-mono text-[11px] transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
