'use client';

import { useState } from 'react';
import styled from 'styled-components';

import { assetPath } from '@/lib/utils/asset-path';
import type { ShopCategory } from '@/types';

import style from './style';

interface DesktopFilterProps {
  categories: ShopCategory[];
  selectedCategory: number | null;
  onCategoryChange: (categoryId: number | null) => void;
  className?: string;
}

function DesktopFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  className,
}: DesktopFilterProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(
    new Set()
  );

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

  return (
    <div className={className}>
      <div className="filter-container">
        <h2 className="filter-title">商品分類</h2>

        <ul className="category-list">
          {/* 全部商品選項 */}
          <li>
            <button
              className={`category-item ${selectedCategory === null ? 'active' : ''}`}
              onClick={() => {
                if (selectedCategory === null) return;
                onCategoryChange(null);
              }}
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
                  if (category.children.length > 0) {
                    toggleCategory(category.id);
                  }
                  if (selectedCategory === category.id) return;
                  onCategoryChange(category.id);
                }}
              >
                <span className="category-name">{category.name}</span>
                {category.children.length > 0 && (
                  <img
                    alt="expand"
                    className={`expand-icon ${expandedCategories.has(category.id) ? 'expanded' : ''}`}
                    src={assetPath('/icons/chevron-right.svg')}
                  />
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
                          onClick={() => {
                            if (selectedCategory === child.id) return;
                            onCategoryChange(child.id);
                          }}
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

DesktopFilter.displayName = 'DesktopFilter';

export default styled(DesktopFilter)`
  ${style}
`;
