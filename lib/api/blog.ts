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
  {
    id: 11,
    slug: 'twitch-workers-example-1',
    title: 'Twitch worker 範例 ep.2',
    excerpt: '學習 cloudflare 與 worker',
    author: 'Elvis',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1720287601920-ee8c503af775?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    tags: [
      { id: 1, name: 'Cloudflare', slug: 'cloudflare' },
      { id: 2, name: 'Worker', slug: 'worker' },
    ],
    createdAt: '2025-11-20T13:00:00Z',
    updatedAt: '2025-11-20T13:00:00Z',
  },
  {
    id: 12,
    slug: 'twitch-workers-example-2',
    title: 'Twitch worker 範例 ep.1',
    excerpt: '學習 cloudflare 與 worker',
    author: 'Elvis',
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1720287601920-ee8c503af775?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    tags: [
      { id: 1, name: 'Cloudflare', slug: 'cloudflare' },
      { id: 2, name: 'Worker', slug: 'worker' },
    ],
    createdAt: '2025-11-20T13:00:00Z',
    updatedAt: '2025-11-20T13:00:00Z',
  },
  {
    id: 13,
    slug: 'key-considerations-for-java-dockerfile-configuration-ep1',
    title: 'Java Dockerfile 配置關鍵考量 EP.1',
    excerpt: '學習如何正確配置 Java 應用的 Dockerfile',
    author: 'Elvis',
    imageUrl:
      'https://images.unsplash.com/photo-1605745341112-85968b19335b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    tags: [
      { id: 1, name: 'Java', slug: 'java' },
      { id: 2, name: 'Docker', slug: 'docker' },
      { id: 3, name: 'Dockerfile', slug: 'dockerfile' },
    ],
    createdAt: '2025-11-24T23:00:00Z',
    updatedAt: '2025-11-24T23:00:00Z',
  },
  {
    id: 14,
    slug: 'key-considerations-for-java-dockerfile-configuration-ep2',
    title: 'Java Dockerfile 配置關鍵考量 EP.2',
    excerpt: '深入探討 Java Dockerfile 的進階配置技巧',
    author: 'Elvis',
    imageUrl:
      'https://images.unsplash.com/photo-1605745341112-85968b19335b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    tags: [
      { id: 1, name: 'Java', slug: 'java' },
      { id: 2, name: 'Docker', slug: 'docker' },
      { id: 3, name: 'Dockerfile', slug: 'dockerfile' },
    ],
    createdAt: '2025-11-24T23:30:00Z',
    updatedAt: '2025-11-24T23:30:00Z',
  },
  {
    id: 15,
    slug: 'docker-something',
    title: 'Docker 相關知識',
    excerpt: '學習 Docker 容器化技術與實戰應用',
    author: 'Elvis',
    imageUrl:
      'https://images.unsplash.com/photo-1605745341112-85968b19335b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    tags: [
      { id: 1, name: 'Docker', slug: 'docker' },
      { id: 2, name: 'Container', slug: 'container' },
      { id: 3, name: 'DevOps', slug: 'devops' },
    ],
    createdAt: '2025-11-28T23:30:00Z',
    updatedAt: '2025-11-28T23:30:00Z',
  },
  {
    id: 16,
    slug: 'java-env-setting',
    title: 'Java 環境設定',
    excerpt: '完整的 Java 開發環境配置指南',
    author: 'Elvis',
    imageUrl:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    tags: [
      { id: 1, name: 'Java', slug: 'java' },
      { id: 2, name: 'Environment', slug: 'environment' },
      { id: 3, name: 'Setup', slug: 'setup' },
    ],
    createdAt: '2025-11-29T23:30:00Z',
    updatedAt: '2025-11-29T23:30:00Z',
  },
  {
    id: 17,
    slug: 'java-local-docker-production',
    title: 'Java 本地開發到 Docker 生產環境部署',
    excerpt: '從本地開發到容器化部署的完整流程',
    author: 'Elvis',
    imageUrl:
      'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    tags: [
      { id: 1, name: 'Java', slug: 'java' },
      { id: 2, name: 'Docker', slug: 'docker' },
      { id: 3, name: 'Production', slug: 'production' },
      { id: 4, name: 'Deployment', slug: 'deployment' },
    ],
    createdAt: '2025-11-30T23:30:00Z',
    updatedAt: '2025-11-30T23:30:00Z',
  },
  {
    id: 18,
    slug: 'software-engineer-interview',
    title: '軟體工程師面試準備',
    excerpt: '軟體工程師面試技巧與常見問題解析',
    author: 'Elvis',
    imageUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    tags: [
      { id: 1, name: 'Interview', slug: 'interview' },
      { id: 2, name: 'Career', slug: 'career' },
      { id: 3, name: 'Software Engineer', slug: 'software-engineer' },
    ],
    createdAt: '2025-12-01T23:30:00Z',
    updatedAt: '2025-12-01T23:30:00Z',
  },
  {
    id: 19,
    slug: 'vm-free-google-cloud',
    title: 'Google Cloud 免費虛擬機使用指南',
    excerpt: '如何申請和使用 Google Cloud 的免費 VM 資源',
    author: 'Elvis',
    imageUrl:
      'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    tags: [
      { id: 1, name: 'Google Cloud', slug: 'google-cloud' },
      { id: 2, name: 'VM', slug: 'vm' },
      { id: 3, name: 'Cloud', slug: 'cloud' },
      { id: 4, name: 'Free Tier', slug: 'free-tier' },
    ],
    createdAt: '2025-12-02T23:30:00Z',
    updatedAt: '2025-12-02T23:30:00Z',
  },
  {
    id: 20,
    slug: 'java-create-categories-thinking-process',
    title: '從「需求」到「程式碼」的思考流程',
    excerpt: '如何從需求分析開始設計兩層商品分類系統',
    author: 'Elvis',
    imageUrl:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    tags: [
      { id: 1, name: 'Java', slug: 'java' },
      { id: 2, name: 'Design', slug: 'design' },
      { id: 3, name: 'System Design', slug: 'system-design' },
      { id: 4, name: 'Categories', slug: 'categories' },
    ],
    createdAt: '2025-12-03T23:30:00Z',
    updatedAt: '2025-12-03T23:30:00Z',
  },
  {
    id: 21,
    slug: 'java-new-member',
    title: 'RegisterRequest 的設計解析',
    excerpt: '關注點分離與 RegisterRequest 的完整設計解說',
    author: 'Elvis',
    imageUrl:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    tags: [
      { id: 1, name: 'Java', slug: 'java' },
      { id: 2, name: 'Spring Boot', slug: 'spring-boot' },
      { id: 3, name: 'Design Pattern', slug: 'design-pattern' },
      { id: 4, name: 'Authentication', slug: 'authentication' },
    ],
    createdAt: '2025-12-04T23:30:00Z',
    updatedAt: '2025-12-04T23:30:00Z',
  },
  {
    id: 22,
    slug: 'java-new-member-entity',
    title: 'User Entity 設計詳解',
    excerpt: '深入解析 User.java Entity 的設計思路與實作細節',
    author: 'Elvis',
    imageUrl:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    tags: [
      { id: 1, name: 'Java', slug: 'java' },
      { id: 2, name: 'JPA', slug: 'jpa' },
      { id: 3, name: 'Entity', slug: 'entity' },
      { id: 4, name: 'Database', slug: 'database' },
    ],
    createdAt: '2025-12-05T23:30:00Z',
    updatedAt: '2025-12-05T23:30:00Z',
  },
  {
    id: 23,
    slug: 'java-securityfilterchain',
    title: '理解 Spring Security FilterChain',
    excerpt: 'SecurityFilterChain 的運作原理與設定解析',
    author: 'Elvis',
    imageUrl:
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    tags: [
      { id: 1, name: 'Java', slug: 'java' },
      { id: 2, name: 'Spring Security', slug: 'spring-security' },
      { id: 3, name: 'Security', slug: 'security' },
      { id: 4, name: 'Filter', slug: 'filter' },
    ],
    createdAt: '2025-12-06T23:30:00Z',
    updatedAt: '2025-12-06T23:30:00Z',
  },
  {
    id: 24,
    slug: 'java-thinking-and-making-decisions',
    title: 'Java 開發的關鍵決策總覽',
    excerpt: 'Entity 層設計的所有關鍵決策點與選擇分析',
    author: 'Elvis',
    imageUrl:
      'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    tags: [
      { id: 1, name: 'Java', slug: 'java' },
      { id: 2, name: 'Architecture', slug: 'architecture' },
      { id: 3, name: 'Design', slug: 'design' },
      { id: 4, name: 'Best Practice', slug: 'best-practice' },
    ],
    createdAt: '2025-12-07T23:30:00Z',
    updatedAt: '2025-12-07T23:30:00Z',
  },
  {
    id: 25,
    slug: 'java-verify-database-step',
    title: 'PostgreSQL 資料庫驗證指南',
    excerpt: '如何使用 Docker 連接並驗證 PostgreSQL 資料庫',
    author: 'Elvis',
    imageUrl:
      'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    tags: [
      { id: 1, name: 'PostgreSQL', slug: 'postgresql' },
      { id: 2, name: 'Docker', slug: 'docker' },
      { id: 3, name: 'Database', slug: 'database' },
      { id: 4, name: 'Verification', slug: 'verification' },
    ],
    createdAt: '2025-12-08T23:30:00Z',
    updatedAt: '2025-12-08T23:30:00Z',
  },
  {
    id: 26,
    slug: 'java-create-cart',
    title: '關於購物車完整攻略',
    excerpt: '從需求分析到實作的購物車功能開發指南',
    author: 'Elvis',
    imageUrl:
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    tags: [
      { id: 1, name: 'Java', slug: 'java' },
      { id: 2, name: 'Shopping Cart', slug: 'shopping-cart' },
      { id: 3, name: 'E-commerce', slug: 'e-commerce' },
      { id: 4, name: 'Backend', slug: 'backend' },
    ],
    createdAt: '2025-12-17T23:30:00Z',
    updatedAt: '2025-12-17T23:30:00Z',
  },
  {
    id: 27,
    slug: 'interview-store-token',
    title: '用戶登入後的 Token 該怎麼存？',
    excerpt:
      '深入探討前端 Token 儲存方案：LocalStorage、Cookie、內存與雙 Token 策略的安全性與使用體驗比較',
    author: 'Elvis',
    imageUrl:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    tags: [
      { id: 1, name: 'Security', slug: 'security' },
      { id: 2, name: 'Authentication', slug: 'authentication' },
      { id: 3, name: 'Frontend', slug: 'frontend' },
      { id: 4, name: 'Interview', slug: 'interview' },
      { id: 5, name: 'Token', slug: 'token' },
    ],
    createdAt: '2026-01-02T10:00:00Z',
    updatedAt: '2026-01-02T10:00:00Z',
  },
  {
    id: 28,
    slug: 'commands',
    title: 'Linux/Docker 常用指令速查表',
    excerpt: 'Port 管理、Process 控制、Java/Docker 開發常用指令完整整理',
    author: 'Elvis',
    imageUrl:
      'https://images.unsplash.com/photo-1629654297299-c8506221ca97?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    tags: [
      { id: 1, name: 'Linux', slug: 'linux' },
      { id: 2, name: 'Docker', slug: 'docker' },
      { id: 3, name: 'Terminal', slug: 'terminal' },
      { id: 4, name: 'DevOps', slug: 'devops' },
      { id: 5, name: 'Commands', slug: 'commands' },
    ],
    createdAt: '2026-01-02T11:00:00Z',
    updatedAt: '2026-01-02T11:00:00Z',
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
