# 部落格系統資料庫設計

> 撰寫日期：2025-01-30
> 資料庫：PostgreSQL

---

## 📊 ER 圖概覽

```
┌─────────┐       ┌──────────┐       ┌──────────┐
│  users  │───┬───│  posts   │───────│ comments │
└─────────┘   │   └──────────┘       └──────────┘
              │        │ │ │
              │        │ │ └────────┬──────────┐
              │        │ │          │          │
              │        │ └────┐  ┌──▼───┐  ┌──▼──────────┐
              │        │   ┌──▼──▼──────▼──▼─────────┐   │
              │        │   │    post_tags           │   │
              │        │   │ (many-to-many)         │   │
              │        │   └────────────────────────┘   │
              │        │                                │
              │        │   ┌────────────┐          ┌───▼─────────┐
              │        └───│ categories │          │ interactions│
              │            └────────────┘          └─────────────┘
              │
              │   ┌─────────┐
              └───│ series  │
                  └─────────┘
```

---

## 📋 資料表列表

| 表名 | 說明 | 優先級 |
|------|------|--------|
| `posts` | 文章主表 | ⭐⭐⭐ |
| `tags` | 標籤 | ⭐⭐⭐ |
| `post_tags` | 文章-標籤關聯 | ⭐⭐⭐ |
| `categories` | 分類 | ⭐⭐ |
| `comments` | 留言 | ⭐⭐ |
| `interactions` | 互動（like, bookmark） | ⭐⭐ |
| `series` | 系列文章 | ⭐ |
| `post_views` | 瀏覽記錄 | ⭐ |
| `draft_autosaves` | 草稿自動儲存 | ⭐ |

---

## 📝 詳細 Schema

### 1. posts（文章表）

```sql
CREATE TABLE posts (
  -- 主鍵
  id SERIAL PRIMARY KEY,

  -- ========================================
  -- 基本資訊
  -- ========================================
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  subtitle VARCHAR(500),

  -- ========================================
  -- 內容
  -- ========================================
  content TEXT NOT NULL,               -- Markdown 原始內容
  content_html TEXT,                   -- 轉換後的 HTML（快取）
  excerpt VARCHAR(500),                -- 摘要

  -- ========================================
  -- 作者
  -- ========================================
  author_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- ========================================
  -- 分類與系列
  -- ========================================
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  series_id INTEGER REFERENCES series(id) ON DELETE SET NULL,
  series_order INTEGER,                -- 在系列中的順序

  -- ========================================
  -- 媒體
  -- ========================================
  cover_image VARCHAR(500),
  cover_image_alt VARCHAR(255),

  -- ========================================
  -- SEO
  -- ========================================
  meta_title VARCHAR(255),
  meta_description VARCHAR(500),
  meta_keywords VARCHAR(255),
  canonical_url VARCHAR(500),

  -- ========================================
  -- 狀態
  -- ========================================
  status VARCHAR(20) DEFAULT 'draft' NOT NULL,
  published_at TIMESTAMP,
  scheduled_at TIMESTAMP,

  -- ========================================
  -- 統計（冗餘欄位，定期更新）
  -- ========================================
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  bookmark_count INTEGER DEFAULT 0,
  reading_time INTEGER,                -- 閱讀時間（分鐘）

  -- ========================================
  -- 設定
  -- ========================================
  allow_comments BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  is_pinned BOOLEAN DEFAULT FALSE,

  -- ========================================
  -- 時間戳記
  -- ========================================
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMP,                -- 軟刪除

  -- ========================================
  -- 約束
  -- ========================================
  CONSTRAINT check_status CHECK (status IN ('draft', 'published', 'scheduled', 'archived')),
  CONSTRAINT check_reading_time CHECK (reading_time > 0)
);

-- 索引
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_status ON posts(status) WHERE status = 'published';
CREATE INDEX idx_posts_published_at ON posts(published_at DESC NULLS LAST);
CREATE INDEX idx_posts_category ON posts(category_id);
CREATE INDEX idx_posts_series ON posts(series_id, series_order);
CREATE INDEX idx_posts_featured ON posts(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);

-- 全文搜尋索引（PostgreSQL）
CREATE INDEX idx_posts_search ON posts USING gin(to_tsvector('english', title || ' ' || content));

-- 觸發器：自動更新 updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

**欄位說明：**

| 欄位 | 類型 | 說明 | 範例 |
|------|------|------|------|
| `slug` | VARCHAR(255) | URL 友善標識符 | `nextjs-15-intro` |
| `content` | TEXT | Markdown 原始內容 | `# Hello\n\nContent...` |
| `content_html` | TEXT | 渲染後 HTML（快取） | `<h1>Hello</h1><p>Content...</p>` |
| `status` | VARCHAR(20) | 文章狀態 | `draft`, `published`, `scheduled`, `archived` |
| `reading_time` | INTEGER | 閱讀時間（分鐘） | `5` |

