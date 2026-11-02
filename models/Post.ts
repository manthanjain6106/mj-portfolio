import mongoose, { Schema, Document, Model } from "mongoose";

export type PostStatus = "draft" | "scheduled" | "published";

export interface IPostImage {
  url: string;
  publicId: string;
  alt: string;
}

export interface IPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: IPostImage;
  tags: string[];
  status: PostStatus;
  publishedAt?: Date;
  seoTitle?: string;
  seoDescription?: string;
  readingTime: number;
  createdAt: Date;
  updatedAt: Date;
}

const PostImageSchema = new Schema<IPostImage>(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    alt: { type: String, required: true, default: "" },
  },
  { _id: false }
);

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    coverImage: {
      type: PostImageSchema,
      required: false,
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: ["draft", "scheduled", "published"],
        message: "{VALUE} is not a valid post status",
      },
      default: "draft",
      index: true,
    },
    publishedAt: {
      type: Date,
      index: true,
    },
    seoTitle: {
      type: String,
      trim: true,
    },
    seoDescription: {
      type: String,
      trim: true,
    },
    readingTime: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Guard against model re-compilation on Next.js hot reload
export const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;
