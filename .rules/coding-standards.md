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

### 5. Commit 拆分原則
- 一個 commit 只做一件事
- 超過 3-4 個檔案就考慮拆分
- 獨立的功能要獨立 commit
- 使用正確的 commit type：feat/fix/chore/refactor

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
