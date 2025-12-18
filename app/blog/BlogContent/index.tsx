'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { fetchBlogPosts } from '@/lib/api/blog';
import type { BlogPost } from '@/types';

import BlogList from './BlogList';
import style from './style';

interface BlogPageProps {
  className?: string;
}

// 排序選項常數（避免字串打錯）
const SORT_OPTIONS = {
  DEFAULT: 'default',
  UPDATED_DESC: 'updatedAt-desc',
  UPDATED_ASC: 'updatedAt-asc',
  CREATED_DESC: 'createdAt-desc',
  CREATED_ASC: 'createdAt-asc',
  TITLE_ASC: 'title-asc',
  TITLE_DESC: 'title-desc',
} as const;

type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];

function BlogPage({ className }: BlogPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // 從 URL 讀取排序參數（Single source of truth）
  const sortBy = useMemo(() => {
    const sortParam = searchParams.get('sort') as SortOption;
    return sortParam || SORT_OPTIONS.DEFAULT;
  }, [searchParams]);

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
      case SORT_OPTIONS.DEFAULT:
        // 預設排序：按照發布時間降序（最新到最舊）
        return postsCopy.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case SORT_OPTIONS.UPDATED_DESC:
        return postsCopy.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      case SORT_OPTIONS.UPDATED_ASC:
        return postsCopy.sort(
          (a, b) =>
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        );
      case SORT_OPTIONS.CREATED_DESC:
        return postsCopy.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case SORT_OPTIONS.CREATED_ASC:
        return postsCopy.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case SORT_OPTIONS.TITLE_ASC:
        return postsCopy.sort((a, b) => a.title.localeCompare(b.title));
      case SORT_OPTIONS.TITLE_DESC:
        return postsCopy.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return postsCopy;
    }
  }, [posts, sortBy]);

  // 處理排序變更，只需更新 URL（sortBy 會自動從 URL 計算）
  const onSortChange = (newSort: SortOption) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newSort === SORT_OPTIONS.DEFAULT) {
      params.delete('sort'); // 預設值不顯示在 URL 中
    } else {
      params.set('sort', newSort);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <main className={className}>
      <div className="blog-header">
        <h1 className="page-title">部落格</h1>

        <div className="sort-controls">
          <div className="select-wrapper">
            <select
              className="select-input"
              data-empty={sortBy === SORT_OPTIONS.DEFAULT}
              id="sort-select"
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              value={sortBy}
            >
              <option value={SORT_OPTIONS.DEFAULT}></option>
              <option value={SORT_OPTIONS.UPDATED_DESC}>
                最後編輯（最新）
              </option>
              <option value={SORT_OPTIONS.UPDATED_ASC}>最後編輯（最舊）</option>
              <option value={SORT_OPTIONS.CREATED_DESC}>
                發布時間（最新）
              </option>
              <option value={SORT_OPTIONS.CREATED_ASC}>發布時間（最舊）</option>
              <option value={SORT_OPTIONS.TITLE_ASC}>標題（A-Z）</option>
              <option value={SORT_OPTIONS.TITLE_DESC}>標題（Z-A）</option>
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
