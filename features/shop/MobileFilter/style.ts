import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  width: 100%;

  /* 第一層：水平滾動分類 */
  .category-scroll {
    display: flex;
    gap: 0.75rem;
    overflow-x: auto;
    padding: 1rem;
    background: ${theme.colors.neutral.white};
    border-radius: 8px;
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

  .category-chip {
    flex-shrink: 0;
    padding: 0.625rem 1rem;
    border: none;
    border-radius: 20px;
    background: ${theme.colors.neutral.gray100};
    color: ${theme.colors.neutral.gray700};
    font-size: 0.875rem;
    font-weight: 500;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: ${theme.colors.neutral.gray200};
    }

    &.active {
      background: ${theme.colors.primary.main};
      color: ${theme.colors.neutral.white};
    }
  }

  /* Drawer 內容 */
  .drawer-content {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: ${theme.colors.neutral.white};
    border-radius: 8px;
  }

  .drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid ${theme.colors.neutral.gray200};
    flex-shrink: 0;
  }

  .drawer-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: ${theme.colors.neutral.gray900};
    margin: 0;
  }

  .close-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: ${theme.colors.neutral.gray100};
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.25rem;
    color: ${theme.colors.neutral.gray700};
    transition: all 0.2s ease;

    &:hover {
      background: ${theme.colors.neutral.gray200};
    }
  }

  .drawer-body {
    flex: 1;
    overflow-y: auto;
    padding: 1rem 0;
  }

  .subcategory-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .subcategory-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.875rem 1.5rem;
    border: none;
    background: transparent;
    cursor: pointer;
    transition: all 0.2s ease;
    color: ${theme.colors.neutral.gray700};
    text-align: left;
    font-size: 1rem;

    &:hover {
      background: ${theme.colors.neutral.gray100};
    }

    &.active {
      background: ${theme.colors.primary.light};
      color: ${theme.colors.primary.main};
      font-weight: 500;
    }
  }

  .subcategory-name {
    flex: 1;
  }

  .product-count {
    font-size: 0.75rem;
    color: ${theme.colors.neutral.gray500};
    margin-left: 0.5rem;
  }

  .drawer-footer {
    display: flex;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    border-top: 1px solid ${theme.colors.neutral.gray200};
    flex-shrink: 0;
  }

  .clear-btn,
  .apply-btn {
    flex: 1;
    padding: 0.875rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .clear-btn {
    background: ${theme.colors.neutral.gray100};
    color: ${theme.colors.neutral.gray700};

    &:hover {
      background: ${theme.colors.neutral.gray200};
    }
  }

  .apply-btn {
    background: ${theme.colors.primary.main};
    color: ${theme.colors.neutral.white};

    &:hover {
      background: ${theme.colors.primary.dark};
    }
  }
`;
