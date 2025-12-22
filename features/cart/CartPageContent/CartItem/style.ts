import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  display: grid;
  grid-template-columns: 100px 1fr auto auto auto;
  gap: 1rem;
  align-items: center;
  padding: 1.5rem;
  background: ${theme.colors.neutral.white};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &.updating {
    opacity: 0.6;
    pointer-events: none;
  }

  /* 商品圖片 */
  .item-image {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 8px;
    background: ${theme.colors.neutral.gray50};
    overflow: hidden;
  }

  .image-placeholder {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    opacity: 0.5;
  }

  /* 商品資訊 */
  .item-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .item-name {
    font-size: 1rem;
    font-weight: 600;
    color: ${theme.colors.neutral.gray900};
    margin: 0;
  }

  .item-description {
    font-size: 0.875rem;
    color: ${theme.colors.neutral.gray500};
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .item-price {
    font-size: 0.875rem;
    color: ${theme.colors.neutral.gray700};
    font-weight: 500;
  }

  .out-of-stock-badge {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    background: ${theme.colors.error};
    color: ${theme.colors.neutral.white};
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 4px;
    width: fit-content;
  }

  /* 數量控制 */
  .item-quantity {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .quantity-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.neutral.gray100};
    border: 1px solid ${theme.colors.neutral.gray300};
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background: ${theme.colors.neutral.gray200};
      border-color: ${theme.colors.neutral.gray400};
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  .quantity-value {
    min-width: 40px;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    color: ${theme.colors.neutral.gray900};
  }

  /* 小計 */
  .item-subtotal {
    font-size: 1.125rem;
    font-weight: 700;
    color: ${theme.colors.primary.main};
    min-width: 120px;
    text-align: right;
  }

  /* 刪除按鈕 */
  .remove-btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: ${theme.colors.neutral.gray400};
    font-size: 1.5rem;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background: ${theme.colors.error};
      color: ${theme.colors.neutral.white};
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  /* Tablet */
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 80px 1fr auto;
    gap: 1rem;
    padding: 1rem;

    .item-image {
      width: 80px;
      height: 80px;
    }

    .image-placeholder {
      font-size: 2.5rem;
    }

    .item-subtotal {
      grid-column: 2 / 3;
      text-align: left;
      font-size: 1rem;
    }

    .remove-btn {
      grid-column: 3 / 4;
      grid-row: 1 / 2;
    }

    .item-quantity {
      grid-column: 2 / 3;
    }
  }

  /* Mobile */
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 60px 1fr;
    gap: 0.75rem;
    padding: 0.75rem;

    .item-image {
      width: 60px;
      height: 60px;
    }

    .image-placeholder {
      font-size: 2rem;
    }

    .item-name {
      font-size: 0.875rem;
    }

    .item-description {
      font-size: 0.75rem;
      -webkit-line-clamp: 1;
    }

    .item-price {
      font-size: 0.8125rem;
    }

    .item-quantity {
      grid-column: 1 / 3;
      justify-content: flex-end;
    }

    .quantity-btn {
      width: 28px;
      height: 28px;
      font-size: 0.875rem;
    }

    .quantity-value {
      min-width: 36px;
      font-size: 0.875rem;
    }

    .item-subtotal {
      grid-column: 1 / 3;
      text-align: left;
      font-size: 1rem;
    }

    .remove-btn {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      width: 28px;
      height: 28px;
      font-size: 1.25rem;
    }
  }
`;
