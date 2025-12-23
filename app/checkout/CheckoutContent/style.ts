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

  .page-title {
    font-size: 2rem;
    font-weight: 700;
    color: ${theme.colors.neutral.gray900};
    margin: 0 0 2rem 0;
  }

  /* 結帳佈局 */
  .checkout-layout {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 2rem;
    align-items: start;
  }

  .checkout-forms {
    display: flex;
    flex-direction: column;
  }

  /* 空狀態 */
  .empty-state {
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

  .empty-btn {
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

  /* Tablet */
  @media (max-width: ${theme.breakpoints.tablet}) {
    .checkout-layout {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .page-title {
      font-size: 1.5rem;
    }
  }

  /* Mobile */
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem 0;

    .container {
      padding: 0 0.75rem;
    }

    .page-title {
      font-size: 1.25rem;
      margin-bottom: 1.5rem;
    }

    .checkout-layout {
      gap: 1rem;
    }

    .empty-icon {
      font-size: 4rem;
    }

    .empty-title {
      font-size: 1.25rem;
    }
  }
`;
