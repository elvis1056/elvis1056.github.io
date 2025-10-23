'use client';

import ProductCarousel from '@/app/home/ProductCarousel';
import SkillsSection from '@/components/SkillsSection';
import { skillsData } from '@/constants/skills';

// 範例商品資料（暫時使用 Banner 圖片）
const sampleProducts = [
  {
    id: '1',
    title: '頂新集團餐飲事業群經營策略會議',
    image: '/images/resume/banner-1.png',
    subtitle: '企業活動布置',
    tags: ['電商網站', '首頁'],
  },
  {
    id: '2',
    title: '兆豐國際商銀尾牙',
    image: '/images/resume/banner-2.png',
    subtitle: '尾牙活動',
    tags: ['電商網站', '首頁'],
  },
  {
    id: '3',
    title: 'Guerlain 嬌蘭尾牙',
    image: '/images/resume/banner-3.png',
    subtitle: '尾牙活動',
    tags: ['篩選機制', '搜尋頁'],
  },
  {
    id: '4',
    title: 'PIXNET 痞客幫尾牙',
    image: '/images/resume/banner-4.png',
    subtitle: '尾牙活動',
    tags: ['商品', '購物車'],
  },
  {
    id: '5',
    title: '新店優美勝地婚禮',
    image: '/images/resume/banner-5.png',
    subtitle: '婚禮布置',
    tags: ['商品頁', '購買'],
  },
  {
    id: '6',
    title: '求婚佈置',
    image: '/images/resume/banner-6.png',
    subtitle: '求婚場地',
    tags: ['購物車', '購物車品項'],
  },
];

export default function Home() {
  return (
    <main>
      {/* <Banner /> */}
      <ProductCarousel products={sampleProducts} />
      <SkillsSection
        title={skillsData.title}
        categories={skillsData.categories}
      />
    </main>
  );
}
