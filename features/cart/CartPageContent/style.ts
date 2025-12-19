import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  min-height: calc(100vh - 80px);
  padding: 2rem 0;
  background: ${theme.colors.background.default};

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  /* 載入中 */
  .loading {
    text-align: center;
    padding: 4rem 0;
    font-size: 1.125rem;
    color: ${theme.colors.neutral.gray500};
  }

  /* 空購物車 */
  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    text-align: center;
  }

  .empty-icon {
    font-size: 6rem;
    margin-bottom: 1.5rem;
    opacity: 0.5;
  }

  .empty-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${theme.colors.neutral.gray900};
    margin: 0 0 0.5rem 0;
  }

  .empty-description {
    font-size: 1rem;
    color: ${theme.colors.neutral.gray500};
    margin: 0 0 2rem 0;
  }

  .continue-shopping-btn {
    display: inline-block;
    padding: 0.75rem 2rem;
    background: ${theme.colors.primary.main};
    color: ${theme.colors.neutral.white};
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.2s ease;

    &:hover {
      background: ${theme.colors.primary.dark};
      transform: translateY(-2px);
    }
  }

  /* 購物車標題區 */
  .cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .cart-title {
    font-size: 2rem;
    font-weight: 700;
    color: ${theme.colors.neutral.gray900};
    margin: 0;
  }

  .clear-btn {
    padding: 0.5rem 1rem;
    background: transparent;
    color: ${theme.colors.error};
    border: 1px solid ${theme.colors.error};
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: ${theme.colors.error};
      color: ${theme.colors.neutral.white};
    }
  }

  /* 購物車佈局 */
  .cart-layout {
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 2rem;
    align-items: start;
  }

  /* 商品列表 */
  .cart-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  /* 結帳摘要 */
  .cart-summary {
    position: sticky;
    top: 100px;
    background: ${theme.colors.neutral.white};
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .summary-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${theme.colors.neutral.gray900};
    margin: 0 0 1.5rem 0;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    &.total {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 2px solid ${theme.colors.neutral.gray200};

      .summary-label {
        font-size: 1.125rem;
        font-weight: 700;
      }

      .summary-value {
        font-size: 1.5rem;
        font-weight: 700;
        color: ${theme.colors.primary.main};
      }
    }
  }

  .summary-label {
    font-size: 0.9375rem;
    color: ${theme.colors.neutral.gray600};
  }

  .summary-value {
    font-size: 0.9375rem;
    font-weight: 600;
    color: ${theme.colors.neutral.gray900};
  }

  .summary-divider {
    height: 1px;
    background: ${theme.colors.neutral.gray200};
    margin: 1rem 0;
  }

  .checkout-btn {
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
    margin-top: 1.5rem;

    &:hover {
      background: ${theme.colors.primary.dark};
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .continue-shopping-link {
    display: block;
    text-align: center;
    margin-top: 1rem;
    color: ${theme.colors.primary.main};
    text-decoration: none;
    font-size: 0.9375rem;
    font-weight: 500;
    transition: all 0.2s ease;

    &:hover {
      text-decoration: underline;
    }
  }

  /* Tablet */
  @media (max-width: ${theme.breakpoints.tablet}) {
    .cart-layout {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .cart-summary {
      position: static;
    }

    .cart-title {
      font-size: 1.5rem;
    }
  }

  /* Mobile */
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem 0;

    .container {
      padding: 0 0.75rem;
    }

    .cart-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .cart-title {
      font-size: 1.25rem;
    }

    .clear-btn {
      width: 100%;
    }

    .cart-summary {
      padding: 1rem;
    }

    .summary-title {
      font-size: 1.125rem;
    }

    .empty-icon {
      font-size: 4rem;
    }

    .empty-title {
      font-size: 1.25rem;
    }
  }
`;
