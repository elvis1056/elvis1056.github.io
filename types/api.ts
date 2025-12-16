/**
 * API 錯誤型別
 */
export interface ApiError extends Error {
  status?: number;
  data?: unknown;
}
