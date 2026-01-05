用戶拿到 Token 然後呢？

怎麼用？怎麼存？怎麼拿？怎麼做？

---
## 面試常問：說說看，使用者登入後拿到的 Token，前端應該怎麼存？

- 如果你在做的是一個簡單的、內部使用的、對安全性要求不高的工具，用 localStorage 圖個方便也無可厚非，但要清楚風險。
- 如果你在做的是一個傳統的、服務端渲染的多頁應用，使用 HttpOnly Cookie 並配套 CSRF 防護是標準做法。
- 如果你在做的是一個現代化的 SPA（如 React/Vue 應用），強烈推薦研究並採用 Access Token (內存) + Refresh Token (HttpOnly Cookie) 的方案。

---

## Web Storage（localStorage / sessionStorage）

優點：

- 應用簡易：登入寫入，後續請求時帶上。
- 永久存儲（localStorage）：必須手動清除，否則一直存在。
- 會話期存儲（sessionStorage）：分頁頁面關閉即清除，比較安全。

缺點：

- 極易受到 XSS (跨站腳本攻擊)
- 如果網站存在 XSS 漏洞，攻擊者的惡意腳本可以輕易讀取 localStorage 中的 Token，竊取使用者身份。

## Cookie 方案

伺服器通過 HTTP Response Header 設定：

```
Set-Cookie: auth_token=your_token; Path=/; HttpOnly; Secure
```

優點：

- **HttpOnly 屬性**：無法透過 JavaScript 存取，即使發生 XSS 也無法竊取 Token
- **Secure 屬性**：強制僅在 HTTPS 下傳輸，防止網路竊聽
- 瀏覽器自動攜帶：前端無需額外處理
- 可以設定生命周期：通過 Expires 或 Max-Age 設置過期時間。

缺點：

- 容易受到 CSRF（跨站請求偽造）攻擊
- 瀏覽器會自動在請求中帶上 Cookie，攻擊者可誘導使用者點擊惡意連結發起請求

## 內存儲存

將 Token 存在 JavaScript 變數中：

```javascript
let inMemoryToken = null;

// 登入成功後
const login = async () => {
  const response = await loginAPI(username, password);
  inMemoryToken = response.data.token; // 存到內存變數
};

// 請求攔截器中添加
axios.interceptors.request.use((config) => {
  if (inMemoryToken) {
    config.headers.Authorization = `Bearer ${inMemoryToken}`;
  }
  return config;
});

// 退出登入或頁面刷新時，Token 消失
```

優點：

- 安全性極高，XSS 攻擊者難以竊取
- Token 不會長期暴露

缺點：

- 頁面刷新即失效，使用者體驗差
- 需要頻繁重新登入

## 最佳實踐：Access Token + Refresh Token

現代 Web 應用的推薦方案，結合安全與體驗：

**雙 Token 策略**：

- **Access Token**（短效，如 2 小時）
  - 用於 API 請求
  - 存入內存變數
  - 即使被 XSS 竊取，有效期短風險可控

- **Refresh Token**（長效，如 7 天）
  - 僅用於換取新的 Access Token
  - 存入 HttpOnly Cookie
  - 受 HttpOnly 保護，無法被 XSS 讀取

**運作流程**：
1. 登入成功取得兩個 Token
2. Access Token 存內存，用於日常 API 請求
3. Access Token 過期時，用 Refresh Token 換取新的
4. 頁面刷新時自動用 Refresh Token 重新取得 Access Token

## 儲存方式比較

| 方案 | 安全性 | 使用體驗 | 適用場景 |
|------|--------|----------|---------|
| **LocalStorage** | ❌ 低 - 易受 XSS 攻擊 | ✅ 好 - 永久保存 | 簡單內部工具 |
| **SessionStorage** | ❌ 低 - 易受 XSS 攻擊 | ⚠️ 中 - 分頁關閉即失效 | 臨時性資料 |
| **Cookie** | ✅ 高 - HttpOnly 防 XSS | ✅ 好 - 自動攜帶 | 傳統多頁應用 (需配 CSRF 防禦) |
| **內存** | ✅ 高 - 極高安全性 | ❌ 差 - 刷新即失效 | 安全優先場景 |
| **雙 Token 組合** | ✅ 高 - 平衡安全與體驗 | ✅ 好 - 最佳體驗 | 🌟 現代 SPA 推薦 |

## 安全性考量重點

**XSS 防護**：
- Web Storage 最脆弱
- HttpOnly Cookie 免疫
- 內存相對安全但短效

**CSRF 防護**：
- Cookie 需搭配 Anti-CSRF Token
- 驗證 Referer Header
- 使用 SameSite Cookie 屬性

## 總結

沒有絕對安全的方案，只有相對合適的選擇：

1. **簡單專案**：可用 localStorage，但需了解 XSS 風險
2. **傳統應用**：HttpOnly Cookie + CSRF 防護
3. **現代 SPA**：Access Token（內存）+ Refresh Token（HttpOnly Cookie）

**核心原則**：根據業務場景權衡安全性與使用者體驗，並持續關注最新的安全實踐。

參考文章：https://codelove.tw/@tony/post/x22g6x