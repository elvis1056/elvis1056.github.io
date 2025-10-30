'use client';

import styled from 'styled-components';

import PostCard from '@/features/blog/components/PostCard';
import type { BlogPost } from '@/types';

import style from './style';

interface BlogListProps {
  className?: string;
  posts: BlogPost[];
}

/**
 * 部落格列表元件
 * 使用響應式 Grid 佈局：手機 1 欄、平板 2 欄、桌機 3 欄
 */
function BlogList({ className, posts }: BlogListProps) {
  return (
    <div className={className}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default styled(BlogList)`
  ${style}
`;
