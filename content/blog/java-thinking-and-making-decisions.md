所有關鍵決策總覽

Entity 層的決策

| 決策點                 | 選項                                                            | 我的選擇                  | 原 因                                 |
| ---------------------- | --------------------------------------------------------------- | ------------------------- | ------------------------------------- |
| 父子關係實作方式       | A) parent_id 欄位B) 中間表                                      | A) parent_id              | 簡單直觀，兩層分類用不到中間表        |
|  |
| 刪除父分類時的行為     | A) CASCADE 刪除子分類B) 防止刪除                                | B) 防止刪除               |
| 安全，避免誤刪大量資料 |
| 懶加載 vs 立即加載     | A) LAZYB) EAGER                                                 | A) LAZY                   | 效能 考量，不是每次都需要載入關聯資料 |
|  |
| 時間戳記實作           | A) @PrePersist/@PreUpdateB) @CreationTimestamp/@UpdateTimestamp | A) @PrePersist/@PreUpdate | 完全控制，不依賴 Hibernate 特定註解   |
| JSON 序列化策略        | A) 允許循環引用B) @JsonIgnore 阻止                              | B) @JsonIgnore            | 防止無窮遞迴，在 DTO                  |
| 層處理顯示             |

實際程式碼：
// parent_id 實作
@ManyToOne(fetch = FetchType.LAZY) // LAZY 加載
@JoinColumn(name = "parent_id")
@JsonIgnore // 防止 JSON 循環引用
private Category parent;

// 防止 CASCADE 刪除
@OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
@JsonIgnore
private List<Category> children;

---

Repository 層的決策

| 決策點         | 選項                                        | 我的選擇                  | 原因                                  |
| -------------- | ------------------------------------------- | ------------------------- | ------------------------------------- |
| 查詢方法命名   | A) Spring Data JPA 方法名B) @Query 手寫 SQL | A) 方法名                 | Spring 自動生成，不用寫 SQL，可讀性高 |
| 檢查存在的方式 | A) existsByName()B) findByName() 然後判斷   | A) existsByName()         | 語意清楚，效能更好（只查數量 ）       |
| 排除自己的查詢 | A) existsByNameAndIdNot()B) Service 層過濾  | A) existsByNameAndIdNot() | 一次查詢完成，效能好                  |

實際程式碼：
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
// 方法名自動轉 SQL
List<Category> findByParentIsNull(); // WHERE parent_id IS NULL
boolean existsByName(String name); // SELECT COUNT(\*) ...
boolean existsByNameAndIdNot(String name, Long id); // 更新時檢查重複
}

---

DTO 層的決策

| 決策點                 | 選項                                              | 我的選擇         | 原因                       |
| ---------------------- | ------------------------------------------------- | ---------------- | -------------------------- |
| Request vs Entity      | A) 直接用 EntityB) 用 DTO                         | B) 用 DTO        | 安全、解耦、驗證方便       |
| 父分類傳遞方式         | A) 傳整個 parent 物件B) 只傳 parentId             | B) 只傳 parentId | 簡單、避免嵌套複雜 度      |
| 子分類顯示策略         | A) 完整遞迴B) 簡化版（兩層止）                    | B) 簡化版        | 避免無窮遞迴 、效能好      |
| 額外資訊               | A) 只回傳基本資料B) 加上 isTopLevel, productCount | B) 加上額外資訊  | 前端方便使用，減少二次查詢 |
| Builder vs Constructor | A) @AllArgsConstructorB) @Builder                 | B) @Builder      | 可讀性高、選擇性建立欄位   |

實際程式碼：
// Request DTO
public class CategoryRequest {
private String name;
private Long parentId; // ← 只要 ID，不要整個物件
}

// Response DTO
@Builder
public class CategoryResponse {
private Long parentId;
private String parentName; // ← 冗餘但方便前端
private List<CategorySimpleResponse> children; // ← 簡化版子分類
private Boolean isTopLevel; // ← 額外資訊
private Integer productCount; // ← 額外資訊
}

---

Service 層的決策

| 決策點           | 選項                                  | 我的選擇          | 原因                                          |
| ---------------- | ------------------------------------- | ----------------- | --------------------------------------------- |
| 層級限制實作位置 | A) 資料庫約束B) Service 驗證          | B) Service 驗證   | 彈性、錯誤訊息清楚                            |
| 錯誤處理方式     | A) 回傳 nullB) 拋出 Exception         | B) 拋出 Exception | 明確、容易追蹤、Spring 統一處理               |
| Transaction 範圍 | A) 只寫入加 @TransactionalB) 讀寫都加 | B) 讀寫都加       | 讀取加 readOnly=true 優化效能、解決懶加載問題 |
| DTO 轉換位置     | A) ControllerB) Service               | B) Service        | Service 對 Entity 有完整控制                  |
| 重複名稱檢查時機 | A) 只在建立時B) 建立和更新都要        | B) 建立和更新     | 完整性、避免更新時衝突                        |

實際程式碼：
// 層級限制在 Service
if (!parent.isTopLevel()) {
throw new RuntimeException("不允許建立超過兩層的分類結構");
}

// 寫入 Transaction
@Transactional
public CategoryResponse createCategory(...) { }

// 讀取 Transaction（效能優化 + 解決懶加載）
@Transactional(readOnly = true)
public CategoryResponse getCategoryById(...) { }

