import { css } from 'styled-components';

import { theme } from '@/constants/theme';

const pageStyle = css`
  padding: ${theme.spacing['2xl']};
  max-width: 1400px;
  margin: 0 auto;

  .page-title {
    font-size: ${theme.typography.fontSize['3xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.text.primary};
    margin: 0 0 ${theme.spacing.xl} 0;
  }

  .loading-text {
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.text.secondary};
    text-align: center;
    padding: ${theme.spacing['2xl']};
    margin: 0;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spacing.lg};

    .page-title {
      font-size: ${theme.typography.fontSize['2xl']};
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    .page-title {
      font-size: ${theme.typography.fontSize.xl};
    }
  }
`;

export default pageStyle;