---

### 2. tags（標籤表）

```sql
CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  slug VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  color VARCHAR(7),                    -- Hex 顏色碼
  icon VARCHAR(50),                    -- Icon 名稱
  post_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_tags_slug ON tags(slug);
CREATE INDEX idx_tags_name ON tags(name);
```

**範例資料：**

```sql
INSERT INTO tags (name, slug, color, icon) VALUES
  ('Next.js', 'nextjs', '#000000', 'nextjs'),
  ('React', 'react', '#61DAFB', 'react'),
  ('TypeScript', 'typescript', '#3178C6', 'typescript'),
  ('教學', 'tutorial', '#10B981', 'book');
```

---

### 3. post_tags（文章-標籤關聯表）

```sql
CREATE TABLE post_tags (
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  PRIMARY KEY (post_id, tag_id)
);

CREATE INDEX idx_post_tags_post ON post_tags(post_id);
CREATE INDEX idx_post_tags_tag ON post_tags(tag_id);
```

**查詢範例：**

```sql
-- 取得某篇文章的所有標籤
SELECT t.* FROM tags t
JOIN post_tags pt ON t.id = pt.tag_id
WHERE pt.post_id = 123;

-- 取得某標籤的所有文章
SELECT p.* FROM posts p
JOIN post_tags pt ON p.id = pt.post_id
WHERE pt.tag_id = 5
  AND p.status = 'published'
ORDER BY p.published_at DESC;
```

---

### 4. categories（分類表）

```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  parent_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  order_index INTEGER DEFAULT 0,
  post_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,

  -- 避免循環引用
  CONSTRAINT check_no_self_reference CHECK (id != parent_id)
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent ON categories(parent_id);
```

**範例資料（支援多層分類）：**

```sql
-- 第一層
INSERT INTO categories (id, name, slug, parent_id) VALUES
  (1, '技術', 'tech', NULL),
  (2, '生活', 'life', NULL);

-- 第二層
INSERT INTO categories (id, name, slug, parent_id) VALUES
  (10, '前端開發', 'frontend', 1),
  (11, '後端開發', 'backend', 1),
  (20, '旅遊', 'travel', 2);

-- 第三層
INSERT INTO categories (id, name, slug, parent_id) VALUES
  (100, 'React', 'react', 10),
  (101, 'Vue', 'vue', 10);
```

---

### 5. series（系列文章表）

```sql
CREATE TABLE series (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  cover_image VARCHAR(500),
  author_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_count INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active' NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,

  CONSTRAINT check_series_status CHECK (status IN ('active', 'completed', 'archived'))
);

CREATE INDEX idx_series_slug ON series(slug);
CREATE INDEX idx_series_author ON series(author_id);

CREATE TRIGGER trigger_series_updated_at
  BEFORE UPDATE ON series
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

**查詢範例：**

```sql
-- 取得某系列的所有文章（按順序）
SELECT p.* FROM posts p
WHERE p.series_id = 5
  AND p.status = 'published'
