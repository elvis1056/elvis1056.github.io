import type { AuthResponse, LoginRequest, RegisterRequest } from '@/types';

import { apiClient } from './client';

/**
 * 登入 API
 * Login 不需要 CSRF token（首次請求無法取得 token）
 */
export async function login(data: LoginRequest): Promise<AuthResponse> {
  return apiClient.post<AuthResponse>('/api/auth/login', data, {
    skipCsrf: true,
  });
}

/**
 * 註冊 API
 * Register 不需要 CSRF token（首次請求無法取得 token）
 */
export async function register(data: RegisterRequest): Promise<AuthResponse> {
  return apiClient.post<AuthResponse>('/api/auth/register', data, {
    skipCsrf: true,
  });
}

/**
 * 使用 Refresh Token 換取新的 Access Token
 * Refresh token 存在 HttpOnly Cookie，瀏覽器會自動帶上
 */
export async function refreshAccessToken(): Promise<AuthResponse> {
  return apiClient.post<AuthResponse>('/api/auth/refresh', {});
}

/**
 * 登出 API
 * 清除後端的 HttpOnly Cookie
 */
export async function logout(): Promise<void> {
  return apiClient.post<void>('/api/auth/logout', {});
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
