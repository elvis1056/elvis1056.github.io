# 對話記錄 - 移除 /5dpapa BasePath (2026-01-07)

## 背景
從之前的對話延續，需要將網站從 `https://elvis1056.github.io/5dpapa/` 部署位置改為 `https://elvis1056.github.io/` 根路徑。

## 任務目標
移除所有與 `/5dpapa` basePath 相關的設定和 URL 引用。

## 執行步驟

### 1. 讀取相關檔案
首先讀取了以下檔案以了解當前狀態：
- `app/not-found/NotFoundContent/index.tsx` - 404 頁面
- `lib/utils/asset-path.ts` - 資源路徑工具函式
- `next.config.ts` - Next.js 設定檔
- `public/sitemap.xml` - 網站地圖

### 2. 搜尋所有 5dpapa 引用
```bash
grep -r "5dpapa" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.next --exclude-dir=out
```

發現以下需要修改的檔案：
- `next.config.ts` - basePath 設定
- `lib/utils/asset-path.ts` - basePath 變數
- `app/not-found/NotFoundContent/index.tsx` - Link href
- `app/about/AboutContent/style.ts` - 背景圖片路徑
- `app/blog/[slug]/BlogPostContent/index.tsx` - 圖片 basePath
- `public/sitemap.xml` - 所有網址

### 3. 執行修改

#### 3.1 next.config.ts
```typescript
// 修改前
basePath: '/5dpapa',

// 修改後
// basePath: '/5dpapa', // 移除 basePath，部署到根路徑
```

#### 3.2 lib/utils/asset-path.ts
```typescript
// 修改前
const basePath = '/5dpapa';

// 修改後
const basePath = ''; // 移除 /5dpapa，部署到根路徑
```

#### 3.3 app/not-found/NotFoundContent/index.tsx
移除所有 Link 的 `/5dpapa/` 前綴：
```typescript
// 修改前
<Link className="primary-button" href="/5dpapa/">
<Link className="secondary-button" href="/5dpapa/shop">
<Link className="quick-link" href="/5dpapa/shop">
<Link className="quick-link" href="/5dpapa/cart">
<Link className="quick-link" href="/5dpapa/about">

// 修改後
<Link className="primary-button" href="/">
<Link className="secondary-button" href="/shop">
<Link className="quick-link" href="/shop">
<Link className="quick-link" href="/cart">
<Link className="quick-link" href="/about">
```

#### 3.4 app/about/AboutContent/style.ts
```css
/* 修改前 */
background: url('/5dpapa/images/about/headshot.jpeg');

/* 修改後 */
background: url('/images/about/headshot.jpeg');
```

#### 3.5 app/blog/[slug]/BlogPostContent/index.tsx
```typescript
// 修改前
const basePath = process.env.ENV === 'production' ? '/5dpapa' : '/5dpapa';

// 修改後
const basePath = ''; // 移除 /5dpapa，部署到根路徑
```

#### 3.6 public/sitemap.xml
將所有網址從 `https://elvis1056.github.io/5dpapa/...` 改為 `https://elvis1056.github.io/...`

修改的網址包括：
- 首頁: `/5dpapa/` → `/`
- About: `/5dpapa/about` → `/about`
- Shop: `/5dpapa/shop` → `/shop`
- Blog: `/5dpapa/blog` → `/blog`
- 27 篇 Blog 文章的所有網址

### 4. 驗證修改結果

再次執行搜尋確認：
```bash
grep -r "5dpapa" . --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=.next --exclude-dir=out
```

剩餘的 "5dpapa" 引用都是合理的品牌名稱使用：
- 頁面標題 (title)
- Logo 文字
- 套件名稱 (package.json)
- 文件內容
- 註解說明

## 修改的檔案清單

```
modified:   app/about/AboutContent/style.ts
modified:   app/blog/[slug]/BlogPostContent/index.tsx
modified:   app/not-found/NotFoundContent/index.tsx
modified:   lib/utils/asset-path.ts
modified:   next.config.ts
modified:   public/sitemap.xml
```

## Commit Message

```
refactor: remove /5dpapa basePath for root domain deployment

- Comment out basePath in next.config.ts
- Update asset-path.ts to use empty basePath
- Remove /5dpapa prefix from 404 page links
- Update about page background image path
- Update blog post image basePath to empty string
- Update all sitemap URLs to use root domain (https://elvis1056.github.io/)

準備部署到 GitHub Pages 根路徑而非子目錄
```

## 後續步驟

1. **Commit 並 push 變更**
   ```bash
   git add .
   git commit -m "refactor: remove /5dpapa basePath for root domain deployment"
   git push
   ```

2. **在 GitHub 上重新命名 Repository**
   - 從 `5dpapa` 重新命名為 `elvis1056.github.io`
   - 這樣會自動部署到 User Pages (根路徑)

3. **更新 GitHub Pages 設定**
   - 前往 Repository Settings → Pages
   - 確認 Source 設定為 `gh-pages` 分支
   - 網站會自動部署到 `https://elvis1056.github.io/`

4. **測試部署**
   - 訪問 `https://elvis1056.github.io/` 確認首頁
   - 測試所有路由 (about, shop, blog)
   - 檢查圖片和靜態資源是否正確載入
   - 驗證 sitemap 可訪問

## 技術說明

### GitHub Pages 部署模式

**Project Pages (子目錄)**
- Repository 名稱: 任意名稱 (如 `5dpapa`)
- 部署位置: `https://username.github.io/repository-name/`
- 需要設定 `basePath`

**User Pages (根路徑)**
- Repository 名稱: 必須是 `username.github.io`
- 部署位置: `https://username.github.io/`
- 不需要 `basePath`

### Next.js Static Export 設定

```typescript
const nextConfig: NextConfig = {
  output: 'export',        // 靜態匯出
  // basePath: '/5dpapa',  // User Pages 不需要
  images: {
    unoptimized: true,     // GitHub Pages 不支援圖片優化
  },
}
```

## 注意事項

1. **圖片路徑**: 所有圖片路徑都改為相對於根路徑 (`/images/...`)
2. **Link 元件**: 所有內部連結都移除 `/5dpapa/` 前綴
3. **Sitemap**: SEO 相關的 sitemap 必須更新為正確的網址
4. **Asset Path 工具**: `assetPath()` 函式仍保留但 basePath 為空字串，方便未來需要時調整

## 相關文件

- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Next.js basePath Configuration](https://nextjs.org/docs/app/api-reference/next-config-js/basePath)
