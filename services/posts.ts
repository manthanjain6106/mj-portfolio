import { connectToDatabase } from "@/lib/mongodb";
import { Post, type IPost } from "@/models/Post";

export async function getPostsCount(): Promise<number> {
  try {
    await connectToDatabase();
    return await Post.countDocuments();
  } catch (error) {
    // In environments where database is not yet connected or during build
    if (process.env.NODE_ENV === "development") {
      console.warn("Could not fetch posts count from database:", error);
    }
    return 0;
  }
}

export async function getRecentPosts(limit = 5): Promise<IPost[]> {
  try {
    await connectToDatabase();
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean<IPost[]>();
    return posts;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Could not fetch recent posts from database:", error);
    }
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<IPost | null> {
  try {
    await connectToDatabase();
    return await Post.findOne({ slug }).lean<IPost>();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Could not fetch post by slug (${slug}):`, error);
    }
    return null;
  }
}

