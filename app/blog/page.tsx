import { fetchBlogPosts } from '@/lib/api/blog';

import { BlogList } from './blog-list';

// 強制動態渲染（不要靜態生成）
export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  // 在伺服器端抓取資料
  const posts = await fetchBlogPosts();

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>部落格</h1>
      <BlogList posts={posts} />
    </main>
  );
}
