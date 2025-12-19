'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

import ProductFilter from '@/features/shop/ProductFilter';
import ProductGrid from '@/features/shop/ProductGrid';
import { fetchTopLevelCategories } from '@/lib/api/category';
import { fetchProducts } from '@/lib/api/products';
import type { Product, ShopCategory } from '@/types';

import style from './style';

interface ShopContentProps {
  className?: string;
}

function ShopContent({ className }: ShopContentProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ShopCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([fetchProducts(), fetchTopLevelCategories()])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData);
        setCategories(categoriesData);
      })
      .catch((error) => {
        console.error('Failed to fetch data:', error);
        setProducts([]);
        setCategories([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 根據選擇的分類篩選產品
  const filteredProducts = (() => {
    if (selectedCategory === null) {
      return products;
    }

    // 檢查是否為頂層分類
    const topLevelCategory = categories.find(
      (category) => category.id === selectedCategory
    );

    if (topLevelCategory && topLevelCategory.children.length > 0) {
      // 如果是頂層分類，篩選出所有子分類的產品
      const childCategoryIds = topLevelCategory.children.map(
        (child) => child.id
      );
      return products.filter(
        (product) =>
          product.categoryId !== null &&
          childCategoryIds.includes(product.categoryId)
      );
    }

    // 如果是子分類，直接篩選
    return products.filter(
      (product) => product.categoryId === selectedCategory
    );
  })();

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
