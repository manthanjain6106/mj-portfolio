import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMessage extends Document {
  name: string;
  email: string;
  subject: string;
  body: string;
  read: boolean;
  ipHash: string;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      maxlength: [200, "Email cannot exceed 200 characters"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: [200, "Subject cannot exceed 200 characters"],
    },
    body: {
      type: String,
      required: [true, "Body is required"],
      maxlength: [5000, "Body cannot exceed 5000 characters"],
    },
    read: {
      type: Boolean,
      default: false,
      index: true,
    },
    ipHash: {
      type: String,
      required: [true, "IP hash is required for rate-limiting"],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Guard against model re-compilation on Next.js hot reload
export const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);

export default Message;
