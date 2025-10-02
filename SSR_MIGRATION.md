# 未來改成伺服器版本需要做哪些修改

## 📝 配置檔案修改

### `next.config.ts` - 必須修改

### `getServerSideProps`

**移除靜態輸出相關設定：**

```
// ❌ 移除這些（靜態網站專用）
output: 'export';
basePath: '/5dpapa';
images: {
  unoptimized: true;
}

// ✅ 改成這樣（SSR 版本）
const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true, // 保留
  },
  images: {
    formats: ['image/avif', 'image/webp'], // 重新啟用圖片優化
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

---

## 🚀 部署平台選擇

1. Vercel
2. self VPS
3. other PaaS

---

## 📊 靜態網站 vs 伺服器渲染功能
