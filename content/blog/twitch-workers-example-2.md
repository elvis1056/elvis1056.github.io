### 專案結構

workers/ ← 新建資料夾
│ ├── wrangler.toml ← Worker 配置文件
│ └── index.js ← Worker 代碼
├────── twitchScript.js ← 這個「前端」需要修改
└────── index.html

終端機進入到指定資料夾中，執行 wrangler 來產生 ID
cd /Users/elvis1056/Desktop/twitchApi/workers && wrangler kv namespace create "TWITCH_TOKEN_CACHE"

如果建立完成會給一串 ID

Resource location: remote

🌀 Creating namespace with title "TWITCH_TOKEN_CACHE"
✨ Success!
To access your new KV Namespace in your Worker, add the following snippet to your configuration file:
[[kv_namespaces]]
binding = "TWITCH_TOKEN_CACHE"
id = "這是他給的id"
⚠️ Warning: Unsupported macOS version detected (13.3.0). The Cloudflare Workers runtime may not work
correctly on macOS versions below 13.5.0. Consider upgrading to macOS 13.5.0+ or using a DevContainer
setup with a supported version of Linux (glibc 2.35+ required)

把給回的這串 ID 寫回 wrangler.toml

設定完成後

接著需要設定兩個 secret：

TWITCH_CLIENT_ID = （從 Twitch 開發者控制台獲取）
TWITCH_CLIENT_SECRET = （從 Twitch 開發者控制台獲取）

```
echo "xxx" | wrangler secret put TWITCH_CLIENT_ID
echo "xxx" | wrangler secret put TWITCH_CLIENT_SECRET
```

完成上述設定後：

使用完整指令來做「測試」：

curl -s "https://twitch-api-proxy.john800116.workers.dev/api/streams?language=zh&type=live" | jq
'.data[0].user_name' 2>/dev/null || curl -s
"https://twitch-api-proxy.john800116.workers.dev/api/streams?language=zh&type=live" | head -c 200

---

指令拆解（分成三部分）：

第一部分：嘗試用 jq 格式化 JSON

```
curl -s "https://twitch-api-proxy.john800116.workers.dev/api/streams?language=zh&type=live" | jq
'.data[0].user_name' 2>/dev/null
```

參數解釋：

curl

- 發送 HTTP

-s

- Silent mode（靜音模式）
- 不顯示進度條和錯誤訊息
- 只顯示回應內容

"https://twitch-api-proxy.john800116.workers.dev/api/streams?language=zh&type=live"

Worker API 網址與參數

|

- 管道符號（pipe）
- 把前一個指令的輸出傳給下一個指令

jq '.data[0].user_name'

- jq - JSON 處理工具
- .data[0] - 取得 JSON 中第一個直播數據
- .user_name - 取得用戶名稱

2>/dev/null

- 2> - 重定向錯誤輸出（stderr）
- /dev/null - 丟棄（黑洞）
- 如果系統沒有 jq，隱藏錯誤訊息

---

第二部分：邏輯運算符

||

解釋：

- || - OR（或）運算符
- 意思是：如果前面的指令失敗，就執行後面的指令
- 因為不是每個系統都有 jq，所以提供備用方案

---

第三部分：備用方案（如果沒有 jq）

curl -s "https://twitch-api-proxy.john800116.workers.dev/api/streams?language=zh&type=live" | head -c 200

逐個參數解釋：

1. curl -s "..."

- 跟第一部分一樣，再發一次請求

2. |

- 管道符號

3. head -c 200

- head - 顯示開頭部分
- -c 200 - 只顯示前 200 個字元
- 作用：如果 JSON 太長，只顯示前 200 字元看個大概

---

整體邏輯流程圖：

執行指令
↓
發送請求到 Worker API
↓
收到 JSON 回應
↓
嘗試用 jq 提取第一個用戶名
│
├─ 成功（系統有 jq）
│ → 顯示用戶名，例如："hello"
│ → 結束
│
└─ 失敗（系統沒有 jq）
→ 執行備用方案
→ 直接顯示前 200 個字元的原始 JSON
→ 結束

問題 1：env 參數是哪裡來的？

是的！env 是 Cloudflare Workers 自動提供的！

看 workers/index.js 的這段代碼：

export default {
async fetch(request, env, ctx) { // ← env 是 Cloudflare 自動注入的
// ...
}
};

Cloudflare Workers 的標準 API 格式：

fetch(request, env, ctx)

這三個參數都是 Cloudflare 自動傳入的：

1. request - HTTP 請求物件（包含 URL、headers、method 等）
2. env - 環境物件（包含你綁定的所有資源）
3. ctx - 執行上下文（可以用來延長執行時間等，我們沒用到）

