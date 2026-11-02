"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongodb";
import { Post } from "@/models/Post";
import { postSchema, type PostInput } from "@/lib/validations/post";
import { requireAdmin } from "@/lib/admin-auth";
import { deleteCloudinaryImage } from "@/lib/cloudinary";
import { sanitizeHtml, calculateReadingTime } from "@/lib/sanitize";

export async function createPostAction(data: PostInput) {
  await requireAdmin();
  const validated = postSchema.parse(data);

  await connectToDatabase();

  const existingSlug = await Post.findOne({ slug: validated.slug });
  if (existingSlug) {
    throw new Error(`A post with the slug "${validated.slug}" already exists.`);
  }

  const cleanContent = sanitizeHtml(validated.content);
  const readingTime = calculateReadingTime(cleanContent);

  let publishedAtDate: Date | undefined;
  if (validated.status === "published") {
    publishedAtDate = validated.publishedAt
      ? new Date(validated.publishedAt)
      : new Date();
  } else if (validated.status === "scheduled" && validated.publishedAt) {
    publishedAtDate = new Date(validated.publishedAt);
  } else if (validated.publishedAt) {
    publishedAtDate = new Date(validated.publishedAt);
  }

  const post = await Post.create({
    ...validated,
    content: cleanContent,
    readingTime,
    publishedAt: publishedAtDate,
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/");
  revalidatePath("/admin/posts");
  revalidatePath("/admin");

  return { success: true, id: post._id.toString(), slug: post.slug };
}

export async function updatePostAction(id: string, data: PostInput) {
  await requireAdmin();
  const validated = postSchema.parse(data);

  await connectToDatabase();

  const existingSlug = await Post.findOne({
    slug: validated.slug,
    _id: { $ne: id },
  });
  if (existingSlug) {
    throw new Error(
      `Another post with the slug "${validated.slug}" already exists.`
    );
  }

  const cleanContent = sanitizeHtml(validated.content);
  const readingTime = calculateReadingTime(cleanContent);

  let publishedAtDate: Date | undefined;
  if (validated.status === "published") {
    publishedAtDate = validated.publishedAt
      ? new Date(validated.publishedAt)
      : new Date();
  } else if (validated.status === "scheduled" && validated.publishedAt) {
    publishedAtDate = new Date(validated.publishedAt);
  } else if (validated.publishedAt) {
    publishedAtDate = new Date(validated.publishedAt);
  }

  const post = await Post.findByIdAndUpdate(
    id,
    {
      ...validated,
      content: cleanContent,
      readingTime,
      publishedAt: publishedAtDate,
    },
    { new: true, runValidators: true }
  );

  if (!post) {
    throw new Error("Post not found");
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/");
  revalidatePath("/admin/posts");
  revalidatePath("/admin");

  return { success: true, slug: post.slug };
}

export async function deletePostAction(id: string) {
  await requireAdmin();
  await connectToDatabase();

  const post = await Post.findById(id);
  if (!post) {
    throw new Error("Post not found");
  }

  // Delete attached cover image from Cloudinary if not a local placeholder
  if (
    post.coverImage?.publicId &&
    !post.coverImage.publicId.startsWith("placeholder-")
  ) {
    await deleteCloudinaryImage(post.coverImage.publicId);
  }

  await Post.findByIdAndDelete(id);

  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/");
  revalidatePath("/admin/posts");
  revalidatePath("/admin");

  return { success: true };
}

export async function togglePostStatusAction(
  id: string,
  newStatus: "draft" | "scheduled" | "published"
) {
  await requireAdmin();
  await connectToDatabase();

  const post = await Post.findById(id);
  if (!post) {
    throw new Error("Post not found");
  }

  post.status = newStatus;
  if (newStatus === "published" && !post.publishedAt) {
    post.publishedAt = new Date();
  }

  await post.save();

  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/");
  revalidatePath("/admin/posts");
  revalidatePath("/admin");

  return { success: true, status: post.status };
}
