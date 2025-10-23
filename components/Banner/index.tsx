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
    src: assetPath('/images/resume/banner-1.png'),
    alt: 'Banner 1',
  },
  {
    id: 2,
    src: assetPath('/images/resume/banner-2.png'),
    alt: 'Banner 2',
  },
  {
    id: 3,
    src: assetPath('/images/resume/banner-3.png'),
    alt: 'Banner 3',
  },
  {
    id: 4,
    src: assetPath('/images/resume/banner-4.png'),
    alt: 'Banner 4',
  },
  {
    id: 5,
    src: assetPath('/images/resume/banner-5.png'),
    alt: 'Banner 5',
  },
  {
    id: 6,
    src: assetPath('/images/resume/banner-6.png'),
    alt: 'Banner 6',
  },
  {
    id: 7,
    src: assetPath('/images/resume/banner-7.png'),
    alt: 'Banner 7',
  },
  // {
  //   id: 8,
  //   src: assetPath('/images/resume/banner-8.png'),
  //   alt: 'Banner 8',
  // },
  // {
  //   id: 9,
  //   src: assetPath('/images/resume/banner-9.png'),
  //   alt: 'Banner 9',
  // },
  // {
  //   id: 10,
  //   src: assetPath('/images/resume/banner-10.png'),
  //   alt: 'Banner 10',
  // },
  // {
  //   id: 11,
  //   src: assetPath('/images/resume/banner-11.png'),
  //   alt: 'Banner 11',
  // },
];

function Banner({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="banner-container">
        <Swiper
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="banner-swiper"
          loop={true}
          modules={[Autoplay, Pagination]}
          pagination={{
            clickable: true,
          }}
          slidesPerView={1}
          spaceBetween={0}
        >
          {bannerImages.map((image) => (
            <SwiperSlide key={image.id}>
              <div className="banner-slide">
                <Image
                  alt={image.alt}
                  fill
                  priority={image.id === 1}
                  src={image.src}
                  style={{ objectFit: 'contain' }}
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
