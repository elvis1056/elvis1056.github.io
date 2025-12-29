import { Suspense } from 'react';

import ShopContent from './ShopContent';

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: '2rem', textAlign: 'center' }}>載入中...</div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
