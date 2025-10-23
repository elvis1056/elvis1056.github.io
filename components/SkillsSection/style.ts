import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  width: 100%;
  padding: 4rem 2rem;
  background-color: ${theme.colors.background.paper};

  .skills-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .skills-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 3rem;
    color: ${theme.colors.primary.dark};
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
    background-color: ${theme.colors.background.default};
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid ${theme.colors.border.light};
    transition: all 0.3s ease;

    &:hover {
      border-color: ${theme.colors.primary.light};
      box-shadow: ${theme.shadows.md};
      transform: translateY(-2px);
    }
  }

  .category-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: ${theme.colors.primary.main};
    padding-bottom: 0.75rem;
    border-bottom: 3px solid ${theme.colors.primary.light};
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
    background-color: ${theme.colors.primary[50]};
    color: ${theme.colors.primary.main};
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
    color: ${theme.colors.text.secondary};
    line-height: 1.6;
    padding: 0.25rem 0;
    position: relative;
    padding-left: 1.25rem;

    &::before {
      content: '•';
      position: absolute;
      left: 0;
      color: ${theme.colors.secondary.main};
      font-weight: bold;
    }
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
