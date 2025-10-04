'use client';

import styled from 'styled-components';

import type { Product } from '@/types';

import style from './style';

interface ProductCardProps {
  product: Product;
  className?: string;
}

function ProductCard({ product, className }: ProductCardProps) {
  return (
    <article className={className}>
      <div className="card-image-wrapper">
        <div className="card-image">
          <span className="image-placeholder">🎈</span>
        </div>
        {product.featured && <span className="badge">熱門</span>}
      </div>

      <div className="card-info">
        <h3 className="card-name">{product.name}</h3>
        <p className="card-description">{product.description}</p>

        <div className="card-footer">
          <div className="card-price">
            <span className="price-label">NT$</span>
            <span className="price-value">{product.price.toLocaleString()}</span>
          </div>
          <button className="add-to-cart-btn">加入購物車</button>
        </div>
      </div>
    </article>
  );
}

export default styled(ProductCard)`
  ${style}
`;
