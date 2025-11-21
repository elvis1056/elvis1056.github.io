'use client';

import ProductCarousel from '@/app/home/ProductCarousel';
import SkillsSection from '@/components/SkillsSection';
import { skillsData } from '@/constants/skills';

// 範例商品資料（暫時使用 Banner 圖片）
const sampleProducts = [
  {
    id: '1',
    title: '電商首頁',
    image: '/images/resume/banner-1.png',
    subtitle: '電商首頁',
    tags: ['電商網站', '首頁'],
    href: 'https://www.buy123.com.tw/',
  },
  {
    id: '2',
    title: '電商首頁',
    image: '/images/resume/banner-2.png',
    subtitle: '電商首頁',
    tags: ['電商網站', '首頁'],
    href: 'https://www.pcone.com.tw/',
  },
  {
    id: '3',
    title: '電商搜尋頁',
    image: '/images/resume/banner-3.png',
    subtitle: '電商搜尋頁',
    tags: ['篩選機制', '搜尋頁'],
    href: 'https://www.pcone.com.tw/search?q=%E5%BA%8A%E5%8C%85',
  },
  {
    id: '4',
    title: '電商購物車',
    image: '/images/resume/banner-4.png',
    subtitle: '電商購物車',
    tags: ['商品', '購物車'],
    href: 'https://www.pcone.com.tw/product/info/200309112658',
  },
  {
    id: '5',
    title: '電商商品頁',
    image: '/images/resume/banner-5.png',
    subtitle: '電商商品頁',
    tags: ['商品頁', '購買'],
    href: 'https://www.buy123.com.tw/site/sku/2156552',
  },
  {
    id: '6',
    title: '電商購物車',
    image: '/images/resume/banner-6.png',
    subtitle: '電商購物車',
    tags: ['購物車', '購物車品項'],
    href: 'https://www.buy123.com.tw/site/sku/2156552',
  },
];

export default function Home() {
  return (
    <main>
      {/* <Banner /> */}
      <ProductCarousel products={sampleProducts} />
      <SkillsSection
        categories={skillsData.categories}
        title={skillsData.title}
      />
    </main>
  );
}
