import { css } from 'styled-components';

export default css`
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
  }

  .bg:after {
    content: '';
    position: absolute;
    display: block;
    height: 100%;
    width: 100%;
    top: 0;
    opacity: 0.7;
    backdrop-filter: blur(2px);
  }

  .container {
    height: 100%;
    min-height: 650px;
    position: relative;

    .section_wrapper {
      height: 100%;
      width: 100%;
      position: absolute;
      min-height: 650px;
      display: flex;
      flex-direction: row;

      .spacer {
        flex-basis: 8.333%; /* basis-1/12 */
      }

      .main {
        flex-basis: 83.333%; /* basis-10/12 */
        min-height: 650px;
        display: flex;
        flex-direction: column;
        padding-top: 0;
        padding-bottom: 0;
        color: white;

        @media (min-width: 768px) {
          flex-direction: row;
          padding-top: 3rem;
          padding-bottom: 2rem;
        }

        .left {
          flex-basis: 41.666%; /* basis-5/12 */
          padding: 3rem;
          background: rgba(23, 20, 20, 0.58);
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-left: 2px solid #fff;
          border-top: 2px solid #fff;
          border-bottom: 2px solid #fff;

          h1 {
            font-size: 32px;
            margin: 0;
          }
          h4 {
            font-size: 16px;
            margin: 0;
          }
          h6 {
            font-size: 12px;
            margin: 0;
          }

          .description {
            display: flex;
            flex-direction: column;
            flex-grow: 1;

            ul {
              list-style: none;
              padding: 0;
              margin-top: 1rem;
              border-top: 1px solid #afafaf;
              padding-top: 1rem;

              & > li {
                margin-top: 0.5rem;
              }

              .description_text_block {
                display: flex;
                list-style: none;
                padding: 0;

                & > :nth-child(1) {
                  flex: 1;
                }
                & > :nth-child(2) {
                  flex: 3;
                }

                li {
                  margin: 0;
                }
              }
            }
          }
        }

        .right {
          flex-basis: 58.333%; /* basis-7/12 */
          padding: 1rem;
          background: rgba(23, 20, 20, 0.58);
          display: flex;
          justify-content: center;
          align-items: center;
          border-top: 2px solid #fff;
          border-bottom: 2px solid #fff;
          border-right: 2px solid #fff;

          @media (min-width: 768px) {
            padding: 3rem;
          }

          .image-wrapper {
            display: flex;
            flex-grow: 1;

            img {
              width: 100%;
              height: auto;
            }
          }
        }
      }
    }
  }

  .social_about_container {
    height: 580px;
    min-height: 580px;
    .social_about_wrapper {
      height: 100%;
      width: 100%;
      .head {
        height: 100%;
        width: 100%;
        background: url('/images/about/headshot.jpeg');
        background-size: cover;
      }
    }
  }

  .social_container {
    background-color: grey;
    // height: 200px;
    .social_icons {
      text-align: center;
      display: block;
      padding: 2rem 0;
      li {
        display: inline-block;
        // transform: rotate(45deg);
        // border: 2px solid #fff;
        margin-right: 3%;
        height: 32px;
        width: 32px;
        border: 2px solid #fff;
        box-shadow:
          0 8px 17px 0 rgb(0 0 0 / 20%),
          0 6px 20px 0 rgb(0 0 0 / 19%);
        transform: rotate(45deg);
        transition: 0.5s all;
        a {
          position: absolute;
          height: 100%;
          width: 100%;
          transform: translateX(-30%) translateY(20%) rotate(-45deg);
        }
        // a {
        // background: url(../../../public/assets/img/social-icons.png) no-repeat
        //   3px 3px;
        // text-decoration: none;
        // color: #1b242f;
        // display: block;
        // height: 32px;
        // width: 32px;
        // transition: 0.5s all;
        // transform: rotate(45deg);
        // border: 2px solid #fff;
        // box-shadow: 0 8px 17px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
        // }
        // a.fb {
        // content: "\f1a0";
        // background-position: 3px -30px;
        // }
        // a::before {
        //   content: "";
        //   border: 2px solid #fff;
        // }
        a:after {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 32px;
          width: 32px;
          // transform: rotate(-45deg);
          // border: 2px solid #fff;
          // box-shadow: 0 8px 17px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
        }
      }
      li:hover {
        border: 2px solid #00a78e;
        transform: rotate(-315deg);
      }
    }
  }

  @media (max-width: 768px) {
    min-height: 300px;

    .bg {
      min-height: 300px;
    }

    .container {
      min-height: 300px;

      .section_wrapper {
        min-height: 300px;

        .main {
          min-height: 300px;

          .left {
            border-bottom: 0;
            border: none;
            height: 100%;

            .description {
              text-align: center;
            }
          }

          .right {
            border-top: 0;
            border: none;

            .image-wrapper {
              display: flex;
              justify-content: center;

              img {
                width: 80%;
              }
            }
          }
        }
      }
    }
  }
`;
