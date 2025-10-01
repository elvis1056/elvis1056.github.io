import styled, { css } from 'styled-components';

const navStyles = css`
  .navbar {
    background-color: #fefefe;
    border-bottom: 1px solid #e8f4f8;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(160, 216, 241, 0.08);
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
    font-size: 1.5rem;
    font-weight: 700;
    color: #5fb8d6;
    letter-spacing: 0.5px;
  }

  .nav-links {
    display: flex;
    gap: 1rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav-link {
    display: block;
    text-decoration: none;
    color: #7a9ca5;
    font-weight: 500;
    font-size: 1rem;
    padding: 0.625rem 1.25rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
  }

  .nav-link:hover {
    color: #5fb8d6;
    background-color: #f0f9fc;
  }

  .nav-link.active {
    color: #5fb8d6;
    background-color: #e8f4f8;
    font-weight: 600;
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
    background-color: #5fb8d6;
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  .mobile-menu {
    display: none;
    background-color: #fefefe;
    border-top: 1px solid #e8f4f8;
    box-shadow: 0 4px 12px rgba(160, 216, 241, 0.1);
  }

  .mobile-nav-links {
    list-style: none;
    margin: 0;
    padding: 1rem;
  }

  .mobile-nav-link {
    display: block;
    text-decoration: none;
    color: #7a9ca5;
    font-weight: 500;
    font-size: 1rem;
    padding: 0.875rem 1rem;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
  }

  .mobile-nav-link:hover {
    color: #5fb8d6;
    background-color: #f0f9fc;
  }

  .mobile-nav-link.active {
    color: #5fb8d6;
    background-color: #e8f4f8;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 1.5rem;
    }

    .nav-links {
      display: none;
    }

    .mobile-menu-button {
      display: block;
    }

    .mobile-menu {
      display: block;
    }

    .logo-text {
      font-size: 1.25rem;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 0 1rem;
      height: 56px;
    }

    .logo-text {
      font-size: 1.125rem;
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