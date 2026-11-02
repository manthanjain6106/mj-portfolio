import { connectToDatabase } from "@/lib/mongodb";
import { Message, type IMessage } from "@/models/Message";

export async function getMessagesCount(): Promise<number> {
  try {
    await connectToDatabase();
    return await Message.countDocuments();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Could not fetch messages count from database:", error);
    }
    return 0;
  }
}

export async function getUnreadMessagesCount(): Promise<number> {
  try {
    await connectToDatabase();
    return await Message.countDocuments({ read: false });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "Could not fetch unread messages count from database:",
        error
      );
    }
    return 0;
  }
}

export async function getRecentMessages(limit = 5): Promise<IMessage[]> {
  try {
    await connectToDatabase();
    return await Message.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean<IMessage[]>();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Could not fetch recent messages from database:", error);
    }
    return [];
  }
}
