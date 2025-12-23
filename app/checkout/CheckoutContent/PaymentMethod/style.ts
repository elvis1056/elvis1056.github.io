import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  background: ${theme.colors.neutral.white};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-top: 1.5rem;

  .section-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${theme.colors.neutral.gray900};
    margin: 0 0 1.5rem 0;
    padding-bottom: 1rem;
    border-bottom: 2px solid ${theme.colors.neutral.gray200};
  }

  .payment-options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .payment-option {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.5rem;
    background: ${theme.colors.neutral.gray50};
    border: 2px solid ${theme.colors.neutral.gray200};
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: ${theme.colors.primary.main};
      background: ${theme.colors.primary[50]};
    }

    input[type='radio'] {
      width: 20px;
      height: 20px;
      margin-top: 0.25rem;
      flex-shrink: 0;
      cursor: pointer;
      accent-color: ${theme.colors.primary.main};
    }

    input[type='radio']:checked ~ .payment-content {
      .payment-title {
        color: ${theme.colors.primary.main};
        font-weight: 700;
      }
    }
  }

  .payment-content {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    flex: 1;
  }

  .payment-icon {
    font-size: 2rem;
    line-height: 1;
  }

  .payment-info {
    flex: 1;
  }

  .payment-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: ${theme.colors.neutral.gray900};
    margin-bottom: 0.25rem;
    transition: all 0.2s ease;
  }

  .payment-description {
    font-size: 0.875rem;
    color: ${theme.colors.neutral.gray600};
    line-height: 1.5;
  }

  .payment-note {
    margin-top: 1.5rem;
    padding: 1rem;
    background: ${theme.colors.neutral.gray50};
    border-left: 4px solid ${theme.colors.primary.main};
    border-radius: 8px;

    p {
      margin: 0;
      color: ${theme.colors.neutral.gray700};
      line-height: 1.6;
    }
  }

  /* Tablet */
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 1.5rem;

    .section-title {
      font-size: 1.25rem;
    }

    .payment-option {
      padding: 1.25rem;
    }

    .payment-title {
      font-size: 1rem;
    }
  }

  /* Mobile */
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem;
    margin-top: 1rem;

    .section-title {
      font-size: 1.125rem;
      margin-bottom: 1rem;
    }

    .payment-option {
      padding: 1rem;
      gap: 0.75rem;
    }

    .payment-content {
      gap: 0.75rem;
    }

    .payment-icon {
      font-size: 1.5rem;
    }

    .payment-description {
      font-size: 0.8125rem;
    }

    .payment-note {
      padding: 0.875rem;
      margin-top: 1rem;

      p {
        font-size: 0.875rem;
      }
    }
  }
`;
