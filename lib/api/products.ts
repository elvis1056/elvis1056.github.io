import type { Product } from '@/types';

// 🔥 假資料 - 之後改成真實 API
export async function fetchProducts(): Promise<Product[]> {
  // 模擬網路延遲
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: 1,
      name: 'MacBook Pro 16吋',
      description: 'Apple M3 Max 晶片，64GB 記憶體',
      price: 89900,
      imageUrl: '/images/product-1.jpg',
      createdAt: '2025-01-15T10:00:00Z',
    },
    {
      id: 2,
      name: 'iPhone 15 Pro',
      description: '鈦金屬設計，A17 Pro 晶片',
      price: 36900,
      imageUrl: '/images/product-2.jpg',
      createdAt: '2025-01-16T10:00:00Z',
    },
    {
      id: 3,
      name: 'AirPods Pro (第2代)',
      description: '主動式降噪，MagSafe 充電盒',
      price: 7990,
      imageUrl: '/images/product-3.jpg',
      createdAt: '2025-01-17T10:00:00Z',
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
