import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // basePath: '/5dpapa',  // 部署時才需要
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;