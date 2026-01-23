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

  .category-item-wrapper {
    display: flex;
    align-items: center;
  }

  .category-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
    min-width: 0;
    padding: 0.875rem 1rem;
    border: none;
    background: transparent;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    color: ${theme.colors.neutral.gray700};
    text-align: left;

    &:hover {
      background: ${theme.colors.neutral.gray100};
    }

    &.active {
      background: ${theme.colors.primary.main};
      color: ${theme.colors.neutral.white};

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
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .expand-wrapper {
    position: relative;
    width: 16px;
    height: 16px;
  }

  .expand-icon {
    width: 16px;
    height: 16px;
    transform: rotate(0deg);
    transition: transform 0.2s ease;
    flex-shrink: 0;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    &.expanded {
      transform: rotate(90deg);
    }
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
    padding-left: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    .category-item {
      width: 100%;
      padding-left: 2.5rem;
      font-size: 0.875rem;
      background: ${theme.colors.neutral.gray50};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

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
`;
