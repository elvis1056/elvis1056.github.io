'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import styled from 'styled-components';

import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';

import style from './style';

interface CartButtonProps {
  className?: string;
}

function CartButton({ className }: CartButtonProps) {
  const user = useAuthStore((state) => state.user);
  const { loadCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  // 只在已登入時載入購物車
  useEffect(() => {
    if (user) {
      loadCart();
    }
  }, [user, loadCart]);

  return (
    <Link className={className} href="/cart">
      <div className="cart-icon-wrapper">
        {/* 購物車圖示（SVG） */}
        <svg
          className="cart-icon"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
        >
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>

        {/* 商品數量 Badge */}
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </div>

      {/* 文字（Desktop 顯示） */}
      {/* <span className="cart-text">購物車</span> */}
    </Link>
  );
}

export default styled(CartButton)`
  ${style}
`;
