import { getPostsCount, getRecentPosts } from "@/services/posts";
import { getProjectsCount } from "@/services/projects";
import { getUnreadMessagesCount, getRecentMessages } from "@/services/messages";
import type { IPost } from "@/models/Post";
import type { IMessage } from "@/models/Message";

export interface DashboardStats {
  readonly postsCount: number;
  readonly projectsCount: number;
  readonly unreadMessagesCount: number;
  readonly recentPosts: readonly IPost[];
  readonly recentMessages: readonly IMessage[];
}

export async function getAdminDashboardStats(): Promise<DashboardStats> {
  const [
    postsCount,
    projectsCount,
    unreadMessagesCount,
    recentPosts,
    recentMessages,
  ] = await Promise.all([
    getPostsCount(),
    getProjectsCount(),
    getUnreadMessagesCount(),
    getRecentPosts(5),
    getRecentMessages(5),
  ]);

  return {
    postsCount,
    projectsCount,
    unreadMessagesCount,
    recentPosts,
    recentMessages,
  };
}

