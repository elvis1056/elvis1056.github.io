import type { AuthResponse, LoginRequest, RegisterRequest } from '@/types';

import { apiClient } from './client';

/**
 * 登入 API
 */
export async function login(data: LoginRequest): Promise<AuthResponse> {
  return apiClient.post<AuthResponse>('/api/auth/login', data);
}

/**
 * 註冊 API
 */
export async function register(data: RegisterRequest): Promise<AuthResponse> {
  return apiClient.post<AuthResponse>('/api/auth/register', data);
}

/**
 * 使用 Refresh Token 換取新的 Access Token
 */
export async function refreshAccessToken(
  refreshToken: string
): Promise<AuthResponse> {
  return apiClient.post<AuthResponse>(
    '/api/auth/refresh',
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );
}

/**
 * Google OAuth 登入
 * 後端需要實作 /api/auth/oauth/google endpoint
 */
export function loginWithGoogle() {
  alert('Google 登入功能即將推出 (Coming Soon)');
  // TODO: 後端實作完成後啟用
  // const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://fivedpapabackend.onrender.com';
  // window.location.href = `${API_BASE_URL}/api/auth/oauth/google`;
}

/**
 * Facebook OAuth 登入
 * 後端需要實作 /api/auth/oauth/facebook endpoint
 */
export function loginWithFacebook() {
  alert('Facebook 登入功能即將推出 (Coming Soon)');
  // TODO: 後端實作完成後啟用
  // const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://fivedpapabackend.onrender.com';
  // window.location.href = `${API_BASE_URL}/api/auth/oauth/facebook`;
}
