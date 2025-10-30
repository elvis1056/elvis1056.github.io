'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';

import Shimmer from '@/components/Shimmer';
import TagBadge from '@/components/TagBadge';
import type { BlogPost } from '@/types';

import style from './style';

interface PostCardProps {
  className?: string;
  post: BlogPost;
}

/**
 * 部落格文章卡片元件
 * 極簡風格的卡片佈局，用於文章列表展示
 */
function PostCard({ className, post }: PostCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // 格式化日期：Jan 30, 2025
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <article className={className}>
      <div className="card-container">
        {/* 封面圖片 */}
        <div className="image-container">
          {!imageLoaded && (
            <div className="shimmer-wrapper">
              <Shimmer />
            </div>
          )}
          <Image
            alt={post.title}
            className="cover-image"
            fill
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
            src={post.imageUrl}
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* 內容區域 */}
        <div className="content-container">
          {/* 標題（可點擊） */}
          <Link className="title-link" href={`/blog/${post.slug}`}>
            <h2 className="title">{post.title}</h2>
          </Link>

          {/* 摘要 */}
          <p className="excerpt">{post.excerpt}</p>

          {/* Meta 資訊 */}
          <div className="meta-container">
            <span className="author">{post.author}</span>
            <span className="separator">•</span>
            <span className="date">{formatDate(post.createdAt)}</span>
          </div>

          {/* 標籤 */}
          {post.tags && post.tags.length > 0 && (
            <div className="tags-container">
              {post.tags.map((tag) => (
                <TagBadge clickable={false} key={tag.id} size="sm" tag={tag} />
              ))}
            </div>
          )}

          {/* 閱讀更多按鈕 */}
          <Link className="read-more-btn" href={`/blog/${post.slug}`}>
            閱讀更多
          </Link>
        </div>
      </div>
    </article>
  );
}

export default styled(PostCard)`
  ${style}
`;