ORDER BY p.series_order ASC;
```

---

### 6. comments（留言表）

```sql
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  parent_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  like_count INTEGER DEFAULT 0,
  is_edited BOOLEAN DEFAULT FALSE,
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  deleted_at TIMESTAMP,

  CONSTRAINT check_content_length CHECK (LENGTH(content) > 0 AND LENGTH(content) <= 5000),
  CONSTRAINT check_no_self_reply CHECK (id != parent_id)
);

CREATE INDEX idx_comments_post ON comments(post_id, created_at DESC);
CREATE INDEX idx_comments_user ON comments(user_id);
CREATE INDEX idx_comments_parent ON comments(parent_id);
CREATE INDEX idx_comments_deleted ON comments(deleted_at) WHERE deleted_at IS NULL;

CREATE TRIGGER trigger_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
```

**查詢範例（取得文章的留言樹）：**

```sql
-- 使用 CTE 遞迴查詢
WITH RECURSIVE comment_tree AS (
  -- 第一層留言
  SELECT c.*, 0 AS depth
  FROM comments c
  WHERE c.post_id = 123
    AND c.parent_id IS NULL
    AND c.deleted_at IS NULL

  UNION ALL

  -- 子留言
  SELECT c.*, ct.depth + 1
  FROM comments c
  JOIN comment_tree ct ON c.parent_id = ct.id
  WHERE c.deleted_at IS NULL
)
SELECT * FROM comment_tree
ORDER BY created_at ASC;
```

---

### 7. interactions（互動表）

```sql
CREATE TABLE interactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  target_type VARCHAR(20) NOT NULL,    -- 'post', 'comment'
  target_id INTEGER NOT NULL,
  interaction_type VARCHAR(20) NOT NULL,  -- 'like', 'bookmark', 'share', 'report'
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,

  CONSTRAINT check_target_type CHECK (target_type IN ('post', 'comment')),
  CONSTRAINT check_interaction_type CHECK (interaction_type IN ('like', 'bookmark', 'share', 'report')),
  UNIQUE(user_id, target_type, target_id, interaction_type)
);

CREATE INDEX idx_interactions_user ON interactions(user_id, interaction_type);
CREATE INDEX idx_interactions_target ON interactions(target_type, target_id, interaction_type);
CREATE INDEX idx_interactions_created ON interactions(created_at DESC);
```

**查詢範例：**

```sql
-- 檢查用戶是否按讚某文章
SELECT EXISTS(
  SELECT 1 FROM interactions
  WHERE user_id = 100
    AND target_type = 'post'
    AND target_id = 123
    AND interaction_type = 'like'
);

-- 取得用戶的所有收藏
SELECT p.* FROM posts p
JOIN interactions i ON i.target_id = p.id
WHERE i.user_id = 100
  AND i.target_type = 'post'
  AND i.interaction_type = 'bookmark'
