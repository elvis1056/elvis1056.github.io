'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';

import TagBadge from '@/components/TagBadge';
import type { BlogPost } from '@/types';

import CodeBlock from './CodeBlock';
import style from './style';

interface BlogPostContentProps {
  className?: string;
  post: BlogPost;
}

function BlogPostContent({ className, post }: BlogPostContentProps) {
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
      {/* 封面圖片 */}
      {/* <div className="cover-image-container">
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
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          src={post.imageUrl}
          style={{ objectFit: 'cover' }}
        />
      </div> */}

      {/* 內容容器 */}
      <div className="content-wrapper">
        {/* 分類和系列資訊 */}
        {(post.category || post.series) && (
          <div className="metadata-bar">
            {post.category && (
              <span className="category-badge">🏷️ {post.category.name}</span>
            )}
            {post.series && (
              <span className="series-badge">
                📚 {post.series.name} ({post.series.order}/
                {post.series.totalPosts})
              </span>
            )}
          </div>
        )}

        {/* 文章標題 */}
        <h1 className="post-title">{post.title}</h1>

        {/* Meta 資訊 */}
        <div className="meta-info">
          <span className="author">{post.author}</span>
          <span className="separator">•</span>
          <time className="date" dateTime={post.createdAt}>
            {formatDate(post.createdAt)}
          </time>
        </div>

        {/* 標籤 */}
        {post.tags && post.tags.length > 0 && (
          <div className="tags-container">
            {post.tags.map((tag) => (
              <TagBadge clickable={false} key={tag.id} size="md" tag={tag} />
            ))}
          </div>
        )}

        {/* 文章內容 */}
        <div className="post-content markdown-body">
          <ReactMarkdown
            components={{
              code({ className, children }) {
                const match = /language-(\w+)/.exec(className || '');
                return match ? (
                  <CodeBlock language={match[1]}>
                    {String(children).replace(/\n$/, '')}
                  </CodeBlock>
                ) : (
                  <code className={className}>{children}</code>
                );
              },
              img({ src, alt }) {
                const basePath = ''; // 移除 /5dpapa，部署到根路徑
                const imageSrc = src?.startsWith('/')
                  ? `${basePath}${src}`
                  : src;
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt={alt || ''}
                    src={imageSrc || ''}
                    style={{ width: '100%', height: 'auto' }}
                  />
                );
              },
            }}
            remarkPlugins={[remarkGfm]}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* 系列資訊（如果在系列中） */}
        {post.series && (
          <div className="series-info-box">
            <div className="series-icon">📚</div>
            <div className="series-details">
              <h3 className="series-title">{post.series.name}</h3>
              <p className="series-progress">
                第 {post.series.order} / {post.series.totalPosts} 篇
              </p>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default styled(BlogPostContent)`
  ${style}
`;
