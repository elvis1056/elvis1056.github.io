import type { Category, Tag } from './common';

/**
 * 系列資訊（用於系列頁面）
 */
export interface Series {
  id: number;
  name: string;
  slug: string;
  description?: string;
  coverImage?: string;
  postCount: number;
}

/**
 * 文章中的系列資訊（精簡版，避免循環引用）
 */
export interface SeriesInfo {
  id: number;
  name: string;
  slug: string;
  order: number; // 此文章在系列中的順序（第幾篇）
  totalPosts: number; // 系列總共幾篇
}

/**
 * 部落格文章
 */
export interface BlogPost {
  id: number;
  slug: string; // URL slug（方案 A 使用）
  title: string;
  content: string;
  excerpt: string;
  author: string;
  imageUrl: string;
  tags: Tag[];
  category?: Category;
  series?: SeriesInfo; // 可選，不是所有文章都在系列中
  createdAt: string;
  updatedAt: string;
}
