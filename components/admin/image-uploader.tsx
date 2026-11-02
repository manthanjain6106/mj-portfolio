"use client";

import * as React from "react";
import Image from "next/image";
import {
  UploadCloud,
  X,
  Loader2,
  Image as ImageIcon,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface UploadedImage {
  url: string;
  publicId: string;
  alt: string;
}

interface ImageUploaderProps {
  readonly images: readonly UploadedImage[];
  readonly onChange: (images: UploadedImage[]) => void;
  readonly maxImages?: number;
}

export function ImageUploader({
  images,
  onChange,
  maxImages = 5,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    // Client-side validation: max 5 MB
    if (file.size > 5 * 1024 * 1024) {
      setError("File exceeds maximum allowed size of 5 MB.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to upload image");
      }

      const newImage: UploadedImage = {
        url: data.url,
        publicId: data.publicId,
        alt: "",
      };

      onChange([...images, newImage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemove = async (index: number) => {
    const imageToRemove = images[index];
    if (!imageToRemove) return;

    // Call Cloudinary delete API
    try {
      await fetch("/api/media/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId: imageToRemove.publicId }),
      });
    } catch (err) {
      console.error("Failed to delete image from Cloudinary:", err);
    }

    const updated = images.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleAltChange = (index: number, alt: string) => {
    const updated = images.map((img, i) =>
      i === index ? { ...img, alt } : img
    );
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-foreground text-xs font-medium">
          Project Screenshots & Images ({images.length}/{maxImages})
        </label>
        {images.length < maxImages && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader2 className="mr-1.5 size-3.5 animate-spin" />
            ) : (
              <UploadCloud className="text-brand mr-1.5 size-3.5" />
            )}
            <span>{isUploading ? "Uploading..." : "Upload Image"}</span>
          </Button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        className="hidden"
        onChange={handleFileSelect}
      />

      {error && (
        <div className="border-destructive/30 bg-destructive/10 text-destructive flex items-center gap-2 rounded-lg border p-2.5 text-xs">
          <AlertCircle className="size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {images.length === 0 ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-border bg-muted/20 hover:border-brand/40 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed py-8 text-center transition-colors"
        >
          <ImageIcon className="text-muted-foreground/60 size-8" />
          <p className="text-foreground mt-2 text-xs font-medium">
            Click to upload project screenshot
          </p>
          <p className="text-muted-foreground text-[11px]">
            PNG, JPG, WebP up to 5 MB
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {images.map((image, index) => (
            <div
              key={image.publicId || index}
              className="border-border bg-card flex flex-col items-start gap-3 rounded-lg border p-3 sm:flex-row sm:items-center"
            >
              <div className="border-border bg-muted relative size-16 shrink-0 overflow-hidden rounded-md border">
                <Image
                  src={image.url}
                  alt={image.alt || "Uploaded project image"}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="w-full flex-1 space-y-1">
                <input
                  type="text"
                  placeholder="Meaningful image alt text description..."
                  value={image.alt}
                  onChange={(e) => handleAltChange(index, e.target.value)}
                  className="border-input bg-background text-foreground placeholder:text-muted-foreground/60 focus:border-brand w-full rounded border px-2.5 py-1.5 text-xs focus:outline-none"
                />
                <span className="text-muted-foreground block truncate font-mono text-[10px]">
                  {image.publicId}
                </span>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => handleRemove(index)}
                className="text-muted-foreground hover:text-destructive shrink-0"
                aria-label="Remove image"
              >
                <X className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