---

env 物件裡面有什麼？

根據你的 wrangler.toml 配置：

# KV Namespace 綁定

[[kv_namespaces]]
binding = "TWITCH_TOKEN_CACHE" ← 這個名字會變成 env 的屬性
id = "4a8a92f51a2d4e12b25f5191ec630523"

# Secrets（透過 wrangler secret 設定）

# TWITCH_CLIENT_ID

# TWITCH_CLIENT_SECRET

Cloudflare 會自動把這些資源注入到 env 物件：

env = {
TWITCH_TOKEN_CACHE: { // ← KV Namespace 物件
get: async (key) => {...},
put: async (key, value, options) => {...},
delete: async (key) => {...}
},
TWITCH_CLIENT_ID: "75ni0m3qjhdw4wh1ucjyh16ltx0mpf", // ← Secret
TWITCH_CLIENT_SECRET: "9ci192d7akeqijwdc2z3qn9yrca65c" // ← Secret
}

---

資料是怎麼存到 Cloudflare KV 的？

看這段代碼：

// 從 KV 讀取
let accessToken = await env.TWITCH_TOKEN_CACHE.get('access_token');

// 存入 KV
await env.TWITCH_TOKEN_CACHE.put('access_token', accessToken, {
expirationTtl: 60 _ 60 _ 24 \* 30 // 30 天過期
});

背後發生的事情：

1. 你的 Worker 執行 env.TWITCH_TOKEN_CACHE.put(...)
   ↓
2. Cloudflare Workers Runtime 攔截這個調用
   ↓
3. 透過內部 API 發送請求到 Cloudflare KV 服務
   ↓
4. KV 服務找到 ID 為 4a8a92f51a2d4e12b25f5191ec630523 的 Namespace
   ↓
5. 把資料寫入：
   Key: "access_token"
   Value: "你的 token 字串"
   TTL: 30 天
   ↓
6. 資料儲存在 Cloudflare 全球分散式儲存系統中
   ↓
7. put() 方法返回，繼續執行 Worker 代碼

---

問題 2：CORS 問題

不會有 CORS 問題！

因為我在 Worker 代碼中已經設定了 CORS headers：

function corsHeaders() {
return {
'Access-Control-Allow-Origin': '\*', // ← 允許所有來源
'Access-Control-Allow-Methods': 'GET, OPTIONS',
'Access-Control-Allow-Headers': 'Content-Type'
};
}

CORS 的運作流程：

瀏覽器在 https://elvis1056.github.io/twitchApi/
↓
JavaScript 發送請求到 https://twitch-api-proxy.john800116.workers.dev
↓
瀏覽器檢測到跨域請求（不同域名）
↓
瀏覽器先發送 OPTIONS 預檢請求（preflight）
↓
Worker 收到 OPTIONS 請求
↓
Worker 返回 CORS headers：
Access-Control-Allow-Origin: \* ← 告訴瀏覽器：允許任何來源
↓
瀏覽器：✅ CORS 檢查通過
↓
瀏覽器發送實際的 GET 請求
↓
Worker 處理請求並返回數據（同樣帶 CORS headers）
↓
前端成功收到數據！

---

你可以驗證 CORS 設定：

執行這個指令看回應的 headers：

curl -I "https://twitch-api-proxy.john800116.workers.dev/api/streams?language=zh&type=live"

應該會看到：
HTTP/2 200
access-control-allow-origin: \* ← 這個就是 CORS 設定
access-control-allow-methods: GET, OPTIONS
content-type: application/json

---

流程圖總結：

GitHub Pages (elvis1056.github.io)
└─ twitchScript.js
↓ fetch 請求
Worker (twitch-api-proxy.john800116.workers.dev)
├─ 收到請求
├─ 從 env.TWITCH_TOKEN_CACHE 讀取 token ──→ Cloudflare KV (ID: 4a8a92...)
├─ 如果沒有，從 env.TWITCH_CLIENT_ID/SECRET 獲取新 token
├─ 存入 env.TWITCH_TOKEN_CACHE ──→ Cloudflare KV (ID: 4a8a92...)
├─ 用 token 請求 Twitch API
└─ 返回數據 + CORS headers (Access-Control-Allow-Origin: \*)
↓
GitHub Pages 成功收到數據（沒有 CORS 錯誤）✅

---

關鍵重點：

1. ✅ env 是 Cloudflare 自動提供的，不是你定義的
2. ✅ KV 綁定是透過 wrangler.toml 配置，Cloudflare 自動注入到 env
3. ✅ CORS 已設定，Access-Control-Allow-Origin: \* 允許所有來源
4. ✅ GitHub Pages 可以正常使用，不會有跨域問題
