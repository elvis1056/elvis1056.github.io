import { css } from 'styled-components';

import { theme } from '@/constants/theme';

const pageStyle = css`
  padding: ${theme.spacing['2xl']};
  max-width: 1400px;
  margin: 0 auto;

  .blog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing.xl};
    flex-wrap: wrap;
    gap: ${theme.spacing.md};
  }

  .page-title {
    font-size: ${theme.typography.fontSize['3xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.text.primary};
    margin: 0;
  }

  .loading-text {
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.text.secondary};
    text-align: center;
    padding: ${theme.spacing['2xl']};
    margin: 0;
  }

  .sort-controls {
    min-width: 240px;
  }

  .select-wrapper {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 100%;
    height: 56px;
    cursor: pointer;
  }

  .select-input {
    width: 100%;
    height: 100%;
    padding: 16px 52px 16px 16px;
    border: 1px solid rgba(0, 0, 0, 0.38);
    border-radius: 4px;
    background-color: transparent;
    color: ${theme.colors.text.primary};
    font-family: inherit;
    font-size: 16px;
    line-height: 1.5;
    font-weight: 400;
    letter-spacing: 0.009375em;
    cursor: pointer;
    appearance: none;
    outline: none;
    transition: border-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1;
  }

  .select-input:hover {
    border-color: rgba(0, 0, 0, 0.87);
  }

  .select-input:focus {
    outline: 2px solid ${theme.colors.primary.main};
    border-color: transparent;
  }

  .select-label {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    padding: 0;
    background-color: transparent;
    color: rgba(0, 0, 0, 0.6);
    font-size: 16px;
    line-height: 1;
    font-weight: 400;
    letter-spacing: 0.009375em;
    pointer-events: none;
    transform-origin: left top;
    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 2;
  }

  .select-input[data-empty='true']:not(:focus) ~ .select-label {
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
    font-size: 16px;
    padding: 0;
    background-color: transparent;
    color: rgba(0, 0, 0, 0.6);
  }

  .select-input[data-empty='false'] ~ .select-label {
    top: -8px;
    left: 12px;
    transform: translateY(0) scale(0.75);
    font-size: 12px;
    padding: 0 4px;
    background-color: #f5e6d3;
  }

  .select-input:focus ~ .select-label {
    color: ${theme.colors.primary.main};
    top: -8px;
    left: 12px;
    transform: translateY(0) scale(0.75);
    font-size: 12px;
    padding: 0 4px;
    background-color: #f5e6d3;
  }

  .dropdown-icon {
    position: absolute;
    right: 12px;
    top: 16px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 2;
  }

  .select-input:focus ~ .dropdown-icon {
    transform: rotate(180deg);
  }

  .dropdown-svg {
    fill: rgba(0, 0, 0, 0.54);
    transition: fill 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .select-input:focus ~ .dropdown-icon .dropdown-svg {
    fill: ${theme.colors.primary.main};
  }

  .select-input option {
    background-color: #ffffff;
    color: ${theme.colors.text.primary};
    padding: 16px;
    font-size: 16px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.lg};

    .blog-header {
      flex-direction: column;
      align-items: flex-start;
      gap: ${theme.spacing.lg};
    }

    .page-title {
      font-size: ${theme.typography.fontSize['2xl']};
    }

    .sort-controls {
      width: 100%;
      min-width: unset;
    }

    .select-wrapper {
      height: 52px;
    }

    .select-input {
      font-size: 15px;
      padding: 14px 48px 14px 14px;
    }

    .select-label {
      font-size: 15px;
      left: 14px;
    }

    .select-input[data-empty='true']:not(:focus) ~ .select-label {
      top: 50%;
      left: 14px;
      transform: translateY(-50%);
      font-size: 15px;
      padding: 0;
      background-color: transparent;
    }

    .select-input[data-empty='false'] ~ .select-label {
      font-size: 11px;
      left: 10px;
      top: -7px;
      transform: translateY(0) scale(0.75);
      padding: 0 4px;
      background-color: #f5e6d3;
    }

    .select-input:focus ~ .select-label {
      font-size: 11px;
      left: 10px;
      top: -7px;
      transform: translateY(0) scale(0.75);
      padding: 0 4px;
      background-color: #f5e6d3;
    }

    .dropdown-icon {
      right: 10px;
      top: 15px;
      width: 22px;
      height: 22px;
    }

    .select-input option {
      font-size: 15px;
      padding: 14px;
      background-color: #ffffff;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing.md};

    .blog-header {
      gap: ${theme.spacing.md};
    }

    .page-title {
      font-size: ${theme.typography.fontSize.xl};
    }

    .select-wrapper {
      height: 48px;
    }

    .select-input {
      font-size: 14px;
      padding: 12px 44px 12px 12px;
    }

    .select-label {
      font-size: 14px !important;
      left: 12px !important;
      top: 50% !important;
      transform: translateY(-50%) !important;
      padding: 0 !important;
      background-color: transparent !important;
    }

    .select-input[data-empty='false'] ~ .select-label {
      font-size: 10px !important;
      left: 8px !important;
      top: -7px !important;
      transform: translateY(0) scale(0.75) !important;
      padding: 0 4px !important;
      background-color: #f5e6d3 !important;
    }

    .select-input:focus ~ .select-label {
      font-size: 10px !important;
      left: 8px !important;
      top: -7px !important;
      transform: translateY(0) scale(0.75) !important;
      padding: 0 4px !important;
      background-color: #f5e6d3 !important;
    }

    .dropdown-icon {
      right: 8px;
      top: 14px;
      width: 20px;
      height: 20px;
    }

    .dropdown-icon svg {
      width: 8px;
      height: 4px;
    }

    .select-input option {
      font-size: 14px;
      padding: 12px;
      background-color: #ffffff;
    }
  }

  @media (max-width: 375px) {
    padding: ${theme.spacing.sm};

    .select-input {
      font-size: 13px;
    }
  }
`;

export default pageStyle;
