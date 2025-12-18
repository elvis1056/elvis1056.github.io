import { notFound } from 'next/navigation';

import { fetchBlogPostBySlug, fetchBlogPosts } from '@/lib/api/blog';

import BlogPostContent from './BlogPostContent';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// 靜態生成所有文章路徑（供 output: export 使用）
export async function generateStaticParams() {
  const posts = await fetchBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  try {
    const post = await fetchBlogPostBySlug(slug);
    return <BlogPostContent post={post} />;
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    notFound();
  }
}
