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
   * Response interceptor
   * 處理回應、錯誤、token refresh 等
   */
  private async afterResponse(response: Response): Promise<Response> {
    // 如果是 401，嘗試使用 HttpOnly Cookie 中的 refresh token
    if (response.status === 401) {
      const { setAuth, clearAuth } = useAuthStore.getState();

      try {
        // 嘗試 refresh token (refresh token 存在 HttpOnly cookie，瀏覽器會自動帶上)
        const refreshResponse = await fetch(
          `${this.baseURL}/api/auth/refresh`,
          {
            method: 'POST',
            credentials: 'include', // 瀏覽器自動帶上 refreshToken cookie
            headers: {
              'X-XSRF-TOKEN': await csrfManager.getToken(),
            },
          }
        );

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          setAuth(data);

          // TODO: 實作 request retry - 重新發送原本的請求
          // 目前先返回原 response，讓呼叫端處理
          return response;
        } else {
          // Refresh token 也失效了，清除登入狀態
          clearAuth();
          csrfManager.clearToken();
        }
      } catch (error) {
        console.error('Refresh token failed:', error);
        clearAuth();
        csrfManager.clearToken();
      }
    }

    return response;
  }

  /**
   * 通用 request 方法
   */
  async request<T>(url: string, config: RequestConfig = {}): Promise<T> {
    const [finalUrl, finalConfig] = await this.beforeRequest(url, config);

    let response = await fetch(finalUrl, finalConfig);
    response = await this.afterResponse(response);

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
