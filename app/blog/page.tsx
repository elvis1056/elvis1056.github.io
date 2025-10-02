'use client';

import { useEffect, useState } from 'react';

import { fetchBlogPosts } from '@/lib/api/blog';
import type { BlogPost } from '@/types';

import { BlogList } from './blog-list';

export default function BlogPage() {
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
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>部落格</h1>
      {loading ? <p>載入中...</p> : <BlogList posts={posts} />}
    </main>
  );
}
