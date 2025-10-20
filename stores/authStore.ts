import { create } from 'zustand';

import type { AuthResponse, User } from '@/types';

interface AuthState {
  // Access Token (內存，不持久化)
  accessToken: string | null;

  // User info
  user: User | null;

  // Actions
  setAuth: (response: AuthResponse) => void;
  clearAuth: () => void;
  getRefreshToken: () => string | null;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,

  setAuth: (response: AuthResponse) => {
    // Access Token 存在內存 (Zustand)
    set({
      accessToken: response.token,
      user: {
        id: response.username, // 後端沒有 id，暫時用 username
        username: response.username,
        email: response.email,
      },
    });

    // Refresh Token 存在 localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('refreshToken', response.refreshToken);
    }
  },

  clearAuth: () => {
    set({ accessToken: null, user: null });

    // 清除 localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('refreshToken');
    }
  },

  getRefreshToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refreshToken');
    }
    return null;
  },
}));
