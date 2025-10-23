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
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={3}
          loop={true}
          onProgress={(swiper, progress) => {
            setProcess(progress);
          }}
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
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
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
          <Arrow direction="left" size={32} color="#000" />
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
          <Arrow direction="right" size={32} color="#000" />
        </div>
      </div>
    </div>
  );
}

export default styled(ProductCarousel)`
  ${style}
`;
