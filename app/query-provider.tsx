'use client';

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useState } from 'react';

interface ApiError extends Error {
  status?: number;
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: (failureCount, error) => {
              const apiError = error as ApiError;
              if (apiError?.status === 401 || apiError?.status === 403) {
                return false;
              }
              if (apiError?.status === 404) {
                return false;
              }
              return failureCount < 1;
            },
            refetchOnWindowFocus: false,
          },
        },
        queryCache: new QueryCache({
          onError: (error, query) => {
            const apiError = error as ApiError;
            console.error('Query Error:', {
              message: error.message,
              queryKey: query.queryKey,
              status: apiError.status,
            });
            if (apiError.status === 401) {
              console.warn('未授權，請重新登入');
            }
          },
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
