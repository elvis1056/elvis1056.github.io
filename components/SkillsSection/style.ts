import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  width: 100%;
  padding: 4rem 2rem;
  background-color: ${theme.colors.neutral.white};

  .skills-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .skills-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 3rem;
    color: ${theme.colors.neutral.gray900};
    text-align: left;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2.5rem;
  }

  .skill-category {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .category-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${theme.colors.neutral.gray900};
    padding-bottom: 0.75rem;
    border-bottom: 3px solid ${theme.colors.neutral.gray300};
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .category-icon {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    background-color: ${theme.colors.neutral.gray100};
    border-radius: 6px;
    padding: 0.25rem;
  }

  .skill-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .skill-item {
    font-size: 1rem;
    color: ${theme.colors.neutral.gray700};
    line-height: 1.6;
    padding: 0.25rem 0;
  }

  /* Tablet */
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 3rem 1.5rem;

    .skills-title {
      font-size: 1.75rem;
      margin-bottom: 2.5rem;
    }

    .skills-grid {
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 2rem;
    }

    .category-title {
      font-size: 1.25rem;
    }

    .skill-item {
      font-size: 0.95rem;
    }
  }

  /* Mobile */
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 2.5rem 1rem;

    .skills-title {
      font-size: 1.5rem;
      margin-bottom: 2rem;
    }

    .skills-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .category-title {
      font-size: 1.125rem;
      padding-bottom: 0.5rem;
      border-bottom-width: 2px;
      gap: 0.5rem;
    }

    .category-icon {
      width: 28px;
      height: 28px;
      font-size: 1.25rem;
    }

    .skill-item {
      font-size: 0.9rem;
    }
  }
`;
