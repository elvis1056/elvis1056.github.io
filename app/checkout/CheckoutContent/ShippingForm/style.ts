import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  background: ${theme.colors.neutral.white};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  .section-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${theme.colors.neutral.gray900};
    margin: 0 0 1.5rem 0;
    padding-bottom: 1rem;
    border-bottom: 2px solid ${theme.colors.neutral.gray200};
  }

  /* 表單群組 */
  .form-group {
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  /* 表單列（兩欄並排） */
  .form-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;

    &:has(.form-group:nth-child(3)) {
      grid-template-columns: 1fr 1fr 120px;
    }
  }

  /* 表單標籤 */
  .form-label {
    display: block;
    font-weight: 600;
    color: ${theme.colors.neutral.gray700};
    margin-bottom: 0.5rem;
  }

  .required {
    color: ${theme.colors.error};
  }

  /* 輸入框 */
  .form-input,
  .form-select,
  .form-textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    color: ${theme.colors.neutral.gray900};
    background: ${theme.colors.neutral.white};
    border: 1px solid ${theme.colors.neutral.gray300};
    border-radius: 8px;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary.main};
      box-shadow: 0 0 0 3px rgba(107, 127, 92, 0.1);
    }

    &::placeholder {
      color: ${theme.colors.neutral.gray400};
    }
  }

  .form-textarea {
    resize: vertical;
    min-height: 100px;
    font-family: inherit;
  }

  .form-select {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    padding-right: 2.5rem;
  }

  /* 配送時段選項 */
  .time-slot-options {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  /* Radio 選項 */
  .radio-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: ${theme.colors.neutral.gray50};
    border: 2px solid ${theme.colors.neutral.gray200};
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: ${theme.colors.primary.main};
      background: ${theme.colors.primary[50]};
    }

    input[type='radio'] {
      width: 20px;
      height: 20px;
      cursor: pointer;
      accent-color: ${theme.colors.primary.main};
    }

    input[type='radio']:checked + span {
      font-weight: 600;
      color: ${theme.colors.primary.main};
    }

    span {
      font-size: 1rem;
      color: ${theme.colors.neutral.gray700};
      transition: all 0.2s ease;
    }
  }

  /* Checkbox 選項 */
  .checkbox-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;

    input[type='checkbox'] {
      width: 18px;
      height: 18px;
      cursor: pointer;
      accent-color: ${theme.colors.primary.main};
    }

    span {
      color: ${theme.colors.neutral.gray700};
    }
  }

  /* Tablet */
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 1.5rem;

    .section-title {
      font-size: 1.25rem;
    }

    .form-row {
      grid-template-columns: 1fr;

      &:has(.form-group:nth-child(3)) {
        grid-template-columns: 1fr;
      }
    }
  }

  /* Mobile */
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 1rem;

    .section-title {
      font-size: 1.125rem;
      margin-bottom: 1rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-row {
      margin-bottom: 1rem;
    }

    .form-label {
      font-size: 0.875rem;
    }

    .form-input,
    .form-select,
    .form-textarea {
      padding: 0.625rem 0.875rem;
    }

    .radio-option {
      padding: 0.75rem;
    }
  }
`;
