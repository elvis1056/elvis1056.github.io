/**
 * ⚠️ TODO: 動態 Sitemap（目前無法使用）
 *
 * 此檔案目前無法在靜態導出模式下運作
 * 原因：next.config.ts 設定了 output: 'export'
 *
 * 靜態導出模式不支援：
 * - 動態 sitemap.ts
 * - 任何伺服器端功能
 *
 * 未來如果改成動態部署（移除 output: 'export'），
 * 可以直接使用此檔案，sitemap 將自動更新。
 *
 * 目前使用：public/sitemap.xml（靜態文件）
 */

import type { MetadataRoute } from 'next';

import { fetchBlogPosts } from '@/lib/api/blog';

const BASE_URL = 'https://elvis1056.github.io/5dpapa';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 固定頁面
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ];

  // 動態載入所有 blog 文章
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await fetchBlogPosts();
    blogPages = posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Failed to fetch blog posts for sitemap:', error);
  }

  // 合併所有頁面
  return [...staticPages, ...blogPages];
}
