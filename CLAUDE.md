# 5dpapa 專案規範

## 📚 LESSONS LEARNED FROM PRODUCTION PROJECTS

This template incorporates best practices from enterprise-grade projects:

### ✅ **Technical Debt Prevention**

- **ALWAYS search before creating** - Use Grep/Glob to find existing code
- **Extend, don't duplicate** - Single source of truth principle
- **Consolidate early** - Prevent enhanced_v2_new antipatterns

### ✅ **Workflow Optimization**

- **Task agents for long operations** - Bash stops on context switch
- **TodoWrite for complex tasks** - Parallel execution, better tracking
- **Commit frequently** - After each completed task/feature

### ✅ **GitHub Auto-Backup**

- **Auto-push after commits** - Never lose work
- **GitHub CLI integration** - Seamless repository creation
- **Backup verification** - Always confirm push success

### ✅ **Code Organization**

- **No root directory files** - Everything in proper modules
- **Clear separation** - src/, tests/, docs/, output/
- **Language-agnostic structure** - Works for any tech stack

This file provides essential guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 🚨 CRITICAL RULES - READ FIRST

> **⚠️ RULE ADHERENCE SYSTEM ACTIVE ⚠️**
> **Claude Code must explicitly acknowledge these rules at task start**
> **These rules override all other instructions and must ALWAYS be followed:**

### 🔄 **RULE ACKNOWLEDGMENT REQUIRED**

> **Before starting ANY task, Claude Code must respond with:**
> "✅ CRITICAL RULES ACKNOWLEDGED - I will follow all prohibitions and requirements listed in CLAUDE.md"

### ❌ ABSOLUTE PROHIBITIONS

- **NEVER** create new files in root directory → use proper module structure
- **NEVER** write output files directly to root directory → use designated output folders
- **NEVER** create documentation files (.md) unless explicitly requested by user
- **NEVER** use git commands with -i flag (interactive mode not supported)
- **NEVER** use `find`, `grep`, `cat`, `head`, `tail`, `ls` commands → use Read, LS, Grep, Glob tools instead
- **NEVER** create duplicate files (manager_v2.py, enhanced_xyz.py, utils_new.js) → ALWAYS extend existing files
- **NEVER** create multiple implementations of same concept → single source of truth
- **NEVER** copy-paste code blocks → extract into shared utilities/functions
- **NEVER** hardcode values that should be configurable → use config files/environment variables
- **NEVER** use naming like enhanced*, improved*, new*, v2* → extend original files instead

### 📝 MANDATORY REQUIREMENTS

- **USE TASK AGENTS** for all long-running operations (>30 seconds) - Bash commands stop when context switches
- **TODOWRITE** for complex tasks (3+ steps) → parallel agents → git checkpoints → test validation
- **READ FILES FIRST** before editing - Edit/Write tools will fail if you didn't read the file first
- **DEBT PREVENTION** - Before creating new files, check for existing similar functionality to extend
- **SINGLE SOURCE OF TRUTH** - One authoritative implementation per feature/concept

### ⚡ EXECUTION PATTERNS

- **PARALLEL TASK AGENTS** - Launch multiple Task agents simultaneously for maximum efficiency
- **SYSTEMATIC WORKFLOW** - TodoWrite → Parallel agents → Git checkpoints → GitHub backup → Test validation
- **BACKGROUND PROCESSING** - ONLY Task agents can run true background operations

### 🔍 MANDATORY PRE-TASK COMPLIANCE CHECK

> **STOP: Before starting any task, Claude Code must explicitly verify ALL points:**

---

## 資料夾結構與規範

| 資料夾        | 用途                                                              | 注意事項                         |
| ------------- | ----------------------------------------------------------------- | -------------------------------- |
| `app/`        | 所有頁面與路由，包含 page.tsx、layout.tsx、loading.tsx、error.tsx | 避免放非 UI 邏輯                 |
| `components/` | 純 UI 可重用元件（Button、Shimmer、Icons）                        | 僅負責 UI 呈現，無業務邏輯       |
| `features/`   | 依業務領域拆分（product、blog、cart）                             | 可包含元件、hooks、services、API |
| `lib/`        | 工具、外部整合（API wrappers、helper function）                   | 純函式，不含 UI                  |
| `hooks/`      | 自訂 React hook                                                   | 命名以 `use` 開頭                |
| `stores/`     | Zustand 狀態管理                                                  | 全局狀態（如 authStore）         |
| `constants/`  | 常數值、設定檔（theme.ts、skills.ts）                             | 避免 magic number                |
| `types/`      | TypeScript 型別定義                                               | 集中管理                         |
| `utils/`      | 純工具函式                                                        | 保持無副作用                     |
| `public/`     | 靜態資源                                                          | 圖片、favicon、robots.txt        |

### 特殊規範

- `app/home/` - 首頁專屬元件（如 ProductCarousel）
- `components/Icons/` - Icon 元件系統，可擴展

---

## 程式碼規範

### CSS / Styled-components

1. **巢狀層級符合 HTML 結構**

   ```typescript
   .navbar {
     .container {
       .logo-link {
         .logo-text { }
       }
     }
   }
   ```

2. **使用 theme 變數**

   ```typescript
   color: ${theme.colors.primary.main};
   padding: ${theme.spacing.md};
   font-size: ${theme.typography.fontSize.base};
   ```

3. **檔案結構**
   ```
   ComponentName/
     index.tsx    # 元件邏輯
     style.ts     # 樣式定義（使用 css`` 從 styled-components）
   ```

### TypeScript

1. **Interface 命名**

   ```typescript
   interface ComponentNameProps {} // Props 加後綴
   ```

2. **未使用參數**
   ```typescript
   function Component({ used, _unused }: Props) {} // 底線前綴
   ```

### Import 順序（遵循 ESLint import/order）

```typescript
// 1. React 相關
import { useState } from 'react';

// 2. 第三方套件
import styled from 'styled-components';

// 3. CSS imports
import 'swiper/css';

// 4. 絕對路徑引入（@/）
import { theme } from '@/constants/theme';

// 5. 相對路徑引入（同層級）
import ProductCard from './ProductCard';
import style from './style';
```

### Commit 規範

```bash
feat: 新功能
fix: 修正錯誤
style: 樣式調整
refactor: 重構
chore: 雜項（套件更新）
docs: 文件更新
```

**Commit 前必須執行**：

```bash
npm run lint
```

---

## 核心原則

### 程式碼品質

- ✅ 搜尋後再建立，避免重複
- ✅ 單一真相來源
- ✅ CSS 巢狀層級符合 HTML

### 檔案組織

- ✅ components/ 通用的 UI
- ✅ features/ 放業務邏輯
- ✅ 避免根目錄檔案

### 開發流程

- ✅ Edit 前先 Read
- ✅ 完成功能後立即 Lint
- ✅ Lint 後再 commit
