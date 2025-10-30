import { css } from 'styled-components';

import { theme } from '@/constants/theme';

const style = css`
  display: grid;
  gap: ${theme.spacing['2xl']};
  margin-top: ${theme.spacing['2xl']};

  /* 桌面：3 欄 */
  grid-template-columns: repeat(3, 1fr);

  /* 平板：2 欄 */
  @media (max-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.xl};
  }

  /* 手機：1 欄 */
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

export default style;
