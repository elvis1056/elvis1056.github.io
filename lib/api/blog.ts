import type { BlogPost } from '@/types';

// 🔥 假資料 - 之後改成真實 API
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  // 模擬網路延遲
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: 1,
      title: 'Next.js 15 新功能介紹',
      excerpt:
        '探索 Next.js 15 帶來的革命性更新，包括改進的 Server Components、更快的構建速度和全新的開發體驗...',
      content:
        'Next.js 15 引入了許多令人興奮的新功能，包括改進的 Server Components、更快的構建速度...',
      author: 'Elvis',
      imageUrl:
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
      tags: [
        { id: 1, name: 'Next.js', slug: 'nextjs', color: '#000000' },
        { id: 2, name: 'React', slug: 'react', color: '#61DAFB' },
        { id: 3, name: 'Web Development', slug: 'web-dev' },
      ],
      createdAt: '2025-01-20T10:00:00Z',
      updatedAt: '2025-01-20T10:00:00Z',
    },
    {
      id: 2,
      title: 'TypeScript 最佳實踐',
      excerpt:
        '學習如何在大型專案中有效使用 TypeScript，提升程式碼品質和開發效率，避免常見的陷阱...',
      content:
        'TypeScript 為 JavaScript 增加了靜態型別檢查，大幅提升開發體驗和程式碼品質...',
      author: 'Elvis',
      imageUrl:
        'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=450&fit=crop',
      tags: [
        { id: 4, name: 'TypeScript', slug: 'typescript', color: '#3178C6' },
        { id: 5, name: 'JavaScript', slug: 'javascript', color: '#F7DF1E' },
        { id: 6, name: 'Best Practices', slug: 'best-practices' },
      ],
      createdAt: '2025-01-21T10:00:00Z',
      updatedAt: '2025-01-21T10:00:00Z',
    },
    {
      id: 3,
      title: 'React Query 實戰技巧',
      excerpt:
        'TanStack Query 讓資料抓取變得更簡單，了解如何在真實專案中應用這個強大的工具...',
      content:
        'TanStack Query（前身 React Query）提供了強大的伺服器狀態管理能力...',
      author: 'Elvis',
      imageUrl:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop',
      tags: [
        { id: 2, name: 'React', slug: 'react', color: '#61DAFB' },
        { id: 7, name: 'React Query', slug: 'react-query', color: '#FF4154' },
        { id: 8, name: 'State Management', slug: 'state-management' },
      ],
      createdAt: '2025-01-22T10:00:00Z',
      updatedAt: '2025-01-22T10:00:00Z',
    },
    {
      id: 4,
      title: 'Styled Components 進階技巧',
      excerpt: '深入探討 CSS-in-JS 的最佳實踐，學習如何建立可維護的樣式系統...',
      content: 'Styled Components 提供了強大的 CSS-in-JS 解決方案...',
      author: 'Elvis',
      imageUrl:
        'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=450&fit=crop',
      tags: [
        { id: 9, name: 'CSS', slug: 'css', color: '#1572B6' },
        {
          id: 10,
          name: 'Styled Components',
          slug: 'styled-components',
          color: '#DB7093',
        },
        { id: 2, name: 'React', slug: 'react', color: '#61DAFB' },
      ],
      createdAt: '2025-01-23T10:00:00Z',
      updatedAt: '2025-01-23T10:00:00Z',
    },
    {
      id: 5,
      title: '打造極簡風格的部落格',
      excerpt:
        '探索如何設計一個極簡但功能完整的部落格系統，強調視覺美學與使用者體驗...',
      content: '極簡設計不僅僅是減少元素，更是關於如何聚焦於核心價值...',
      author: 'Elvis',
      imageUrl:
        'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=450&fit=crop',
      tags: [
        { id: 11, name: 'Design', slug: 'design' },
        { id: 12, name: 'UI/UX', slug: 'ui-ux' },
        { id: 13, name: 'Minimalism', slug: 'minimalism' },
      ],
      createdAt: '2025-01-24T10:00:00Z',
      updatedAt: '2025-01-24T10:00:00Z',
    },
    {
      id: 6,
      title: 'Zustand vs Redux：狀態管理比較',
      excerpt:
        '比較兩種流行的 React 狀態管理方案，幫助你選擇最適合專案的工具...',
      content: 'Zustand 和 Redux 都是優秀的狀態管理工具，但各有優缺點...',
      author: 'Elvis',
      imageUrl:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
      tags: [
        { id: 2, name: 'React', slug: 'react', color: '#61DAFB' },
        { id: 14, name: 'Zustand', slug: 'zustand' },
        { id: 15, name: 'Redux', slug: 'redux', color: '#764ABC' },
        { id: 8, name: 'State Management', slug: 'state-management' },
      ],
      createdAt: '2025-01-25T10:00:00Z',
      updatedAt: '2025-01-25T10:00:00Z',
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
