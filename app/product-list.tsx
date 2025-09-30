'use client';

import type { Product } from '@/types';

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem',
        marginTop: '2rem',
      }}
    >
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1.5rem',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '200px',
              backgroundColor: '#f0f0f0',
              borderRadius: '4px',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#999' }}>圖片位置</span>
          </div>
          <h3>{product.name}</h3>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>
            {product.description}
          </p>
          <p
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#e74c3c',
              marginTop: '1rem',
            }}
          >
            NT$ {product.price.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
