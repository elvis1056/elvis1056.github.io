import styled from 'styled-components';

import { theme } from '@/constants/theme';

interface DrawerWrapperContainerProps {
  height?: number;
  heightAuto?: boolean;
  ratioHeight?: string;
  isOpen: boolean;
}

const DrawerWrapper = styled.div<DrawerWrapperContainerProps>`
  .modal {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: ${({ height, heightAuto, ratioHeight }) =>
      heightAuto ? 'auto' : ratioHeight ? ratioHeight : `${height}px`};
    background: ${theme.colors.neutral.white};
    border-radius: 16px 16px 0 0;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
    z-index: ${theme.zIndex.modal};
    animation: ${({ isOpen }) => `${isOpen ? 'open' : 'close'} 0.25s ease-out`};
  }

  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: ${theme.zIndex.modalBackdrop};
  }

  @-webkit-keyframes open {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
  @keyframes open {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
  @-webkit-keyframes close {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  }
  @keyframes close {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  }
`;

export default DrawerWrapper;
