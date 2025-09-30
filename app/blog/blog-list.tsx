'use client';

import { useState, useEffect } from 'react';

import type { BlogPost } from '@/types';

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  const [mounted, setMounted] = useState(false);

  // 確保只在 Client 端執行
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{ marginTop: '2rem' }}>
      {posts.map((post) => (
        <article
          key={post.id}
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '2rem',
            marginBottom: '2rem',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '300px',
              backgroundColor: '#f0f0f0',
              borderRadius: '4px',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#999' }}>封面圖片</span>
          </div>

          <h2 style={{ marginBottom: '0.5rem' }}>{post.title}</h2>

          <div
            style={{
              color: '#666',
              fontSize: '0.9rem',
              marginBottom: '1rem',
            }}
          >
            <span>作者：{post.author}</span>
            <span style={{ margin: '0 1rem' }}>|</span>
            <span>
              {mounted
                ? new Date(post.createdAt).toLocaleDateString('zh-TW')
                : post.createdAt.split('T')[0]}
            </span>
          </div>

          <p style={{ color: '#555', lineHeight: 1.6 }}>{post.excerpt}</p>

          <button
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1.5rem',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            閱讀更多
          </button>
        </article>
      ))}
    </div>
  );
}
