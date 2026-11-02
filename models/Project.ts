import mongoose, { Schema, Document, Model } from "mongoose";

export type ProjectCategory = "fullstack" | "ai" | "hardware" | "other";
export type ProjectStatus = "draft" | "published";

export interface IProjectImage {
  url: string;
  publicId: string;
  alt: string;
}

export interface IProject extends Document {
  title: string;
  slug: string;
  summary: string;
  problem: string;
  solution: string;
  role: string;
  techStack: string[];
  category: ProjectCategory;
  images: IProjectImage[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  order: number;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectImageSchema = new Schema<IProjectImage>(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    alt: { type: String, required: true, default: "" },
  },
  { _id: false }
);

const ProjectSchema = new Schema<IProject>(
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
    summary: {
      type: String,
      required: [true, "Summary is required"],
      trim: true,
    },
    problem: {
      type: String,
      required: [true, "Problem description is required"],
    },
    solution: {
      type: String,
      required: [true, "Solution description is required"],
    },
    role: {
      type: String,
      required: [true, "Role description is required"],
      trim: true,
    },
    techStack: {
      type: [String],
      required: [true, "At least one technology is required in techStack"],
      default: [],
    },
    category: {
      type: String,
      enum: {
        values: ["fullstack", "ai", "hardware", "other"],
        message: "{VALUE} is not a valid project category",
      },
      required: [true, "Category is required"],
      index: true,
    },
    images: {
      type: [ProjectImageSchema],
      default: [],
    },
    liveUrl: {
      type: String,
      trim: true,
    },
    repoUrl: {
      type: String,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: ["draft", "published"],
        message: "{VALUE} is not a valid project status",
      },
      default: "draft",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Guard against model re-compilation on Next.js hot reload
export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;

