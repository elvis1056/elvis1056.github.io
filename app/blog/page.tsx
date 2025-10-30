'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { fetchBlogPosts } from '@/lib/api/blog';
import type { BlogPost } from '@/types';

import BlogList from './BlogList';
import style from './style';

interface BlogPageProps {
  className?: string;
}

function BlogPage({ className }: BlogPageProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts()
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error('Failed to fetch blog posts:', error);
        setPosts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className={className}>
      <h1 className="page-title">部落格</h1>
      {loading ? (
        <p className="loading-text">載入中...</p>
      ) : (
        <BlogList posts={posts} />
      )}
    </main>
  );
}

export default styled(BlogPage)`
  ${style}
`;
