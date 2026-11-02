import { connectToDatabase } from "@/lib/mongodb";
import { Setting, type ISetting } from "@/models/Setting";

export async function getDatabaseSettings(): Promise<ISetting | null> {
  try {
    await connectToDatabase();
    return await Setting.findOne({ key: "default" }).lean<ISetting>();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Could not fetch site settings from database:", error);
    }
    return null;
  }
}

