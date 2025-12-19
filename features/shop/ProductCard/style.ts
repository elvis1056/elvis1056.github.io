import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  background: ${theme.colors.neutral.white};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .card-image-wrapper {
    position: relative;
    width: 100%;
    padding-top: 100%;
    background: linear-gradient(135deg, #f5f7fa 0%, #e8f4f8 100%);
    overflow: hidden;
  }

  .card-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${theme.colors.neutral.white};
  }

  .image-placeholder {
    font-size: 4rem;
    opacity: 0.6;
  }

  .badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: ${theme.colors.primary.main};
    color: ${theme.colors.neutral.white};
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    z-index: 1;
  }

  .card-info {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .card-name {
    font-size: 1rem;
    font-weight: 600;
    color: ${theme.colors.neutral.gray900};
    margin: 0;
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .card-description {
    font-size: 0.8125rem;
    color: ${theme.colors.neutral.gray500};
    margin: 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.5rem;
    gap: 0.5rem;
  }

  .card-price {
    display: flex;
    align-items: baseline;
    gap: 0.25rem;
  }

  .price-label {
    font-size: 0.75rem;
    color: ${theme.colors.neutral.gray700};
    font-weight: 500;
  }

  .price-value {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${theme.colors.primary.main};
  }

  .add-to-cart-btn {
    flex-shrink: 0;
    background: ${theme.colors.primary.main};
    color: ${theme.colors.neutral.white};
    border: none;
    padding: 0.5rem 0.875rem;
    border-radius: 6px;
    font-size: 0.8125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover:not(:disabled) {
      background: ${theme.colors.primary.dark};
      transform: scale(1.05);
    }

    &:active:not(:disabled) {
      transform: scale(0.98);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }

    /* 已加入成功狀態 */
    &.added {
      background: ${theme.colors.success};
      animation: success-pulse 0.5s ease;
    }

    @keyframes success-pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }
  }

  /* Mobile */
  @media (max-width: ${theme.breakpoints.mobile}) {
    .card-info {
      padding: 0.75rem;
      gap: 0.375rem;
    }

    .card-name {
      font-size: 0.875rem;
    }

    .card-description {
      font-size: 0.75rem;
      -webkit-line-clamp: 1;
    }

    .card-footer {
      flex-direction: column;
      align-items: stretch;
      gap: 0.5rem;
    }

    .price-value {
      font-size: 1.125rem;
    }

    .add-to-cart-btn {
      width: 100%;
      padding: 0.5rem;
      font-size: 0.75rem;
    }

    .image-placeholder {
      font-size: 3rem;
    }
  }
`;
