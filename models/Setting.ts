import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISocials {
  github?: string;
  linkedin?: string;
  email?: string;
}

export interface ISetting extends Document {
  key: string;
  siteTitle: string;
  tagline: string;
  resumeUrl?: string;
  socials: ISocials;
  availability?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SocialsSchema = new Schema<ISocials>(
  {
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    email: { type: String, default: "" },
  },
  { _id: false }
);

const SettingSchema = new Schema<ISetting>(
  {
    key: {
      type: String,
      default: "default",
      unique: true,
      index: true,
    },
    siteTitle: {
      type: String,
      required: [true, "Site title is required"],
      trim: true,
    },
    tagline: {
      type: String,
      required: [true, "Tagline is required"],
      trim: true,
    },
    resumeUrl: {
      type: String,
      default: "",
      trim: true,
    },
    socials: {
      type: SocialsSchema,
      default: () => ({}),
    },
    availability: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Guard against model re-compilation on Next.js hot reload
export const Setting: Model<ISetting> =
  mongoose.models.Setting || mongoose.model<ISetting>("Setting", SettingSchema);

export default Setting;

