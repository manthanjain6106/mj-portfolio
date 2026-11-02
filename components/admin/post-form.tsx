"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Loader2,
  Save,
  Eye,
  Edit3,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ImageUploader,
  type UploadedImage,
} from "@/components/admin/image-uploader";
import { TiptapEditor } from "@/components/admin/tiptap-editor";
import { PostPreview } from "@/components/admin/post-preview";
import { slugify } from "@/lib/slug";
import { createPostAction, updatePostAction } from "@/app/actions/posts";
import type { SerializedPost } from "@/services/posts";
import type { PostStatus } from "@/models/Post";

interface PostFormProps {
  readonly initialPost?: SerializedPost;
}

export function PostForm({ initialPost }: PostFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<"edit" | "preview">("edit");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [title, setTitle] = React.useState(initialPost?.title || "");
  const [slug, setSlug] = React.useState(initialPost?.slug || "");
  const [slugManuallyEdited, setSlugManuallyEdited] = React.useState(
    Boolean(initialPost?.slug)
  );
  const [excerpt, setExcerpt] = React.useState(initialPost?.excerpt || "");
  const [content, setContent] = React.useState(initialPost?.content || "");
  const [coverImages, setCoverImages] = React.useState<UploadedImage[]>(
    initialPost?.coverImage ? [initialPost.coverImage] : []
  );
  const [tagsInput, setTagsInput] = React.useState(
    initialPost?.tags.join(", ") || ""
  );
  const [status, setStatus] = React.useState<PostStatus>(
    initialPost?.status || "draft"
  );
  const [publishedAt, setPublishedAt] = React.useState(
    initialPost?.publishedAt ? initialPost.publishedAt.slice(0, 16) : ""
  );
  const [seoTitle, setSeoTitle] = React.useState(initialPost?.seoTitle || "");
  const [seoDescription, setSeoDescription] = React.useState(
    initialPost?.seoDescription || ""
  );

  const handleTitleBlur = () => {
    if (!slugManuallyEdited && title.trim()) {
      setSlug(slugify(title));
    }
  };

  const parsedTags = React.useMemo(() => {
    return tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }, [tagsInput]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const coverImage = coverImages[0]
        ? {
            url: coverImages[0].url,
            publicId: coverImages[0].publicId,
            alt: coverImages[0].alt || "",
          }
        : undefined;

      const payload = {
        title,
        slug,
        excerpt,
        content,
        coverImage,
        tags: parsedTags,
        status,
        publishedAt: publishedAt || undefined,
        seoTitle: seoTitle.trim() || undefined,
        seoDescription: seoDescription.trim() || undefined,
      };

      if (initialPost?._id) {
        await updatePostAction(initialPost._id, payload);
      } else {
        await createPostAction(payload);
      }

      router.push("/admin/posts");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/admin/posts"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to posts</span>
        </Link>

        {/* Edit / Preview toggle */}
        <div className="border-border bg-muted/50 inline-flex items-center rounded-lg border p-1">
          <button
            type="button"
            onClick={() => setActiveTab("edit")}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === "edit"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Edit3 className="size-3.5" />
            <span>Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === "preview"
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Eye className="size-3.5" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="border-destructive/30 bg-destructive/10 text-destructive flex items-center gap-2 rounded-lg border p-3 text-xs">
          <AlertCircle className="size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {activeTab === "preview" ? (
        <PostPreview
          title={title}
          excerpt={excerpt}
          content={content}
          coverImage={coverImages[0]}
          tags={parsedTags}
          publishedAt={publishedAt}
        />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Content Details */}
          <div className="border-border bg-card/60 space-y-4 rounded-xl border p-5 sm:p-6">
            <h2 className="text-foreground text-sm font-semibold">
              Article Content
            </h2>

            <div className="space-y-1.5">
              <label
                htmlFor="post-title"
                className="text-foreground text-xs font-medium"
              >
                Title *
              </label>
              <input
                id="post-title"
                type="text"
                required
                maxLength={140}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleTitleBlur}
                placeholder="e.g. Building Resilient Agents with Next.js 15"
                className="border-input bg-background text-foreground focus:border-brand w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="post-slug"
                className="text-foreground text-xs font-medium"
              >
                Slug *
              </label>
              <input
                id="post-slug"
                type="text"
                required
                maxLength={140}
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setSlugManuallyEdited(true);
                }}
                placeholder="building-resilient-agents-with-nextjs-15"
                className="border-input bg-background text-foreground focus:border-brand w-full rounded-md border px-3 py-2 font-mono text-xs focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="post-excerpt"
                  className="text-foreground text-xs font-medium"
                >
                  Excerpt *
                </label>
                <span className="text-muted-foreground text-[11px]">
                  {excerpt.length}/300
                </span>
              </div>
              <textarea
                id="post-excerpt"
                required
                rows={3}
                maxLength={300}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Concise 1-2 sentence overview shown in blog cards and search results."
                className="border-input bg-background text-foreground focus:border-brand w-full rounded-md border px-3 py-2 text-sm focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-foreground text-xs font-medium">
                Article Body (Tiptap Rich Text) *
              </label>
              <TiptapEditor content={content} onChange={setContent} />
            </div>
          </div>

          {/* Media & Metadata */}
          <div className="border-border bg-card/60 space-y-4 rounded-xl border p-5 sm:p-6">
            <h2 className="text-foreground text-sm font-semibold">
              Media & Publishing
            </h2>

            <ImageUploader
              images={coverImages}
              onChange={setCoverImages}
              maxImages={1}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label
                  htmlFor="post-status"
                  className="text-foreground text-xs font-medium"
                >
                  Publication Status
                </label>
                <select
                  id="post-status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as PostStatus)}
                  className="border-input bg-background text-foreground focus:border-brand w-full rounded-md border px-3 py-2 text-xs focus:outline-none"
                >
                  <option value="draft">
                    Draft (Private, 404 on public route)
                  </option>
                  <option value="scheduled">
                    Scheduled (Public when date & time arrives)
                  </option>
                  <option value="published">
                    Published (Immediately public)
                  </option>
                </select>
              </div>

              {(status === "scheduled" || status === "published") && (
                <div className="space-y-1.5">
                  <label
                    htmlFor="post-publishedAt"
                    className="text-foreground text-xs font-medium"
                  >
                    {status === "scheduled"
                      ? "Schedule Date & Time *"
                      : "Publication Date"}
                  </label>
                  <input
                    id="post-publishedAt"
                    type="datetime-local"
                    required={status === "scheduled"}
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                    className="border-input bg-background text-foreground focus:border-brand w-full rounded-md border px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="post-tags"
                className="text-foreground text-xs font-medium"
              >
                Tags (comma-separated)
              </label>
              <input
                id="post-tags"
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Next.js, TypeScript, AI, Architecture"
                className="border-input bg-background text-foreground focus:border-brand w-full rounded-md border px-3 py-2 text-xs focus:outline-none"
              />
            </div>
          </div>

          {/* SEO Metadata */}
          <div className="border-border bg-card/60 space-y-4 rounded-xl border p-5 sm:p-6">
            <h2 className="text-foreground text-sm font-semibold">
              SEO Metadata
            </h2>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="post-seoTitle"
                  className="text-foreground text-xs font-medium"
                >
                  SEO Title (max 60 characters)
                </label>
                <span
                  className={`text-[11px] ${
                    seoTitle.length > 60
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }`}
                >
                  {seoTitle.length}/60
                </span>
              </div>
              <input
                id="post-seoTitle"
                type="text"
                maxLength={60}
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Custom title tag for search engines"
                className="border-input bg-background text-foreground focus:border-brand w-full rounded-md border px-3 py-2 text-xs focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="post-seoDescription"
                  className="text-foreground text-xs font-medium"
                >
                  SEO Description (max 160 characters)
                </label>
                <span
                  className={`text-[11px] ${
                    seoDescription.length > 160
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }`}
                >
                  {seoDescription.length}/160
                </span>
              </div>
              <textarea
                id="post-seoDescription"
                rows={2}
                maxLength={160}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Meta description for search engine snippets"
                className="border-input bg-background text-foreground focus:border-brand w-full rounded-md border px-3 py-2 text-xs focus:outline-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              asChild
              disabled={isSubmitting}
            >
              <Link href="/admin/posts">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="mr-1.5 size-4 animate-spin" />
              ) : (
                <Save className="mr-1.5 size-4" />
              )}
              <span>{initialPost ? "Save Changes" : "Create Post"}</span>
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
