'use client';

import Image from 'next/image';
import styled from 'styled-components';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { assetPath } from '@/lib/utils/asset-path';

import style from './style';

const bannerImages = [
  {
    id: 1,
    src: assetPath('/images/banner-1.svg'),
    alt: 'Banner 1',
  },
  {
    id: 2,
    src: assetPath('/images/banner-2.svg'),
    alt: 'Banner 2',
  },
  {
    id: 3,
    src: assetPath('/images/banner-3.svg'),
    alt: 'Banner 3',
  },
  {
    id: 4,
    src: assetPath('/images/banner-4.svg'),
    alt: 'Banner 4',
  },
  {
    id: 5,
    src: assetPath('/images/banner-5.svg'),
    alt: 'Banner 5',
  },
];

function Banner({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="banner-container">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          className="banner-swiper"
        >
          {bannerImages.map((image) => (
            <SwiperSlide key={image.id}>
              <div className="banner-slide">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={image.id === 1}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default styled(Banner)`
  ${style}
`;
