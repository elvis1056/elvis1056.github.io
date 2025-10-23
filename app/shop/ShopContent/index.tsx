'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

import ProductFilter from '@/features/shop/ProductFilter';
import ProductGrid from '@/features/shop/ProductGrid';
import { fetchProducts } from '@/lib/api/products';
import type { Product } from '@/types';

import style from './style';

interface ShopContentProps {
  className?: string;
}

function ShopContent({ className }: ShopContentProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <main className={className}>
      <div className="shop-container">
        <header className="shop-header">
          <h1 className="shop-title">氣球商城</h1>
          <p className="shop-subtitle">
            為每個特別的時刻增添色彩,打造難忘的回憶
          </p>
        </header>

        <div className="shop-layout">
          <aside className="filter-sidebar">
            <ProductFilter
              onCategoryChange={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          </aside>

          <div className="products-area">
            {loading ? (
              <div className="loading-state">
                <p className="loading-text">載入中...</p>
              </div>
            ) : (
              <ProductGrid products={filteredProducts} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default styled(ShopContent)`
  ${style}
`;
