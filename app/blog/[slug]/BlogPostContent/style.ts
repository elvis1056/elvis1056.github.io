import { css } from 'styled-components';

import { theme } from '@/constants/theme';

const style = css`
  display: block;
  width: 100%;

  /* 封面圖片容器 */
  .cover-image-container {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 32px;
    width: 100%;
    aspect-ratio: 21 / 9;
    overflow: hidden;
    background-color: ${theme.colors.neutral.gray100};
    margin-bottom: ${theme.spacing['2xl']};

    .shimmer-wrapper {
      position: absolute;
      inset: 0;
      z-index: 1;
    }

    .cover-image {
      position: absolute;
      inset: 0;
      transition: opacity 0.3s ease;
    }
  }

  /* 內容容器 */
  .content-wrapper {
    max-width: 800px;
    margin: 0 auto;
    padding: ${theme.spacing.xl} ${theme.spacing.xl} 0px;
  }

  /* 分類和系列資訊條 */
  .metadata-bar {
    display: flex;
    gap: ${theme.spacing.md};
    margin-bottom: ${theme.spacing.lg};
    flex-wrap: wrap;

    .category-badge,
    .series-badge {
      display: inline-flex;
      align-items: center;
      gap: ${theme.spacing.xs};
      padding: ${theme.spacing.xs} ${theme.spacing.md};
      font-size: ${theme.typography.fontSize.sm};
      color: ${theme.colors.text.secondary};
      background-color: ${theme.colors.neutral.gray100};
      border-radius: 6px;
    }
  }

  /* 文章標題 */
  .post-title {
    font-size: ${theme.typography.fontSize['3xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.text.primary};
    line-height: 1.2;
    margin: 0 0 ${theme.spacing.lg} 0;
  }

  /* Meta 資訊 */
  .meta-info {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.secondary};
    margin-bottom: ${theme.spacing.xl};

    .author {
      font-weight: ${theme.typography.fontWeight.medium};
    }

    .separator {
      color: ${theme.colors.neutral.gray400};
    }

    .date {
      color: ${theme.colors.text.secondary};
    }
  }

  /* 標籤容器 */
  .tags-container {
    display: flex;
    gap: ${theme.spacing.sm};
    flex-wrap: wrap;
    margin-bottom: ${theme.spacing['2xl']};
  }

  /* 文章內容 */
  .post-content {
    margin-bottom: ${theme.spacing['2xl']};

    /* 使用 GitHub Markdown CSS 原始樣式 */
    &.markdown-body {
      /* 只保留必要的覆寫 */
      background-color: transparent;
      box-sizing: border-box;
      min-width: 200px;
      max-width: 100%;
      padding: 0;
    }
  }

  /* 系列資訊卡片 */
  .series-info-box {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.lg};
    padding: ${theme.spacing.xl};
    background-color: ${theme.colors.neutral.gray50};
    border-radius: 12px;
    border: 1px solid ${theme.colors.border.light};

    .series-icon {
      font-size: 2.5rem;
      line-height: 1;
      flex-shrink: 0;
    }

    .series-details {
      flex: 1;

      .series-title {
        font-size: ${theme.typography.fontSize.lg};
        font-weight: ${theme.typography.fontWeight.semibold};
        color: ${theme.colors.text.primary};
        margin: 0 0 ${theme.spacing.xs} 0;
      }

      .series-progress {
        font-size: ${theme.typography.fontSize.sm};
        color: ${theme.colors.text.secondary};
        margin: 0;
      }
    }
  }

  /* 響應式設計 */
  @media (max-width: ${theme.breakpoints.tablet}) {
    .cover-image-container {
      aspect-ratio: 16 / 9;
      margin-bottom: ${theme.spacing.xl};
    }

    .content-wrapper {
      padding: ${theme.spacing.lg};
    }

    .post-title {
      font-size: ${theme.typography.fontSize['3xl']};
    }

    .post-content {
      font-size: ${theme.typography.fontSize.base};
    }

    .series-info-box {
      padding: ${theme.spacing.lg};
      gap: ${theme.spacing.md};
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    .cover-image-container {
      aspect-ratio: 4 / 3;
    }

    .content-wrapper {
      padding: ${theme.spacing.md};
    }

    .post-title {
      font-size: ${theme.typography.fontSize['2xl']};
    }
  }
`;

export default style;
