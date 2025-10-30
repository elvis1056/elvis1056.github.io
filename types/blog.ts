import type { Category, Tag } from './common';

/**
 * 部落格文章
 */
export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  imageUrl: string;
  tags: Tag[];
  category?: Category;
  createdAt: string;
  updatedAt: string;
}
