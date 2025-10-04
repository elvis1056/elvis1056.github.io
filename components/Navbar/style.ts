import styled, { css } from 'styled-components';

import { theme } from '@/constants/theme';

const navStyles = css`
  .navbar {
    background-color: ${theme.colors.background.default};
    border-bottom: 1px solid ${theme.colors.border.light};
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: ${theme.shadows.md};
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64px;
  }

  .logo-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    transition: opacity 0.2s;
  }

  .logo-link:hover {
    opacity: 0.8;
  }

  .logo-text {
    font-size: ${theme.typography.fontSize['2xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.primary.main};
    letter-spacing: 0.5px;
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .nav-links {
    display: flex;
    gap: 1rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-clock {
    display: flex;
    align-items: center;
  }

  .nav-link {
    display: block;
    text-decoration: none;
    color: ${theme.colors.secondary.main};
    font-weight: ${theme.typography.fontWeight.medium};
    font-size: ${theme.typography.fontSize.base};
    padding: 0.625rem 1.25rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
  }

  .nav-link:hover {
    color: ${theme.colors.primary.main};
    background-color: ${theme.colors.primary[50]};
  }

  .nav-link.active {
    color: ${theme.colors.primary.main};
    background-color: ${theme.colors.primary[100]};
    font-weight: ${theme.typography.fontWeight.semibold};
  }

  .mobile-menu-button {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }

  .hamburger {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 24px;
  }

  .hamburger span {
    display: block;
    height: 2px;
    background-color: ${theme.colors.primary.main};
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  .mobile-menu {
    display: none;
    background-color: ${theme.colors.background.default};
    border-top: 1px solid ${theme.colors.border.light};
    box-shadow: ${theme.shadows.lg};
  }

  .mobile-nav-links {
    list-style: none;
    margin: 0;
    padding: 1rem;
  }

  .mobile-nav-link {
    display: block;
    text-decoration: none;
    color: ${theme.colors.secondary.main};
    font-weight: ${theme.typography.fontWeight.medium};
    font-size: ${theme.typography.fontSize.base};
    padding: 0.875rem 1rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
  }

  .mobile-nav-link:hover {
    color: ${theme.colors.primary.main};
    background-color: ${theme.colors.primary[50]};
  }

  .mobile-nav-link.active {
    color: ${theme.colors.primary.main};
    background-color: ${theme.colors.primary[100]};
    font-weight: ${theme.typography.fontWeight.semibold};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    .container {
      padding: 0 1.5rem;
    }

    .nav-right {
      display: none;
    }

    .mobile-menu-button {
      display: block;
    }

    .mobile-menu {
      display: block;
    }

    .logo-text {
      font-size: ${theme.typography.fontSize.xl};
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    .container {
      padding: 0 1rem;
      height: 56px;
    }

    .logo-text {
      font-size: ${theme.typography.fontSize.lg};
    }

    .mobile-nav-links {
      padding: 0.75rem;
    }

    .mobile-nav-link {
      padding: 0.75rem 0.875rem;
      font-size: 0.9375rem;
    }
  }
`;

export const NavWrapper = styled.nav`
  ${navStyles}
`;
