'use client';

import styled from 'styled-components';

import style from './style';

interface ProductFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

const categories = [
  { id: 'all', name: '全部商品', icon: '🎈' },
  { id: 'birthday', name: '生日派對', icon: '🎂' },
  { id: 'wedding', name: '婚禮佈置', icon: '💒' },
  { id: 'baby', name: '寶寶派對', icon: '👶' },
  { id: 'anniversary', name: '週年慶祝', icon: '🎊' },
  { id: 'festival', name: '節慶佈置', icon: '🎉' },
  { id: 'corporate', name: '企業活動', icon: '🏢' },
];

function ProductFilter({
  selectedCategory,
  onCategoryChange,
  className,
}: ProductFilterProps) {
  return (
    <div className={className}>
      <div className="filter-container">
        <h2 className="filter-title">商品分類</h2>

        <ul className="category-list">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => onCategoryChange(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
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
