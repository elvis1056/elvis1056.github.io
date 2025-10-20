'use client';

import { useAuthInit } from '@/hooks/useAuthInit';

/**
 * 認證初始化元件
 * 在應用啟動時自動檢查並恢復登入狀態
 */
export function AuthInit() {
  useAuthInit();
  return null;
}
