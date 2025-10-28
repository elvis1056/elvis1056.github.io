import { create } from 'zustand';

import type { AuthResponse, User } from '@/types';

interface AuthState {
  // Access Token (存在記憶體，不持久化)
  accessToken: string | null;

  // User info
  user: User | null;

  // Actions
  setAuth: (response: AuthResponse) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,

  setAuth: (response: AuthResponse) => {
    // Access Token 存在記憶體 (Zustand)
    // Refresh Token 由後端存在 HttpOnly Cookie，前端不需要處理
    set({
      accessToken: response.token,
      user: {
        id: response.username, // 後端沒有 id，暫時用 username
        username: response.username,
        email: response.email,
      },
    });
  },

  clearAuth: () => {
    set({ accessToken: null, user: null });
    // Refresh Token 在 HttpOnly Cookie，由後端的 /api/auth/logout 清除
  },
}));
