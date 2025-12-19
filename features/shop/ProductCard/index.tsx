'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';

import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import type { Product } from '@/types';

import style from './style';

interface ProductCardProps {
  product: Product;
  className?: string;
}

function ProductCard({ product, className }: ProductCardProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const addToCart = async () => {
    // 未登入則導向登入頁
    if (!user) {
      router.push('/login');
      return;
    }

    if (isAdding || justAdded) return;

    setIsAdding(true);
    try {
      await addItem(product.id, 1);

      // 顯示「已加入」狀態 1.5 秒
      setJustAdded(true);
      setTimeout(() => {
        setJustAdded(false);
      }, 1500);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('加入購物車失敗，請稍後再試');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <article className={className}>
      <div className="card-image-wrapper">
        <div className="card-image">
          {product.imageUrl ? (
            <Image
              alt={product.name}
              fill
              src={product.imageUrl}
              style={{ objectFit: 'contain' }}
            />
          ) : (
            <span className="image-placeholder">🎈</span>
          )}
        </div>
        {product.featured && <span className="badge">熱門</span>}
      </div>

      <div className="card-info">
        <h3 className="card-name">{product.name}</h3>
        <p className="card-description">{product.description}</p>

        <div className="card-footer">
          <div className="card-price">
            <span className="price-label">NT$</span>
            <span className="price-value">
              {product.price.toLocaleString()}
            </span>
          </div>
          <button
            className={`add-to-cart-btn ${justAdded ? 'added' : ''}`}
            disabled={isAdding || justAdded}
            onClick={addToCart}
          >
            {isAdding ? '加入中...' : justAdded ? '✓ 已加入' : '加入購物車'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default styled(ProductCard)`
  ${style}
`;
