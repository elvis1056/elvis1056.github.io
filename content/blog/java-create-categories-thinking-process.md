從「需求」到「程式碼」的思考流程

---

Step 0：理解需求

需求：「我要一個兩層商品分類系統」

先問自己這些問題：

1. 分類需要儲存什麼資料？（名稱、描述、啟用狀態）
2. 分類之間有什麼關係？（父子關係）
3. 分類和產品有什麼關係？（一個產品屬於一個分類）
4. 誰可以管理分類？（ADMIN）
5. 使用者可以做什麼操作？（CRUD）

---

📐 設計順序（由內到外）

順序 1：Entity（資料模型） - 最核心

為什麼先寫 Entity？

- Entity 是資料的藍圖，其他都圍繞著它
- 它決定了資料庫表結構
- 它是整個系統的「骨架」

思考過程：

需求：「兩層分類，父子關係」

↓ 思考

資料庫表應該長這樣：
┌──────────────────┐
│ category │
├──────────────────┤
│ id (PK) │
│ name │
│ description │
│ parent_id (FK) │ ← 自關聯！指向自己的表
│ active │
│ created_at │
│ updated_at │
└──────────────────┘

↓ 轉換成程式碼

```
@Entity
public class Category {
  @Id
  private Long id;
  private String name;
  private String description;

  // 重點：自關聯
  @ManyToOne
  private Category parent;

  @OneToMany(mappedBy = "parent")
  private List<Category> children;
}
```

關鍵決策點：

- ❓ 用 parent_id 還是用中間表？→ parent_id 簡單夠用
- ❓ 要不要限制層級？→ 加 Service 層驗證
- ❓ 刪除父分類時子分類怎麼辦？→ cascade 或防止刪除

---

順序 2：Repository（資料存取層）

為什麼第二步是 Repository？

- Entity 確定後，就知道需要哪些查詢方法
- Repository 是「直接對話資料庫」的層

思考過程：

需求分析：

1. 需要查詢所有分類 → findAll() (JPA 內建)
2. 需要查詢頂層分類 → findByParentIsNull()
3. 需要查詢某個父分類的子分類 → findByParentId(Long parentId)
4. 需要檢查名稱重複 → existsByName(String name)

↓ 轉換成程式碼

```
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
  List<Category> findByParentIsNull();
  List<Category> findByParentId(Long parentId);
  boolean existsByName(String name);
}
```

Spring Data JPA 的魔法：

- findByParentIsNull → 自動轉成 WHERE parent_id IS NULL
- findByParentId → 自動轉成 WHERE parent_id = ?
- 不用寫 SQL！

---

順序 3：DTO（資料傳輸物件）

為什麼需要 DTO？

- Request DTO：前端傳來的資料格式
- Response DTO：回傳給前端的資料格式
- 不直接用 Entity 的原因：
  a. 安全性（不暴露資料庫結構）
  b. 避免循環引用（Entity 有雙向關聯）
  c. 彈性（前端需要的格式 ≠ 資料庫格式）

思考過程：

前端要建立分類時會傳什麼？
{
"name": "手機",
"description": "智慧型手機",
"parentId": 1, ← 不是整個 parent 物件，只要 ID
"active": true
}

↓ 設計 Request DTO

public class CategoryRequest {
private String name;
private String description;
private Long parentId; ← 只要 ID
private Boolean active;
}

前端需要什麼格式的回應？
{
"id": 3,
"name": "手機",
"parentId": 1,
"parentName": "電子產品", ← 方便顯示
"children": [...], ← 子分類列表
"isTopLevel": false, ← 額外資訊
"productCount": 0 ← 額外資訊
}

↓ 設計 Response DTO

public class CategoryResponse {
private Long id;
private String name;
private Long parentId;
private String parentName;
private List<CategorySimpleResponse> children;
private Boolean isTopLevel;
private Integer productCount;
}

---

順序 4：Service（業務邏輯層）- 最複雜

為什麼 Service 最重要？

- 所有業務規則都在這裡
- Repository 只是「拿資料」，Service 決定「怎麼用資料」

思考過程：

需求：建立分類

↓ 分解步驟

1. 驗證名稱不重複
2. 如果有 parentId，檢查父分類是否存在
3. 檢查父分類是否為頂層（防止三層分類）
4. 建立 Category 物件
5. 儲存到資料庫
6. 轉換成 Response DTO 回傳

