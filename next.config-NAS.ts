import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ===== Docker/NAS 部署模式 =====
  output: 'standalone', // 產生最小化的獨立伺服器（適合 Docker 部署）

  // ===== basePath 已移除 =====
  // NAS 部署到根路徑，不需要 /boomparty 前綴

  // ===== Styled Components 編譯器 =====
  compiler: {
    styledComponents: true, // 啟用 styled-components 的 SSR 支援
  },

  // ===== 圖片優化 =====
  // standalone 模式支援圖片優化，可以移除 unoptimized
  images: {
    // unoptimized: true, // 已註解，使用 Next.js 內建圖片優化
  },

  turbopack: {},

  // ===== Webpack 自訂設定 =====
  webpack: (config) => {
    // 允許 import .md 檔案為字串（使用 Webpack 5 內建的 asset/source）
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    });
    return config;
  },
};

export default nextConfig;
