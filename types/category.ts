/**
 * 分類子項目（不包含 children，避免循環引用）
 */
export interface CategoryChild {
  id: number;
  name: string;
  description: string;
  active: boolean;
  productCount: number;
}

/**
 * 完整分類資訊（包含子分類）
 */
export interface Category {
  id: number;
  name: string;
  description: string;
  parentId: number | null;
  parentName: string | null;
  children: CategoryChild[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
  isTopLevel: boolean;
  productCount: number;
}

/**
 * 創建/更新分類的請求 Body
 */
export interface CategoryRequest {
  name: string;
  description: string;
  parentId: number | null;
  active: boolean;
}

/**
 * 分類樹狀結構（用於導航選單）
 */
export interface CategoryTree {
  id: number;
  name: string;
  description: string;
  children: CategoryChild[];
  productCount: number;
}
