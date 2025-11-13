import type { BlogPost } from '@/types';

// 從 Markdown 檔案中移除 Front Matter，只保留內容
function extractMarkdownContent(markdown: string): string {
  // 移除 Front Matter（在 --- 和 --- 之間的內容）
  return markdown.replace(/^---\n[\s\S]*?\n---\n/, '').trim();
}

// 動態載入 Markdown 檔案內容
async function loadMarkdownContent(slug: string): Promise<string> {
  try {
    // Webpack 會在 build time 處理這個動態 import
    const file = await import(`@/content/blog/${slug}.md`);
    return extractMarkdownContent(file.default);
  } catch (error) {
    console.error(`Failed to load markdown for slug: ${slug}`, error);
    return '';
  }
}

// 🎯 文章 metadata 配置（集中管理）
// 新增文章只需在這裡加一個物件，content 會自動從對應的 .md 檔案載入
const postsMetadata = [
  {
    id: 1,
    slug: 'fix-zsh-command-not-found',
    title: 'zsh: command not found 解決辦法',
    excerpt:
      '遇到 zsh: command not found 錯誤？學習如何檢查和設定終端機環境變數，解決 NVM 和其他命令找不到的問題...',
    author: 'Elvis',
    imageUrl:
      'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=450&fit=crop',
    tags: [
      { id: 16, name: 'Terminal', slug: 'terminal' },
      { id: 17, name: 'Shell', slug: 'shell' },
      { id: 18, name: 'macOS', slug: 'macos', color: '#000000' },
      { id: 19, name: 'Troubleshooting', slug: 'troubleshooting' },
      { id: 20, name: 'Dev Environment', slug: 'dev-environment' },
    ],
    createdAt: '2025-01-26T10:00:00Z',
    updatedAt: '2025-01-26T10:00:00Z',
  },
  {
    id: 2,
    slug: 'what-is-mvc-mvvm',
    title: '什麼是 MVC/MVVM',
    excerpt:
      '了解 MVC 與 MVVM 設計模式的差異，以及前後端分離後架構演進的歷程...',
    author: 'Elvis',
    imageUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
    tags: [
      { id: 21, name: 'MVC', slug: 'mvc' },
      { id: 22, name: 'MVVM', slug: 'mvvm' },
      { id: 23, name: 'Architecture', slug: 'architecture' },
      { id: 24, name: 'Design Pattern', slug: 'design-pattern' },
    ],
    createdAt: '2025-01-27T10:00:00Z',
    updatedAt: '2025-01-27T10:00:00Z',
  },
  {
    id: 3,
    slug: 'Lombok-Builder',
    title: 'Lombok 是什麼',
    excerpt: '函式庫，依照此函式庫的規則「自動產生設程式碼」',
    author: 'Elvis',
    imageUrl:
      'https://images.unsplash.com/photo-1599372477648-bc918851435b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    tags: [
      { id: 1, name: 'Lombok', slug: 'lombok' },
      { id: 2, name: 'Java', slug: 'java' },
    ],
    createdAt: '2025-11-03T11:00:00Z',
    updatedAt: '2025-11-03T11:00:00Z',
  },
  {
    id: 4,
    slug: 'database-normalization',
    title: '資料庫正規規則',
    excerpt: 'NF 各個條目',
    author: 'Elvis',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1720287601920-ee8c503af775?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    tags: [{ id: 1, name: 'Principle', slug: 'principal' }],
    createdAt: '2025-11-06T13:30:00Z',
    updatedAt: '2025-11-06T13:30:00Z',
  },
  {
    id: 5,
    slug: 'database-normalization-1nf',
    title: '資料庫正規 - 1NF',
    excerpt: '1NF 去除重複資料',
    author: 'Elvis',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1720287601920-ee8c503af775?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    tags: [
      { id: 1, name: 'Database', slug: 'database' },
      { id: 2, name: '1NF', slug: '1NF' },
    ],
    createdAt: '2025-11-06T13:30:00Z',
    updatedAt: '2025-11-06T13:30:00Z',
  },
  {
    id: 6,
    slug: 'database-normalization-2nf',
    title: '資料庫正規 - 2NF',
    excerpt: '2NF 去除部分功能相依',
    author: 'Elvis',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1720287601920-ee8c503af775?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    tags: [
      { id: 1, name: 'Database', slug: 'database' },
      { id: 2, name: '2NF', slug: '2NF' },
    ],
    createdAt: '2025-11-07T11:30:00Z',
    updatedAt: '2025-11-07T11:30:00Z',
  },
  {
    id: 7,
    slug: 'database-normalization-3nf',
    title: '資料庫正規 - 3NF',
    excerpt: '3NF 就是要消除遞移依賴',
    author: 'Elvis',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1720287601920-ee8c503af775?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    tags: [
      { id: 1, name: 'Database', slug: 'database' },
      { id: 2, name: '3NF', slug: '3NF' },
    ],
    createdAt: '2025-11-07T12:00:00Z',
    updatedAt: '2025-11-07T12:00:00Z',
  },
  {
    id: 8,
    slug: 'extra-language',
    title: '各類英文名詞與句子',
    excerpt: 'just for learn english',
    author: 'Elvis',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1720287601920-ee8c503af775?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    tags: [
      { id: 1, name: 'Language', slug: 'language' },
      { id: 2, name: 'translate', slug: 'translate' },
    ],
    createdAt: '2025-11-11T14:34:00Z',
    updatedAt: '2025-11-11T14:34:00Z',
  },
  {
    id: 9,
    slug: 'about-oop',
    title: 'Object-Oriented Programming 物件導向',
    excerpt: 'learn OOP',
    author: 'Elvis',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1720287601920-ee8c503af775?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    tags: [
      { id: 1, name: 'OOP', slug: 'OOP' },
      { id: 2, name: 'Programming', slug: 'programming' },
    ],
    createdAt: '2025-11-11T14:34:00Z',
    updatedAt: '2025-11-11T14:34:00Z',
  },
  {
    id: 10,
    slug: 'render-deploy-postgresql',
    title: 'Render 部署 PostgreSQL 與本機 pgAdmin 連線至 Render',
    excerpt: '學習部署與連線',
    author: 'Elvis',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1720287601920-ee8c503af775?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    tags: [
      { id: 1, name: 'Render', slug: 'render' },
      { id: 2, name: 'PostgreSQL', slug: 'PostgreSQL' },
    ],
    createdAt: '2025-11-13T13:00:00Z',
    updatedAt: '2025-11-13T13:00:00Z',
  },
];

// 🔥 動態載入文章內容
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  // 模擬網路延遲
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 使用 Promise.all 平行載入所有文章的 content
  const postsWithContent = await Promise.all(
    postsMetadata.map(async (metadata) => ({
      ...metadata,
      content: await loadMarkdownContent(metadata.slug),
    }))
  );

  return postsWithContent;
}

export async function fetchBlogPostById(id: number): Promise<BlogPost> {
  const posts = await fetchBlogPosts();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    throw new Error('Blog post not found');
  }

  return post;
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost> {
  const posts = await fetchBlogPosts();
  const post = posts.find((p) => p.slug === slug);

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
