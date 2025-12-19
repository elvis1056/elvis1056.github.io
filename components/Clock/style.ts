import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  .clock-container {
    width: 50px;
    height: 50px;
    margin: 0 4px;
  }

  .clock-face {
    position: relative;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    border-radius: 50%;
    box-shadow:
      0 4px 12px rgba(95, 184, 214, 0.15),
      0 2px 4px rgba(0, 0, 0, 0.05),
      inset 0 2px 4px rgba(255, 255, 255, 0.5);
    border: 3px solid ${theme.colors.primary.light};

    &::before {
      content: '';
      position: absolute;
      top: 10px;
      left: 10px;
      right: 10px;
      bottom: 10px;
      border-radius: 50%;
      border: 1px solid ${theme.colors.primary.main};
      opacity: 0.2;
    }
  }

  .clock-center {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    background: ${theme.colors.primary.main};
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  .clock-hand {
    position: absolute;
    bottom: 50%;
    left: 50%;
    transform-origin: bottom center;
    border-radius: 4px;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .hour-hand {
    width: 4px;
    height: 35%;
    background: linear-gradient(
      to top,
      ${theme.colors.neutral.gray900},
      ${theme.colors.neutral.gray700}
    );
    margin-left: -2px;
  }

  .minute-hand {
    width: 3px;
    height: 45%;
    background: linear-gradient(
      to top,
      ${theme.colors.primary.dark},
      ${theme.colors.primary.main}
    );
    margin-left: -1.5px;
  }

  .second-hand {
    width: 1.5px;
    height: 48%;
    background: ${theme.colors.error};
    margin-left: -0.75px;
    transition: transform 0.05s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Tablet & Mobile */
  @media (max-width: ${theme.breakpoints.tablet}) {
    .clock-container {
      width: 40px;
      height: 40px;
    }

    .clock-face {
      border: 2px solid ${theme.colors.primary.light};
    }

    .clock-center {
      width: 6px;
      height: 6px;
    }

    .hour-hand {
      width: 3px;
      margin-left: -1.5px;
    }

    .minute-hand {
      width: 2px;
      margin-left: -1px;
    }

    .second-hand {
      width: 1px;
      margin-left: -0.5px;
    }
  }
`;
