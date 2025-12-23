import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;

  .empty-icon {
    font-size: 6rem;
    margin-bottom: 1.5rem;
    opacity: 0.5;
  }

  .empty-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${theme.colors.neutral.gray900};
    margin: 0 0 0.5rem 0;
  }

  .empty-description {
    font-size: 1rem;
    color: ${theme.colors.neutral.gray500};
    margin: 0 0 2rem 0;
  }

  .empty-btn {
    display: inline-block;
    padding: 0.75rem 2rem;
    background: ${theme.colors.primary.main};
    color: ${theme.colors.neutral.white};
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.2s ease;

    &:hover {
      background: ${theme.colors.primary.dark};
      transform: translateY(-2px);
    }
  }

  /* Mobile */
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 3rem 1.5rem;

    .empty-icon {
      font-size: 4rem;
    }

    .empty-title {
      font-size: 1.25rem;
    }
  }
`;
