# 部落格系統 API 規格

> 撰寫日期：2025-01-30
> API 版本：v1
> 基礎 URL：`${NEXT_PUBLIC_API_BASE_URL}/api`

---

## 📋 目錄

1. [通用規範](#通用規範)
2. [認證機制](#認證機制)
3. [文章 API](#文章-api)
4. [標籤 API](#標籤-api)
5. [分類 API](#分類-api)
6. [留言 API](#留言-api)
7. [互動 API](#互動-api)
8. [系列 API](#系列-api)
9. [錯誤處理](#錯誤處理)

---

## 🌐 通用規範

### HTTP 方法

| 方法 | 用途 | 冪等性 |
|------|------|--------|
| GET | 取得資源 | ✅ |
| POST | 創建資源 | ❌ |
| PUT | 完整更新資源 | ✅ |
| PATCH | 部分更新資源 | ✅ |
| DELETE | 刪除資源 | ✅ |

### 狀態碼

| 狀態碼 | 說明 | 使用場景 |
|--------|------|----------|
| 200 | OK | 請求成功 |
| 201 | Created | 資源創建成功 |
| 204 | No Content | 刪除成功 |
| 400 | Bad Request | 請求參數錯誤 |
| 401 | Unauthorized | 未認證 |
| 403 | Forbidden | 無權限 |
| 404 | Not Found | 資源不存在 |
| 422 | Unprocessable Entity | 驗證失敗 |
| 429 | Too Many Requests | 超過速率限制 |
| 500 | Internal Server Error | 伺服器錯誤 |

### 分頁格式

```typescript
// Request
GET /api/posts?page=1&limit=10

// Response
{
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

### 排序格式

```typescript
// 單一欄位
GET /api/posts?sortBy=createdAt&order=desc

// 多欄位
GET /api/posts?sort=-createdAt,+title
// - 表示 DESC，+ 表示 ASC
```

### 篩選格式

```typescript
// 基本篩選
GET /api/posts?status=published&authorId=123

// 範圍篩選
GET /api/posts?viewCount[gte]=100&viewCount[lte]=1000

// 多值篩選
GET /api/posts?tagIds=1,2,3
```

---

## 🔐 認證機制

### Header

```http
Authorization: Bearer <access_token>
X-XSRF-TOKEN: <csrf_token>
```

### 認證等級

| 等級 | 說明 | 適用 API |
|------|------|---------|
| 公開 | 無需認證 | GET /posts, GET /tags |
| 需登入 | 需 access token | POST /comments, POST /interactions |
| 需作者 | 僅作者可操作 | PUT /posts/:id, DELETE /posts/:id |
| 需管理員 | 管理員權限 | DELETE /users/:id |

---

## 📝 文章 API

### 1. 取得文章列表

```http
GET /api/posts
```

**查詢參數：**

| 參數 | 類型 | 必填 | 說明 | 範例 |
|------|------|------|------|------|
| page | number | ❌ | 頁碼（預設 1） | `1` |
| limit | number | ❌ | 每頁筆數（預設 10） | `20` |
| status | string | ❌ | 文章狀態 | `published` |
| authorId | number | ❌ | 作者 ID | `123` |
| categoryId | number | ❌ | 分類 ID | `5` |
| tagIds | string | ❌ | 標籤 ID（逗號分隔） | `1,2,3` |
| seriesId | number | ❌ | 系列 ID | `10` |
| search | string | ❌ | 搜尋關鍵字 | `nextjs` |
| isFeatured | boolean | ❌ | 是否精選 | `true` |
| sortBy | string | ❌ | 排序方式 | `latest`, `popular`, `trending` |
| dateFrom | string | ❌ | 開始日期 | `2025-01-01` |
| dateTo | string | ❌ | 結束日期 | `2025-01-31` |

**回應範例：**

```json
{
  "posts": [
    {
      "id": 123,
      "title": "Next.js 15 新功能介紹",
      "slug": "nextjs-15-intro",
      "excerpt": "探索 Next.js 15 帶來的革命性更新...",
      "coverImage": "https://...",
      "author": {
        "id": 1,
        "username": "Elvis",
        "avatar": "https://..."
      },
      "tags": [
        { "id": 1, "name": "Next.js", "slug": "nextjs" }
      ],
      "category": {
        "id": 5,
        "name": "前端開發",
        "slug": "frontend"
      },
      "viewCount": 1250,
      "likeCount": 89,
      "commentCount": 23,
      "readingTime": 8,
      "publishedAt": "2025-01-20T10:00:00Z",
      "createdAt": "2025-01-20T10:00:00Z",
      "isLikedByCurrentUser": false,
      "isBookmarkedByCurrentUser": false
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

---

### 2. 取得單篇文章（by slug）

```http
GET /api/posts/:slug
```

**路徑參數：**
- `slug`: 文章 slug（例如 `nextjs-15-intro`）

**回應範例：**

```json
{
  "id": 123,
  "title": "Next.js 15 新功能介紹",
  "slug": "nextjs-15-intro",
  "subtitle": "深入探討 Server Components 和 Turbopack",
  "content": "# Hello\n\nMarkdown content...",
  "contentHtml": "<h1>Hello</h1><p>Markdown content...</p>",
  "excerpt": "探索 Next.js 15...",
  "coverImage": "https://...",
  "coverImageAlt": "Next.js 15 logo",
  "author": {
    "id": 1,
    "username": "Elvis",
    "email": "elvis@example.com",
    "avatar": "https://...",
    "bio": "Full-stack developer"
  },
  "category": {
    "id": 5,
    "name": "前端開發",
    "slug": "frontend"
  },
  "tags": [
    { "id": 1, "name": "Next.js", "slug": "nextjs", "color": "#000000" }
  ],
  "series": {
    "id": 10,
    "title": "Next.js 完整指南",
    "slug": "nextjs-guide",
    "postCount": 5
  },
  "seriesOrder": 1,
  "status": "published",
  "viewCount": 1250,
  "likeCount": 89,
  "commentCount": 23,
  "bookmarkCount": 45,
  "readingTime": 8,
  "allowComments": true,
  "isFeatured": false,
  "isPinned": false,
  "publishedAt": "2025-01-20T10:00:00Z",
  "createdAt": "2025-01-20T10:00:00Z",
  "updatedAt": "2025-01-21T15:30:00Z",
  "isLikedByCurrentUser": false,
  "isBookmarkedByCurrentUser": true
}
```

---

### 3. 創建文章

```http
POST /api/posts
```

**認證：** 需登入

**請求 Body：**

```json
{
  "title": "我的新文章",
  "slug": "my-new-post",          // 可選，自動生成
  "subtitle": "副標題",            // 可選
  "content": "# Hello\n\n文章內容...",
  "excerpt": "摘要內容",           // 可選，自動生成
  "coverImage": "https://...",     // 可選
  "coverImageAlt": "封面圖說明",   // 可選
  "categoryId": 5,                 // 可選
  "tagIds": [1, 2, 3],             // 可選
  "status": "draft",               // draft, published, scheduled
  "publishedAt": "2025-01-25T10:00:00Z",  // status=published 時必填
  "scheduledAt": null,             // status=scheduled 時必填
  "seriesId": 10,                  // 可選
  "seriesOrder": 2,                // 可選
  "allowComments": true,
  "metaTitle": "SEO 標題",         // 可選
  "metaDescription": "SEO 描述"    // 可選
}
```

**回應：** `201 Created`

```json
{
  "id": 456,
  "title": "我的新文章",
  "slug": "my-new-post",
  "status": "draft",
  "createdAt": "2025-01-30T12:00:00Z"
}
```

---

### 4. 更新文章

```http
PUT /api/posts/:id
```

**認證：** 需作者權限

**請求 Body：** 同創建文章（部分欄位可選）

**回應：** `200 OK`

---

### 5. 刪除文章

```http
DELETE /api/posts/:id
```

**認證：** 需作者權限

**回應：** `204 No Content`

---

### 6. 發布文章

```http
POST /api/posts/:id/publish
```

**認證：** 需作者權限

**請求 Body：**

```json
{
  "publishedAt": "2025-01-30T10:00:00Z"  // 可選，預設為當前時間
}
```

**回應：** `200 OK`

---

### 7. 增加瀏覽次數

```http
POST /api/posts/:id/views
```

**認證：** 無需

**請求 Body：**

```json
{
  "userAgent": "Mozilla/5.0...",
  "referer": "https://google.com"
}
```

**回應：** `204 No Content`

---

## 🏷️ 標籤 API

### 1. 取得所有標籤

```http
GET /api/tags
```

**查詢參數：**

| 參數 | 類型 | 說明 |
|------|------|------|
| sortBy | string | `popular`, `alphabetical`, `recent` |
| limit | number | 限制數量 |

**回應範例：**

```json
[
  {
    "id": 1,
    "name": "Next.js",
    "slug": "nextjs",
    "description": "React 框架",
    "color": "#000000",
    "icon": "nextjs",
    "postCount": 45,
    "createdAt": "2025-01-01T00:00:00Z"
  }
]
```

---

### 2. 取得特定標籤的文章

```http
GET /api/tags/:slug/posts
```

**查詢參數：** 同文章列表

**回應格式：** 同文章列表

---

### 3. 創建標籤

```http
POST /api/tags
```

**認證：** 需登入（或管理員）

**請求 Body：**

```json
{
  "name": "Vue.js",
  "slug": "vuejs",              // 可選
  "description": "漸進式框架",   // 可選
  "color": "#42B883",           // 可選
  "icon": "vue"                 // 可選
}
```

**回應：** `201 Created`

---

## 📂 分類 API

### 1. 取得所有分類

```http
GET /api/categories
```

**回應範例：**

```json
[
  {
    "id": 1,
    "name": "技術",
    "slug": "tech",
    "description": "技術相關文章",
    "parentId": null,
    "children": [
      {
        "id": 10,
        "name": "前端開發",
        "slug": "frontend",
        "parentId": 1,
        "postCount": 25
      }
    ],
    "postCount": 50
  }
]
```

---

### 2. 取得特定分類的文章

```http
GET /api/categories/:slug/posts
```

**查詢參數：**

| 參數 | 說明 |
|------|------|
| includeChildren | 是否包含子分類的文章（預設 false） |

---

## 💬 留言 API

### 1. 取得文章的留言

```http
GET /api/posts/:id/comments
```

**查詢參數：**

| 參數 | 類型 | 說明 |
|------|------|------|
| page | number | 頁碼 |
| limit | number | 每頁筆數 |
| sortBy | string | `latest`, `oldest`, `popular` |

**回應範例：**

```json
{
  "comments": [
    {
      "id": 789,
      "content": "很棒的文章！",
      "user": {
        "id": 100,
        "username": "John",
        "avatar": "https://..."
      },
      "likeCount": 5,
      "isEdited": false,
      "isPinned": false,
      "createdAt": "2025-01-25T10:00:00Z",
      "replies": [
        {
          "id": 790,
          "parentId": 789,
          "content": "謝謝！",
          "user": {
            "id": 1,
            "username": "Elvis"
          },
          "createdAt": "2025-01-25T10:05:00Z"
        }
      ],
      "isLikedByCurrentUser": false
    }
  ],
  "pagination": {
    "total": 23,
    "page": 1,
    "limit": 20,
    "totalPages": 2
  }
}
```

---

### 2. 創建留言

```http
POST /api/comments
```

**認證：** 需登入

**請求 Body：**

```json
{
  "postId": 123,
  "content": "很棒的文章！",
  "parentId": 789            // 可選，回覆留言時填寫
}
```

**回應：** `201 Created`

```json
{
  "id": 800,
  "content": "很棒的文章！",
  "createdAt": "2025-01-30T12:00:00Z"
}
```

---

### 3. 更新留言

```http
PUT /api/comments/:id
```

**認證：** 需留言作者權限

**請求 Body：**

```json
{
  "content": "更新後的內容"
}
```

---

### 4. 刪除留言

```http
DELETE /api/comments/:id
```

**認證：** 需留言作者或文章作者權限

**回應：** `204 No Content`

---

## 👍 互動 API

### 1. 按讚

```http
POST /api/interactions/like
```

**認證：** 需登入

**請求 Body：**

```json
{
  "targetType": "post",      // post, comment
  "targetId": 123
}
```

**回應：** `201 Created`

---

### 2. 取消按讚

```http
DELETE /api/interactions/like
```

**認證：** 需登入

**請求 Body：** 同按讚

**回應：** `204 No Content`

---

### 3. 收藏

```http
POST /api/interactions/bookmark
```

**認證：** 需登入

**請求 Body：** 同按讚

---

### 4. 取消收藏

```http
DELETE /api/interactions/bookmark
```

---

### 5. 取得我的收藏

```http
GET /api/users/me/bookmarks
```

**認證：** 需登入

**查詢參數：** page, limit

**回應格式：** 同文章列表

---

## 📚 系列 API

### 1. 取得所有系列

```http
GET /api/series
```

**回應範例：**

```json
[
  {
    "id": 10,
    "title": "Next.js 完整指南",
    "slug": "nextjs-guide",
    "description": "從入門到精通",
    "coverImage": "https://...",
    "author": {
      "id": 1,
      "username": "Elvis"
    },
    "postCount": 5,
    "status": "active",
    "createdAt": "2025-01-01T00:00:00Z"
  }
]
```

---

### 2. 取得單個系列及其文章

```http
GET /api/series/:slug
```

**回應範例：**

```json
{
  "id": 10,
  "title": "Next.js 完整指南",
  "slug": "nextjs-guide",
  "description": "從入門到精通",
  "posts": [
    {
      "id": 123,
      "title": "第一章：介紹",
      "seriesOrder": 1,
      ...
    },
    {
      "id": 124,
      "title": "第二章：安裝",
      "seriesOrder": 2,
      ...
    }
  ]
}
```

---

### 3. 創建系列

```http
POST /api/series
```

**認證：** 需登入

**請求 Body：**

```json
{
  "title": "React Hooks 指南",
  "slug": "react-hooks-guide",
  "description": "深入理解 React Hooks",
  "coverImage": "https://..."
}
```

---

## ❌ 錯誤處理

### 錯誤回應格式

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "驗證失敗",
    "details": [
      {
        "field": "title",
        "message": "標題不可為空"
      }
    ]
  }
}
```

### 常見錯誤碼

| 錯誤碼 | HTTP 狀態 | 說明 |
|--------|----------|------|
| `VALIDATION_ERROR` | 422 | 驗證失敗 |
| `UNAUTHORIZED` | 401 | 未認證 |
| `FORBIDDEN` | 403 | 無權限 |
| `NOT_FOUND` | 404 | 資源不存在 |
| `CONFLICT` | 409 | 資源衝突（如 slug 重複） |
| `RATE_LIMIT_EXCEEDED` | 429 | 超過速率限制 |
| `INTERNAL_ERROR` | 500 | 伺服器錯誤 |

---

## 🔧 速率限制

| 端點類型 | 限制 |
|---------|------|
| 讀取 API | 100 次/分鐘 |
| 寫入 API | 20 次/分鐘 |
| 搜尋 API | 30 次/分鐘 |

**Header：**

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1706600000
```

---

**文檔維護者：** Claude Code
**最後更新：** 2025-01-30
