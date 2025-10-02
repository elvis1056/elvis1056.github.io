# 5dpapa

電商+部落格平台，採用 Next.js 架構。

### Frontend

- **Next.js 15** - App Router、Server-Side Rendering、靜態生成
- **TypeScript** - 型別安全開發
- **styled-components** - CSS-in-JS 解決方案，支援主題切換與動態樣式
- **TanStack Query** - 伺服器狀態管理，實作資料快取與自動重新請求

### Code Quality

- **ESLint + Prettier** - 程式碼風格統一與品質檢查
- **TypeScript** - 編譯時期型別檢查，降低執行錯誤

## 核心功能實作

### 響應式設計系統

- Logo 元件採用 CSS opacity transition 實現桌面/手機版無縫切換
- 避免 JavaScript 計算，純 CSS media query 提升效能

### 元件化架構

- 採用 Atomic Design 概念組織元件結構
- 使用 `css` helper 統一管理樣式，提升可維護性
- 實踐 Single Responsibility Principle，每個元件專注單一職責

### 效能優化

- Next.js Image 元件自動圖片最佳化
- SVG 圖示內嵌減少 HTTP 請求
- styled-components compiler 編譯時期優化

## 專案開發進度

| 項目          | 完成度             | 現況說明                                | 100% 基準                                         |
| ------------- | ------------------ | --------------------------------------- | ------------------------------------------------- |
| 🎨 響應式設計 | ████░░░░░░░░░░ 30% | 完成 Navbar + Logo RWD                  | 所有頁面與元件支援 mobile/tablet/desktop          |
| ⚡ 效能優化   | ██░░░░░░░░░░░░ 15% | 基礎圖片優化、SVG 內嵌                  | Lighthouse 90+、lazy loading、code splitting、CDN |
| 🔧 可維護性   | ███░░░░░░░░░░░ 25% | 檔案結構規劃、2 個元件                  | 完整元件庫、Storybook、設計系統文件               |
| 📝 程式碼品質 | ████████░░░░░░ 60% | TypeScript + ESLint + Prettier 配置完成 | 100% 型別覆蓋、無 ESLint 警告、Git hooks          |
| 🧪 測試覆蓋率 | ░░░░░░░░░░░░░░ 0%  | 尚未建立測試                            | Unit 80%、Integration 60%、E2E 關鍵流程           |
| 🛒 電商功能   | ░░░░░░░░░░░░░░ 0%  | 尚未開發                                | 商品列表、購物車、結帳流程、訂單管理              |
| 📝 部落格功能 | ░░░░░░░░░░░░░░ 0%  | 只有路由規劃                            | MDX 支援、文章列表、分類標籤、搜尋功能            |

## 專案結構

```
├── app/              # Next.js App Router 頁面與路由
├── components/       # 可重用元件
│   ├── Logo/        # Logo 元件（響應式）
│   └── Navbar/      # 導航欄元件
├── features/         # 功能模組
├── lib/              # 工具與 API wrappers
├── hooks/            # 自訂 React hooks
├── constants/        # 常數定義
├── types/            # TypeScript 型別
└── public/           # 靜態資源
```

## 部署

目前計劃部署至 GitHub Pages 或其他免費平台。

## License

MIT
