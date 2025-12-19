import { Suspense } from 'react';

import BlogContent from './BlogContent';

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: '2rem', textAlign: 'center' }}>載入中...</div>
      }
    >
      <BlogContent />
    </Suspense>
  );
}
