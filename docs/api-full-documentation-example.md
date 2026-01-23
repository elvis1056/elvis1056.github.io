API 完整文檔

  認證說明

  登入後取得 Token：
  curl -X POST http://localhost:8080/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"username":"yourname","password":"yourpass"}'

  使用 Token：
  -H "Authorization: Bearer {你的Token}"

  ---
  分類管理 API (Category)

  1. 查詢所有分類

  GET /api/categories

  權限： 公開（不需登入）

  回應範例：
  [
    {
      "id": 5,
      "name": "生日派對",
      "description": "各式生日派對氣球商品，打造難忘的生日慶典",
      "parentId": null,
      "parentName": null,
      "children": [
        {
          "id": 10,
          "name": "數字氣球組",
          "description": "各種尺寸與顏色的生日數字氣球組合",
          "active": true,
          "productCount": 3
        }
      ],
      "active": true,
      "createdAt": "2025-12-17T05:29:07.027475",
      "updatedAt": "2025-12-17T05:29:07.027475",
      "isTopLevel": true,
      "productCount": 0
    }
  ]

  測試指令：
  curl -s http://localhost:8080/api/categories | python3 -m json.tool

  ---
  2. 查詢所有頂層分類

  GET /api/categories/top-level

  權限： 公開（不需登入）

  說明： 只回傳沒有父分類的頂層分類（parentId 為 null）

  測試指令：
  curl -s http://localhost:8080/api/categories/top-level | python3 -m json.tool

  ---
  3. 查詢單一分類

  GET /api/categories/{id}

  權限： 公開（不需登入）

  路徑參數：
  - id - 分類 ID

  回應範例：
  {
    "id": 5,
    "name": "生日派對",
    "description": "各式生日派對氣球商品，打造難忘的生日慶典",
    "parentId": null,
    "parentName": null,
    "children": [
      {
        "id": 10,
        "name": "數字氣球組",
        "description": "各種尺寸與顏色的生日數字氣球組合",
        "active": true,
        "productCount": 3
      }
    ],
    "active": true,
    "createdAt": "2025-12-17T05:29:07.027475",
    "updatedAt": "2025-12-17T05:29:07.027475",
    "isTopLevel": true,
    "productCount": 0
  }

  測試指令：
  curl -s http://localhost:8080/api/categories/5 | python3 -m json.tool

  ---
  4. 查詢特定分類的子分類

  GET /api/categories/{parentId}/children

  權限： 公開（不需登入）

  路徑參數：
  - parentId - 父分類 ID

  回應範例：
  [
    {
      "id": 10,
      "name": "數字氣球組",
      "description": "各種尺寸與顏色的生日數字氣球組合",
      "parentId": 5,
      "parentName": "生日派對",
      "children": [],
      "active": true,
      "isTopLevel": false,
      "productCount": 3
    },
    {
      "id": 11,
      "name": "卡通主題組",
      "description": "熱門卡通角色主題氣球套裝",
      "parentId": 5,
      "parentName": "生日派對",
      "children": [],
      "active": true,
      "isTopLevel": false,
      "productCount": 3
    }
  ]

  測試指令：
  curl -s http://localhost:8080/api/categories/5/children | python3 -m json.tool

  ---
  5. 創建分類

  POST /api/categories

  權限： ADMIN only

  請求 Body：
  {
    "name": "分類名稱",
    "description": "分類描述",
    "parentId": null,  // 頂層分類填 null，子分類填父分類 ID
    "active": true
  }

  回應範例：
  {
    "id": 30,
    "name": "分類名稱",
    "description": "分類描述",
    "parentId": null,
    "parentName": null,
    "children": [],
    "active": true,
    "createdAt": "2025-12-17T08:00:00",
    "updatedAt": "2025-12-17T08:00:00",
    "isTopLevel": true,
    "productCount": 0
  }

  測試指令（需要 ADMIN Token）：
  curl -X POST http://localhost:8080/api/categories \
    -H "Authorization: Bearer {ADMIN_TOKEN}" \
    -H "Content-Type: application/json" \
    -d '{
      "name": "測試分類",
      "description": "這是測試用的分類",
      "parentId": null,
      "active": true
    }' | python3 -m json.tool

  業務規則：
  - 分類名稱不能重複
  - 只允許兩層結構（頂層 + 子分類）
  - 不能在子分類下再建子分類

  ---
  6. 更新分類

  PUT /api/categories/{id}

  權限： ADMIN only

  路徑參數：
  - id - 要更新的分類 ID

  請求 Body：
  {
    "name": "新的分類名稱",
    "description": "新的描述",
    "parentId": 5,
    "active": true
  }

  測試指令（需要 ADMIN Token）：
  curl -X PUT http://localhost:8080/api/categories/10 \
    -H "Authorization: Bearer {ADMIN_TOKEN}" \
    -H "Content-Type: application/json" \
    -d '{
      "name": "更新後的數字氣球組",
      "description": "更新後的描述",
      "parentId": 5,
      "active": true
    }' | python3 -m json.tool

  業務規則：
  - 分類名稱不能與其他分類重複
  - 不能將分類設為自己的子分類
  - 已有子分類的分類不能變更為子分類

  ---
  7. 刪除分類

  DELETE /api/categories/{id}

  權限： ADMIN only

  路徑參數：
  - id - 要刪除的分類 ID

  回應： 204 No Content

  測試指令（需要 ADMIN Token）：
  curl -X DELETE http://localhost:8080/api/categories/30 \
    -H "Authorization: Bearer {ADMIN_TOKEN}"

  業務規則：
  - 該分類下不能有子分類
  - 該分類下不能有產品

  ---
  購物車 API (Cart)

  1. 查詢購物車

  GET /api/cart

  權限： 需登入（任何用戶）

  回應範例：
  {
    "id": 2,
    "userId": 5,
    "items": [
      {
        "id": 1,
        "productId": 3,
        "productName": "玫瑰金數字氣球 0-9",
        "productDescription": "40吋玫瑰金數字氣球，適合生日派對年齡標示",
        "productPrice": 350.0,
        "productImageUrl": null,
        "quantity": 2,
        "subtotal": 700.0,
        "availableStock": 100,
        "inStock": true
      },
      {
        "id": 2,
        "productId": 6,
        "productName": "冰雪奇緣主題氣球組",
        "productDescription": "艾莎安娜主題氣球 10 件組，含星星愛心配件",
        "productPrice": 680.0,
        "productImageUrl": null,
        "quantity": 1,
        "subtotal": 680.0,
        "availableStock": 60,
        "inStock": true
      }
    ],
    "totalItems": 2,
    "totalQuantity": 3,
    "totalAmount": 1380.0,
    "createdAt": "2025-12-17T07:29:49.980601",
    "updatedAt": "2025-12-17T07:29:49.98061"
  }

  欄位說明：
  - totalItems - 購物車中有幾種商品
  - totalQuantity - 購物車中商品的總數量
  - totalAmount - 購物車總金額
  - inStock - 該商品是否有足夠庫存

  測試指令：
  curl -s http://localhost:8080/api/cart \
    -H "Authorization: Bearer {YOUR_TOKEN}" | python3 -m json.tool

  特殊行為：
  - 新用戶第一次查詢會自動創建空購物車

  ---
  2. 加入商品到購物車

  POST /api/cart/items

  權限： 需登入（任何用戶）

  請求 Body：
  {
    "productId": 3,
    "quantity": 2
  }

  欄位說明：
  - productId - 商品 ID（必填）
  - quantity - 數量（必填，最小值 1）

  回應範例：
  {
    "id": 2,
    "userId": 5,
    "items": [
      {
        "id": 1,
        "productId": 3,
        "productName": "玫瑰金數字氣球 0-9",
        "productDescription": "40吋玫瑰金數字氣球，適合生日派對年齡標示",
        "productPrice": 350.0,
        "productImageUrl": null,
        "quantity": 2,
        "subtotal": 700.0,
        "availableStock": 100,
        "inStock": true
      }
    ],
    "totalItems": 1,
    "totalQuantity": 2,
    "totalAmount": 700.0,
    "createdAt": "2025-12-17T07:29:49.980601",
    "updatedAt": "2025-12-17T07:29:49.98061"
  }

  測試指令：
  curl -X POST http://localhost:8080/api/cart/items \
    -H "Authorization: Bearer {YOUR_TOKEN}" \
    -H "Content-Type: application/json" \
    -d '{
      "productId": 3,
      "quantity": 2
    }' | python3 -m json.tool

  業務規則：
  - 商品必須存在且上架中
  - 檢查庫存是否足夠
  - 如果購物車已有該商品，會自動累加數量
  - 累加後仍需檢查庫存

  錯誤範例：
  {
    "type": "https://api.5dpapa.com/errors/internal-error",
    "title": "Internal Server Error",
    "status": 500,
    "detail": "庫存不足，目前庫存：10",
    "instance": "/api/cart/items"
  }

  ---
  3. 更新購物車項目數量

  PUT /api/cart/items/{id}

  權限： 需登入（僅能操作自己的購物車）

  路徑參數：
  - id - 購物車項目 ID（不是商品 ID）

  請求 Body：
  {
    "quantity": 5
  }

  回應範例：
  {
    "id": 2,
    "userId": 5,
    "items": [
      {
        "id": 1,
        "productId": 3,
        "productName": "玫瑰金數字氣球 0-9",
        "productDescription": "40吋玫瑰金數字氣球，適合生日派對年齡標示",
        "productPrice": 350.0,
        "productImageUrl": null,
        "quantity": 5,
        "subtotal": 1750.0,
        "availableStock": 100,
        "inStock": true
      }
    ],
    "totalItems": 1,
    "totalQuantity": 5,
    "totalAmount": 1750.0,
    "createdAt": "2025-12-17T07:29:49.980601",
    "updatedAt": "2025-12-17T07:29:49.98061"
  }

  測試指令：
  curl -X PUT http://localhost:8080/api/cart/items/1 \
    -H "Authorization: Bearer {YOUR_TOKEN}" \
    -H "Content-Type: application/json" \
    -d '{
      "quantity": 5
    }' | python3 -m json.tool

  業務規則：
  - 只能操作自己購物車的項目
  - 檢查新數量是否超過庫存
  - 數量必須大於 0

  ---
  4. 移除購物車項目

  DELETE /api/cart/items/{id}

  權限： 需登入（僅能操作自己的購物車）

  路徑參數：
  - id - 購物車項目 ID

  回應範例：
  {
    "id": 2,
    "userId": 5,
    "items": [
      {
        "id": 1,
        "productId": 3,
        "productName": "玫瑰金數字氣球 0-9",
        "productDescription": "40吋玫瑰金數字氣球，適合生日派對年齡標示",
        "productPrice": 350.0,
        "productImageUrl": null,
        "quantity": 5,
        "subtotal": 1750.0,
        "availableStock": 100,
        "inStock": true
      }
    ],
    "totalItems": 1,
    "totalQuantity": 5,
    "totalAmount": 1750.0,
    "createdAt": "2025-12-17T07:29:49.980601",
    "updatedAt": "2025-12-17T07:29:49.98061"
  }

  測試指令：
  curl -X DELETE http://localhost:8080/api/cart/items/2 \
    -H "Authorization: Bearer {YOUR_TOKEN}" | python3 -m json.tool

  業務規則：
  - 只能操作自己購物車的項目

  ---
  5. 清空購物車

  DELETE /api/cart

  權限： 需登入（任何用戶）

  回應： 204 No Content

  測試指令：
  curl -X DELETE http://localhost:8080/api/cart \
    -H "Authorization: Bearer {YOUR_TOKEN}"

  說明： 刪除購物車中的所有項目

  ---
  完整測試腳本

  購物車完整流程測試

  #!/bin/bash

  # 1. 註冊新用戶
  echo "=== 1. 註冊新用戶 ==="
  RESPONSE=$(curl -s -X POST http://localhost:8080/api/auth/register \
    -H "Content-Type: application/json" \
    -d '{"username":"testbuyer","email":"testbuyer@example.com","password":"test123"}')
  TOKEN=$(echo $RESPONSE | python3 -c "import sys, json; print(json.load(sys.stdin)['token'])")
  echo "Token: $TOKEN"
  echo ""

  # 2. 查詢購物車（應該是空的）
  echo "=== 2. 查詢購物車 ==="
  curl -s http://localhost:8080/api/cart \
    -H "Authorization: Bearer $TOKEN" | python3 -m json.tool
  echo ""

  # 3. 查詢所有頂層分類
  echo "=== 3. 查詢所有頂層分類 ==="
  curl -s http://localhost:8080/api/categories/top-level | python3 -m json.tool | head -30
  echo ""

  # 4. 查詢「生日派對」分類的子分類
  echo "=== 4. 查詢生日派對的子分類 ==="
  curl -s http://localhost:8080/api/categories/5/children | python3 -m json.tool | head -30
  echo ""

  # 5. 加入第一個商品
  echo "=== 5. 加入商品（玫瑰金數字氣球 x2） ==="
  curl -s -X POST http://localhost:8080/api/cart/items \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"productId":3,"quantity":2}' | python3 -m json.tool
  echo ""

  # 6. 加入第二個商品
  echo "=== 6. 加入商品（冰雪奇緣氣球 x1） ==="
  curl -s -X POST http://localhost:8080/api/cart/items \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"productId":6,"quantity":1}' | python3 -m json.tool
  echo ""

  # 7. 更新第一個項目的數量
  echo "=== 7. 更新項目數量 ==="
  curl -s -X PUT http://localhost:8080/api/cart/items/1 \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"quantity":5}' | python3 -m json.tool
  echo ""

  # 8. 移除第二個項目
  echo "=== 8. 移除項目 ==="
  curl -s -X DELETE http://localhost:8080/api/cart/items/2 \
    -H "Authorization: Bearer $TOKEN" | python3 -m json.tool
  echo ""

  # 9. 清空購物車
  echo "=== 9. 清空購物車 ==="
  curl -s -X DELETE http://localhost:8080/api/cart \
    -H "Authorization: Bearer $TOKEN"
  echo "購物車已清空"
  echo ""

  # 10. 確認購物車為空
  echo "=== 10. 確認購物車為空 ==="
  curl -s http://localhost:8080/api/cart \
    -H "Authorization: Bearer $TOKEN" | python3 -m json.tool

  ---
  API 快速參考表

  分類 API

  | 方法     | 端點                                  | 權限    | 說明     |
  |--------|-------------------------------------|-------|--------|
  | GET    | /api/categories                     | 公開    | 查詢所有分類 |
  | GET    | /api/categories/top-level           | 公開    | 查詢頂層分類 |
  | GET    | /api/categories/{id}                | 公開    | 查詢單一分類 |
  | GET    | /api/categories/{parentId}/children | 公開    | 查詢子分類  |
  | POST   | /api/categories                     | ADMIN | 創建分類   |
  | PUT    | /api/categories/{id}                | ADMIN | 更新分類   |
  | DELETE | /api/categories/{id}                | ADMIN | 刪除分類   |

  購物車 API

  | 方法     | 端點                   | 權限   | 說明    |
  |--------|----------------------|------|-------|
  | GET    | /api/cart            | 登入用戶 | 查詢購物車 |
  | POST   | /api/cart/items      | 登入用戶 | 加入商品  |
  | PUT    | /api/cart/items/{id} | 登入用戶 | 更新數量  |
  | DELETE | /api/cart/items/{id} | 登入用戶 | 移除項目  |
  | DELETE | /api/cart            | 登入用戶 | 清空購物車 |

  ---
  這份文檔有幫助嗎？需要我補充哪個部分的說明？