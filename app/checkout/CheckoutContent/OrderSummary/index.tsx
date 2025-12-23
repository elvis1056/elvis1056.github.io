'use client';

import Image from 'next/image';
import styled from 'styled-components';

import type { Cart } from '@/types';

import style from './style';

interface OrderSummaryProps {
  className?: string;
  cart: Cart | null;
  shippingFee: number;
  onSubmit: () => void;
  isSubmitting: boolean;
}

function OrderSummary({
  className,
  cart,
  shippingFee,
  onSubmit,
  isSubmitting,
}: OrderSummaryProps) {
  if (!cart || cart.items.length === 0) {
    return null;
  }

  const totalAmount = cart.totalAmount + shippingFee;

  return (
    <div className={className}>
      <h2 className="summary-title">訂單摘要</h2>

      {/* 商品列表 */}
      <div className="cart-items">
        {cart.items.map((item) => (
          <div className="cart-item" key={item.id}>
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
            <div className="item-info">
              <div className="item-name">{item.productName}</div>
              <div className="item-quantity">數量：{item.quantity}</div>
            </div>
            <div className="item-price">
              NT$ {item.subtotal.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* 金額明細 */}
      <div className="price-details">
        <div className="price-row">
          <span className="price-label">商品小計</span>
          <span className="price-value">
            NT$ {cart.totalAmount.toLocaleString()}
          </span>
        </div>

        <div className="price-row">
          <span className="price-label">運費</span>
          <span className="price-value">
            NT$ {shippingFee.toLocaleString()}
          </span>
        </div>

        <div className="price-divider" />

        <div className="price-row total">
          <span className="price-label">總計</span>
          <span className="price-value">
            NT$ {totalAmount.toLocaleString()}
          </span>
        </div>
      </div>

      {/* 送出訂單按鈕 */}
      <button className="submit-btn" disabled={isSubmitting} onClick={onSubmit}>
        {isSubmitting ? '處理中...' : '確認送出訂單'}
      </button>

      <p className="submit-note">
        點擊「確認送出訂單」即表示您同意本網站的服務條款及隱私權政策
      </p>
    </div>
  );
}

export default styled(OrderSummary)`
  ${style}
`;
