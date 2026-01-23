# 複製專案並建立新 GitHub Repository 指南

## 目標
將當前的 `5dpapa` 專案複製一份，並建立新的 GitHub repository 作為獨立的商城或部落格專案。

---

## 方案選擇

### 方案 A: 保留完整專案，建立新的 User Pages Repository
**適用情境**: 你想要將網站部署到 `https://elvis1056.github.io/` 根路徑

**步驟**:
1. 直接在 GitHub 重新命名當前 repository
2. 不需要複製，只需要改名

### 方案 B: 複製專案，建立商城獨立 Repository
**適用情境**: 你想要拆分商城成獨立專案

**步驟**:
1. 複製整個專案資料夾
2. 刪除不需要的部落格相關檔案
3. 建立新的 GitHub repository
4. Push 到新 repository

### 方案 C: 複製專案，建立部落格獨立 Repository
**適用情境**: 你想要拆分部落格成獨立專案

**步驟**:
1. 複製整個專案資料夾
2. 刪除不需要的商城相關檔案
3. 建立新的 GitHub repository
4. Push 到新 repository

---

## 推薦方案：方案 A (重新命名為 User Pages)

### 為什麼推薦這個方案？
- ✅ 不需要拆分複雜的認證和狀態管理
- ✅ 保持所有功能完整
- ✅ 最簡單的操作
- ✅ 直接部署到 `https://elvis1056.github.io/`
- ✅ 我們剛才已經移除了 basePath，正適合這個方案

### 步驟詳解

#### 步驟 1: 在 GitHub 上重新命名 Repository

1. 前往你的 GitHub repository 頁面
   ```
   https://github.com/elvis1056/5dpapa
   ```

2. 點擊 **Settings** (設定)

3. 向下滾動到 **Repository name** 區域

4. 將 `5dpapa` 改名為 `elvis1056.github.io`

5. 點擊 **Rename** 按鈕

6. ⚠️ GitHub 會顯示警告訊息，告訴你：
   - 所有現有的 clone/fork 會自動重定向
   - 需要更新本地 git remote URL

#### 步驟 2: 更新本地 Git Remote URL

```bash
# 1. 查看當前的 remote URL
cd /Users/elvis1056/Desktop/myproject
git remote -v

# 應該會顯示：
# origin  https://github.com/elvis1056/5dpapa.git (fetch)
# origin  https://github.com/elvis1056/5dpapa.git (push)

# 2. 更新 remote URL
git remote set-url origin https://github.com/elvis1056/elvis1056.github.io.git

# 3. 驗證更新成功
git remote -v

# 應該會顯示：
# origin  https://github.com/elvis1056/elvis1056.github.io.git (fetch)
# origin  https://github.com/elvis1056/elvis1056.github.io.git (push)
```

#### 步驟 3: Commit 並 Push 修改

```bash
# 1. 查看當前的修改
git status

# 2. 加入所有修改
git add .

# 3. Commit
git commit -m "refactor: remove /5dpapa basePath for root domain deployment

- Comment out basePath in next.config.ts
- Update asset-path.ts to use empty basePath
- Remove /5dpapa prefix from 404 page links
- Update about page background image path
- Update blog post image basePath to empty string
- Update all sitemap URLs to use root domain (https://elvis1056.github.io/)

準備部署到 GitHub Pages 根路徑而非子目錄"

# 4. Push 到 GitHub
git push origin main
```

#### 步驟 4: 設定 GitHub Pages

1. 前往 repository 的 **Settings** → **Pages**

2. **Source** 設定：
   - 如果你使用 GitHub Actions：選擇 **GitHub Actions**
   - 如果你使用分支部署：選擇 **gh-pages** 分支（需要先建立）

3. 等待部署完成（通常需要 1-2 分鐘）

4. 訪問你的網站：`https://elvis1056.github.io/`

#### 步驟 5: 驗證部署

測試以下頁面是否正常運作：
- `https://elvis1056.github.io/` - 首頁
- `https://elvis1056.github.io/about` - 關於頁面
- `https://elvis1056.github.io/shop` - 商城
- `https://elvis1056.github.io/blog` - 部落格
- `https://elvis1056.github.io/cart` - 購物車

檢查項目：
- [ ] 所有頁面可正常訪問
- [ ] 圖片正確載入
- [ ] CSS 樣式正確
- [ ] 內部連結正常運作
- [ ] Sitemap 可訪問: `https://elvis1056.github.io/sitemap.xml`

---

## 如果你想要拆分專案 (方案 B 或 C)

### 方案 B: 建立商城獨立 Repository

#### 步驟 1: 複製專案資料夾

```bash
# 1. 在 Desktop 建立新資料夾
cd /Users/elvis1056/Desktop
cp -r myproject myproject-shop

# 2. 進入新資料夾
cd myproject-shop

# 3. 刪除 .git 資料夾（重新開始 git 歷史）
rm -rf .git

# 4. 初始化新的 git repository
git init
```

#### 步驟 2: 清理不需要的檔案

```bash
# 刪除部落格相關的檔案
rm -rf app/blog
rm -rf content/blog
rm -rf public/images/blog
rm -rf public/images/about

# 清理 lib/api/blog.ts
# 手動刪除或修改

# 更新 sitemap.xml（只保留商城相關）
```

