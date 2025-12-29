'use client';

import { debounce } from 'lodash';
import { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';

import DrawerWrapper, { DrawerWrapperRef } from '@/components/DrawerWrapper';
import type { ShopCategory } from '@/types';

import style from './style';

interface MobileFilterProps {
  className?: string;
  categories: ShopCategory[];
  selectedCategory: number | null;
  onCategoryChange: (categoryId: number | null) => void;
}

function MobileFilter({
  className,
  categories,
  selectedCategory,
  onCategoryChange,
}: MobileFilterProps) {
  const drawerRef = useRef<DrawerWrapperRef>(null);
  const [selectedParent, setSelectedParent] = useState<ShopCategory | null>(
    null
  );
  const [tempSelectedId, setTempSelectedId] = useState<number | null>(null);

  // Debounced 子分類選擇
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const selectSubcategory = useCallback(
    debounce((childId: number) => {
      setTempSelectedId(childId);
    }, 300),
    []
  );

  const onCategoryClick = (category: ShopCategory) => {
    // 有子分類，開啟 Drawer
    if (category.children.length > 0) {
      setSelectedParent(category);
      setTempSelectedId(selectedCategory);
      drawerRef.current?.openModal();
      return;
    }

    // 沒有子分類，直接篩選（避免重複點擊）
    if (selectedCategory === category.id) return;
    onCategoryChange(category.id);
  };

  const onApply = () => {
    if (tempSelectedId === selectedCategory) {
      drawerRef.current?.closeModal();
      return;
    }
    onCategoryChange(tempSelectedId);
    drawerRef.current?.closeModal();
  };

  const onClear = () => {
    setTempSelectedId(null);
  };

  // 檢查分類是否被選中（包含子分類）
  const isCategoryActive = (category: ShopCategory): boolean => {
    if (selectedCategory === category.id) {
      return true;
    }
    // 檢查是否有子分類被選中
    return category.children.some((child) => child.id === selectedCategory);
  };

  return (
    <div className={className}>
      {/* 第一層：水平滾動分類 */}
      <div className="category-scroll">
        <button
          className={`category-chip ${selectedCategory === null ? 'active' : ''}`}
          onClick={() => {
            if (selectedCategory === null) return;
            onCategoryChange(null);
          }}
        >
          全部商品
        </button>
        {categories.map((category) => (
          <button
            className={`category-chip ${isCategoryActive(category) ? 'active' : ''}`}
            key={category.id}
            onClick={() => onCategoryClick(category)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* 第二層：子分類 Drawer */}
      <DrawerWrapper height={500} ref={drawerRef}>
        <div className="drawer-content">
          <div className="drawer-header">
            <h3 className="drawer-title">{selectedParent?.name}</h3>
            <button
              className="close-btn"
              onClick={() => drawerRef.current?.closeModal()}
            >
              ✕
            </button>
          </div>

          <div className="drawer-body">
            <ul className="subcategory-list">
              {selectedParent?.children.map((child) => (
                <li key={child.id}>
                  <button
                    className={`subcategory-item ${tempSelectedId === child.id ? 'active' : ''}`}
                    onClick={() => selectSubcategory(child.id)}
                  >
                    <span className="subcategory-name">{child.name}</span>
                    <span className="product-count">
                      ({child.productCount})
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="drawer-footer">
            <button className="clear-btn" onClick={onClear}>
              清除
            </button>
            <button className="apply-btn" onClick={onApply}>
              套用
            </button>
          </div>
        </div>
      </DrawerWrapper>
    </div>
  );
}

MobileFilter.displayName = 'MobileFilter';

export default styled(MobileFilter)`
  ${style}
`;
