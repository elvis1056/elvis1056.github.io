import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  color: ${theme.colors.secondary.main};
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background-color: ${theme.colors.neutral.gray100};
    color: ${theme.colors.primary.main};
  }

  /* 購物車圖示容器 */
  .cart-icon-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 購物車圖示 */
  .cart-icon {
    width: 24px;
    height: 24px;
  }

  /* 商品數量 Badge */
  .cart-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: ${theme.colors.primary.main};
    color: ${theme.colors.neutral.white};
    font-size: 0.75rem;
    font-weight: 600;
    min-width: 20px;
    height: 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    animation: badge-pop 0.3s ease;
  }

  @keyframes badge-pop {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }

  /* 購物車文字 */
  .cart-text {
    font-weight: 500;
    white-space: nowrap;
  }

  /* Tablet - 隱藏文字，只顯示圖示 */
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0.5rem;

    .cart-text {
      display: none;
    }
  }

  /* Mobile - 更小的 padding */
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0.375rem;

    .cart-icon {
      width: 22px;
      height: 22px;
    }

    .cart-badge {
      font-size: 0.625rem;
      min-width: 18px;
      height: 18px;
      top: -6px;
      right: -6px;
    }
  }
`;
