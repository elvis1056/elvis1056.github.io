import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  width: 100%;

  .product-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: ${theme.colors.neutral.gray500};
    font-size: 1.125rem;
  }

  /* Wide Desktop - 大螢幕維持 4 欄 */
  @media (min-width: ${theme.breakpoints.wide}) {
    .product-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  /* Desktop - 3 欄 */
  @media (max-width: 1200px) {
    .product-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 1.25rem;
    }
  }

  /* Tablet - 2 欄 */
  @media (max-width: ${theme.breakpoints.tablet}) {
    .product-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
  }

  /* Mobile - 2 欄 (較小) */
  @media (max-width: ${theme.breakpoints.mobile}) {
    .product-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }
  }
`;
