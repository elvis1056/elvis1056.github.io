import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  width: 100%;
  background-color: ${theme.colors.neutral.gray50};

  .banner-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .banner-swiper {
    width: 100%;
    height: 400px;
    overflow: hidden;
    padding-bottom: 50px;
  }

  .banner-slide {
    position: relative;
    width: 100%;
    height: 100%;
  }

  /* 用更具體的選擇器提高優先級 */
  .banner-swiper .swiper-pagination {
    bottom: 20px;
  }

  .banner-swiper .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    background-color: ${theme.colors.neutral.white};
    opacity: 0.5;
    transition: all 0.3s ease;
  }

  .banner-swiper .swiper-pagination-bullet-active {
    opacity: 1;
    background-color: ${theme.colors.primary.main};
    transform: scale(1.2);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    .banner-container {
      padding: 0 1.5rem;
    }

    .banner-swiper {
      height: 300px;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    .banner-container {
      padding: 0 1rem;
    }

    .banner-swiper {
      height: 200px;
    }

    .swiper-pagination-bullet {
      width: 8px;
      height: 8px;
    }
  }
`;
