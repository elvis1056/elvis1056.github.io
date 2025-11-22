# 完整流程圖與開始準備環境

⏺ Cloudflare Workers 完整流程圖：

```
┌─────────────────────────────────────────────────────────────┐
│ 使用者瀏覽器 │
│ (訪問 https://elvis1056.github.io/twitchApi) │
└────────────────────┬────────────────────────────────────────┘
│
│ 1. 載入 index.html 和 twitchScript.js
│
▼
┌─────────────────────────────────────────────────────────────┐
│ 前端 JavaScript 執行 │
│ fetch('https://your-worker.your-subdomain.workers.dev/api/streams?language=zh&type=live')
└────────────────────┬────────────────────────────────────────┘
│
│ 2. AJAX 請求到你的 Cloudflare Worker
│
▼
┌─────────────────────────────────────────────────────────────┐
│ Cloudflare Workers (邊緣運算) │
│ │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Worker 腳本邏輯： │ │
│ │ │ │
│ │ 1. 檢查 KV 快取是否有有效的 access_token │ │
│ │ ├─ 有且未過期 → 使用快取的 token │ │
│ │ └─ 沒有或已過期 → 向 Twitch 獲取新 token │ │
│ │ │ │
│ │ 2. 使用 token 向 Twitch API 發送請求 │ │
│ │ fetch('https://api.twitch.tv/helix/streams?...') │ │
│ │ headers: { │ │
│ │ 'Client-ID': env.TWITCH_CLIENT_ID │ │
│ │ 'Authorization': 'Bearer ' + token │ │
│ │ } │ │
│ │ │ │
│ │ 3. 將 Twitch 回傳的數據轉發給前端 │ │
│ └─────────────────────────────────────────────────────┘ │
└────────────────────┬────────────────────────────────────────┘
│
│ 3. 返回數據
│
▼
┌─────────────────────────────────────────────────────────────┐
│ 前端接收並渲染數據 │
│ creatLiveStreamDom(data.data) │
└─────────────────────────────────────────────────────────────┘
```

---

必要步驟清單：

階段一：Cloudflare 帳號設置

1. ✅ 註冊 Cloudflare 帳號（免費）
2. ✅ 安裝 Wrangler CLI（Cloudflare 的開發工具）
3. ✅ 登入並授權 Wrangler

階段二：建立 Worker 專案

4. ✅ 在本地建立 Worker 專案結構
5. ✅ 設定 wrangler.toml 配置文件
6. ✅ 建立 KV Namespace（用於儲存 token）

階段三：撰寫 Worker 代碼

7. ✅ 寫 Worker 主邏輯（處理請求）
8. ✅ 實作獲取 Twitch token 的函數
9. ✅ 實作 token 快取機制（存入 KV）
10. ✅ 實作向 Twitch API 轉發請求的邏輯
11. ✅ 加入 CORS 處理（讓 GitHub Pages 能訪問）

階段四：配置環境變數

12. ✅ 在 Cloudflare Dashboard 設定 Secrets：
    - TWITCH_CLIENT_ID
    - TWITCH_CLIENT_SECRET

階段五：部署與測試

13. ✅ 部署 Worker 到 Cloudflare
14. ✅ 測試 Worker API 端點
15. ✅ 修改前端代碼（twitchScript.js）調用 Worker API

階段六：優化（可選）

16. ✅ 設定自訂域名（例如 api.yourdomain.com）
17. ✅ 加入錯誤處理和日誌
18. ✅ 加入請求限流（防濫用）

---

詳細步驟說明：

步驟 1-3：環境準備

# 安裝 Wrangler CLI

npm install -g wrangler

# 登入 Cloudflare

wrangler login

步驟 4-5：專案結構

你的專案/
├── workers/ ← 新建資料夾
│ ├── wrangler.toml ← Worker 配置文件
│ └── index.js ← Worker 代碼
├── twitchScript.js ← 前端（需要修改）
└── index.html

步驟 6：建立 KV Namespace

# 在 Cloudflare Dashboard 建立，或用指令

wrangler kv:namespace create "TWITCH_TOKEN_CACHE"

步驟 7-11：Worker 代碼架構

// workers/index.js 的概念結構

