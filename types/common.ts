/**
 * 共用基礎類型
 * 這些類型可能被多個領域使用（部落格、產品等）
 */

/**
 * 標籤
 */
export interface Tag {
  id: number;
  name: string;
  slug: string;
  color?: string;
}

/**
 * 分類
 */
export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

/**
 * 分頁元資料
 */
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * API 通用回應包裝
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

/**
 * API 錯誤回應
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
}
