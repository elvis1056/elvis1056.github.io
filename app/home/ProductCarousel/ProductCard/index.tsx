'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';

import Shimmer from '@/components/Shimmer';
import { assetPath } from '@/lib/utils/asset-path';

import style from './style';

interface ProductCardProps {
  className?: string;
  id?: string;
  title: string;
  image: string;
  subtitle?: string;
  tags?: string[];
  href: string;
}

function ProductCard({
  className,
  title,
  image,
  subtitle: _subtitle,
  tags = [],
  href,
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link className={className} href={href}>
      <div className="card-container">
        {/* 圖片區域 */}
        <div className="image-container">
          {!imageLoaded && (
            <div className="shimmer-wrapper">
              <Shimmer />
            </div>
          )}
          <Image
            alt={title}
            className="product-image"
            fill
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            src={assetPath(image)}
            style={{ objectFit: 'contain' }}
          />
        </div>

        {/* 內容區域 */}
        <div className="content-container">
          {/* {subtitle && <div className="subtitle">{subtitle}</div>} */}

          {/* <h3 className="title">{title}</h3> */}

          {tags.length > 0 && (
            <div className="tags-container">
              {tags.map((tag, index) => (
                <span className="tag" key={index}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default styled(ProductCard)`
  ${style}
`;
