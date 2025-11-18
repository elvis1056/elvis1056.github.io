import { css } from 'styled-components';

import { theme } from '@/constants/theme';

const style = css`
  width: 100%;
  padding: 2rem 0;

  .carousel-container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
  }

  .carousel-header {
    margin-bottom: 1.5rem;
    position: relative;
  }

  .carousel-title {
    font-size: ${theme.typography.fontSize['3xl']};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.neutral.gray900};
    margin: 0;
    display: inline;
  }

  .product-swiper {
    padding: 4px 0;

    .swiper-wrapper {
      padding: 4px 0;
    }

    .swiper-slide {
      height: auto;
      box-sizing: border-box;
    }

    .swiper-button-prev,
    .swiper-button-next {
      display: none;
    }
  }

  .swiper-button {
    position: absolute;
    opacity: 0.2;
    z-index: 10;
    border-radius: 50%;
    background: ${theme.colors.primary.main};
    cursor: pointer;

    &.left {
      top: 50%;
      left: 12px;
    }

    &.right {
      top: 50%;
      right: 12px;
    }

    &:after {
      display: none;
    }

    &:hover {
      opacity: 0.4;
    }
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    .carousel-container {
      padding: 0 1.5rem;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1.5rem 0;

    .carousel-container {
      padding: 0 1rem;
    }

    .carousel-title {
      font-size: ${theme.typography.fontSize.xl};
    }
  }
`;

export default style;
