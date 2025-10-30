import { css } from 'styled-components';

import { theme } from '@/constants/theme';

const style = css`
  display: block;

  .card-container {
    background: ${theme.colors.background.paper};
    border-radius: 12px;
    border: 1px solid ${theme.colors.border.light};
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
    background-color: ${theme.colors.neutral.gray100};

    .shimmer-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .cover-image {
      object-fit: cover;
      object-position: center;
    }
  }

  .content-container {
    padding: ${theme.spacing.lg};
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.md};
    flex: 1;
  }

  .title-link {
    text-decoration: none;
    color: inherit;

    &:hover .title {
      color: ${theme.colors.primary.main};
    }
  }

  .title {
    font-size: ${theme.typography.fontSize['2xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.text.primary};
    line-height: 1.3;
    margin: 0;
    transition: color 0.2s ease;

    /* 最多顯示 2 行 */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .excerpt {
    font-size: ${theme.typography.fontSize.base};
    color: ${theme.colors.text.secondary};
    line-height: 1.6;
    margin: 0;

    /* 最多顯示 3 行 */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .meta-container {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.secondary};

    .author {
      font-weight: ${theme.typography.fontWeight.medium};
    }

    .separator {
      color: ${theme.colors.neutral.gray300};
    }

    .date {
      color: ${theme.colors.text.disabled};
    }
  }

  .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: ${theme.spacing.sm};
  }

  .read-more-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacing.sm} ${theme.spacing.lg};
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.medium};
    color: ${theme.colors.primary.main};
    background-color: transparent;
    border: 1px solid ${theme.colors.primary.main};
    border-radius: 6px;
    text-decoration: none;
    transition: all 0.2s ease;
    margin-top: auto;
    width: fit-content;

    &:hover {
      background-color: ${theme.colors.primary.main};
      color: ${theme.colors.neutral.white};
    }
  }

  /* 平板以下 */
  @media (max-width: ${theme.breakpoints.tablet}) {
    .content-container {
      padding: ${theme.spacing.md};
      gap: ${theme.spacing.sm};
    }

    .title {
      font-size: ${theme.typography.fontSize.xl};
    }

    .excerpt {
      font-size: ${theme.typography.fontSize.sm};
    }
  }

  /* 手機 */
  @media (max-width: ${theme.breakpoints.mobile}) {
    .content-container {
      padding: ${theme.spacing.md};
    }

    .title {
      font-size: ${theme.typography.fontSize.lg};
    }
  }
`;

export default style;
