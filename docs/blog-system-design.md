# 企業級部落格系統完整設計方案

> 撰寫日期：2025-01-30
> 專案：5dpapa 電商與部落格平台

---

## 📊 目錄

1. [主流部落格平台分析](#主流部落格平台分析)
2. [建議採用的模式](#建議採用的模式)
3. [技術棧](#技術棧)
4. [資料庫設計](./blog-database-schema.md)
5. [API 設計](./blog-api-spec.md)
6. [TypeScript 類型](./blog-types.md)
7. [前端架構](#前端架構)
8. [實作優先級](#實作優先級)

---

## 📊 主流部落格平台分析

### 1. Medium 模式

**特點：**
- ✅ 簡潔的編輯器（Markdown + Rich Text）
- ✅ Clap 系統（按讚）
- ✅ 回應/留言
- ✅ 標籤分類
- ✅ 閱讀時間估算
- ✅ 草稿自動儲存

**適用場景：** 內容創作者平台、閱讀體驗優先

---

### 2. Dev.to 模式

**特點：**
- ✅ Markdown 優先
- ✅ 程式碼高亮
- ✅ 系列文章（Series）
- ✅ 社群互動（like, bookmark, unicorn）
- ✅ 標籤系統
- ✅ 封面圖上傳

**適用場景：** 技術部落格、開發者社群

---

### 3. Hashnode 模式

**特點：**
- ✅ 個人 Blog 平台
- ✅ 系列文章
- ✅ Newsletter 整合
- ✅ 自訂域名
- ✅ SEO 優化

**適用場景：** 個人品牌建立、技術作家

---

### 4. Ghost 模式（CMS）

**特點：**
- ✅ 會員制
- ✅ Newsletter
- ✅ 付費訂閱
- ✅ 編輯團隊管理

**適用場景：** 專業內容平台、付費訂閱服務

---

## 🎯 建議採用的模式

基於 5dpapa 專案（電商 + 部落格）特性，建議採用：

### **Dev.to + Medium 混合模式**

**核心功能：**

| 功能 | 優先級 | 說明 |
|------|--------|------|
| Markdown 編輯器 | ⭐⭐⭐ | 技術友善、易於維護 |
| 標籤分類系統 | ⭐⭐⭐ | 內容組織、SEO |
| 互動功能 | ⭐⭐ | like, bookmark, comment |
| 系列文章 | ⭐⭐ | 教學文可做成系列 |
| SEO 優化 | ⭐⭐⭐ | 搜尋引擎可見度 |
| 閱讀時間估算 | ⭐ | 提升用戶體驗 |

**暫不實作：**
- ❌ 付費訂閱（可後續擴充）
- ❌ Newsletter（可後續擴充）
- ❌ 多作者管理（Phase 2）

---

## 💻 技術棧

### 前端

```typescript
{
  "framework": "Next.js 15",
  "language": "TypeScript",
  "styling": "styled-components",
  "state": "Zustand + React Query",
  "markdown": "react-markdown / MDX",
  "editor": "待定（react-simplemde-editor / Tiptap）",
  "syntax-highlight": "prism-react-renderer / highlight.js"
}
```

### 後端（假設）

```typescript
{
  "runtime": "Node.js",
  "framework": "Express / Fastify",
  "database": "PostgreSQL",
  "orm": "Prisma / TypeORM",
  "auth": "JWT (HttpOnly Cookie)",
  "storage": "Cloudinary / AWS S3（圖片）"
}
```

---

## 📁 前端架構

### 目錄結構

```
features/blog/
├── components/
│   ├── PostCard/           # 文章卡片
│   │   ├── index.tsx
│   │   └── style.ts
│   ├── PostList/           # 文章列表
│   │   ├── index.tsx
│   │   └── style.ts
│   ├── PostDetail/         # 文章詳細頁
│   │   ├── index.tsx
│   │   └── style.ts
│   ├── PostEditor/         # Markdown 編輯器
│   │   ├── index.tsx
│   │   ├── Preview.tsx
│   │   └── style.ts
│   ├── CommentSection/     # 留言區
│   │   ├── index.tsx
│   │   ├── CommentItem.tsx
│   │   ├── CommentForm.tsx
│   │   └── style.ts
│   ├── TagBadge/          # 標籤徽章
│   ├── CategoryFilter/     # 分類篩選
│   ├── SeriesNav/         # 系列導航
│   └── PostStats/         # 統計資訊
│
├── hooks/
│   ├── usePost.ts          # 取得單篇文章（React Query）
│   ├── usePosts.ts         # 取得文章列表
│   ├── useCreatePost.ts    # 創建文章（mutation）
│   ├── useUpdatePost.ts    # 更新文章
│   ├── useDeletePost.ts    # 刪除文章
│   ├── useComments.ts      # 取得留言
│   ├── useCreateComment.ts # 創建留言
│   ├── useInteraction.ts   # 互動（like, bookmark）
│   └── useTags.ts          # 取得標籤
│
├── api/
│   ├── posts.ts           # 文章 API 呼叫
│   ├── comments.ts        # 留言 API 呼叫
│   ├── tags.ts            # 標籤 API 呼叫
│   ├── interactions.ts    # 互動 API 呼叫
│   └── series.ts          # 系列 API 呼叫
│
└── utils/
    ├── markdown.ts         # Markdown 處理
    ├── readingTime.ts      # 計算閱讀時間
    ├── slugify.ts          # 生成 slug
    └── excerpt.ts          # 生成摘要
```

### 頁面結構

```
app/
├── blog/
│   ├── page.tsx                    # 文章列表頁
│   ├── [slug]/
│   │   └── page.tsx                # 文章詳細頁
│   ├── tags/
│   │   └── [slug]/
│   │       └── page.tsx            # 標籤頁
│   ├── categories/
│   │   └── [slug]/
│   │       └── page.tsx            # 分類頁
│   ├── series/
│   │   └── [slug]/
│   │       └── page.tsx            # 系列頁
│   └── write/
│       └── page.tsx                # 編輯器頁（需認證）
```

---

## 🎯 實作優先級

### Phase 1: MVP（核心功能）

**目標：** 基本的部落格功能

**功能清單：**
1. ✅ 文章 CRUD（創建、讀取、更新、刪除）
2. ✅ Markdown 編輯器
3. ✅ 文章列表 + 詳細頁
4. ✅ 標籤系統
5. ✅ 基本 SEO（meta tags、Open Graph）
6. ✅ 響應式設計

**預估時間：** 2-3 週

**驗收標準：**
- [ ] 可以發布文章
- [ ] Markdown 正確渲染
- [ ] 標籤可以篩選
- [ ] SEO meta tags 正確
- [ ] 手機版正常顯示

---

### Phase 2: 互動功能

**目標：** 增加用戶參與度

**功能清單：**
1. ✅ 留言系統（含回覆）
2. ✅ 按讚/收藏
3. ✅ 瀏覽計數
4. ✅ 分享功能（社群媒體）
5. ✅ 作者資訊頁

**預估時間：** 2 週

**驗收標準：**
- [ ] 用戶可以留言和回覆
- [ ] 按讚和收藏功能正常
- [ ] 瀏覽次數準確計算
- [ ] 可以分享到社群媒體

---

### Phase 3: 進階功能

**目標：** 提升內容組織和用戶體驗

**功能清單：**
1. ✅ 系列文章
2. ✅ 草稿自動儲存
3. ✅ 圖片上傳（拖放支援）
4. ✅ 程式碼語法高亮
5. ✅ 目錄（TOC）自動生成
6. ✅ 閱讀進度條
7. ✅ 相關文章推薦

**預估時間：** 2-3 週

---

### Phase 4: 優化與擴充

**目標：** 企業級功能

**功能清單：**
1. ✅ 全文搜尋（Elasticsearch / PostgreSQL Full-Text）
2. ✅ 智能推薦系統
3. ✅ RSS Feed
4. ✅ Newsletter 整合
5. ✅ Analytics（閱讀統計、熱門文章）
6. ✅ 多語言支援（i18n）
7. ✅ 圖片 CDN 優化

**預估時間：** 3-4 週

---

## 🔧 關鍵技術決策

### 1. Markdown 編輯器選擇

| 方案 | 優點 | 缺點 | 推薦度 |
|------|------|------|--------|
| **react-markdown** | 輕量、簡單 | 功能較少 | ⭐⭐⭐ |
| **MDX** | 可嵌入 React 組件 | 學習曲線較高 | ⭐⭐ |
| **Tiptap** | WYSIWYG、功能強大 | 較重、設定複雜 | ⭐⭐ |
| **SimpleMDE** | 即時預覽、工具列 | 樣式客製化困難 | ⭐⭐⭐ |

**建議：** 先用 `react-markdown` + `react-simplemde-editor`

---

### 2. 圖片上傳方案

| 方案 | 優點 | 缺點 | 成本 |
|------|------|------|------|
| **Cloudinary** | 自動優化、CDN、免費額度 | 依賴第三方 | 💰 Free tier 慷慨 |
| **AWS S3 + CloudFront** | 完全控制、可擴展 | 設定複雜 | 💰💰 按量計費 |
| **自架 Server** | 無外部依賴 | 頻寬成本高、無優化 | 💰💰💰 |

**建議：** Cloudinary（開發期）→ AWS S3（正式環境）

---

### 3. SEO 優化策略

**必備項目：**
- ✅ Dynamic meta tags（title, description, keywords）
- ✅ Open Graph tags（社群分享）
- ✅ Structured Data（JSON-LD）
- ✅ Sitemap 自動生成
- ✅ Canonical URLs
- ✅ 語意化 HTML

**Next.js 15 實作：**

```typescript
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.metaKeywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}
```

---

## 📈 效能優化建議

### 1. 資料載入

```typescript
// 使用 React Query 的 prefetch
export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['posts'], fetchPosts);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
```

### 2. 圖片優化

```typescript
// 使用 Next.js Image 組件
import Image from 'next/image';

<Image
  src={post.coverImage}
  alt={post.coverImageAlt}
  width={1200}
  height={630}
  priority={isFeatured}
  placeholder="blur"
/>
```

### 3. 程式碼分割

```typescript
// 動態載入編輯器（減少首頁包大小）
const PostEditor = dynamic(() => import('@/features/blog/components/PostEditor'), {
  ssr: false,
  loading: () => <EditorSkeleton />,
});
```

---

## 🔒 安全性考量

### 1. XSS 防護

```typescript
// 使用 DOMPurify 清理 HTML
import DOMPurify from 'isomorphic-dompurify';

const cleanHtml = DOMPurify.sanitize(post.contentHtml);
```

### 2. CSRF 保護

- ✅ 使用現有的 CSRF token 機制
- ✅ 所有 POST/PUT/DELETE 請求都要驗證

### 3. 內容審核

```typescript
// 敏感詞過濾（可選）
import Filter from 'bad-words';

const filter = new Filter();
const cleanContent = filter.clean(content);
```

---

## 📚 參考資源

- [Next.js 文檔](https://nextjs.org/docs)
- [React Query 文檔](https://tanstack.com/query/latest)
- [MDN - SEO 最佳實踐](https://developer.mozilla.org/en-US/docs/Glossary/SEO)
- [Dev.to 開源專案](https://github.com/forem/forem)
- [Ghost CMS](https://github.com/TryGhost/Ghost)

---

## 📝 下一步

1. [ ] 確認資料庫 schema（參考 [blog-database-schema.md](./blog-database-schema.md)）
2. [ ] 確認 API 規格（參考 [blog-api-spec.md](./blog-api-spec.md)）
3. [ ] 確認 TypeScript 類型（參考 [blog-types.md](./blog-types.md)）
4. [ ] 開始實作 Phase 1 MVP
5. [ ] 設定開發環境（Markdown 編輯器、圖片上傳）

---

**文檔維護者：** Claude Code
**最後更新：** 2025-01-30
