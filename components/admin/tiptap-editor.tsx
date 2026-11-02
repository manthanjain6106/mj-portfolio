"use client";

import * as React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {
  Heading2,
  Heading3,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Code2,
  Code,
  Minus,
  Link as LinkIcon,
  Unlink,
  Image as ImageIcon,
  Undo2,
  Redo2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface TiptapEditorProps {
  readonly content: string;
  readonly onChange: (html: string) => void;
  readonly placeholder?: string;
}

export function TiptapEditor({
  content,
  onChange,
  placeholder = "Write your article in markdown-rich formatted content...",
}: TiptapEditorProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
        codeBlock: {
          HTMLAttributes: {
            class: "hljs",
          },
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
          class: "text-brand underline hover:opacity-80 transition-opacity",
        },
      }),
      Image.configure({
        inline: false,
        HTMLAttributes: {
          class: "rounded-lg border border-border my-6 max-w-full h-auto",
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: "article-prose focus:outline-none min-h-[360px] p-4 text-sm",
        "data-placeholder": placeholder,
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    },
    immediatelyRender: false,
  });

  // Keep editor content in sync when loaded initially or reset externally
  React.useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      // Only set if different to avoid cursor jumping
      const current = editor.getHTML();
      if (content !== current && (current === "<p></p>" || current === "")) {
        editor.commands.setContent(content);
      }
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div className="border-border bg-card flex min-h-[360px] items-center justify-center rounded-lg border">
        <Loader2 className="text-muted-foreground size-5 animate-spin" />
      </div>
    );
  }

  const handleImageFileSelect = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File exceeds maximum allowed size of 5 MB.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload image");
      }

      const alt = window.prompt("Enter image alt text description:") || "";
      editor.chain().focus().setImage({ src: data.url, alt }).run();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Image upload failed");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter link URL:", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="border-border bg-card tiptap-editor-content overflow-hidden rounded-lg border">
      {/* Hidden file input for Cloudinary image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
        className="hidden"
        onChange={handleImageFileSelect}
      />

      {/* Editor Toolbar */}
      <div className="border-border bg-muted/40 flex flex-wrap items-center gap-1 border-b p-2">
        {/* Headings */}
        <Button
          type="button"
          variant={
            editor.isActive("heading", { level: 2 }) ? "default" : "ghost"
          }
          size="icon-sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          title="Heading 2"
          aria-label="Heading 2"
        >
          <Heading2 className="size-4" />
        </Button>

        <Button
          type="button"
          variant={
            editor.isActive("heading", { level: 3 }) ? "default" : "ghost"
          }
          size="icon-sm"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          title="Heading 3"
          aria-label="Heading 3"
        >
          <Heading3 className="size-4" />
        </Button>

        <div className="bg-border mx-1 h-4 w-px" />

        {/* Text formatting */}
        <Button
          type="button"
          variant={editor.isActive("bold") ? "default" : "ghost"}
          size="icon-sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold"
          aria-label="Bold"
        >
          <Bold className="size-4" />
        </Button>

        <Button
          type="button"
          variant={editor.isActive("italic") ? "default" : "ghost"}
          size="icon-sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic"
          aria-label="Italic"
        >
          <Italic className="size-4" />
        </Button>

        <Button
          type="button"
          variant={editor.isActive("code") ? "default" : "ghost"}
          size="icon-sm"
          onClick={() => editor.chain().focus().toggleCode().run()}
          title="Inline Code"
          aria-label="Inline Code"
        >
          <Code className="size-4" />
        </Button>

        <div className="bg-border mx-1 h-4 w-px" />

        {/* Lists & Quotes */}
        <Button
          type="button"
          variant={editor.isActive("bulletList") ? "default" : "ghost"}
          size="icon-sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet List"
          aria-label="Bullet List"
        >
          <List className="size-4" />
        </Button>

        <Button
          type="button"
          variant={editor.isActive("orderedList") ? "default" : "ghost"}
          size="icon-sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Numbered List"
          aria-label="Numbered List"
        >
          <ListOrdered className="size-4" />
        </Button>

        <Button
          type="button"
          variant={editor.isActive("blockquote") ? "default" : "ghost"}
          size="icon-sm"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="Blockquote"
          aria-label="Blockquote"
        >
          <Quote className="size-4" />
        </Button>

        <Button
          type="button"
          variant={editor.isActive("codeBlock") ? "default" : "ghost"}
          size="icon-sm"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          title="Code Block"
          aria-label="Code Block"
        >
          <Code2 className="size-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal Rule"
          aria-label="Horizontal Rule"
        >
          <Minus className="size-4" />
        </Button>

        <div className="bg-border mx-1 h-4 w-px" />

        {/* Links */}
        <Button
          type="button"
          variant={editor.isActive("link") ? "default" : "ghost"}
          size="icon-sm"
          onClick={setLink}
          title="Insert Link"
          aria-label="Insert Link"
        >
          <LinkIcon className="size-4" />
        </Button>

        {editor.isActive("link") && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => editor.chain().focus().unsetLink().run()}
            title="Remove Link"
            aria-label="Remove Link"
          >
            <Unlink className="size-4" />
          </Button>
        )}

        {/* Media / Image */}
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          title="Insert Image (Cloudinary)"
          aria-label="Insert Image"
        >
          {isUploading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <ImageIcon className="size-4" />
          )}
        </Button>

        <div className="bg-border mx-1 h-4 w-px" />

        {/* History */}
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
          aria-label="Undo"
        >
          <Undo2 className="size-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
          aria-label="Redo"
        >
          <Redo2 className="size-4" />
        </Button>
      </div>

      {/* Editable Area */}
      <EditorContent editor={editor} />
    </div>
  );
}