// 拋出 Exception
throw new RuntimeException("分類名稱已存在：" + request.getName());

---

Controller 層的決策

| 決策點                     | 選項                                  | 我的選擇          | 原因                                       |
| -------------------------- | ------------------------------------- | ----------------- | ------------------------------------------ |
| REST 設計風格              | A) /createCategoryB) POST /categories | B) RESTful        | 業界標準                                   |
| 狀態碼選擇                 | A) 全用 200B) 語意化狀態碼            | B) 語意化         | 201 Created, 204 No Content, 404 Not Found |
| 參數驗證                   | A) 手動檢查B) @Valid                  | B) @Valid         | 自動驗證、程式碼簡潔                       |
| ResponseEntity vs 直接回傳 | A) 直接回傳物件B) 用 ResponseEntity   | B) ResponseEntity | 完整控制 HTTP 回應（狀態碼、Header）       |
|  |

實際程式碼：
// RESTful 設計
@PostMapping // POST /api/categories
public ResponseEntity<CategoryResponse> createCategory(
@Valid @RequestBody CategoryRequest request // ← @Valid 自動驗證
) {
CategoryResponse response = categoryService.createCategory(request);
return ResponseEntity.status(HttpStatus.CREATED).body(response); // ← 201
}

@DeleteMapping("/{id}")
public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
categoryService.deleteCategory(id);
return ResponseEntity.noContent().build(); // ← 204
}

---

SecurityConfig 層的決策

| 決策點               | 選項                      | 我的選擇       | 原因                                       |
| -------------------- | ------------------------- | -------------- | ------------------------------------------ |
| 查詢分類權限         | A) 需要登入B) 公開        | B) 公開        | 瀏覽商品分類是基本功能                     |
| 管理分類權限         | A) 登入即可B) ADMIN only  | B) ADMIN only  | 防止一般用戶亂改分類                       |
| CSRF 保護            | A) 啟用B) API 關閉        | B) 關閉        | RESTful API 用 JWT，不需要 CSRF            |
| HTTP Method 級別控制 | A) URL 級別B) Method 級別 | B) Method 級別 | 精細控制（GET 公開，POST/PUT/DELETE 限制） |

實際程式碼：
// CSRF 忽略
.csrf(csrf -> {
csrf.ignoringRequestMatchers("/api/categories/\*\*"); // ← JWT 不需要 CSRF
})

// Method 級別權限控制
.authorizeHttpRequests(auth -> {
// 公開查詢
auth.requestMatchers(HttpMethod.GET, "/api/categories/**").permitAll();
// ADMIN 管理
auth.requestMatchers(HttpMethod.POST, "/api/categories/**").hasRole("ADMIN");
auth.requestMatchers(HttpMethod.PUT, "/api/categories/**").hasRole("ADMIN");
auth.requestMatchers(HttpMethod.DELETE, "/api/categories/**").hasRole("ADMIN");
})

---

業務邏輯的決策

| 決策點             | 選項                           | 我的選擇 | 原因                   |
| ------------------ | ------------------------------ | -------- | ---------------------- |
| 分類層級限制       | A) 無限層級B) 兩層             | B) 兩層  | 你的需求、簡化前端顯示 |
| 刪除有子分類的分類 | A) 允許（CASCADE）B) 禁止      | B) 禁止  | 安全、防止誤刪         |
| 刪除有產品的分類   | A) 允許B) 禁止                 | B) 禁止  | 防止產品變孤兒         |
| 重複名稱           | A) 允許B) 禁止                 | B) 禁止  | 避免混淆               |
| 修改為自己的子分類 | A) 允許B) 禁止                 | B) 禁止  | 防止循環引用           |
| 有子分類變為子分類 | A) 允許（CASCADE 調整）B) 禁止 | B) 禁止  | 簡化邏輯、避免複雜重組 |

實際程式碼：
// 兩層限制
if (!parent.isTopLevel()) {
throw new RuntimeException("不允許建立超過兩層的分類結構");
}

// 刪除保護
if (category.hasChildren()) {
throw new RuntimeException("該分類下有子分類，無法刪除");
}
if (!category.getProducts().isEmpty()) {
throw new RuntimeException("該分類下有產品，無法刪除");
}

// 自我引用檢查
if (request.getParentId().equals(id)) {
throw new RuntimeException("分類不能成為自己的子分類");
}

---

📋 決策總結表

| 層級       | 核心決策 | 選擇                               |
| ---------- | -------- | ---------------------------------- |
| Entity     | 關係實作 | parent_id + LAZY 加載              |
| Repository | 查詢方式 | Spring Data JPA 方法名             |
| DTO        | 資料傳遞 | Request/Response 分離，只傳 ID     |
| Service    | 業務規則 | 兩層限制、刪除保護、拋出 Exception |
| Controller | API 設計 | RESTful + 語意化狀態碼             |
| Security   | 權限控制 | GET 公開、POST/PUT/DELETE ADMIN    |

這些決策為什麼重要？

好決策的影響：

- ✅ 可維護性 - Repository 用方法名，未來接手的人一看就懂
- ✅ 安全性 - 刪除保護、權限控制，避免資料災難
- ✅ 效能 - LAZY 加載、readOnly=true、existsByName 而非 findByName
- ✅ 擴展性 - DTO 解耦，未來改 Entity 不影響 API
