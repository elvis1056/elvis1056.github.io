'use client';

import classnames from 'classnames';
import { useState } from 'react';
import styled from 'styled-components';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import Arrow from '@/components/Icons/Arrow';

import ProductCard from './ProductCard';
import style from './style';

interface Product {
  id: string;
  title: string;
  image: string;
  subtitle?: string;
  tags?: string[];
  href: string;
}

interface ProductCarouselProps {
  className?: string;
  title?: string;
  products: Product[];
}

const SLIDES_PER_VIEW_COUNT = 2.1;

function ProductCarousel({ className, title, products }: ProductCarouselProps) {
  const [process, setProcess] = useState(0);

  if (!products || !Array.isArray(products) || products.length === 0) {
    return <></>;
  }

  return (
    <div className={className}>
      <div className="carousel-container">
        {title && (
          <div className="carousel-header">
            <h2 className="carousel-title">{title}</h2>
          </div>
        )}

        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 12,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          className="product-swiper"
          loop={true}
          modules={[Navigation]}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          onProgress={(swiper, progress) => {
            setProcess(progress);
          }}
          slidesPerView={3}
          spaceBetween={24}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className={classnames(
            'swiper-button pointer left swiper-button-prev',
            {
              'swiper-button-hide': process <= 0,
            }
          )}
        >
          <Arrow color="#000" direction="left" size={32} />
        </div>
        <div
          className={classnames(
            'swiper-button pointer right swiper-button-next',
            {
              'swiper-button-hide':
                process >= 1 || products.length < SLIDES_PER_VIEW_COUNT,
            }
          )}
        >
          <Arrow color="#000" direction="right" size={32} />
        </div>
      </div>
    </div>
  );
}

export default styled(ProductCarousel)`
  ${style}
`;
