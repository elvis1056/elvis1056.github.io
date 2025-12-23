import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  padding-top: 64px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding-top: 56px;
  }

  /* ========== Navbar ========== */
  .navbar {
    background-color: ${theme.colors.background.default};
    border-bottom: 1px solid ${theme.colors.border.light};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: ${theme.zIndex.navbar};
    box-shadow: ${theme.shadows.md};
    transition:
      background-color 0.3s ease,
      box-shadow 0.3s ease;

    &.menu-open {
      background-color: ${theme.colors.primary[50]};
      box-shadow: none;
      z-index: ${theme.zIndex.mobileMenu};
    }

    /* Container */
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 64px;

      /* Logo */
      .logo-link {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        text-decoration: none;
        transition: opacity 0.2s;

        &:hover {
          opacity: 0.8;
        }

        .logo-text {
          font-size: ${theme.typography.fontSize['2xl']};
          font-weight: ${theme.typography.fontWeight.bold};
          color: ${theme.colors.primary.main};
          letter-spacing: 0.5px;
        }
      }

      /* Nav Right Section */
      .nav-right {
        display: flex;
        align-items: center;

        /* Nav Links */
        .nav-links {
          display: flex;
          gap: 1rem;
          list-style: none;
          margin: 0;
          padding: 0;

          .nav-link {
            display: block;
            text-decoration: none;
            color: ${theme.colors.secondary.main};
            font-weight: ${theme.typography.fontWeight.medium};
            font-size: ${theme.typography.fontSize.base};
            padding: 0.625rem 1.25rem;
            border-radius: 0.5rem;
            transition: all 0.2s ease;

            &:hover {
              color: ${theme.colors.primary.main};
              background-color: ${theme.colors.primary[50]};
            }

            &.active {
              color: ${theme.colors.primary.main};
              background-color: ${theme.colors.primary[100]};
              font-weight: ${theme.typography.fontWeight.semibold};
            }
          }
        }

        /* Auth Section */
        .auth-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;

          .user-name {
            font-size: ${theme.typography.fontSize.base};
            color: ${theme.colors.neutral.gray700};
            font-weight: ${theme.typography.fontWeight.medium};
          }

          .auth-link {
            text-decoration: none;
            color: ${theme.colors.secondary.main};
            font-weight: ${theme.typography.fontWeight.medium};
            font-size: ${theme.typography.fontSize.base};
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            transition: all 0.2s ease;

            &:hover {
              color: ${theme.colors.primary.main};
              background-color: ${theme.colors.primary[50]};
            }
          }

          .logout-btn {
            background: none;
            border: 1px solid ${theme.colors.border.main};
            color: ${theme.colors.neutral.gray700};
            font-weight: ${theme.typography.fontWeight.medium};
            font-size: ${theme.typography.fontSize.base};
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: all 0.2s ease;

            &:hover {
              border-color: ${theme.colors.error};
              color: ${theme.colors.error};
              background-color: #fee;
            }
          }
        }

        /* Clock */
        .nav-clock {
          display: flex;
          align-items: center;
        }
      }

      /* Mobile Menu Button */
      .mobile-menu-button {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;

        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 24px;

          span {
            display: block;
            height: 2px;
            width: 100%;
            background-color: ${theme.colors.primary.main};
            border-radius: 2px;
            transition: all 0.3s ease;
          }

          &.open {
            span:nth-child(1) {
              transform: translateY(6px) rotate(45deg);
            }

            span:nth-child(2) {
              opacity: 0;
            }

            span:nth-child(3) {
              transform: translateY(-6px) rotate(-45deg);
            }
          }
        }
      }
    }

    /* Mobile Menu Backdrop */
    .mobile-menu-backdrop {
      position: fixed;
      top: 64px;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: ${theme.zIndex.navbar};
      animation: fadeIn 0.3s ease;
    }

    /* Mobile Menu */
    .mobile-menu {
      position: fixed;
      top: 64px;
      left: 0;
      right: 0;
      background-color: ${theme.colors.background.default};
      border-top: 1px solid ${theme.colors.border.light};
      box-shadow: ${theme.shadows.lg};
      z-index: ${theme.zIndex.mobileMenu};
      max-height: calc(100vh - 64px);
      overflow-y: auto;

      /* Mobile Nav Links */
      .mobile-nav-links {
        list-style: none;
        margin: 0;
        padding: 1rem;

        .mobile-nav-link {
          display: block;
          text-decoration: none;
          color: ${theme.colors.secondary.main};
          font-weight: ${theme.typography.fontWeight.medium};
          font-size: ${theme.typography.fontSize.base};
          padding: 0.875rem 1rem;
          border-radius: 0.5rem;
          transition: all 0.2s ease;

          &:hover {
            color: ${theme.colors.primary.main};
            background-color: ${theme.colors.primary[50]};
          }

          &.active {
            color: ${theme.colors.primary.main};
            background-color: ${theme.colors.primary[100]};
            font-weight: ${theme.typography.fontWeight.semibold};
          }
        }
      }

      /* Mobile Auth Section */
      .mobile-auth-section {
        padding: 1rem;
        border-top: 1px solid ${theme.colors.border.light};
        display: flex;
        flex-direction: column;
        gap: 0.75rem;

        .mobile-user-info {
          padding: 0.5rem 1rem;

          .mobile-user-name {
            font-size: ${theme.typography.fontSize.base};
            color: ${theme.colors.neutral.gray700};
            font-weight: ${theme.typography.fontWeight.semibold};
          }
        }

        .mobile-auth-link {
          display: block;
          text-align: center;
          text-decoration: none;
          color: white;
          background: ${theme.colors.primary.main};
          font-weight: ${theme.typography.fontWeight.semibold};
          font-size: ${theme.typography.fontSize.base};
          padding: 0.875rem 1rem;
          border-radius: 0.5rem;
          transition: all 0.2s ease;

          &:hover {
            background: ${theme.colors.primary.dark};
          }
        }

        .mobile-logout-btn {
          width: 100%;
          background: none;
          border: 1px solid ${theme.colors.border.main};
          color: ${theme.colors.neutral.gray700};
          font-weight: ${theme.typography.fontWeight.medium};
          font-size: ${theme.typography.fontSize.base};
          padding: 0.875rem 1rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;

          &:hover {
            border-color: ${theme.colors.error};
            color: ${theme.colors.error};
            background-color: #fee;
          }
        }
      }
    }
  }

  /* ========== Animations ========== */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* ========== Media Queries ========== */
  @media (max-width: ${theme.breakpoints.tablet}) {
    .navbar .container {
      padding: 0 1.5rem;

      .nav-right {
        display: none;
      }

      .mobile-menu-button {
        display: block;
      }

      .logo-link .logo-text {
        font-size: ${theme.typography.fontSize.xl};
      }
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    .navbar {
      .container {
        padding: 0 1rem;
        height: 56px;

        .logo-link .logo-text {
          font-size: ${theme.typography.fontSize.lg};
        }
      }

      .mobile-menu-backdrop {
        top: 56px;
      }

      .mobile-menu {
        top: 56px;
        max-height: calc(100vh - 56px);

        .mobile-nav-links {
          padding: 0.75rem;

          .mobile-nav-link {
            padding: 0.75rem 0.875rem;
          }
        }
      }
    }
  }
`;
