import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  min-height: 100vh;
  background-color: ${theme.colors.neutral.gray100};

  .shop-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }

  .shop-header {
    margin-bottom: 3rem;
    text-align: center;
  }

  .shop-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: ${theme.colors.neutral.gray900};
  }

  .shop-subtitle {
    font-size: 1.125rem;
    color: ${theme.colors.neutral.gray600};
    max-width: 600px;
    margin: 0 auto;
  }

  .shop-layout {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;
  }

  .desktop-filter {
    /* DesktopFilter component handles its own styling */
  }

  .mobile-filter {
    display: none;
  }

  .products-area {
    /* ProductGrid component handles its own styling */
  }

  .loading-state {
    text-align: center;
    padding: 4rem;
  }

  .loading-text {
    font-size: 1.125rem;
    color: ${theme.colors.neutral.gray400};
  }

  /* Tablet & Mobile */
  @media (max-width: ${theme.breakpoints.tablet}) {
    .shop-container {
      padding: 1.5rem;
    }

    .shop-header {
      margin-bottom: 1.5rem;
    }

    .shop-title {
      font-size: 2rem;
    }

    .shop-subtitle {
      font-size: 1rem;
    }

    .shop-layout {
      display: block;
    }

    .desktop-filter {
      display: none;
    }

    .mobile-filter {
      display: block;
      margin-bottom: 1.5rem;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    .shop-container {
      padding: 1rem;
    }

    .shop-title {
      font-size: 1.75rem;
    }
  }
`;