↓ 轉換成程式碼

public CategoryResponse createCategory(CategoryRequest request) {
// 步驟 1
if (categoryRepository.existsByName(request.getName())) {
throw new RuntimeException("分類名稱已存在");
}

      Category category = new Category();
      category.setName(request.getName());

      // 步驟 2, 3
      if (request.getParentId() != null) {
          Category parent = categoryRepository.findById(request.getParentId())
              .orElseThrow(() -> new RuntimeException("父分類不存在"));

          if (!parent.isTopLevel()) {
              throw new RuntimeException("不允許三層分類");
          }

          category.setParent(parent);
      }

      // 步驟 4, 5
      Category saved = categoryRepository.save(category);

      // 步驟 6
      return convertToResponse(saved);

}

Service 層的關鍵決策：

- ❓ 驗證邏輯放這裡還是 Controller？→ Service（可重用）
- ❓ 權限檢查放這裡嗎？→ 不用（Spring Security 處理）
- ❓ Transaction 要加嗎？→ 要（保證資料一致性）

---

順序 5：Controller（API 層）- 對外介面

Controller 的職責：

- 接收 HTTP 請求
- 呼叫 Service
- 回傳 HTTP 回應

思考過程：

需求：提供 RESTful API

↓ 設計 API 端點

POST /api/categories ← 建立
GET /api/categories ← 查詢所有
GET /api/categories/{id} ← 查詢單一
PUT /api/categories/{id} ← 更新
DELETE /api/categories/{id} ← 刪除

↓ 轉換成程式碼

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

      private final CategoryService categoryService;

      @PostMapping
      public ResponseEntity<CategoryResponse> createCategory(
          @Valid @RequestBody CategoryRequest request
      ) {
          CategoryResponse response = categoryService.createCategory(request);
          return ResponseEntity.status(HttpStatus.CREATED).body(response);
      }

      @GetMapping("/{id}")
      public ResponseEntity<CategoryResponse> getCategoryById(
          @PathVariable Long id
      ) {
          CategoryResponse category = categoryService.getCategoryById(id);
          return ResponseEntity.ok(category);
      }

}

Controller 層的關鍵決策：

- ❓ 用 @RestController 還是 @Controller？→ @RestController（RESTful API）
- ❓ 回傳 200 還是 201？→ POST 用 201 Created
- ❓ 需要 @Valid 嗎？→ 需要（觸發 Bean Validation）

---

🔄 完整的思考流程圖

需求分析
↓
【Entity】設計資料結構
↓ (知道要存什麼資料)
【Repository】設計查詢方法
↓ (知道需要哪些查詢)
【DTO】設計輸入輸出格式
↓ (知道前端需要什麼)
【Service】實作業務邏輯
↓ (知道如何處理資料)
【Controller】暴露 API
↓
【SecurityConfig】設定權限
↓
測試

---

💡 實際開發時的思考順序

以「建立分類」為例：

1. 先想資料庫（Entity）
   Q: 分類要存什麼？
   A: id, name, description, parent_id, active

2. 再想查詢（Repository）
   Q: 建立分類前要檢查什麼？
   A: 名稱是否重複 → existsByName()
   父分類是否存在 → findById()

3. 想輸入輸出（DTO）
   Q: 前端會傳什麼？
   A: {name, description, parentId, active}

Q: 前端要收到什麼？
A: {id, name, parentId, parentName, children, ...}

4. 想流程（Service）
   Q: 建立分類的步驟？
   A: 1. 驗證名稱 2. 檢查父分類 3. 檢查層級 4. 儲存 5. 轉換 DTO

5. 想 API（Controller）
   Q: 用什麼 HTTP 方法？
   A: POST

Q: URL 是什麼？
A: /api/categories

Q: 成功回傳什麼狀態碼？
A: 201 Created

---

🎓 給你的建議

下次寫新功能時，這樣思考：

1. 畫出資料結構 - 用筆畫出資料庫表
2. 列出 CRUD 操作 - 需要哪些操作？
3. 寫 Entity - 轉成 Java 程式碼
4. 寫 Repository - 需要哪些查詢方法？
5. 寫 DTO - 前端傳什麼？要回什麼？
6. 寫 Service - 一步步寫業務邏輯
7. 寫 Controller - 暴露 API
8. 測試 - 用 Postman 或 curl 測試
