'use client';

import styled from 'styled-components';

import type { Product } from '@/types';

import ProductCard from '../ProductCard';

import style from './style';

interface ProductGridProps {
  products: Product[];
  className?: string;
}

function ProductGrid({ products, className }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className={className}>
        <div className="empty-state">
          <p>目前沒有商品</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default styled(ProductGrid)`
  ${style}
`;
