import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: ${theme.colors.background.default};

  .login-card {
    width: 100%;
    max-width: 420px;
    padding: 48px 32px;
    background: ${theme.colors.background.paper};
    border-radius: 16px;
    box-shadow: ${theme.shadows.lg};
  }

  .title {
    font-size: ${theme.typography.fontSize['3xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.primary.main};
    margin: 0 0 8px 0;
    text-align: center;
  }

  .subtitle {
    font-size: ${theme.typography.fontSize.base};
    color: ${theme.colors.neutral.gray500};
    margin: 0 0 32px 0;
    text-align: center;
  }

  .error-message {
    padding: 12px 16px;
    background: #fee;
    color: ${theme.colors.error};
    border-radius: 8px;
    margin-bottom: 24px;
    font-size: ${theme.typography.fontSize.sm};
  }

  form {
    margin-bottom: 24px;
  }

  .form-group {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 8px;
      font-size: ${theme.typography.fontSize.sm};
      font-weight: ${theme.typography.fontWeight.medium};
      color: ${theme.colors.neutral.gray700};
    }

    input {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid ${theme.colors.border.main};
      border-radius: 8px;
      font-size: ${theme.typography.fontSize.base};
      transition: all 0.2s;

      &:focus {
        outline: none;
        border-color: ${theme.colors.primary.main};
        box-shadow: 0 0 0 3px ${theme.colors.primary[50]};
      }

      &::placeholder {
        color: ${theme.colors.neutral.gray400};
      }
    }
  }

  .submit-btn {
    width: 100%;
    padding: 14px;
    background: ${theme.colors.primary.main};
    color: white;
    border: none;
    border-radius: 8px;
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.typography.fontWeight.semibold};
    cursor: pointer;
    transition: all 0.2s;

    &:hover:not(:disabled) {
      background: ${theme.colors.primary.dark};
      transform: translateY(-1px);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .divider {
    position: relative;
    text-align: center;
    margin: 24px 0;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: ${theme.colors.border.main};
    }

    span {
      position: relative;
      padding: 0 16px;
      background: ${theme.colors.background.paper};
      font-size: ${theme.typography.fontSize.sm};
      color: ${theme.colors.neutral.gray500};
    }
  }

  .oauth-buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
  }

  .oauth-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
    padding: 12px;
    border: 1px solid ${theme.colors.border.main};
    border-radius: 8px;
    background: white;
    font-size: ${theme.typography.fontSize.base};
    font-weight: ${theme.typography.fontWeight.medium};
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: ${theme.colors.background.hover};
      border-color: ${theme.colors.primary.main};
    }

    &.google {
      color: #1a73e8;
    }

    &.facebook {
      color: #1877f2;
    }
  }

  .oauth-icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: ${theme.typography.fontWeight.bold};
    font-size: ${theme.typography.fontSize.lg};
  }

  .footer-text {
    text-align: center;
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.neutral.gray600};
    margin: 0;

    .link {
      color: ${theme.colors.primary.main};
      font-weight: ${theme.typography.fontWeight.semibold};
      text-decoration: none;
      margin-left: 4px;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 16px;

    .login-card {
      padding: 32px 24px;
    }
  }
`;
