關於購物車完整攻略

---

1. 頗析需求
2. 資料庫設計
3. 建立 Entity（實體類別）
4. 建立 Repository（資料訪問層）
5. 建立 DTO（資料傳輸物件）
6. 建立 Service（業務邏輯層）
7. 建立 Controller（控制器）
8. 安全配置
9. 測試與除錯

---

## 頗析需求

想像你在實體商店購物：
1. 你拿一個購物籃（購物車）
2. 把商品放進籃子裡（購物車項目）
3. 每個商品可以放多個（數量）
4. 結帳時計算總金額

轉換成程式設計：
  購物車（Cart）
   └─ 屬於某個用戶（一對一）
   └─ 包含多個項目（一對多）
       └─ 每個項目：一個商品 + 數量

---

為什麼要分成兩個 Entity？

方案 A（錯誤）：把商品直接放進購物車
class Cart {
    List<Product> products;  // ❌ 無法記錄數量！
}

方案 B（正確）：使用中間表
class Cart {
    List<CartItem> items;  // ✓ 可以記錄數量
}

class CartItem {
    Product product;   // 哪個商品
    Integer quantity;  // 幾個
}

---

## 資料庫設計

表格結構設計

1. cart 表（購物車）
CREATE TABLE cart (
    id BIGINT PRIMARY KEY,        -- 購物車 ID
    user_id BIGINT NOT NULL,      -- 屬於哪個用戶
    created_at TIMESTAMP,         -- 創建時間
    updated_at TIMESTAMP,         -- 更新時間
    UNIQUE(user_id)               -- 一個用戶只能有一個購物車
);

