'use client';

import Link from 'next/link';
import styled from 'styled-components';

import style from './style';

interface NotFoundContentProps {
  className?: string;
}

function NotFoundContent({ className }: NotFoundContentProps) {
  return (
    <div className={className}>
      <div className="content">
        <div className="error-code">404</div>
        <h1 className="title">唉呀！扭蛋機空了</h1>
        <p className="message">你要找的頁面不見了，可能被扭走了...</p>

        <div className="illustration">
          <div className="gachapon-machine">
            <div className="machine-top" />
            <div className="machine-dome">
              <div className="empty-text">空空如也</div>
            </div>
            <div className="machine-body">
              <div className="slot" />
              <div className="knob" />
            </div>
            <div className="machine-base" />
          </div>
        </div>

        <div className="actions">
          <Link className="primary-button" href="/">
            返回首頁
          </Link>
          <Link className="secondary-button" href="/shop">
            前往商城
          </Link>
        </div>

        <p className="hint">或許你想要...</p>
        <div className="quick-links">
          <Link className="quick-link" href="/shop">
            瀏覽商品
          </Link>
          <Link className="quick-link" href="/cart">
            查看購物車
          </Link>
          <Link className="quick-link" href="/about">
            關於我們
          </Link>
        </div>
      </div>
    </div>
  );
}

NotFoundContent.displayName = 'NotFoundContent';

export default styled(NotFoundContent)`
  ${style}
`;
