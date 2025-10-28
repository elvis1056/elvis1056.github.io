/**
 * CSRF Token Manager
 *
 * Manages CSRF token retrieval and caching for secure API requests.
 * The CSRF token is required for all state-changing requests (POST, PUT, DELETE, PATCH).
 */

interface CsrfTokenResponse {
  token: string;
  headerName: string;
  parameterName: string;
}

class CsrfManager {
  private cachedToken: string | null = null;
  private isInitialized = false;

  /**
   * Fetch CSRF token from backend
   * The token is automatically stored in a cookie by Spring Security
   */
  async fetchCsrfToken(): Promise<string> {
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      'https://fivedpapabackend.onrender.com';

    try {
      const response = await fetch(`${API_BASE_URL}/api/csrf`, {
        method: 'GET',
        credentials: 'include', // Important: allow cookies
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch CSRF token: ${response.status}`);
      }

      const data: CsrfTokenResponse = await response.json();
      this.cachedToken = data.token;
      this.isInitialized = true;

      return data.token;
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
      throw error;
    }
  }

  /**
   * Get CSRF token (fetch if not cached)
   */
  async getToken(): Promise<string> {
    if (!this.cachedToken || !this.isInitialized) {
      return await this.fetchCsrfToken();
    }
    return this.cachedToken;
  }

  /**
   * Clear cached token (useful after logout or on error)
   */
  clearToken(): void {
    this.cachedToken = null;
    this.isInitialized = false;
  }

  /**
   * Read CSRF token from cookie (alternative method)
   * Spring Security stores the token in 'XSRF-TOKEN' cookie
   */
  getTokenFromCookie(): string | null {
    if (typeof document === 'undefined') return null;

    const cookies = document.cookie.split(';');
    const csrfCookie = cookies.find((cookie) =>
      cookie.trim().startsWith('XSRF-TOKEN=')
    );

    if (csrfCookie) {
      return csrfCookie.split('=')[1];
    }

    return null;
  }
}

// Singleton instance
export const csrfManager = new CsrfManager();
