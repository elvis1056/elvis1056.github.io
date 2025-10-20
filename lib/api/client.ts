import { useAuthStore } from '@/stores/authStore';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://fivedpapabackend.onrender.com';

interface RequestConfig extends RequestInit {
  requiresAuth?: boolean;
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
   * 在發送請求前處理 headers、token 等
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

    const finalConfig: RequestInit = {
      ...config,
      headers,
    };

    delete (finalConfig as RequestConfig).requiresAuth;

    return [`${this.baseURL}${url}`, finalConfig];
  }

  /**
   * Response interceptor
   * 處理回應、錯誤、token refresh 等
   */
  private async afterResponse(response: Response): Promise<Response> {
    // 如果是 401 且有 refresh token，嘗試 refresh
    if (response.status === 401) {
      const { getRefreshToken, setAuth, clearAuth } = useAuthStore.getState();
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          // 嘗試 refresh token
          const refreshResponse = await fetch(
            `${this.baseURL}/api/auth/refresh`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );

          if (refreshResponse.ok) {
            const data = await refreshResponse.json();
            setAuth(data);

            // 重新發送原本的請求
            // 這裡需要原始的 request info，暫時先返回原 response
            // TODO: 實作 request retry
            return response;
          } else {
            // Refresh token 也失效了，清除登入狀態
            clearAuth();
          }
        } catch (error) {
          console.error('Refresh token failed:', error);
          clearAuth();
        }
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
