'use client';

import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { fetchBlogPosts } from '@/lib/api/blog';
import type { BlogPost } from '@/types';

import BlogList from './BlogList';
import style from './style';

interface BlogPageProps {
  className?: string;
}

type SortOption =
  | 'default'
  | 'updatedAt-desc'
  | 'updatedAt-asc'
  | 'createdAt-desc'
  | 'createdAt-asc'
  | 'title-asc'
  | 'title-desc';

function BlogPage({ className }: BlogPageProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('default');

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

  // 根據選擇的排序方式排序文章
  const sortedPosts = useMemo(() => {
    const postsCopy = [...posts];

    switch (sortBy) {
      case 'default':
        // 預設排序：按照 ID 升序（文章新增的順序）
        return postsCopy.sort((a, b) => a.id - b.id);
      case 'updatedAt-desc':
        return postsCopy.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      case 'updatedAt-asc':
        return postsCopy.sort(
          (a, b) =>
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        );
      case 'createdAt-desc':
        return postsCopy.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'createdAt-asc':
        return postsCopy.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case 'title-asc':
        return postsCopy.sort((a, b) => a.title.localeCompare(b.title));
      case 'title-desc':
        return postsCopy.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return postsCopy;
    }
  }, [posts, sortBy]);

  return (
    <main className={className}>
      <div className="blog-header">
        <h1 className="page-title">部落格</h1>

        <div className="sort-controls">
          <div className="select-wrapper">
            <select
              className="select-input"
              data-empty={sortBy === 'default'}
              id="sort-select"
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              value={sortBy}
            >
              <option value="default"></option>
              <option value="updatedAt-desc">最後編輯（最新）</option>
              <option value="updatedAt-asc">最後編輯（最舊）</option>
              <option value="createdAt-desc">發布時間（最新）</option>
              <option value="createdAt-asc">發布時間（最舊）</option>
              <option value="title-asc">標題（A-Z）</option>
              <option value="title-desc">標題（Z-A）</option>
            </select>
            <label className="select-label" htmlFor="sort-select">
              排序方式
            </label>
            <div className="dropdown-icon">
              <svg
                className="dropdown-svg"
                height="5"
                viewBox="0 0 10 5"
                width="10"
              >
                <polygon
                  fillRule="evenodd"
                  points="0 0 10 0 5 5"
                  stroke="none"
                ></polygon>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="loading-text">載入中...</p>
      ) : (
        <BlogList posts={sortedPosts} />
      )}
    </main>
  );
}

export default styled(BlogPage)`
  ${style}
`;
