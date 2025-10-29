import { csrfManager } from '@/lib/security/csrfManager';
import { useAuthStore } from '@/stores/authStore';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://fivedpapabackend.onrender.com';

interface RequestConfig extends RequestInit {
  requiresAuth?: boolean;
  skipCsrf?: boolean; // Skip CSRF token for public endpoints (login, register)
}

/**
 * API Client with interceptors
 */
class ApiClient {
  private baseURL: string;
  private isRefreshing = false; // 防止多個請求同時刷新 token
  private refreshPromise: Promise<void> | null = null; // 共享的刷新 Promise

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  /**
   * Request interceptor
   * 在發送請求前處理 headers、token、CSRF 等
   */
  private async beforeRequest(
    url: string,
    config: RequestConfig
  ): Promise<[string, RequestInit]> {
    const headers = new Headers(config.headers);

    // 預設使用 JSON
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    // 如果需要認證，加上 Authorization header
    if (config.requiresAuth) {
      const { accessToken } = useAuthStore.getState();
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
    }

    // 對於需要 CSRF token 的請求（POST, PUT, DELETE, PATCH），加上 CSRF token
    const method = (config.method || 'GET').toUpperCase();
    const needsCsrf = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(method);
    const skipCsrf = config.skipCsrf || false;

    if (needsCsrf && !skipCsrf) {
      try {
        const csrfToken = await csrfManager.getToken();
        headers.set('X-XSRF-TOKEN', csrfToken);
      } catch (error) {
        console.warn('Failed to get CSRF token:', error);
      }
    }

    const finalConfig: RequestInit = {
      ...config,
      headers,
      credentials: 'include', // 重要：讓瀏覽器自動處理 Cookie (refresh token)
    };

    // 清理自定義屬性
    delete (finalConfig as RequestConfig).requiresAuth;
    delete (finalConfig as RequestConfig).skipCsrf;

    return [`${this.baseURL}${url}`, finalConfig];
  }

  /**
   * 執行 Token 刷新
   * 負責呼叫 refresh API 並更新 auth store
   */
  private async refreshToken(): Promise<void> {
    console.log('Starting token refresh...');
    const { setAuth, clearAuth } = useAuthStore.getState();

    const refreshResponse = await fetch(`${this.baseURL}/api/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-XSRF-TOKEN': await csrfManager.getToken(),
      },
    });

    if (!refreshResponse.ok) {
      clearAuth();
      csrfManager.clearToken();
      console.warn('❌ Refresh token expired, user logged out');
      throw new Error('Refresh token expired');
    }

    const data = await refreshResponse.json();
    setAuth(data);
    console.log('✅ Token refresh successful');
  }

  /**
   * 確保 Token 已刷新（處理競態條件）
   * 如果已有刷新在進行中，等待；否則開始新的刷新
   */
  private async ensureTokenRefreshed(): Promise<void> {
    // 已有刷新在進行中，等待它完成
    if (this.isRefreshing && this.refreshPromise) {
      console.log('Token refresh already in progress, waiting...');
      await this.refreshPromise;
      console.log('Token refresh completed');
      return;
    }

    // 開始新的刷新流程
    this.isRefreshing = true;
    this.refreshPromise = this.refreshToken();

    try {
      await this.refreshPromise;
    } finally {
      // 重置刷新狀態
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }

  /**
   * 處理 401 錯誤：刷新 token 並重試原請求
   */
  private async handleTokenRefreshAndRetry(
    originalUrl: string,
    originalConfig: RequestInit
  ): Promise<Response> {
    // 確保 token 已刷新（處理競態條件）
    await this.ensureTokenRefreshed();

    // Token 刷新成功，重新發送原始請求
    console.log('Retrying original request with new token...');

    // 更新 Authorization header 使用新的 access token
    const headers = new Headers(originalConfig.headers);
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    const retryConfig: RequestInit = {
      ...originalConfig,
      headers,
    };

    const retryResponse = await fetch(originalUrl, retryConfig);

    // 遞迴呼叫 afterResponse，標記為 retry（防止無限循環）
    return this.afterResponse(retryResponse, originalUrl, retryConfig, true);
  }

  /**
   * Response interceptor
   * 處理回應、錯誤、token refresh 等
   */
  private async afterResponse(
    response: Response,
    originalUrl: string,
    originalConfig: RequestInit,
    isRetry = false
  ): Promise<Response> {
    // Early return: 不是 401，直接返回
    if (response.status !== 401) {
      return response;
    }

    // Early return: 已經是 retry，避免無限循環
    if (isRetry) {
      return response;
    }

    // Early return: 如果是 refresh API 本身失敗，避免無限循環
    const requestUrl = new URL(originalUrl);
    if (requestUrl.pathname.includes('/api/auth/refresh')) {
      console.warn('Refresh token API itself returned 401');
      return response;
    }

    // 處理 401：刷新 token 並重試
    try {
      return await this.handleTokenRefreshAndRetry(originalUrl, originalConfig);
    } catch (error) {
      console.error('Token refresh failed:', error);
      // 刷新失敗，返回原始 401 response
      // 注意：clearAuth 已在 refreshToken() 中執行，這裡不重複執行
      return response;
    }
  }

  /**
   * 通用 request 方法
   */
  async request<T>(url: string, config: RequestConfig = {}): Promise<T> {
    const [finalUrl, finalConfig] = await this.beforeRequest(url, config);

    let response = await fetch(finalUrl, finalConfig);
    response = await this.afterResponse(response, finalUrl, finalConfig);

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: `HTTP error! status: ${response.status}`,
      }));
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  /**
   * GET 請求
   */
  get<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: 'GET' });
  }

  /**
   * POST 請求
   */
  post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT 請求
   */
  put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE 請求
   */
  delete<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
