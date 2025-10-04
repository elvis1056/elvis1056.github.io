'use client';

import Image from 'next/image';

import { LogoWrapper } from './style';

export function Logo() {
  return (
    <LogoWrapper>
      <div className="logo-wrapper">
        <div className="desktop-logo">
          <Image src="/logo.svg" alt="5dpapa Logo" width={58} height={40} />
        </div>
        <div className="mobile-logo">
          <Image
            src="/logo-mobile.svg"
            alt="5dpapa Logo"
            width={40}
            height={28}
          />
        </div>
      </div>
    </LogoWrapper>
  );
}
