# 部署流程待辦事項

## 🚀 目標：設定 GitHub Pages 自動部署（PR 流程）

### 📋 待完成事項

#### 1. 建立 GitHub Actions Workflow

**檔案位置：** `.github/workflows/deploy.yml`

**功能：**

- PR 時：自動建置 + 測試（確保程式碼可編譯）
- 合併到 main 後：自動建置 + 部署到 GitHub Pages

**參考：**

- [Next.js 官方範例](https://github.com/gregrickaby/nextjs-github-pages)
- Workflow 需包含：
  - `on: push/pull_request`
  - Build job（建置測試）
  - Deploy job（僅在 main 分支執行）

---

#### 2. GitHub Repository 設定

**步驟：**

1. 前往 https://github.com/elvis1056/5dpapa/settings/pages
2. **Source** 選擇：`GitHub Actions`（不是 Deploy from a branch）
3. 儲存設定

---

#### 3. 建立 `.nojekyll` 檔案

**目的：** 告訴 GitHub Pages 不要用 Jekyll 處理檔案

**位置：** `public/.nojekyll`（空檔案即可）

---

#### 4. 改變開發流程（重要！）

**以前（直接推 main）：**

```bash
git add .
git commit -m "feat: xxx"
git push origin main
```

**以後（分支 + PR 流程）：**

```bash
# 1. 建立功能分支
git checkout -b feature/新功能名稱

# 2. 開發 + Commit
git add .
git commit -m "feat: 新功能描述"

# 3. 推送到遠端分支
git push origin feature/新功能名稱

# 4. 在 GitHub 開 Pull Request
# 5. 等待 GitHub Actions 建置測試通過 ✅
# 6. 檢查沒問題後點 "Merge pull request"
# 7. 自動部署到 https://elvis1056.github.io/5dpapa/
```

---

#### 5. 測試部署

**首次部署測試步驟：**

1. 推送所有變更到 main
2. 檢查 GitHub Actions 執行狀態
3. 確認部署成功後訪問：https://elvis1056.github.io/5dpapa/
4. 檢查頁面是否正常顯示

---

## 🎁 採用 PR + CI/CD 流程的好處

### 對個人開發

| 好處                    | 說明                                  |
| ----------------------- | ------------------------------------- |
| 🛡️ **防止錯誤上線**     | PR 時自動測試建置，有問題會被攔截     |
| 📝 **變更記錄清楚**     | 每個 PR 都有描述，未來可追溯為什麼改  |
| 🔍 **自我 Code Review** | 開 PR 時會看到完整 diff，容易發現問題 |
| 🚀 **自動化部署**       | 合併後自動上線，不用手動操作          |
| 💾 **隨時可回滾**       | 出問題可以快速 revert PR              |

### 對未來擴展

| 好處                  | 長期價值                                |
| --------------------- | --------------------------------------- |
| 🧪 **容易加入測試**   | 之後可在 PR 時執行單元測試、E2E 測試    |
| 👥 **支援多人協作**   | 如果有人要貢獻，已經有完整流程          |
| 🔒 **保護 main 分支** | 可設定 branch protection，強制要求 PR   |
| 📊 **可視化部署狀態** | GitHub Actions 有完整的執行歷史和日誌   |
| 🎯 **漸進式改進**     | 可以逐步加入 lint、type check、coverage |

### 與直接推 main 的對比

| 項目     | 直接推 main     | PR + CI/CD           |
| -------- | --------------- | -------------------- |
| 速度     | ⚡ 最快         | 🐢 多 1-2 分鐘       |
| 安全性   | ❌ 錯誤直接上線 | ✅ 有測試閘門        |
| 可追溯性 | ⚠️ 只有 commit  | ✅ 有 PR 描述 + diff |
| 專業度   | 🏠 個人專案風格 | 🏢 企業級流程        |
| 學習價值 | 📖 基礎 Git     | 🎓 完整 DevOps       |

---

## 📚 相關資源

- [Next.js Static Exports 文件](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages 文件](https://docs.github.com/en/pages)
- [GitHub Actions 文件](https://docs.github.com/en/actions)
- [參考範例專案](https://github.com/gregrickaby/nextjs-github-pages)

---

## ⚠️ 注意事項

### 靜態輸出限制

使用 `output: 'export'` 後，以下 Next.js 功能**無法使用**：

- ❌ Server-side Rendering (SSR)
- ❌ API Routes
- ❌ Image Optimization（需設 `unoptimized: true`）
- ❌ Incremental Static Regeneration (ISR)
- ❌ Middleware

### 可用功能

- ✅ Static Site Generation (SSG)
- ✅ Client-side Rendering
- ✅ React Hooks
- ✅ styled-components
- ✅ TanStack Query（client-side data fetching）

---

## 🎯 預期結果

完成後：

- 每次開 PR：GitHub Actions 自動測試建置
- PR 合併到 main：自動部署到 https://elvis1056.github.io/5dpapa/
- 有問題的程式碼在 PR 階段就被攔截，不會上線
