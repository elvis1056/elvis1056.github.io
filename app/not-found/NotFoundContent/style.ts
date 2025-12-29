import { css } from 'styled-components';

import { theme } from '@/constants/theme';

export default css`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;

  .content {
    text-align: center;
    max-width: 600px;
    width: 100%;
  }

  .error-code {
    font-size: 8rem;
    font-weight: 900;
    color: ${theme.colors.neutral.white};
    line-height: 1;
    margin-bottom: 1rem;
    text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  }

  .title {
    font-size: 2.5rem;
    font-weight: 700;
    color: ${theme.colors.neutral.white};
    margin-bottom: 1rem;
  }

  .message {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 3rem;
  }

  .illustration {
    margin: 3rem 0;
    display: flex;
    justify-content: center;
  }

  .gachapon-machine {
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .machine-top {
    width: 40px;
    height: 20px;
    background: #ff6b6b;
    border-radius: 8px 8px 0 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 100%;
      right: 0;
      width: 100%;
      height: 10%;
      background: #ff6b6b;
    }
  }

  .machine-dome {
    width: 180px;
    height: 180px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50% 50% 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 -4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 20px;
      left: 30px;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      filter: blur(10px);
    }
  }

  .empty-text {
    font-size: 1.25rem;
    color: ${theme.colors.neutral.gray400};
    font-weight: 600;
  }

  .machine-body {
    width: 200px;
    height: 100px;
    background: #ff6b6b;
    border-radius: 0 0 20px 20px;
    position: relative;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .slot {
    width: 80px;
    height: 60px;
    background: #fff;
    border-radius: 6px;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }

  .knob {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #ffd700 0%, #ffaa00 50%, #ff8800 100%);
    border-radius: 50%;
    border: 3px solid #ff9500;
    position: absolute;
    right: 5px;
    box-shadow:
      0 4px 8px rgba(0, 0, 0, 0.3),
      inset -2px -2px 4px rgba(0, 0, 0, 0.2),
      inset 2px 2px 4px rgba(255, 255, 255, 0.3);
    cursor: pointer;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover {
      transform: rotate(135deg);
      box-shadow:
        0 4px 8px rgba(0, 0, 0, 0),
        inset 0 0 0 rgba(0, 0, 0, 0),
        inset 0 0 0 rgba(255, 255, 255, 0);
    }

    &::before {
      content: '';
      position: absolute;
      top: 15%;
      left: 20%;
      width: 40%;
      height: 30%;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      filter: blur(4px);
    }

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      width: 60%;
      height: 8px;
      background: linear-gradient(90deg, #ff9500 0%, #ffb500 100%);
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
  }

  .machine-base {
    width: 220px;
    height: 30px;
    background: #444;
    border-radius: 10px;
    margin-top: -5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  .actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 3rem;
  }

  .primary-button,
  .secondary-button {
    padding: 1rem 2.5rem;
    font-size: 1.125rem;
    font-weight: 600;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    text-decoration: none;
    display: inline-block;
    border: none;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .primary-button {
    color: #667eea;
    background: ${theme.colors.neutral.white};
  }

  .secondary-button {
    background: transparent;
    color: ${theme.colors.neutral.white};
    border: 2px solid ${theme.colors.neutral.white};

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }

  .hint {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1rem;
  }

  .quick-links {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .quick-link {
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
    color: ${theme.colors.neutral.white};
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    display: inline-block;
    backdrop-filter: blur(10px);

    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.05);
    }
  }

  /* Mobile */
  @media (max-width: ${theme.breakpoints.mobile}) {
    .error-code {
      font-size: 5rem;
    }

    .title {
      font-size: 1.75rem;
    }

    .message {
      font-size: 1rem;
    }

    .actions {
      flex-direction: column;
    }
  }
`;
