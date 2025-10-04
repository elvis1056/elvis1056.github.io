import styled, { css } from 'styled-components';

import { theme } from '@/constants/theme';

const logoStyles = css`
  .logo-wrapper {
    position: relative;
    width: 58px;
    height: 40px;
  }

  .desktop-logo {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  }

  .mobile-logo {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    .logo-wrapper {
      width: 40px;
      height: 28px;
    }

    .desktop-logo {
      opacity: 0;
    }

    .mobile-logo {
      opacity: 1;
    }
  }
`;

export const LogoWrapper = styled.div`
  ${logoStyles}
`;
