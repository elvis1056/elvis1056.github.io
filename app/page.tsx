import { fetchProducts } from '@/lib/api/products';

import { ProductList } from './product-list';

// 強制動態渲染（不要靜態生成）
export const dynamic = 'force-dynamic';

export default async function Home() {
  // 在伺服器端抓取資料
  const products = await fetchProducts();

  return (
    <main style={{ padding: '2rem' }}>
      <h1>5dpapa 電商</h1>
      <h2>熱門商品</h2>
      <ProductList products={products} />
    </main>
  );
}
