import { css } from 'styled-components';

import { theme } from '@/constants/theme';

const style = css`
  display: block;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;

  &:hover {
    text-decoration: none;
    color: inherit;

    .card-container {
      box-shadow: ${theme.shadows.lg};
      transform: translateY(-2px);
    }
  }

  .card-container {
    background: ${theme.colors.background.paper};
    border-radius: 12px;
    border: 1px solid ${theme.colors.primary[100]};
    overflow: hidden;
    transition: all 0.2s ease;
    box-shadow: ${theme.shadows.sm};
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .image-container {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    flex-shrink: 0;

    .shimmer-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .product-image {
      object-fit: cover;
      object-position: center;
    }
  }

  .content-container {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  }

  .subtitle {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.error};
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .title {
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.typography.fontWeight.normal};
    color: ${theme.colors.neutral.gray700};
    line-height: 1.4;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: calc(1.4em * 2);
  }

  .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-top: auto;
  }

  .tag {
    display: inline-block;
    padding: 2px 6px;
    font-size: ${theme.typography.fontSize.xs};
    background-color: ${theme.colors.primary.main};
    color: white;
    border-radius: 2px;
    line-height: 1.5;
    position: relative;
    overflow: hidden;

    /* Shimmer 效果 */
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.3) 50%,
        transparent 100%
      );
      transition: left 0.6s ease;
    }
  }

  /* 當 hover 卡片時，所有 tag 觸發 shimmer 動畫 */
  &:hover .tag::before {
    left: 100%;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    .content-container {
      padding: 10px;
      gap: 6px;
    }

    .title {
      font-size: ${theme.typography.fontSize.sm};
    }
  }
`;

export default style;
