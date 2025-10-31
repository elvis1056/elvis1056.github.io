import { css } from 'styled-components';

import { theme } from '@/constants/theme';

const style = css`
  position: relative;

  .copy-button {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 6px 12px;
    font-size: ${theme.typography.fontSize.xs};
    font-weight: ${theme.typography.fontWeight.medium};
    color: ${theme.colors.neutral.gray400};
    background-color: rgba(30, 30, 30, 0.8);
    backdrop-filter: blur(4px);
    border: 1px solid ${theme.colors.neutral.gray700};
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    z-index: 10;
    opacity: 0;
    pointer-events: none;

    &:hover {
      color: ${theme.colors.neutral.gray300};
      border-color: ${theme.colors.neutral.gray600};
      background-color: rgba(42, 42, 42, 0.9);
    }

    &[data-copied='true'] {
      color: ${theme.colors.success};
      border-color: ${theme.colors.success};
      opacity: 1;
      pointer-events: auto;
    }
  }

  /* Hover 整個程式碼區塊時顯示按鈕 */
  &&:hover .copy-button {
    opacity: 1;
    pointer-events: auto;
  }

  /* 字體設定 */
  pre,
  code {
    font-family:
      'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'SF Mono', Monaco,
      'Inconsolata', 'Roboto Mono', 'Source Code Pro', Menlo, Consolas,
      'Courier New', monospace;
  }

  code {
    padding: 0;
    background-color: transparent;
  }

  /* 優化滾動條 */
  pre::-webkit-scrollbar {
    height: 8px;
  }

  pre::-webkit-scrollbar-track {
    background: #1e1e1e;
    border-radius: 4px;
  }

  pre::-webkit-scrollbar-thumb {
    background: #4a4a4a;
    border-radius: 4px;

    &:hover {
      background: #5a5a5a;
    }
  }
`;

export default style;
