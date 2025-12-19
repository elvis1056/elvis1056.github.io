import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  width: 100%;

  .filter-container {
    background: ${theme.colors.neutral.white};
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    position: sticky;
    top: 2rem;
  }

  .filter-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${theme.colors.neutral.gray900};
    margin: 0 0 1.5rem 0;
    padding-bottom: 1rem;
    border-bottom: 2px solid ${theme.colors.neutral.gray200};
  }

  .category-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .category-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.875rem 1rem;
    border: none;
    background: transparent;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.9375rem;
    color: ${theme.colors.neutral.gray700};
    text-align: left;

    &:hover {
      background: ${theme.colors.neutral.gray100};
      color: ${theme.colors.primary.main};
    }

    &.active {
      background: ${theme.colors.primary.main};
      color: ${theme.colors.neutral.white};
      font-weight: 600;

      .category-icon {
        transform: scale(1.1);
      }
    }
  }

  .category-icon {
    font-size: 1.25rem;
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }

  .category-name {
    flex: 1;
  }

  .expand-icon {
    font-size: 0.75rem;
    color: ${theme.colors.neutral.gray500};
    transition: transform 0.2s ease;
  }

  .loading-text {
    color: ${theme.colors.neutral.gray600};
    text-align: center;
    padding: 1rem;
  }

  /* 子分類列表 */
  .subcategory-list {
    list-style: none;
    padding: 0;
    margin: 0.5rem 0 0 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    .category-item {
      padding-left: 2.5rem;
      font-size: 0.875rem;
      background: ${theme.colors.neutral.gray50};

      &:hover {
        background: ${theme.colors.neutral.gray100};
      }

      &.active {
        background: ${theme.colors.primary.light};
        color: ${theme.colors.primary.main};
        font-weight: 500;
      }
    }

    .product-count {
      font-size: 0.75rem;
      color: ${theme.colors.neutral.gray500};
      margin-left: 0.5rem;
    }
  }

  /* Tablet & Mobile - 改為水平滾動 */
  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 100%;
    margin-bottom: 1.5rem;

    .filter-container {
      position: static;
      padding: 1rem;
      border-radius: 8px;
    }

    .filter-title {
      display: none;
    }

    .category-list {
      flex-direction: row;
      overflow-x: auto;
      gap: 0.75rem;
      padding-bottom: 0.5rem;
      scrollbar-width: thin;

      &::-webkit-scrollbar {
        height: 4px;
      }

      &::-webkit-scrollbar-track {
        background: ${theme.colors.neutral.gray100};
        border-radius: 4px;
      }

      &::-webkit-scrollbar-thumb {
        background: ${theme.colors.primary.main};
        border-radius: 4px;
      }
    }

    .category-item {
      flex-shrink: 0;
      padding: 0.625rem 1rem;
      font-size: 0.875rem;
      white-space: nowrap;
    }

    .category-icon {
      font-size: 1rem;
    }
  }
`;
