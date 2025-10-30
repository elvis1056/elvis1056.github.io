import { css } from 'styled-components';

import { theme } from '@/constants/theme';

const style = css<{ tag: { color?: string }; size?: 'sm' | 'md' }>`
  display: inline-block;
  padding: ${({ size }) => (size === 'sm' ? '4px 10px' : '6px 14px')};
  font-size: ${({ size }) =>
    size === 'sm'
      ? theme.typography.fontSize.xs
      : theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${({ tag }) => tag.color || theme.colors.text.secondary};
  background-color: ${theme.colors.neutral.gray100};
  border-radius: 4px;
  border: 1px solid ${theme.colors.neutral.gray200};
  transition: all 0.2s ease;
  text-decoration: none;
  cursor: pointer;

  .tag-link & {
    &:hover {
      background-color: ${theme.colors.neutral.gray200};
      border-color: ${theme.colors.neutral.gray300};
      color: ${theme.colors.text.primary};
    }
  }
`;

export default style;
