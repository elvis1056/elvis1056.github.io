Cache 一些科普小知識

CDN 是什麼?
  - Content Delivery Network (內容傳遞網路)
  - 在用戶和 Origin Server 之間放一層快取層
  - 好處:
    a. 改善載入時間 - 距離變短
    b. 減少頻寬成本 - CDN 幫你扛流量
    c. 增加可用性 - CDN 有備份
    d. 改善安全性 - CDN 擋在前面

快取架構

用戶瀏覽器 Browser Cache → Cloudflare CDN → Next.js Server (SSR) → API Server

- Browser Cache TTL 控制「瀏覽器」的快取時間
- Cloudflare 提供 Page Rules 功能，針對特定 URL 訂製快取策略
- SSR (Server-Side Rendering) 的快取策略

