import type { Product } from '@/types';

// 🔥 假資料 - 之後改成真實 API
export async function fetchProducts(): Promise<Product[]> {
  // 模擬網路延遲
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: 1,
      name: '夢幻獨角獸氣球組',
      description: '浪漫粉色系搭配金色獨角獸造型，適合女孩生日派對',
      price: 1280,
      category: 'birthday',
      featured: true,
      imageUrl: '/images/balloon-1.jpg',
      createdAt: '2025-01-15T10:00:00Z',
    },
    {
      id: 2,
      name: '典雅白金婚禮氣球拱門',
      description: '純白與香檳金完美結合，打造浪漫婚禮場景',
      price: 3580,
      category: 'wedding',
      featured: true,
      imageUrl: '/images/balloon-2.jpg',
      createdAt: '2025-01-16T10:00:00Z',
    },
    {
      id: 3,
      name: '可愛寶寶氣球佈置套組',
      description: '粉藍色系雲朵造型，寶寶派對必備',
      price: 1580,
      category: 'baby',
      imageUrl: '/images/balloon-3.jpg',
      createdAt: '2025-01-17T10:00:00Z',
    },
    {
      id: 4,
      name: '繽紛數字氣球 - 生日快樂',
      description: '客製化數字與彩色氣球組合，增添歡樂氣氛',
      price: 980,
      category: 'birthday',
      imageUrl: '/images/balloon-4.jpg',
      createdAt: '2025-01-18T10:00:00Z',
    },
    {
      id: 5,
      name: '企業開幕誌慶氣球牆',
      description: '大型氣球牆面，適合開幕活動與企業慶典',
      price: 5800,
      category: 'corporate',
      featured: true,
      imageUrl: '/images/balloon-5.jpg',
      createdAt: '2025-01-19T10:00:00Z',
    },
    {
      id: 6,
      name: '情人節愛心氣球束',
      description: '浪漫紅色愛心造型，表達真摯心意',
      price: 890,
      category: 'festival',
      imageUrl: '/images/balloon-6.jpg',
      createdAt: '2025-01-20T10:00:00Z',
    },
    {
      id: 7,
      name: '週年慶祝金色氣球套裝',
      description: '奢華金色系列，紀念重要時刻',
      price: 2280,
      category: 'anniversary',
      imageUrl: '/images/balloon-7.jpg',
      createdAt: '2025-01-21T10:00:00Z',
    },
    {
      id: 8,
      name: '聖誕節主題氣球組',
      description: '紅綠配色聖誕樹造型，節慶氛圍滿分',
      price: 1680,
      category: 'festival',
      imageUrl: '/images/balloon-8.jpg',
      createdAt: '2025-01-22T10:00:00Z',
    },
  ];
}

export async function fetchProductById(id: number): Promise<Product> {
  const products = await fetchProducts();
  const product = products.find((p) => p.id === id);

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
}

// 🔧 之後改成這樣（真實 API）：
// export async function fetchProducts(): Promise<Product[]> {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`);
//   if (!res.ok) {
//     const error = new Error(`Failed to fetch products: ${res.status}`);
//     (error as any).status = res.status;
//     throw error;
//   }
//   return res.json();
// }
