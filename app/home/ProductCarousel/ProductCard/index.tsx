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
  id: string;
  title: string;
  image: string;
  subtitle?: string;
  tags?: string[];
}

function ProductCard({
  className,
  id,
  title,
  image,
  subtitle: _subtitle,
  tags = [],
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link href={`/product/${id}`} className={className}>
      <div className="card-container">
        {/* 圖片區域 */}
        <div className="image-container">
          {!imageLoaded && (
            <div className="shimmer-wrapper">
              <Shimmer />
            </div>
          )}
          <Image
            src={assetPath(image)}
            alt={title}
            fill
            className="product-image"
            onLoad={() => setImageLoaded(true)}
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>

        {/* 內容區域 */}
        <div className="content-container">
          {/* {subtitle && <div className="subtitle">{subtitle}</div>} */}

          {/* <h3 className="title">{title}</h3> */}

          {tags.length > 0 && (
            <div className="tags-container">
              {tags.map((tag, index) => (
                <span key={index} className="tag">
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
