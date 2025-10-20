'use client';

import { useEffect } from 'react';

import { refreshAccessToken } from '@/lib/api/auth';
import { useAuthStore } from '@/stores/authStore';

/**
 * 初始化認證狀態
 * 在應用啟動時檢查 localStorage 的 refreshToken
 * 如果有效，自動換取新的 accessToken
 */
export function useAuthInit() {
  const { setAuth, clearAuth, getRefreshToken } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        return;
      }

      try {
        // 用 refreshToken 換取新的 accessToken
        const response = await refreshAccessToken(refreshToken);
        setAuth(response);
      } catch (error) {
        // Refresh token 過期或無效，清除認證狀態
        console.error('Failed to refresh token:', error);
        clearAuth();
      }
    };

    initAuth();
  }, [setAuth, clearAuth, getRefreshToken]);
}
