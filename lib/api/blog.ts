import type { BlogPost } from '@/types';

// 🔥 假資料 - 之後改成真實 API
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  // 模擬網路延遲
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: 1,
      title: 'Next.js 15 新功能介紹',
      excerpt: '探索 Next.js 15 帶來的革命性更新...',
      content:
        'Next.js 15 引入了許多令人興奮的新功能，包括改進的 Server Components、更快的構建速度...',
      author: 'Elvis',
      imageUrl: '/images/blog-1.jpg',
      createdAt: '2025-01-20T10:00:00Z',
      updatedAt: '2025-01-20T10:00:00Z',
    },
    {
      id: 2,
      title: 'TypeScript 最佳實踐',
      excerpt: '學習如何在大型專案中有效使用 TypeScript...',
      content:
        'TypeScript 為 JavaScript 增加了靜態型別檢查，大幅提升開發體驗和程式碼品質...',
      author: 'Elvis',
      imageUrl: '/images/blog-2.jpg',
      createdAt: '2025-01-21T10:00:00Z',
      updatedAt: '2025-01-21T10:00:00Z',
    },
    {
      id: 3,
      title: 'React Query 實戰技巧',
      excerpt: 'TanStack Query 讓資料抓取變得更簡單...',
      content:
        'TanStack Query（前身 React Query）提供了強大的伺服器狀態管理能力...',
      author: 'Elvis',
      imageUrl: '/images/blog-3.jpg',
      createdAt: '2025-01-22T10:00:00Z',
      updatedAt: '2025-01-22T10:00:00Z',
    },
  ];
}

export async function fetchBlogPostById(id: number): Promise<BlogPost> {
  const posts = await fetchBlogPosts();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    throw new Error('Blog post not found');
  }

  return post;
}

// 🔧 之後改成這樣（真實 API）：
// export async function fetchBlogPosts(): Promise<BlogPost[]> {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/blog`);
//   if (!res.ok) {
//     const error = new Error(`Failed to fetch blog posts: ${res.status}`);
//     (error as any).status = res.status;
//     throw error;
//   }
//   return res.json();
// }
