'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { fetchTopLevelCategories } from '@/lib/api/category';
import type { ShopCategory } from '@/types';

import style from './style';

interface ProductFilterProps {
  selectedCategory: number | null;
  onCategoryChange: (categoryId: number | null) => void;
  className?: string;
}

function ProductFilter({
  selectedCategory,
  onCategoryChange,
  className,
}: ProductFilterProps) {
  const [categories, setCategories] = useState<ShopCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    fetchTopLevelCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error('Failed to fetch categories:', error);
        setCategories([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  if (loading) {
    return (
      <div className={className}>
        <div className="filter-container">
          <h2 className="filter-title">商品分類</h2>
          <p className="loading-text">載入中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="filter-container">
        <h2 className="filter-title">商品分類</h2>

        <ul className="category-list">
          {/* 全部商品選項 */}
          <li>
            <button
              className={`category-item ${selectedCategory === null ? 'active' : ''}`}
              onClick={() => onCategoryChange(null)}
            >
              <span className="category-icon">🎈</span>
              <span className="category-name">全部商品</span>
            </button>
          </li>

          {/* 動態分類 */}
          {categories.map((category) => (
            <li key={category.id}>
              <button
                className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => {
                  onCategoryChange(category.id);
                  if (category.children.length > 0) {
                    toggleCategory(category.id);
                  }
                }}
              >
                <span className="category-name">{category.name}</span>
                {category.children.length > 0 && (
                  <span className="expand-icon">
                    {expandedCategories.has(category.id) ? '▼' : '▶'}
                  </span>
                )}
              </button>

              {/* 子分類 */}
              {category.children.length > 0 &&
                expandedCategories.has(category.id) && (
                  <ul className="subcategory-list">
                    {category.children.map((child) => (
                      <li key={child.id}>
                        <button
                          className={`category-item subcategory ${selectedCategory === child.id ? 'active' : ''}`}
                          onClick={() => onCategoryChange(child.id)}
                        >
                          <span className="category-name">{child.name}</span>
                          <span className="product-count">
                            ({child.productCount})
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default styled(ProductFilter)`
  ${style}
`;
