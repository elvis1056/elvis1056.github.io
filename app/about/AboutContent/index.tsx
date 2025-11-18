'use client';

import styled from 'styled-components';

import { assetPath } from '@/lib/utils/asset-path';

import style from './style';

interface AboutContentProps {
  className?: string;
}

function AboutContent({ className }: AboutContentProps) {
  return (
    <main className={className}>
      <section className="container">
        <div
          className="bg"
          style={{
            backgroundImage: `url(${assetPath('/images/about/background.jpeg')})`,
          }}
        />
        <div className="section_wrapper">
          <div className="spacer" />
          <div className="main">
            <div className="left">
              <div className="description">
                <h1>Elvis Lin 大鈞</h1>
                <h4>A little bit about me</h4>
                <ul>
                  <li>
                    <ul className="description_text_block">
                      <li>
                        <b>NAME</b>
                      </li>
                      <li>{"I'M ELVIS LIN"}</li>
                    </ul>
                  </li>
                  <li>
                    <ul className="description_text_block">
                      <li>
                        <b>PHONE </b>
                      </li>
                      <li>+886 975 371 151</li>
                    </ul>
                  </li>
                  <li>
                    <ul className="description_text_block">
                      <li>
                        <b>E-MAIL </b>
                      </li>
                      <li>
                        <a href="mailto:john800116@gmail.com">
                          john800116@gmail.com
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div className="right">
              <div className="image-wrapper">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Elvis Lin"
                  src={assetPath('/images/about/background.jpeg')}
                />
              </div>
            </div>
          </div>
          <div className="spacer" />
        </div>
      </section>
    </main>
  );
}

export default styled(AboutContent)`
  ${style}
`;
