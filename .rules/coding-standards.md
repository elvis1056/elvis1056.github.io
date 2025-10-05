# 編碼準則

## 程式碼風格規則

### 1. 絕對不使用 inline style
- ❌ 禁止在 JSX 中使用 `style={{ ... }}`（靜態樣式）
- ✅ 例外：動態計算的值（如 `transform: rotate(${degree}deg)`）
- ✅ 靜態樣式一律寫在 `style.ts` 並用 styled-components

### 2. 絕對不使用 !important
- ❌ 禁止在 CSS 中使用 `!important`
- ✅ 用更具體的選擇器提高優先級（如 `.parent .child`）
- ✅ 或在元件初始化時就用 API 參數控制

### 3. 先檢查 constants/theme.ts
- ❌ 禁止直接寫色碼或使用未定義的 theme 變數
- ✅ 使用顏色、間距前先確認 theme 有定義
- ✅ 沒有的話先新增到 theme.ts，再使用

### 4. 遵循專案現有架構
- 新增元件前先觀察其他元件的寫法
- `components/`: 必須用 styled-components + style.ts 模式
- `app/`: 頁面也要用 styled-components，不用 inline style
- 保持程式碼風格一致性

### 5. Commit 訊息規範（Conventional Commits v1.0.0）

> 參考來源：
> - [Conventional Commits 官方規範](https://www.conventionalcommits.org/en/v1.0.0/) (7.8k⭐)
> - [Conventional Commits Cheatsheet](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13) (最受歡迎的參考指南)
> - Angular Commit Guidelines (業界最早且廣泛採用的規範)

#### 格式結構
```
<type>(<optional scope>): <description>

[optional body]

[optional footer]
```

#### Type 類別（必填）
- `feat:` 新增功能（對應 MINOR 版本）
- `fix:` 修補 bug（對應 PATCH 版本）
- `refactor:` 重構（不改變行為的程式碼重整）
- `perf:` 效能改善（refactor 的子類別）
- `style:` 程式碼格式（空格、分號等，不影響功能）
- `test:` 測試相關
- `docs:` 文件變更
- `build:` 建置系統或相依性變更
- `ci:` CI 設定檔變更
- `ops:` 維運相關（部署、基礎設施）
- `chore:` 其他雜項（最後選擇）

#### Scope 範圍（選填）
- 用括號標註影響範圍，如 `feat(shop): 新增商品篩選`
- 範例：`fix(navbar): 修正手機版選單顯示`

#### Description 描述規則
- 使用祈使句、現在式（如：add 而非 added）
- 不要大寫開頭
- 結尾不加句號
- 保持簡潔

#### Breaking Changes（重大變更）
- 在 type/scope 後加 `!`，如 `feat(api)!: 移除 status endpoint`
- 或在 footer 使用 `BREAKING CHANGE:` 描述變更
- 對應 MAJOR 版本更新

#### Commit 拆分原則
- 一個 commit 只做一件事
- 超過 3-4 個檔案就考慮拆分
- 獨立的功能要獨立 commit
- 不要一次 commit 一大包變更

#### Commit 訊息格式要求
- 只寫一行簡短描述，不要多行說明
- 不要加入 Claude Code 產生聲明
- 不要加入 Co-Authored-By
- 格式：`type: 簡短描述` 或 `type(scope): 簡短描述`

#### Commit 前檢查流程
- **必須執行** `npm run lint` 確認無錯誤
- 修正所有 ESLint 和 Prettier 錯誤後才能 commit
- 不要 commit 後才發現 CI 錯誤

#### 版本對應（Semantic Versioning）
- Breaking Changes → MAJOR 版本（如 1.0.0 → 2.0.0）
- feat → MINOR 版本（如 1.0.0 → 1.1.0）
- fix, perf, refactor → PATCH 版本（如 1.0.0 → 1.0.1）

#### 正確範例
```
feat: 新增郵件通知功能
feat(shop): 新增商品分類篩選
fix(cart): 防止空購物車送出訂單
refactor: 改用遞迴實作費氏數列
perf(images): 優化圖片載入速度
docs: 更新 API 文件
```

### 6. TypeScript 型別定義
- 新增欄位時同步更新 TypeScript 型別
- 不要等到報錯才補
- 保持型別定義的完整性

### 7. CSS 選擇器優先級
- 用巢狀選擇器提高優先級
- 不使用 ID 選擇器
- 絕對不用 !important

---

## 錯誤案例記錄

### 案例 1: shop/page.tsx 使用 inline style
```tsx
// ❌ 錯誤
<div style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
  <h1 style={{ fontSize: '2.5rem', fontWeight: '700' }}>標題</h1>
</div>

// ✅ 正確
const ShopPage = styled.main`
  min-height: 100vh;
  background-color: ${theme.colors.neutral.gray100};

  .shop-title {
    font-size: 2.5rem;
    font-weight: 700;
  }
`;
```

### 案例 2: 使用 !important 覆蓋樣式
```css
/* ❌ 錯誤 */
.swiper-pagination {
  bottom: 20px !important;
}

/* ✅ 正確 */
.banner-swiper .swiper-pagination {
  bottom: 20px;
}
```

### 案例 3: 使用不存在的 theme 色階
```tsx
// ❌ 錯誤（theme 沒有 gray800）
color: ${theme.colors.neutral.gray800};

// ✅ 正確（先檢查 theme.ts，使用已定義的 gray700）
color: ${theme.colors.neutral.gray700};
```
