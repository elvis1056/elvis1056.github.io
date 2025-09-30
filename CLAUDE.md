## 1. 專案基本資訊

### 專案名稱

- 5dpapa

### 專案類型

- 電商網站兼部落格系統

## 2. 技術棧選擇

### 前端框架

- Next.js (只要使用到前端與SSR，後端另外建立不要包含在一起)

### 前端 UI 框架

- Material-UI (MUI)
  - 先套用這套框架，但保留自己修改成為自己樣式的空間，可以隨時抽離這個UI

### 後端技術

- Java + Spring Boot
  - 但我目前對於後端不認識，需要你支援我告訴我問題
  - 選擇 github 很多人使用且有在維護的熱門版本

### 資料庫

- PostgreSQL
  - 但我目前對於資料庫不認識，需要你支援我告訴我問題

### 部署平台

- 目前並沒有合適的地方，如果能免費最好，可以先架在 Github 上

## 3. 核心功能

- 希望能有一個賣東西的首頁展示
- 有部落格可以寫文章
- 希望圖片在不失真的情況下可以被壓縮讓展示更快速

## 4. 規則

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

### 額外補充

資料夾用途與規範

| 資料夾        | 用途                                                              | 注意事項                             |
| ------------- | ----------------------------------------------------------------- | ------------------------------------ |
| `app/`        | 所有頁面與路由，包含 page.tsx、layout.tsx、loading.tsx、error.tsx | 避免放非 UI 邏輯                     |
| `components/` | 與任何特定頁面無關的可重用元件                                    | 僅負責 UI 呈現                       |
| `features/`   | 依功能 (domain) 拆分的模組，包含元件、hook、service               | 可包含 API call、狀態管理            |
| `lib/`        | 工具、外部整合（API wrappers、helper function）                   | 純函式，不含 UI                      |
| `hooks/`      | 自訂 React hook                                                   | 命名以 `use` 開頭                    |
| `context/`    | 全局狀態，React Context Provider                                  | 一般放在根 layout 包裝               |
| `constants/`  | 常數值、設定檔                                                    | 避免 magic number                    |
| `types/`      | TypeScript 型別定義                                               | 集中管理                             |
| `utils/`      | 純工具函式                                                        | 保持無副作用                         |
| `styles/`     | 全域 CSS                                                          | 優先使用模組化 CSS                   |
| `public`      | 靜態資源                                                          | 靜態資源：圖片、favicon、robots.txt… |
