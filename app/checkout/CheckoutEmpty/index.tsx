'use client';

import styled from 'styled-components';

import Empty from '@/components/Empty';

import style from './style';

interface CheckoutEmptyProps {
  className?: string;
  type: 'not-logged-in' | 'empty-cart';
}

function CheckoutEmpty({ className, type }: CheckoutEmptyProps) {
  const config = {
    'not-logged-in': {
      icon: '🔒',
      title: '請先登入',
      description: '登入後即可進行結帳',
      buttonText: '前往登入',
      buttonLink: '/login',
    },
    'empty-cart': {
      icon: '🛒',
      title: '購物車是空的',
      description: '快去挑選喜歡的商品吧！',
      buttonText: '前往商城',
      buttonLink: '/shop',
    },
  };

  const { icon, title, description, buttonText, buttonLink } = config[type];

  return (
    <div className={className}>
      <Empty
        buttonLink={buttonLink}
        buttonText={buttonText}
        description={description}
        icon={icon}
        title={title}
      />
    </div>
  );
}

export default styled(CheckoutEmpty)`
  ${style}
`;
