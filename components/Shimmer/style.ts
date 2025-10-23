import { css } from 'styled-components';

const style = css`
  height: 100%;
  width: 100%;

  .shimmer-frame {
    background-color: #eee;
    height: 100%;
    width: 100%;

    .shimmer {
      height: 100%;
      width: 100%;
      -webkit-mask: linear-gradient(to left, #000 30%, #0005, #000 70%)
        right/350% 100%;
      mask: linear-gradient(to left, #000 30%, #0005, #000 70%) right/350% 100%;
      background-repeat: no-repeat;
      animation: shimmer 2.5s infinite;
      background-color: #dddddd;
      background-image: none;
    }
  }

  @keyframes shimmer {
    100% {
      -webkit-mask-position: left;
      mask-position: left;
    }
  }
`;

export default style;
