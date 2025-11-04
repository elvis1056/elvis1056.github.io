# 部落格系統 TypeScript 類型定義

> 撰寫日期：2025-01-30
> 語言：TypeScript 5.0+

---

## 📋 目錄

1. [基礎類型](#基礎類型)
2. [文章相關](#文章相關)
3. [標籤相關](#標籤相關)
4. [分類相關](#分類相關)
5. [系列相關](#系列相關)
6. [留言相關](#留言相關)
7. [互動相關](#互動相關)
8. [統計相關](#統計相關)
9. [工具類型](#工具類型)

---

## 🎯 基礎類型

```typescript
// types/blog.ts

/**
 * 文章狀態
 */
export type PostStatus = 'draft' | 'published' | 'scheduled' | 'archived';

/**
 * 系列狀態
 */
export type SeriesStatus = 'active' | 'completed' | 'archived';

/**
 * 互動類型
 */
export type InteractionType = 'like' | 'bookmark' | 'share' | 'report';

/**
 * 互動目標類型
 */
export type TargetType = 'post' | 'comment';

/**
 * 排序方式
 */
export type SortBy = 'latest' | 'popular' | 'trending';

/**
 * 排序方向
 */
export type SortOrder = 'asc' | 'desc';
```

---

## 📝 文章相關

### BlogPost - 文章主介面

```typescript
/**
 * 部落格文章
 */
export interface BlogPost {
  // ========================================
  // 基本資訊
  // ========================================
  id: number;
  title: string;
  slug: string;
  subtitle?: string;

  // ========================================
  // 內容
  // ========================================
  content: string;              // Markdown 原始內容
  contentHtml?: string;         // 渲染後的 HTML
  excerpt: string;              // 摘要

  // ========================================
  // 作者
  // ========================================
  authorId: number;
  author?: User;                // 關聯的用戶物件

  // ========================================
  // 分類與標籤
  // ========================================
  categoryId?: number;
  category?: Category;
  tags?: Tag[];

  // ========================================
  // 媒體
  // ========================================
  coverImage?: string;
  coverImageAlt?: string;

  // ========================================
  // SEO
  // ========================================
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;

  // ========================================
  // 狀態
  // ========================================
  status: PostStatus;
  publishedAt?: string;         // ISO 8601 格式
  scheduledAt?: string;

  // ========================================
  // 統計
  // ========================================
  viewCount: number;
  likeCount: number;
  commentCount: number;
  bookmarkCount: number;
  readingTime: number;          // 分鐘

  // ========================================
  // 設定
  // ========================================
  allowComments: boolean;
  isFeatured: boolean;
  isPinned: boolean;

  // ========================================
  // 系列
  // ========================================
  seriesId?: number;
  series?: Series;
  seriesOrder?: number;

  // ========================================
  // 時間戳記
  // ========================================
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;

  // ========================================
  // 前端擴充欄位（不存在 DB）
  // ========================================
  isLikedByCurrentUser?: boolean;
  isBookmarkedByCurrentUser?: boolean;
}
```

### CreatePostRequest - 創建文章請求

```typescript
/**
 * 創建文章請求
 */
export interface CreatePostRequest {
  // 必填
  title: string;
  content: string;

  // 可選（自動生成或預設值）
  slug?: string;
  subtitle?: string;
  excerpt?: string;
  coverImage?: string;
  coverImageAlt?: string;
  categoryId?: number;
  tagIds?: number[];
  status?: PostStatus;
  publishedAt?: string;
  scheduledAt?: string;
  seriesId?: number;
  seriesOrder?: number;
  allowComments?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}
```

### UpdatePostRequest - 更新文章請求

```typescript
/**
 * 更新文章請求
 */
export interface UpdatePostRequest extends Partial<CreatePostRequest> {
  id: number;
}
```

### BlogPostQuery - 文章查詢參數

```typescript
/**
 * 文章列表查詢參數
 */
export interface BlogPostQuery {
  // 分頁
  page?: number;
  limit?: number;

  // 篩選
  status?: PostStatus;
  authorId?: number;
  categoryId?: number;
  tagIds?: number[];
  seriesId?: number;
  search?: string;
  isFeatured?: boolean;

  // 排序
  sortBy?: SortBy;
  sortOrder?: SortOrder;

  // 日期範圍
  dateFrom?: string;
  dateTo?: string;
}
```

### BlogPostListResponse - 文章列表回應

```typescript
/**
 * 文章列表回應
 */
export interface BlogPostListResponse {
  posts: BlogPost[];
  pagination: PaginationMeta;
}

/**
 * 分頁元資料
 */
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

### PostCard - 文章卡片（UI 用）

```typescript
/**
 * 文章卡片（精簡版，用於列表顯示）
 */
export interface PostCard {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  author: {
    id: number;
    username: string;
    avatar?: string;
  };
  tags: Array<{
    id: number;
    name: string;
    slug: string;
    color?: string;
  }>;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  readingTime: number;
  publishedAt: string;
  isLikedByCurrentUser?: boolean;
}
```

---

## 🏷️ 標籤相關

```typescript
/**
 * 標籤
 */
export interface Tag {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color?: string;               // Hex 顏色碼
  icon?: string;                // Icon 名稱
  postCount: number;
  createdAt: string;
}

/**
 * 創建標籤請求
 */
export interface CreateTagRequest {
  name: string;
  slug?: string;
  description?: string;
  color?: string;
  icon?: string;
}

/**
 * 更新標籤請求
 */
export interface UpdateTagRequest extends Partial<CreateTagRequest> {
  id: number;
}

/**
 * 標籤查詢參數
 */
export interface TagQuery {
  sortBy?: 'popular' | 'alphabetical' | 'recent';
  limit?: number;
  search?: string;
}
```

---

## 📂 分類相關

```typescript
/**
 * 分類
 */
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parentId?: number;
  parent?: Category;            // 父分類
  children?: Category[];        // 子分類
  orderIndex: number;
  postCount: number;
  createdAt: string;
}

/**
 * 創建分類請求
 */
export interface CreateCategoryRequest {
  name: string;
  slug?: string;
  description?: string;
  parentId?: number;
  orderIndex?: number;
}

/**
 * 更新分類請求
 */
export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {
  id: number;
}

/**
 * 分類樹節點（用於前端顯示）
 */
export interface CategoryTreeNode extends Category {
  level: number;
  children: CategoryTreeNode[];
}
```

---

## 📚 系列相關

```typescript
/**
 * 系列文章
 */
export interface Series {
  id: number;
  title: string;
  slug: string;
  description?: string;
  coverImage?: string;
  authorId: number;
  author?: User;
  posts?: BlogPost[];
  postCount: number;
  status: SeriesStatus;
  createdAt: string;
  updatedAt: string;
}

/**
 * 創建系列請求
 */
export interface CreateSeriesRequest {
  title: string;
  slug?: string;
  description?: string;
  coverImage?: string;
}

/**
 * 更新系列請求
 */
export interface UpdateSeriesRequest extends Partial<CreateSeriesRequest> {
  id: number;
}

/**
 * 系列導航項目（用於文章詳細頁）
 */
export interface SeriesNavItem {
  id: number;
  title: string;
  slug: string;
  order: number;
  isCurrentPost: boolean;
  isCompleted?: boolean;        // 用戶是否已讀
}
```

---

## 💬 留言相關

```typescript
/**
 * 留言
 */
export interface Comment {
  id: number;
  postId: number;
  userId: number;
  user?: User;
  parentId?: number;
  parent?: Comment;
  replies?: Comment[];
  content: string;
  likeCount: number;
  isEdited: boolean;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;

  // 前端擴充
  isLikedByCurrentUser?: boolean;
  canEdit?: boolean;            // 當前用戶是否可編輯
  canDelete?: boolean;          // 當前用戶是否可刪除
}

/**
 * 創建留言請求
 */
export interface CreateCommentRequest {
  postId: number;
  content: string;
  parentId?: number;
}

/**
 * 更新留言請求
 */
export interface UpdateCommentRequest {
  id: number;
  content: string;
}

/**
 * 留言查詢參數
 */
export interface CommentQuery {
  postId?: number;
  userId?: number;
  page?: number;
  limit?: number;
  sortBy?: 'latest' | 'oldest' | 'popular';
}

/**
 * 留言列表回應
 */
export interface CommentListResponse {
  comments: Comment[];
  pagination: PaginationMeta;
}

/**
 * 留言樹節點（用於顯示嵌套留言）
 */
export interface CommentTreeNode extends Comment {
  depth: number;
  replies: CommentTreeNode[];
}
```

---

## 👍 互動相關

```typescript
/**
 * 互動
 */
export interface Interaction {
  id: number;
  userId: number;
  targetType: TargetType;
  targetId: number;
  interactionType: InteractionType;
  createdAt: string;
}

/**
 * 創建互動請求
 */
export interface CreateInteractionRequest {
  targetType: TargetType;
  targetId: number;
  interactionType: InteractionType;
}

/**
 * 刪除互動請求
 */
export interface DeleteInteractionRequest {
  targetType: TargetType;
  targetId: number;
  interactionType: InteractionType;
}

/**
 * 互動狀態（用於 UI）
 */
export interface InteractionStatus {
  isLiked: boolean;
  isBookmarked: boolean;
  likeCount: number;
  bookmarkCount: number;
}
```

---

## 📈 統計相關

```typescript
/**
 * 部落格統計
 */
export interface BlogStats {
  totalPosts: number;
  totalPublished: number;
  totalDrafts: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  popularPosts: PostCard[];
  recentPosts: PostCard[];
  topTags: Tag[];
}

/**
 * 文章統計
 */
export interface PostStats {
  viewCount: number;
  likeCount: number;
  commentCount: number;
  bookmarkCount: number;
  shareCount: number;
  viewHistory: ViewHistoryPoint[];
}

/**
 * 瀏覽歷史點
 */
export interface ViewHistoryPoint {
  date: string;
  count: number;
}

/**
 * 作者統計
 */
export interface AuthorStats {
  totalPosts: number;
  totalViews: number;
  totalLikes: number;
  totalFollowers: number;
  topPosts: PostCard[];
}
```

---

## 🛠️ 工具類型

```typescript
/**
 * API 回應包裝
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

/**
 * API 錯誤回應
 */
export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Array<{
      field: string;
      message: string;
    }>;
  };
}

/**
 * 載入狀態
 */
export interface LoadingState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: Error;
}

/**
 * 表單狀態
 */
export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
}

/**
 * 搜尋結果
 */
export interface SearchResult<T> {
  items: T[];
  total: number;
  query: string;
  took: number;                 // 搜尋耗時（ms）
}

/**
 * Markdown 處理選項
 */
export interface MarkdownOptions {
  sanitize?: boolean;
  breaks?: boolean;
  linkify?: boolean;
  typographer?: boolean;
  highlight?: (code: string, lang: string) => string;
}

/**
 * 圖片上傳結果
 */
export interface ImageUploadResult {
  url: string;
  width: number;
  height: number;
  format: string;
  size: number;                 // bytes
  publicId?: string;            // Cloudinary ID
}

/**
 * SEO Meta 資訊
 */
export interface SeoMeta {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  canonicalUrl?: string;
}
```

---

## 🔧 React Query 類型

```typescript
/**
 * React Query Key 工廠
 */
export const queryKeys = {
  posts: {
    all: ['posts'] as const,
    lists: () => [...queryKeys.posts.all, 'list'] as const,
    list: (query: BlogPostQuery) => [...queryKeys.posts.lists(), query] as const,
    details: () => [...queryKeys.posts.all, 'detail'] as const,
    detail: (slug: string) => [...queryKeys.posts.details(), slug] as const,
  },
  tags: {
    all: ['tags'] as const,
    lists: () => [...queryKeys.tags.all, 'list'] as const,
    list: (query: TagQuery) => [...queryKeys.tags.lists(), query] as const,
  },
  comments: {
    all: ['comments'] as const,
    lists: () => [...queryKeys.comments.all, 'list'] as const,
    list: (postId: number) => [...queryKeys.comments.lists(), postId] as const,
  },
};

/**
 * React Query 選項類型
 */
export type QueryOptions<TData> = {
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
  refetchOnMount?: boolean;
  refetchOnWindowFocus?: boolean;
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
};
```

---

## 🎨 UI Component Props

```typescript
/**
 * PostCard 元件 Props
 */
export interface PostCardProps {
  post: PostCard;
  showAuthor?: boolean;
  showTags?: boolean;
  showStats?: boolean;
  onClick?: (post: PostCard) => void;
}

/**
 * PostEditor 元件 Props
 */
export interface PostEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  onSave?: (post: CreatePostRequest) => void;
  autoSave?: boolean;
  autoSaveDelay?: number;
}

/**
 * CommentSection 元件 Props
 */
export interface CommentSectionProps {
  postId: number;
  allowComments?: boolean;
  initialComments?: Comment[];
  onCommentAdded?: (comment: Comment) => void;
}

/**
 * TagBadge 元件 Props
 */
export interface TagBadgeProps {
  tag: Tag;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'filled' | 'outlined';
  onClick?: (tag: Tag) => void;
}
```

---

## 📦 範例使用

### 1. 使用 React Query Hook

```typescript
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/types/blog';
import { fetchPosts } from '@/lib/api/blog';

function BlogPage() {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.posts.list({ status: 'published' }),
    queryFn: () => fetchPosts({ status: 'published' }),
  });

  if (isLoading) return <div>載入中...</div>;

  return (
    <div>
      {data?.posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
```

### 2. 使用表單狀態

```typescript
const [formState, setFormState] = useState<FormState<CreatePostRequest>>({
  values: {
    title: '',
    content: '',
  },
  errors: {},
  touched: {},
  isSubmitting: false,
  isValid: false,
});
```

### 3. 類型守衛

```typescript
function isPublishedPost(post: BlogPost): boolean {
  return post.status === 'published' && post.publishedAt != null;
}

function hasReplies(comment: Comment): comment is Comment & { replies: Comment[] } {
  return comment.replies != null && comment.replies.length > 0;
}
```

---

**文檔維護者：** Claude Code
**最後更新：** 2025-01-30
