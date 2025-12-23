import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  position: sticky;
  top: 100px;
  background: ${theme.colors.neutral.white};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  .summary-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${theme.colors.neutral.gray900};
    margin: 0 0 1.5rem 0;
    padding-bottom: 1rem;
    border-bottom: 2px solid ${theme.colors.neutral.gray200};
  }

  /* 商品列表 */
  .cart-items {
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 1.5rem;

    /* 自訂滾動條 */
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: ${theme.colors.neutral.gray100};
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: ${theme.colors.neutral.gray400};
      border-radius: 3px;

      &:hover {
        background: ${theme.colors.neutral.gray500};
      }
    }
  }

  .cart-item {
    display: flex;
    gap: 1rem;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid ${theme.colors.neutral.gray200};

    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
  }

  .item-image {
    position: relative;
    width: 60px;
    height: 60px;
    flex-shrink: 0;
    border-radius: 8px;
    background: ${theme.colors.neutral.gray50};
    overflow: hidden;
  }

  .image-placeholder {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
    opacity: 0.5;
  }

  .item-info {
    flex: 1;
    min-width: 0;
  }

  .item-name {
    font-weight: 600;
    color: ${theme.colors.neutral.gray900};
    margin-bottom: 0.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item-quantity {
    font-size: 0.875rem;
    color: ${theme.colors.neutral.gray600};
  }

  .item-price {
    font-weight: 600;
    color: ${theme.colors.neutral.gray900};
    white-space: nowrap;
  }

  /* 金額明細 */
  .price-details {
    padding: 1.5rem 0;
    border-top: 2px solid ${theme.colors.neutral.gray200};
    border-bottom: 2px solid ${theme.colors.neutral.gray200};
    margin-bottom: 1.5rem;
  }

  .price-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;

    &:last-child {
      margin-bottom: 0;
    }

    &.total {
      margin-top: 1rem;
      padding-top: 1rem;

      .price-label {
        font-size: 1.125rem;
        font-weight: 700;
      }

      .price-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: ${theme.colors.primary.main};
      }
    }
  }

  .price-label {
    color: ${theme.colors.neutral.gray600};
  }

  .price-value {
    font-size: 1rem;
    font-weight: 600;
    color: ${theme.colors.neutral.gray900};
  }

  .price-divider {
    height: 1px;
    background: ${theme.colors.neutral.gray200};
    margin: 1rem 0;
  }

  /* 送出訂單按鈕 */
  .submit-btn {
    width: 100%;
    padding: 1rem;
    background: ${theme.colors.primary.main};
    color: ${theme.colors.neutral.white};
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background: ${theme.colors.primary.dark};
      transform: translateY(-2px);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .submit-note {
    margin-top: 1rem;
    font-size: 0.75rem;
    color: ${theme.colors.neutral.gray500};
    text-align: center;
    line-height: 1.5;
  }

  /* Tablet */
  @media (max-width: ${theme.breakpoints.tablet}) {
    position: static;
    margin-top: 1.5rem;
    padding: 1.5rem;

    .summary-title {
      font-size: 1.25rem;
    }
  }

  /* Mobile */
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem;
    margin-top: 1rem;

    .summary-title {
      font-size: 1.125rem;
      margin-bottom: 1rem;
    }

    .cart-items {
      max-height: 250px;
    }

    .item-image {
      width: 50px;
      height: 50px;
    }

    .image-placeholder {
      font-size: 1.5rem;
    }

    .item-name {
      font-size: 0.875rem;
    }

    .item-quantity {
      font-size: 0.8125rem;
    }

    .item-price {
      font-size: 0.875rem;
    }

    .price-details {
      padding: 1rem 0;
      margin-bottom: 1rem;
    }

    .price-row {
      margin-bottom: 0.5rem;

      &.total .price-value {
        font-size: 1.25rem;
      }
    }
  }
`;
