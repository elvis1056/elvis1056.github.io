'use client';

import Link from 'next/link';
import styled from 'styled-components';

import type { Tag } from '@/types';

import style from './style';

interface TagBadgeProps {
  className?: string;
  tag: Tag;
  size?: 'sm' | 'md';
  clickable?: boolean;
}

/**
 * 標籤徽章元件
 * 極簡風格，用於顯示文章標籤
 */
function TagBadge({ className, tag, clickable = true }: TagBadgeProps) {
  const badge = <span className={className}>{tag.name}</span>;

  if (clickable) {
    return (
      <Link className="tag-link" href={`/blog/tags/${tag.slug}`}>
        {badge}
      </Link>
    );
  }

  return badge;
}

export default styled(TagBadge)`
  ${style}
`;
