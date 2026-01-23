import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  background: ${theme.colors.background.default};
  min-height: calc(100vh - 80px);
  padding: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
