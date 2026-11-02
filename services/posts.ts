import { connectToDatabase } from "@/lib/mongodb";
import { Post, type IPost, type PostStatus } from "@/models/Post";

export interface SerializedPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: {
    url: string;
    publicId: string;
    alt: string;
  };
  tags: string[];
  status: PostStatus;
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  readingTime: number;
  createdAt: string;
  updatedAt: string;
}

// Convert Mongoose document or lean object to serializable plain object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serializePost(doc: any): SerializedPost {
  return {
    _id: doc._id?.toString() ?? "",
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt,
    content: doc.content,
    coverImage: doc.coverImage
      ? {
          url: doc.coverImage.url,
          publicId: doc.coverImage.publicId,
          alt: doc.coverImage.alt || "",
        }
      : undefined,
    tags: Array.isArray(doc.tags) ? doc.tags : [],
    status: doc.status,
    publishedAt: doc.publishedAt
      ? new Date(doc.publishedAt).toISOString()
      : undefined,
    seoTitle: doc.seoTitle,
    seoDescription: doc.seoDescription,
    readingTime: typeof doc.readingTime === "number" ? doc.readingTime : 1,
    createdAt: doc.createdAt
      ? new Date(doc.createdAt).toISOString()
      : new Date().toISOString(),
    updatedAt: doc.updatedAt
      ? new Date(doc.updatedAt).toISOString()
      : new Date().toISOString(),
  };
}

export async function getRecentPosts(limit = 5): Promise<IPost[]> {
  try {
    await connectToDatabase();
    return await Post.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean<IPost[]>();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Could not fetch recent posts:", error);
    }
    return [];
  }
}

export async function getPostsCount(): Promise<number> {
  try {
    await connectToDatabase();
    return await Post.countDocuments();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Could not fetch posts count from database:", error);
    }
    return 0;
  }
}

export interface GetPublicPostsParams {
  page?: number;
  limit?: number;
  search?: string;
  tag?: string;
}

export interface GetPublicPostsResult {
  posts: SerializedPost[];
  total: number;
  page: number;
  totalPages: number;
}

/**
 * Evaluates public posts at query time:
 * status === "published" OR (status === "scheduled" AND publishedAt <= now).
 * Drafts are never returned.
 */
export async function getPublicPosts(
  params: GetPublicPostsParams = {}
): Promise<GetPublicPostsResult> {
  const { page = 1, limit = 6, search, tag } = params;

  try {
    await connectToDatabase();
    const now = new Date();

    const publicCondition = {
      $or: [
        { status: "published" },
        { status: "scheduled", publishedAt: { $lte: now } },
      ],
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {
      ...publicCondition,
    };

    if (tag) {
      filter.tags = tag;
    }

    if (search && search.trim()) {
      const sanitizedSearch = search
        .trim()
        .replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      const regex = new RegExp(sanitizedSearch, "i");
      filter.$and = [
        publicCondition,
        {
          $or: [{ title: { $regex: regex } }, { excerpt: { $regex: regex } }],
        },
      ];
    }

    const total = await Post.countDocuments(filter);
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const validPage = Math.min(Math.max(1, page), totalPages);
    const skip = (validPage - 1) * limit;

    const docs = await Post.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return {
      posts: docs.map(serializePost),
      total,
      page: validPage,
      totalPages,
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Could not fetch public posts from database:", error);
    }
    return { posts: [], total: 0, page: 1, totalPages: 1 };
  }
}

/**
 * Fetch a single public post by slug.
 * Drafts and future scheduled posts return null (causing a 404 on the public page).
 */
export async function getPublicPostBySlug(
  slug: string
): Promise<SerializedPost | null> {
  try {
    await connectToDatabase();
    const now = new Date();

    const doc = await Post.findOne({
      slug,
      $or: [
        { status: "published" },
        { status: "scheduled", publishedAt: { $lte: now } },
      ],
    }).lean();

    if (!doc) return null;
    return serializePost(doc);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Could not fetch public post by slug (${slug}):`, error);
    }
    return null;
  }
}

/**
 * Fetch the latest N public posts for display on the home page.
 */
export async function getRecentPublicPosts(
  limit = 3
): Promise<SerializedPost[]> {
  try {
    await connectToDatabase();
    const now = new Date();

    const docs = await Post.find({
      $or: [
        { status: "published" },
        { status: "scheduled", publishedAt: { $lte: now } },
      ],
    })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit)
      .lean();

    return docs.map(serializePost);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Could not fetch recent public posts from database:", error);
    }
    return [];
  }
}

/**
 * Related posts matching tags, excluding the current post slug.
 */
export async function getRelatedPosts(
  currentSlug: string,
  tags: string[],
  limit = 3
): Promise<SerializedPost[]> {
  try {
    await connectToDatabase();
    const now = new Date();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {
      slug: { $ne: currentSlug },
      $or: [
        { status: "published" },
        { status: "scheduled", publishedAt: { $lte: now } },
      ],
    };

    if (tags.length > 0) {
      filter.tags = { $in: tags };
    }

    const docs = await Post.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit)
      .lean();

    if (docs.length < limit && tags.length > 0) {
      const existingIds = docs.map((d) => d._id);
      const fallbackDocs = await Post.find({
        slug: { $ne: currentSlug },
        _id: { $nin: existingIds },
        $or: [
          { status: "published" },
          { status: "scheduled", publishedAt: { $lte: now } },
        ],
      })
        .sort({ publishedAt: -1, createdAt: -1 })
        .limit(limit - docs.length)
        .lean();

      return [...docs, ...fallbackDocs].map(serializePost);
    }

    return docs.map(serializePost);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Could not fetch related posts:", error);
    }
    return [];
  }
}

/**
 * Distinct tags from all public posts.
 */
export async function getAllPublicTags(): Promise<string[]> {
  try {
    await connectToDatabase();
    const now = new Date();

    const docs = await Post.find(
      {
        $or: [
          { status: "published" },
          { status: "scheduled", publishedAt: { $lte: now } },
        ],
      },
      { tags: 1 }
    ).lean();

    const tagSet = new Set<string>();
    docs.forEach((d) => {
      if (Array.isArray(d.tags)) {
        d.tags.forEach((t) => {
          const trimmed = t.trim();
          if (trimmed) tagSet.add(trimmed);
        });
      }
    });

    return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Could not fetch public tags:", error);
    }
    return [];
  }
}

export interface GetAdminPostsParams {
  status?: "all" | "draft" | "scheduled" | "published";
  search?: string;
}

/**
 * Fetch posts for Admin management with status filter and search.
 */
export async function getAllAdminPosts(
  params: GetAdminPostsParams = {}
): Promise<SerializedPost[]> {
  try {
    await connectToDatabase();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {};

    if (params.status && params.status !== "all") {
      filter.status = params.status;
    }

    if (params.search && params.search.trim()) {
      const sanitized = params.search
        .trim()
        .replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      const regex = new RegExp(sanitized, "i");
      filter.$or = [{ title: { $regex: regex } }, { slug: { $regex: regex } }];
    }

    const docs = await Post.find(filter).sort({ createdAt: -1 }).lean();

    return docs.map(serializePost);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Could not fetch admin posts from database:", error);
    }
    return [];
  }
}

/**
 * Fetch a post by ID for Admin editing.
 */
export async function getAdminPostById(
  id: string
): Promise<SerializedPost | null> {
  try {
    await connectToDatabase();
    const doc = await Post.findById(id).lean();
    if (!doc) return null;
    return serializePost(doc);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Could not fetch post by id (${id}):`, error);
    }
    return null;
  }
}
