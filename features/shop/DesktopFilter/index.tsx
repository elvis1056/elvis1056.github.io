'use client';

import Image from 'next/image';
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

  const toggleExpanded = (categoryId: number) => {
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
          {categories.map((category) => {
            const hasChildren = category.children.length > 0;
            const isExpanded = expandedCategories.has(category.id);

            return (
              <li key={category.id}>
                <div className="category-item-wrapper">
                  <button
                    className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => {
                      if (selectedCategory === category.id) return;
                      onCategoryChange(category.id);
                    }}
                    title={category.name}
                  >
                    <span className="category-name">{category.name}</span>
                  </button>
                  {hasChildren && (
                    <div className="expand-wrapper">
                      <Image
                        alt="expand"
                        className={`expand-icon ${isExpanded ? 'expanded' : ''}`}
                        fill
                        onClick={() => toggleExpanded(category.id)}
                        src={assetPath('/icons/chevron-right.svg')}
                      />
                    </div>
                  )}
                </div>

                {/* 子分類 */}
                {isExpanded && (
                  <ul className="subcategory-list">
                    {category.children.map((child) => (
                      <li key={child.id}>
                        <button
                          className={`category-item subcategory ${selectedCategory === child.id ? 'active' : ''}`}
                          onClick={() => {
                            if (selectedCategory === child.id) return;
                            onCategoryChange(child.id);
                          }}
                          title={child.name}
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
            );
          })}
        </ul>
      </div>
    </div>
  );
}

DesktopFilter.displayName = 'DesktopFilter';

export default styled(DesktopFilter)`
  ${style}
`;