2. cart_item 表（購物車項目）
CREATE TABLE cart_item (
    id BIGINT PRIMARY KEY,        -- 項目 ID
    cart_id BIGINT NOT NULL,      -- 屬於哪個購物車
    product_id BIGINT NOT NULL,   -- 哪個商品
    quantity INTEGER NOT NULL,    -- 數量
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES cart(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);

關聯關係圖

User (用戶)
↓ 一對一
Cart (購物車)
↓ 一對多
CartItem (購物車項目)
↓ 多對一
Product (商品)

實際資料範例：
用戶表 (users)
+----+----------+
| id | username |
+----+----------+
| 1  | buyer1   |
+----+----------+

購物車表 (cart)
+----+---------+
| id | user_id |
+----+---------+
| 1  | 1       |  ← buyer1 的購物車
+----+---------+

購物車項目表 (cart_item)
+----+---------+------------+----------+
| id | cart_id | product_id | quantity |
+----+---------+------------+----------+
| 1  | 1       | 3          | 2        |  ← 玫瑰金數字氣球 x2
| 2  | 1       | 6          | 1        |  ← 冰雪奇緣氣球 x1
+----+---------+------------+----------+

商品表 (product)
+----+----------------------+-------+
| id | name                 | price |
+----+----------------------+-------+
| 3  | 玫瑰金數字氣球 0-9   | 350   |
| 6  | 冰雪奇緣主題氣球組   | 680   |
+----+----------------------+-------+

計算總金額：
- 項目 1：350 × 2 = 700
- 項目 2：680 × 1 = 680
- 總計：1380

---

## 建立 Entity（實體類別）

為什麼從 Entity 開始？

Entity 是資料庫表格的 Java 表示，就像是「模具」，定義了資料的結構。

建立 Cart Entity

  @Entity
  @Table(name = "cart")
  public class Cart {

      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      private Long id;

  解釋：
  - @Entity：告訴 Spring 這是一個資料庫實體
  - @Table(name = "cart")：對應資料庫的 cart 表
  - @Id：主鍵
  - @GeneratedValue：自動生成 ID（1, 2, 3...）

      @OneToOne(fetch = FetchType.LAZY)
      @JoinColumn(name = "user_id", nullable = false, unique = true)
      private User user;

  解釋：
  - @OneToOne：一對一關係（一個用戶只有一個購物車）
  - fetch = FetchType.LAZY：延遲載入（查購物車時不自動查用戶資料，需要時才查）
  - @JoinColumn(name = "user_id")：外鍵欄位名稱
  - unique = true：確保一個用戶只能有一個購物車

      @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
      private List<CartItem> cartItems = new ArrayList<>();

  解釋：
  - @OneToMany：一對多關係（一個購物車有多個項目）
  - mappedBy = "cart"：由 CartItem 那邊的 cart 欄位管理關係
  - cascade = CascadeType.ALL：級聯操作（刪除購物車時，自動刪除所有項目）
  - orphanRemoval = true：孤兒刪除（項目被移出購物車後，自動從資料庫刪除）

  什麼是 mappedBy？

  想像兩個人互相牽手：
  - A 牽著 B 的手（主動方）
  - B 被 A 牽著（被動方）

  只需要一個人主動牽就好，不需要兩個都主動牽（會重複）。

  // Cart.java (被動方)
  @OneToMany(mappedBy = "cart")  // 我被 CartItem 的 cart 欄位牽著
  private List<CartItem> cartItems;

  // CartItem.java (主動方)
  @ManyToOne
  @JoinColumn(name = "cart_id")  // 我主動牽著 Cart
  private Cart cart;

      @PrePersist
      protected void onCreate() {
          createdAt = LocalDateTime.now();
          updatedAt = LocalDateTime.now();
      }

  解釋：
  - @PrePersist：在儲存到資料庫「之前」執行
  - 自動設定創建時間和更新時間

建立 CartItem Entity

  @Entity
  @Table(name = "cart_item")
  public class CartItem {

      @ManyToOne(fetch = FetchType.LAZY)
      @JoinColumn(name = "cart_id", nullable = false)
      @JsonIgnore
      private Cart cart;

  解釋：
  - @ManyToOne：多對一（多個項目屬於一個購物車）
  - @JsonIgnore：轉成 JSON 時忽略（避免循環引用：Cart → CartItem → Cart → ...）

  為什麼需要 @JsonIgnore？

  沒有 @JsonIgnore 的話：
  {
    "id": 1,
    "cart": {
      "id": 1,
      "items": [
        {
          "id": 1,
          "cart": {
            "id": 1,
            "items": [
              // 無限循環...

      @ManyToOne(fetch = FetchType.LAZY)
      @JoinColumn(name = "product_id", nullable = false)
      private Product product;

  解釋：
  - 多個購物車項目可以指向同一個商品
  - 比如：兩個用戶都買了「玫瑰金數字氣球」

      public BigDecimal getSubtotal() {
          if (product == null || product.getPrice() == null || quantity == null) {
              return BigDecimal.ZERO;
          }
          return product.getPrice().multiply(BigDecimal.valueOf(quantity));
      }

  解釋：
  - 計算小計：單價 × 數量
  - BigDecimal：精確計算金額（避免浮點數誤差）
  - 防禦性編程：檢查 null 避免報錯

  為什麼用 BigDecimal 而不是 double？

  double price = 0.1 + 0.2;
  System.out.println(price);  // 輸出：0.30000000000000004 ❌

  BigDecimal price = new BigDecimal("0.1").add(new BigDecimal("0.2"));
  System.out.println(price);  // 輸出：0.3 ✓

---

## 建立 Repository（資料訪問層）

為什麼需要 Repository？

Repository 是「資料庫的翻譯官」，把 Java 方法轉成 SQL 語句。

CartRepository

  public interface CartRepository extends JpaRepository<Cart, Long> {

      Optional<Cart> findByUserId(Long userId);
  }

  解釋：
  - extends JpaRepository<Cart, Long>：繼承基礎功能（save, findById, delete...）
  - Optional<Cart>：可能找到，也可能找不到（避免 null）
  - findByUserId：Spring 自動翻譯成 SQL

Spring 如何翻譯？

方法名稱：findByUserId

Spring 自動生成 SQL：
SELECT * FROM cart WHERE user_id = ?

命名規則：
- findBy + 欄位名 = 查詢條件
- And = SQL 的 AND
- Or = SQL 的 OR

範例：
findByUserIdAndCreatedAtAfter(Long userId, LocalDateTime date)
// → SELECT * FROM cart WHERE user_id = ? AND created_at > ?

findByUserIdOrCreatedAtBefore(Long userId, LocalDateTime date)
// → SELECT * FROM cart WHERE user_id = ? OR created_at < ?

    boolean existsByUserId(Long userId);

解釋：
- 檢查是否存在
- 翻譯成：SELECT COUNT(*) > 0 FROM cart WHERE user_id = ?

CartItemRepository

  public interface CartItemRepository extends JpaRepository<CartItem, Long> {

      Optional<CartItem> findByCartIdAndProductId(Long cartId, Long productId);

  用途： 檢查購物車中是否已經有這個商品

  情況 A：購物車裡沒有這個商品
  → 新增一個 CartItem

  情況 B：購物車裡已經有這個商品
  → 更新數量（累加）

      void deleteByCartId(Long cartId);

  用途： 清空購物車（刪除所有項目）

---

## 建立 DTO（資料傳輸物件）

為什麼需要 DTO？

  5.1 Entity vs DTO 的差異：

  Entity（實體）
  - 對應資料庫表格
  - 包含所有欄位和關聯
  - 內部使用

  DTO（資料傳輸物件）
  - 對應 API 請求/回應
  - 只包含需要的資料
  - 對外暴露

  問題：直接回傳 Entity 會怎樣？

  // 錯誤示範
  @GetMapping("/cart")
  public Cart getCart() {
      return cart;  // ❌ 會包含太多資訊
  }

  回傳的 JSON：
  {
    "id": 1,
    "user": {
      "id": 5,
      "username": "buyer1",
      "password": "$2a$10$abc123...",  // ❌ 密碼外洩！
      "email": "buyer1@example.com"
    },
    "cartItems": [...]
  }

  正確做法：使用 DTO

  @GetMapping("/cart")
  public CartResponse getCart() {
      return cartResponse;  // ✓ 只包含需要的資料
  }

  回傳的 JSON：
  {
    "id": 1,
    "userId": 5,  // ✓ 只有 ID，沒有敏感資料
    "items": [...],
    "totalAmount": 1380
  }

  5.2 AddToCartRequest

  public class AddToCartRequest {

      @NotNull(message = "商品 ID 不能為空")
      private Long productId;

      @Min(value = 1, message = "數量必須大於 0")
      private Integer quantity;
  }

  解釋：
  - @NotNull：驗證不能是 null
  - @Min：驗證最小值

  為什麼要驗證？

  沒有驗證的話：
  {"productId": null, "quantity": -5}
  → 會導致錯誤或資料異常

  有驗證的話：
  {
    "errors": [
      "商品 ID 不能為空",
      "數量必須大於 0"
    ]
  }
  → 立即回傳錯誤訊息給前端

  5.3 CartResponse

  public class CartResponse {
      private Long id;
      private Long userId;
      private List<CartItemResponse> items;

      // 統計資訊
      private Integer totalItems;      // 總項目數（幾種商品）
      private Integer totalQuantity;   // 總數量（幾個商品）
      private BigDecimal totalAmount;  // 總金額
  }

  範例：
  購物車內容：
  - 玫瑰金數字氣球 x5
  - 冰雪奇緣氣球 x1

  totalItems = 2      (2種商品)
  totalQuantity = 6   (5 + 1 = 6個)
  totalAmount = 2430  (350×5 + 680×1)

  5.4 CartItemResponse

  public class CartItemResponse {
      private Long id;

      // 商品資訊（展平，不是巢狀物件）
      private Long productId;
      private String productName;
      private BigDecimal productPrice;

      // 購物車項目資訊
      private Integer quantity;
      private BigDecimal subtotal;

      // 庫存檢查
      private Integer availableStock;
      private Boolean inStock;
  }

  為什麼要展平（Flatten）？

  方案 A（巢狀）：
  {
    "id": 1,
    "product": {
      "id": 3,
      "name": "玫瑰金數字氣球",
      "price": 350,
      "description": "...",
      "category": {...},
      "reviews": [...]
    },
    "quantity": 2
  }
  → 包含太多不需要的資料

  方案 B（展平）：
  {
    "id": 1,
    "productId": 3,
    "productName": "玫瑰金數字氣球",
    "productPrice": 350,
    "quantity": 2,
    "subtotal": 700
  }
  → 只包含需要的資料，結構簡單

---

## 建立 Service（業務邏輯層）

6.1 為什麼需要 Service？

  Controller vs Service 的分工：

  Controller（控制器）
  - 接收 HTTP 請求
  - 驗證輸入
  - 調用 Service
  - 回傳結果

  Service（服務層）
  - 業務邏輯
  - 資料處理
  - 調用 Repository
  - 事務管理

  6.2 getCart() 方法

  @Transactional
  public CartResponse getCart(Long userId) {
      Cart cart = getOrCreateCart(userId);
      return convertToResponse(cart);
  }

  為什麼需要 @Transactional？

  public Cart getOrCreateCart(Long userId) {
      return cartRepository.findByUserId(userId).orElseGet(() -> {
          // 找不到就創建新的
          User user = userRepository.findById(userId).orElseThrow(...);
          Cart newCart = new Cart();
          newCart.setUser(user);
          return cartRepository.save(newCart);  // INSERT 操作
      });
  }

  這個方法可能執行：
  1. 只讀：SELECT * FROM cart WHERE user_id = ?
  2. 寫入：INSERT INTO cart (...) VALUES (...)

  所以不能用 @Transactional(readOnly = true)

  Optional.orElseGet() 是什麼？

  Optional<Cart> optional = cartRepository.findByUserId(userId);

  // 方法 1：傳統寫法
  Cart cart;
  if (optional.isPresent()) {
      cart = optional.get();
  } else {
      cart = createNewCart();
  }

  // 方法 2：Optional 寫法
  Cart cart = optional.orElseGet(() -> createNewCart());

  6.3 addToCart() 方法詳解

  @Transactional
  public CartResponse addToCart(Long userId, AddToCartRequest request) {
      // 步驟 1：獲取購物車
      Cart cart = getOrCreateCart(userId);

  為什麼要先獲取購物車？
  - 新用戶可能沒有購物車，需要先創建

      // 步驟 2：檢查商品
      Product product = productRepository.findById(request.getProductId())
              .orElseThrow(() -> new RuntimeException("商品不存在"));

      if (!product.getActive()) {
          throw new RuntimeException("商品已下架");
      }

  為什麼要檢查？
  - 避免加入不存在或已下架的商品
  - 前端可能傳錯誤的 ID

      // 步驟 3：檢查庫存
      if (product.getStock() < request.getQuantity()) {
          throw new RuntimeException("庫存不足，目前庫存：" + product.getStock());
      }

  庫存檢查範例：
  商品庫存：10 個
  用戶想買：15 個
  → 拒絕，回傳錯誤

      // 步驟 4：檢查是否已在購物車
      CartItem existingItem = cartItemRepository
              .findByCartIdAndProductId(cart.getId(), product.getId())
              .orElse(null);

  為什麼要檢查？

  情況 A：購物車裡沒有這個商品
  cart_item 表：
  (空)

  → 新增一筆記錄

  情況 B：購物車裡已經有這個商品
  cart_item 表：
  | id | product_id | quantity |
  | 1  | 3          | 2        |

  → 更新數量：2 + 3 = 5

      if (existingItem != null) {
          // 已存在，累加數量
          int newQuantity = existingItem.getQuantity() + request.getQuantity();

          if (product.getStock() < newQuantity) {
              throw new RuntimeException("庫存不足...");
          }

          existingItem.setQuantity(newQuantity);
          cartItemRepository.save(existingItem);
      } else {
          // 不存在，新增項目
          CartItem newItem = new CartItem();
          newItem.setCart(cart);
          newItem.setProduct(product);
          newItem.setQuantity(request.getQuantity());
          cartItemRepository.save(newItem);
      }

      return convertToResponse(cart);
  }

  6.4 convertToResponse() 方法

  private CartResponse convertToResponse(Cart cart) {
      // 轉換每個項目
      List<CartItemResponse> itemResponses = cart.getCartItems().stream()
              .map(this::convertItemToResponse)
              .collect(Collectors.toList());

  Stream API 是什麼？

  // 傳統寫法
  List<CartItemResponse> itemResponses = new ArrayList<>();
  for (CartItem item : cart.getCartItems()) {
      CartItemResponse response = convertItemToResponse(item);
      itemResponses.add(response);
  }

  // Stream 寫法
  List<CartItemResponse> itemResponses = cart.getCartItems().stream()
          .map(this::convertItemToResponse)
          .collect(Collectors.toList());

      // 計算統計資訊
      int totalItems = itemResponses.size();
      int totalQuantity = itemResponses.stream()
              .mapToInt(CartItemResponse::getQuantity)
              .sum();
      BigDecimal totalAmount = itemResponses.stream()
              .map(CartItemResponse::getSubtotal)
              .reduce(BigDecimal.ZERO, BigDecimal::add);

  計算過程：
  items = [
      {quantity: 5, subtotal: 1750},
      {quantity: 1, subtotal: 680}
  ]

  totalItems = 2 (items.size())
  totalQuantity = 5 + 1 = 6
  totalAmount = 1750 + 680 = 2430

---

## 建立 Controller（控制器）

7.1 為什麼需要從 SecurityContext 取得用戶 ID？

  private Long getCurrentUserId() {
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

      if (authentication == null || !authentication.isAuthenticated()) {
          throw new RuntimeException("用戶未登入");
      }

      Object principal = authentication.getPrincipal();
      if (principal instanceof UserPrincipal) {
          return ((UserPrincipal) principal).getId();
      }

      throw new RuntimeException("無法獲取用戶資訊");
  }

  流程：
  1. 用戶登入 → 取得 JWT Token
  2. 發送請求時帶上 Token
     Authorization: Bearer eyJhbGc...
  3. JwtAuthenticationFilter 驗證 Token
  4. 從 Token 解析出 UserPrincipal
  5. 放入 SecurityContext
  6. Controller 從 SecurityContext 取得用戶 ID

  為什麼不直接從參數傳入 userId？

  // ❌ 危險做法
  @GetMapping("/cart")
  public CartResponse getCart(@RequestParam Long userId) {
      // 用戶可以傳任何 userId，看到別人的購物車！
  }

  // ✓ 安全做法
  @GetMapping("/cart")
  public CartResponse getCart() {
      Long userId = getCurrentUserId();  // 從 Token 取得，無法偽造
  }

  7.2 REST API 設計原則

  @GetMapping              // 查詢
  @PostMapping("/items")   // 新增
  @PutMapping("/items/{id}") // 更新
  @DeleteMapping("/items/{id}") // 刪除

  HTTP 方法選擇：
  - GET：查詢資料（不修改）
  - POST：新增資料
  - PUT：更新資料（完整替換）
  - PATCH：更新資料（部分修改）
  - DELETE：刪除資料

  為什麼 addToCart 用 POST /items 而不是 POST /cart？

  POST /api/cart          ← 創建購物車
  POST /api/cart/items    ← 加入商品到購物車

  符合 RESTful 設計：
  - /cart 是資源
  - /cart/items 是子資源

---

## 安全配置

8.1 為什麼要配置權限？

  .authorizeHttpRequests(auth -> {
      auth.requestMatchers("/api/cart/**").authenticated();
  })

  authenticated() 是什麼意思？
  - 必須登入才能訪問
  - 沒有 Token 會被拒絕（401 Unauthorized）

  8.2 為什麼要 CSRF 豁免？

  .csrf(csrf -> {
      csrf.ignoringRequestMatchers("/api/cart/**");
  })

  CSRF（跨站請求偽造）是什麼？

  惡意網站的攻擊：
  <!-- 惡意網站 evil.com -->
  <form action="https://yoursite.com/api/cart/items" method="POST">
      <input name="productId" value="999">
      <input name="quantity" value="100">
  </form>
  <script>document.forms[0].submit();</script>

  如果你登入過 yoursite.com，瀏覽器會自動帶上 Cookie，惡意請求會成功！

  防禦方法：

  1. Cookie-based CSRF Token（傳統方式）
    - 需要前端從 Cookie 讀取 Token 並放入 Header
  2. JWT Token（現代方式）
    - 不使用 Cookie
    - Token 需要手動放入 Header
    - 惡意網站無法取得 Token

  我們使用 JWT，所以可以豁免 CSRF 保護。

---

## 測試與除錯

9.1 測試流程

  # 1. 註冊用戶
  POST /api/auth/register
  → 回傳 Token

  # 2. 查詢購物車（自動創建）
  GET /api/cart
  Authorization: Bearer {token}
  → 回傳空購物車

  # 3. 加入商品
  POST /api/cart/items
  {
    "productId": 3,
    "quantity": 2
  }
  → 購物車有 1 種商品，2 個，總計 $700

  # 4. 再加入商品
  POST /api/cart/items
  {
    "productId": 6,
    "quantity": 1
  }
  → 購物車有 2 種商品，3 個，總計 $1380

  # 5. 更新數量
  PUT /api/cart/items/1
  {
    "quantity": 5
  }
  → 數量變成 5 個，總計變成 $2430

  9.2 常見錯誤

  錯誤 1：只讀事務錯誤
  ERROR: cannot execute INSERT in a read-only transaction
  → 解決：移除 @Transactional(readOnly = true)

  錯誤 2：CSRF 保護攔截
  HTTP/1.1 403 Forbidden
  → 解決：將 /api/cart/** 加入 CSRF 豁免

  錯誤 3：N+1 查詢問題
  SELECT * FROM cart WHERE id = 1;
  SELECT * FROM cart_item WHERE cart_id = 1;
  SELECT * FROM product WHERE id = 3;  -- 第1個商品
  SELECT * FROM product WHERE id = 6;  -- 第2個商品
  SELECT * FROM product WHERE id = 7;  -- 第3個商品
  ...
  → 解決：使用 @EntityGraph 或 JOIN FETCH

  ---
  總結：完整架構圖

  HTTP 請求
      ↓
  Controller
  - 接收請求
  - 驗證輸入
  - 取得用戶 ID
      ↓
  Service
  - 業務邏輯
  - 庫存檢查
  - 數量計算
  - 事務管理
      ↓
  Repository
  - 資料庫操作
  - SQL 查詢
      ↓
  Database
  - 儲存資料

  資料流動：
  Request DTO → Service → Entity → Repository → Database
  Database → Repository → Entity → Service → Response DTO