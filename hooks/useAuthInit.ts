'use client';

import { useEffect } from 'react';

import { refreshAccessToken } from '@/lib/api/auth';
import { csrfManager } from '@/lib/security/csrfManager';
import { useAuthStore } from '@/stores/authStore';

/**
 * 初始化認證狀態
 * 在應用啟動時檢查 HttpOnly Cookie 中的 refreshToken
 * 如果有效，自動換取新的 accessToken
 */
export function useAuthInit() {
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // 預先載入 CSRF token
        await csrfManager.fetchCsrfToken();

        // 嘗試使用 refresh token 取得新的 access token
        // Refresh token 存在 HttpOnly Cookie，瀏覽器會自動帶上
        const response = await refreshAccessToken();
        setAuth(response);

        console.log('Auth state restored from refresh token');
      } catch {
        // Refresh token 不存在或已過期，保持未登入狀態
        console.log('No valid refresh token, user not logged in');
      }
    };

    initAuth();
  }, [setAuth]);
}
