'use client';

import { useEffect, useState } from 'react';

import Banner from '@/components/Banner';
import { fetchProducts } from '@/lib/api/products';
import type { Product } from '@/types';

import { ProductList } from './product-list';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Failed to fetch products:', error);
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <Banner />
      <div style={{ padding: '2rem' }}>
        <h1>5dpapa 電商</h1>
        <h2>熱門商品</h2>
        {loading ? <p>載入中...</p> : <ProductList products={products} />}
      </div>
    </main>
  );
}