ORDER BY i.created_at DESC;
```

---

### 8. post_views（瀏覽記錄表）- 可選

```sql
CREATE TABLE post_views (
  id SERIAL PRIMARY KEY,
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  referer TEXT,
  viewed_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_post_views_post ON post_views(post_id, viewed_at DESC);
CREATE INDEX idx_post_views_user ON post_views(user_id);
CREATE INDEX idx_post_views_ip ON post_views(ip_address, viewed_at DESC);

-- 分區表（可選，處理大量資料）
-- 按月份分區
CREATE TABLE post_views_2025_01 PARTITION OF post_views
  FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');
```

---

### 9. draft_autosaves（草稿自動儲存）- 可選

```sql
CREATE TABLE draft_autosaves (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,

  UNIQUE(post_id, user_id)
);

CREATE INDEX idx_draft_autosaves_user ON draft_autosaves(user_id);
```

---

## 🔄 資料同步與統計更新

### 觸發器：自動更新計數

```sql
-- 文章發布時，更新標籤的 post_count
CREATE OR REPLACE FUNCTION update_tag_post_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE tags SET post_count = post_count + 1
    WHERE id = NEW.tag_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE tags SET post_count = post_count - 1
    WHERE id = OLD.tag_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_tag_count
  AFTER INSERT OR DELETE ON post_tags
  FOR EACH ROW
  EXECUTE FUNCTION update_tag_post_count();

-- 類似的觸發器可用於 comments, interactions 等
```

### 定期批次更新（推薦）

```sql
-- 每小時執行一次，更新文章統計
UPDATE posts p SET
  view_count = (SELECT COUNT(*) FROM post_views WHERE post_id = p.id),
  like_count = (SELECT COUNT(*) FROM interactions WHERE target_type = 'post' AND target_id = p.id AND interaction_type = 'like'),
  comment_count = (SELECT COUNT(*) FROM comments WHERE post_id = p.id AND deleted_at IS NULL),
  bookmark_count = (SELECT COUNT(*) FROM interactions WHERE target_type = 'post' AND target_id = p.id AND interaction_type = 'bookmark')
WHERE p.updated_at < NOW() - INTERVAL '1 hour';
```

---

## 🔍 常用查詢範例

### 1. 取得熱門文章（過去 7 天）

```sql
SELECT p.*,
  COUNT(pv.id) AS recent_views
FROM posts p
LEFT JOIN post_views pv ON p.id = pv.post_id AND pv.viewed_at > NOW() - INTERVAL '7 days'
WHERE p.status = 'published'
GROUP BY p.id
ORDER BY recent_views DESC, p.like_count DESC
LIMIT 10;
```

### 2. 全文搜尋

```sql
SELECT p.*,
  ts_rank(to_tsvector('english', p.title || ' ' || p.content), query) AS rank
FROM posts p,
  to_tsquery('english', 'nextjs & react') AS query
WHERE to_tsvector('english', p.title || ' ' || p.content) @@ query
  AND p.status = 'published'
ORDER BY rank DESC;
```

### 3. 取得相關文章（基於標籤）

```sql
SELECT p2.*, COUNT(pt2.tag_id) AS common_tags
FROM posts p1
JOIN post_tags pt1 ON p1.id = pt1.post_id
JOIN post_tags pt2 ON pt1.tag_id = pt2.tag_id
JOIN posts p2 ON pt2.post_id = p2.id
WHERE p1.id = 123
  AND p2.id != 123
  AND p2.status = 'published'
GROUP BY p2.id
ORDER BY common_tags DESC, p2.view_count DESC
LIMIT 5;
```

---

## 📊 效能優化建議

### 1. 分區表（大量資料時）

```sql
-- 將 post_views 按月分區
CREATE TABLE post_views (
  ...
) PARTITION BY RANGE (viewed_at);
```

### 2. 物化視圖（複雜查詢）

```sql
CREATE MATERIALIZED VIEW popular_posts AS
SELECT p.*, COUNT(pv.id) AS view_count_7d
FROM posts p
LEFT JOIN post_views pv ON p.id = pv.post_id AND pv.viewed_at > NOW() - INTERVAL '7 days'
WHERE p.status = 'published'
GROUP BY p.id;

CREATE UNIQUE INDEX idx_popular_posts_id ON popular_posts(id);

-- 每小時更新一次
REFRESH MATERIALIZED VIEW CONCURRENTLY popular_posts;
```

### 3. 讀寫分離

- 讀取：從 replica 讀取
- 寫入：寫入 primary

---

## 🛡️ 資料完整性

### 1. 軟刪除

```sql
-- 刪除文章時不真正刪除
UPDATE posts SET deleted_at = NOW() WHERE id = 123;

-- 查詢時排除已刪除
SELECT * FROM posts WHERE deleted_at IS NULL;
```

### 2. 外鍵約束

```sql
-- CASCADE：刪除文章時，自動刪除其留言
-- SET NULL：刪除分類時，文章的 category_id 設為 NULL
```

---

## 📝 遷移腳本範例

```sql
-- V001__create_posts_table.sql
CREATE TABLE posts (...);

-- V002__create_tags_table.sql
CREATE TABLE tags (...);

-- V003__create_post_tags_table.sql
CREATE TABLE post_tags (...);
```

**使用工具：** Prisma Migrate / TypeORM Migrations / Flyway

---

**文檔維護者：** Claude Code
**最後更新：** 2025-01-30