export default {
async fetch(request, env) {
// 1. 處理 CORS preflight 請求
if (request.method === 'OPTIONS') {
return handleCORS();
}

      // 2. 檢查 KV 快取
      let token = await env.TWITCH_TOKEN_CACHE.get('access_token');

      if (!token) {
        // 3. 沒有 token，向 Twitch 獲取
        token = await getNewToken(env);

        // 4. 存入 KV，設定過期時間
        await env.TWITCH_TOKEN_CACHE.put('access_token', token, {
          expirationTtl: 60 * 60 * 24 * 30  // 30天
        });
      }

      // 5. 向 Twitch API 發送請求
      const twitchResponse = await fetch('https://api.twitch.tv/helix/streams?...', {
        headers: {
          'Client-ID': env.TWITCH_CLIENT_ID,
          'Authorization': `Bearer ${token}`
        }
      });

      // 6. 返回給前端，並加上 CORS headers
      const data = await twitchResponse.json();
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

};

步驟 12：環境變數設定

在 Cloudflare Dashboard 的 Worker 設定頁面：
Settings → Variables → Secrets
添加：

- TWITCH_CLIENT_ID = 75ni0m3qjhdw4wh1ucjyh16ltx0mpf
- TWITCH_CLIENT_SECRET = (你的 secret)

步驟 13：部署

cd workers
wrangler deploy
會得到一個網址，例如：
https://twitch-api-proxy.your-subdomain.workers.dev

步驟 15：修改前端

// twitchScript.js 的修改

// 原本：
const apiUrl = `https://api.twitch.tv/helix/streams/?language=zh&type=live`
xhr.setRequestHeader("client-id", TWITCH_CLIENT_ID);
xhr.setRequestHeader("Authorization", TWITCH_BEARER_TOKEN);

// 改成：
const apiUrl = `https://twitch-api-proxy.your-subdomain.workers.dev/api/streams?language=zh&type=live`
// 不需要設定任何 headers！Worker 會處理

---

關鍵優勢：

1. Token 永遠不暴露：存在 Cloudflare 的環境變數和 KV 中
2. 自動刷新：Token 過期會自動獲取新的
3. 快取機制：KV 儲存 token，減少對 Twitch OAuth 的請求
4. 全球加速：Cloudflare 的邊緣網路，全球都快
5. 完全免費：你的流量遠低於免費額度

---

潛在問題與注意事項：

⚠️ CORS 問題：必須在 Worker 中正確設定 CORS headers，否則 GitHub Pages 無法訪問

⚠️ KV 最終一致性：Cloudflare KV 是最終一致性，極少數情況下可能讀到舊數據（但對 token 快取影響不大）

⚠️ 冷啟動：Worker 如果長時間沒請求，首次訪問可能稍慢（但通常 <100ms）

---

實作流程如下：

註冊 Cloudflare 帳號，使用 github 帳號連動。

回到本地端的終端機，安裝 npm install -g wrangler。

added 47 packages in 30s
8 packages are looking for funding
run `npm fund` for details

使用 wrangler --version 確認裝態。

⚠️ Warning: Unsupported macOS version detected (13.3.0). The Cloudflare Workers runtime may not work correctly on macOS versions below 13.5.0. Consider upgrading to macOS 13.5.0+ or using a DevContainer setup with a supported version of Linux (glibc 2.35+ required).

⛅️ wrangler 4.48.0

使用 wrangler login 指令。

1. 終端機會顯示一個訊息

Attempting to login via OAuth...
Opening a link in your default browser: https://dash.cloudflare.com/oauth2/auth?response_type=code&client_id=54d11594-84e4-41aa-b438-e81b8fa78ee7&redirect_uri=http%3A%2F%2Flocalhost%3A8976%2Foauth%2Fcallback&scope=account%3Aread%20user%3Aread%20workers%3Awrite%20workers_kv%3Awrite%20workers_routes%3Awrite%20workers_scripts%3Awrite%20workers_tail%3Aread%20d1%3Awrite%20pages%3Awrite%20zone%3Aread%20ssl_certs%3Awrite%20ai%3Awrite%20queues%3Awrite%20pipelines%3Awrite%20secrets_store%3Awrite%20containers%3Awrite%20cloudchamber%3Awrite%20connectivity%3Aadmin%20offline_access&state=rAKCocEqZ1seP_Xw7lzJI8w7Mmn_Wk97&code_challenge=zApsT_fYYa7GboD8Qsn431mhkV2lJm4_4ASNLFkG0r0&code_challenge_method=S256

2. 自動打開瀏覽器，跳轉到 Cloudflare 授權頁面
3. 在瀏覽器中登入你的 Cloudflare 帳號
4. 點擊「Allow」授權
5. 看到成功訊息後，回到終端機
6. 終端機會顯示 "Successfully logged in"
