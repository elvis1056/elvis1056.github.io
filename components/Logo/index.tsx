'use client';

import Image from 'next/image';

import { assetPath } from '@/lib/utils/asset-path';

import { LogoWrapper } from './style';

export function Logo() {
  return (
    <LogoWrapper>
      <div className="logo-wrapper">
        <div className="desktop-logo">
          <Image
            alt="5dpapa Logo"
            height={40}
            src={assetPath('/logo.svg')}
            width={58}
          />
        </div>
        <div className="mobile-logo">
          <Image
            alt="5dpapa Logo"
            height={28}
            src={assetPath('/logo-mobile.svg')}
            width={40}
          />
        </div>
      </div>
    </LogoWrapper>
  );
}
