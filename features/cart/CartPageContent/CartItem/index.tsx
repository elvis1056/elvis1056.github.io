'use client';

import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

import { useCartStore } from '@/stores/cartStore';
import type { CartItem as CartItemType } from '@/types';

import style from './style';

interface CartItemProps {
  item: CartItemType;
  className?: string;
}

function CartItem({ item, className }: CartItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { updateQuantity, removeItem } = useCartStore();

  // 更新數量
  const updateItemQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > item.availableStock) {
      alert(`庫存不足，目前僅剩 ${item.availableStock} 件`);
      return;
    }

    setIsUpdating(true);
    try {
      await updateQuantity(item.id, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
      alert('更新數量失敗，請稍後再試');
    } finally {
      setIsUpdating(false);
    }
  };

  // 移除商品
  const removeCartItem = async () => {
    if (!confirm(`確定要移除「${item.productName}」嗎？`)) return;

    setIsUpdating(true);
    try {
      await removeItem(item.id);
    } catch (error) {
      console.error('Failed to remove item:', error);
      alert('移除商品失敗，請稍後再試');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={`${className} ${isUpdating ? 'updating' : ''}`}>
      {/* 商品圖片 */}
      <div className="item-image">
        {item.productImageUrl ? (
          <Image
            alt={item.productName}
            fill
            src={item.productImageUrl}
            style={{ objectFit: 'contain' }}
          />
        ) : (
          <span className="image-placeholder">🎈</span>
        )}
      </div>

      {/* 商品資訊 */}
      <div className="item-info">
        <h3 className="item-name">{item.productName}</h3>
        <p className="item-description">{item.productDescription}</p>
        <div className="item-price">
          NT$ {item.productPrice.toLocaleString()}
        </div>
        {!item.inStock && <div className="out-of-stock-badge">缺貨中</div>}
      </div>

      {/* 數量控制 */}
      <div className="item-quantity">
        <button
          className="quantity-btn"
          disabled={isUpdating || item.quantity <= 1}
          onClick={() => updateItemQuantity(item.quantity - 1)}
        >
          -
        </button>
        <span className="quantity-value">{item.quantity}</span>
        <button
          className="quantity-btn"
          disabled={isUpdating || item.quantity >= item.availableStock}
          onClick={() => updateItemQuantity(item.quantity + 1)}
        >
          +
        </button>
      </div>

      {/* 小計 */}
      <div className="item-subtotal">NT$ {item.subtotal.toLocaleString()}</div>

      {/* 刪除按鈕 */}
      <button
        className="remove-btn"
        disabled={isUpdating}
        onClick={removeCartItem}
      >
        ✕
      </button>
    </div>
  );
}

export default styled(CartItem)`
  ${style}
`;
