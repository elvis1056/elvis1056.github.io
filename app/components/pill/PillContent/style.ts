import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;

  .page-title {
    color: ${theme.colors.neutral.gray900};
    margin-bottom: 2rem;
  }

  .section {
    background: ${theme.colors.neutral.white};
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .section-header {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid ${theme.colors.neutral.gray200};
  }

  .section-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${theme.colors.neutral.gray900};
    margin: 0 0 0.5rem 0;
  }

  .section-subtitle {
    font-size: 0.875rem;
    color: ${theme.colors.neutral.gray600};
  }

  .rows {
    &.collapse {
      max-height: 210px;
      overflow: hidden;
    }
  }

  .row-wrapper {
    display: flex;
    align-items: flex-start;
    padding: 0.375rem 0;
    cursor: pointer;

    &:hover {
      background: ${theme.colors.neutral.gray50};
      border-radius: 8px;
    }
  }

  .checkbox {
    width: 20px;
    height: 20px;
    margin-right: 0.75rem;
    cursor: pointer;
    flex-shrink: 0;
  }

  .row {
    flex: 1;
    display: flex;
    flex-direction: column;

    &.selected {
      .item-title {
        color: ${theme.colors.primary.main};
        font-weight: 600;
      }

      .item-subtitle {
        color: ${theme.colors.primary.dark};
      }
    }
  }

  .item-title {
    font-size: 1rem;
    line-height: 1.375;
    color: ${theme.colors.neutral.gray900};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item-subtitle {
    font-size: 0.875rem;
    line-height: 1.25;
    color: ${theme.colors.neutral.gray600};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .show-more {
    cursor: pointer;
    text-align: center;
    padding-top: 0.75rem;
    margin-top: 0.75rem;
    border-top: 1px solid ${theme.colors.neutral.gray200};
    color: ${theme.colors.neutral.gray700};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;

    &:hover {
      color: ${theme.colors.primary.main};
    }

    .text {
      font-size: 0.875rem;
    }
  }

  .chevron-icon {
    display: inline-block;
    transform: rotate(90deg);
    transition: transform 0.2s ease;
    font-size: 1.25rem;

    &.expanded {
      transform: rotate(-90deg);
    }
  }

  .selected-info {
    margin-top: 1.5rem;
    padding: 1rem;
    background: ${theme.colors.neutral.gray100};
    border-radius: 8px;
    color: ${theme.colors.neutral.gray700};
  }
`;