#### 步驟 3: 修改設定

```typescript
// package.json
{
  "name": "5dpapa-shop",
  "version": "1.0.0",
  ...
}

// next.config.ts
const nextConfig = {
  output: 'export',
  basePath: '/shop', // 或根據部署位置調整
  ...
}
```

#### 步驟 4: 在 GitHub 建立新 Repository

```bash
# 1. 在 GitHub 網站上建立新 repository
# 名稱: 5dpapa-shop
# 描述: 5dpapa 電商平台
# 設定為 Public 或 Private

# 2. 本地連接到新 repository
git remote add origin https://github.com/elvis1056/5dpapa-shop.git

# 3. 建立初始 commit
git add .
git commit -m "feat: initial commit for shop application"

# 4. Push 到 GitHub
git branch -M main
git push -u origin main
```

#### 步驟 5: 調整原專案（改為純部落格）

```bash
# 回到原專案
cd /Users/elvis1056/Desktop/myproject

# 刪除商城相關檔案
rm -rf app/shop
rm -rf app/cart
rm -rf features/shop
rm -rf components/ProductCard
rm -rf public/images/products

# 更新 package.json
# name: "5dpapa-blog"

# Commit 修改
git add .
git commit -m "refactor: remove shop features, convert to blog-only application"
git push
```

---

## 使用 GitHub CLI 快速建立 Repository

如果你已經安裝了 `gh` CLI：

```bash
# 方式 1: 重新命名當前 repository (推薦)
# 需要在 GitHub 網站上手動操作

# 方式 2: 建立新的商城 repository
cd /Users/elvis1056/Desktop/myproject-shop
gh repo create 5dpapa-shop --public --source=. --remote=origin
git push -u origin main

# 方式 3: 建立新的 User Pages repository
cd /Users/elvis1056/Desktop/myproject
gh repo create elvis1056.github.io --public --source=. --remote=origin
git push -u origin main
```

---

## 比較各方案

| 方案 | 優點 | 缺點 | 工作量 |
|------|------|------|--------|
| **A: 重新命名** | 最簡單、功能完整、URL 最乾淨 | 商城+部落格在同一個專案 | 🟢 5 分鐘 |
| **B: 拆分商城** | 商城獨立、可專注電商功能 | 需處理認證共享、工作量大 | 🔴 2-4 週 |
| **C: 拆分部落格** | 部落格輕量化 | 失去整合優勢、需維護兩個專案 | 🟡 1-2 週 |

---

## 我的建議

**立即執行: 方案 A (重新命名)**

理由：
1. ✅ 你已經完成了 basePath 移除，正好適合這個方案
2. ✅ 可以立即部署到乾淨的 `https://elvis1056.github.io/` URL
3. ✅ 不需要處理複雜的拆分問題
4. ✅ 保持所有功能完整運作
5. ✅ 未來如果真的需要拆分，隨時可以執行

**未來考慮: Monorepo 架構**

如果商城和部落格都發展起來，可以考慮：
```
5dpapa-monorepo/
├── apps/
│   ├── shop/
│   └── blog/
└── packages/
    └── ui/
```

但現階段不建議，因為：
- ❌ 增加複雜度
- ❌ 需要學習 Turborepo/Nx
- ❌ 開發效率降低

---

## 快速執行清單（方案 A - 推薦）

```bash
# ☐ 1. 在 GitHub 上將 repository 從 5dpapa 改名為 elvis1056.github.io

# ☐ 2. 更新本地 remote URL
git remote set-url origin https://github.com/elvis1056/elvis1056.github.io.git

# ☐ 3. Commit 並 push 修改
git add .
git commit -m "refactor: remove /5dpapa basePath for root domain deployment"
git push origin main

# ☐ 4. 在 GitHub Settings → Pages 確認部署設定

# ☐ 5. 等待部署完成，訪問 https://elvis1056.github.io/

# ☐ 6. 測試所有頁面和功能
```

---

## 常見問題

### Q1: 重新命名 repository 會影響現有的連結嗎？
**A**: GitHub 會自動重定向舊的 URL (`5dpapa`) 到新的 URL (`elvis1056.github.io`)，所以不會立即失效。但建議更新所有引用。

### Q2: 如果我想保留 5dpapa 這個名稱怎麼辦？
**A**: 可以考慮：
- 商城: `5dpapa-shop` 部署到 `https://elvis1056.github.io/5dpapa-shop/`
- 主站: `elvis1056.github.io` 部署到 `https://elvis1056.github.io/`

### Q3: 我可以同時擁有多個 GitHub Pages 嗎？
**A**: 可以！
- **User Pages**: `elvis1056.github.io` → `https://elvis1056.github.io/`
- **Project Pages**: `5dpapa-shop` → `https://elvis1056.github.io/5dpapa-shop/`

### Q4: 如果改名後想改回來怎麼辦？
**A**: 可以再次在 Settings 中重新命名，但要注意：
- 如果有人建立了同名 repository，你就無法使用該名稱
- 建議先 fork 或備份

---

## 需要協助嗎？

如果你在執行過程中遇到任何問題，可以詢問：
- Git 指令執行錯誤
- GitHub Pages 部署問題
- URL 重定向問題
- 檔案清理建議

我會協助你解決！
