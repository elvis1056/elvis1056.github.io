讓我慢慢幫你解析 RegisterRequest 的 Entity 設計。我會從零開始解釋給你聽。

---

Entity 的詳細解釋。讓我好好跟你說明 User.java 這個 Entity 的設計。

---

📦 一、Entity 是什麼？

Entity = 資料庫表格的 Java 物件映射

想像：
資料庫裡有一張表格叫 "users"
↕️ （JPA 自動映射）
Java 裡有一個類別叫 "User"

關鍵概念：ORM（Object-Relational Mapping）

物件導向世界（Java） 關聯式資料庫世界（SQL）
───────────────────── ─────────────────────
User 類別 ←→ users 表格
User 的屬性 ←→ 表格的欄位
User 的實例 ←→ 表格的一筆資料

---

🔍 二、逐行解析 User.java

讓我把你的 User.java 分段解釋：

1️⃣ 類別層級的 Annotations

@Entity
@Table(name = "users")
public class User {

| Annotation             | 作用                         | 對應 SQL                 |
| ---------------------- | ---------------------------- | ------------------------ |
| @Entity                | 告訴 JPA：這是一個資料庫實體 | 會自動建表格             |
| @Table(name = "users") | 指定表格名稱為 "users"       | CREATE TABLE users (...) |

如果不寫 @Table(name = "users")：

- 預設表格名稱會是類別名稱的小寫：user
- 但通常表格名稱用複數（users），所以要明確指定

---

2️⃣ Lombok Annotations

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

| Annotation          | 產生的程式碼                         | 用途           |
| ------------------- | ------------------------------------ | -------------- |
| @Getter             | 所有欄位的 getXxx() 方法             | 讀取資料       |
| @Setter             | 所有欄位的 setXxx() 方法             | 修改資料       |
| @NoArgsConstructor  | User() 無參數建構子                  | JPA 需要       |
| @AllArgsConstructor | User(id, username, ...) 全參數建構子 | 方便建立物件   |
| @Builder            | Builder 模式                         | 優雅地建立物件 |

為什麼 Entity 用 @Getter/@Setter 而不是 @Data？

@Data 包含 @EqualsAndHashCode 和 @ToString，對 Entity 來說可能有問題：

- @EqualsAndHashCode 在有關聯關係（如 OneToMany）時可能造成無窮迴圈
- 所以 Entity 通常只用 @Getter + @Setter

---

3️⃣ 主鍵（Primary Key）

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

| Annotation          | 作用                 | 對應 SQL                                |
| ------------------- | -------------------- | --------------------------------------- |
| @Id                 | 這是主鍵             | PRIMARY KEY                             |
| @GeneratedValue     | 自動產生值           | AUTO_INCREMENT                          |
| strategy = IDENTITY | 使用資料庫的自動遞增 | MySQL: AUTO_INCREMENTPostgreSQL: SERIAL |

SQL 對應：
CREATE TABLE users (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
...
);

為什麼是 Long 而不是 int？

- Long 可以存到 2^63-1（約 9,000,000,000,000,000,000）
- int 只能存到 2^31-1（約 2,000,000,000）
- 用戶數量超過 20 億？不太可能，但 Long 更保險

---

4️⃣ 一般欄位（Basic Columns）

@Column(nullable = false, unique = true, length = 50)
private String username;

@Column 的常用屬性：

| 屬性              | 作用         | 對應 SQL       |
| ----------------- | ------------ | -------------- |
| nullable = false  | 不能為 null  | NOT NULL       |
| unique = true     | 值必須唯一   | UNIQUE         |
| length = 50       | 字串最大長度 | VARCHAR(50)    |
| updatable = false | 不能被更新   | 用於 createdAt |

完整 SQL 對應：
CREATE TABLE users (
username VARCHAR(50) NOT NULL UNIQUE,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
full_name VARCHAR(100),
phone_number VARCHAR(20),
...
);

---

5️⃣ 密碼欄位的特殊處理

@Column(nullable = false, length = 255)
@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
private String password;

@JsonProperty(access = WRITE_ONLY) 的作用：

| 情境             | 行為                                          |
| ---------------- | --------------------------------------------- |
| 接收 JSON (寫入) | ✅ 允許：{"password": "secret123"}            |
| 回傳 JSON (讀取) | ❌ 隱藏：{"username": "john"} (沒有 password) |

為什麼要這樣？

// 前端送來註冊請求
{
"username": "john",
"password": "secret123" // ✅ 可以接收
}

// 後端回傳使用者資料
{
"username": "john",
"email": "john@example.com"
// ❌ 不會回傳 password（安全性！）
}

長度為什麼是 255？

- 原始密碼可能只有 6-20 字元
- 但加密後（BCrypt）會變成 60 字元
- 255 是保守估計，確保未來換加密演算法也夠用

---

6️⃣ 選填欄位（Optional Fields）

@Column(length = 100)
private String fullName;

@Column(length = 20)
private String phoneNumber;

注意：沒有 nullable = false

這代表：

- SQL: full_name VARCHAR(100) NULL（允許 null）
- 使用者註冊時可以不填

---

7️⃣ 列舉類型（Enum）

@Enumerated(EnumType.STRING)
@Column(nullable = false, length = 20)
@Builder.Default
private UserRole role = UserRole.USER;

public enum UserRole {
USER,
ADMIN
}

@Enumerated 有兩種策略：

| 策略             | 儲存方式 | 範例            | 優缺點                                        |
| ---------------- | -------- | --------------- | --------------------------------------------- |
| EnumType.STRING  | 儲存名稱 | "USER", "ADMIN" | ✅ 可讀性高✅ 新增角色不會出錯❌ 佔用空間較大 |
| EnumType.ORDINAL | 儲存索引 | 0, 1            | ✅ 省空間❌ 調整順序會出錯❌ 可讀性差         |

為什麼要用 STRING？

// 如果用 ORDINAL（索引）
public enum UserRole {
USER, // 0
ADMIN // 1
}

// 某天你想加入中間角色
public enum UserRole {
USER, // 0
MODERATOR, // 1 ← 新增
ADMIN // 2 ← 索引改變了！
}

// 💥 資料庫裡原本的 ADMIN (1) 變成 MODERATOR 了！

用 STRING 就不會有這個問題。

@Builder.Default 的作用：

// 如果沒有 @Builder.Default
User user = User.builder()
.username("john")
.build();
// user.role = null ❌

// 有 @Builder.Default
User user = User.builder()
.username("john")
.build();
// user.role = UserRole.USER ✅

---

8️⃣ 布林欄位（Boolean）

@Column(nullable = false)
@Builder.Default
private Boolean enabled = true;

用途：軟刪除（Soft Delete）

// 停用使用者（不是真的刪除）
user.setEnabled(false);
userRepository.save(user);

// 登入時檢查
if (!user.getEnabled()) {
throw new InvalidCredentialsException("Account is disabled");
}

為什麼不直接刪除？

- 保留歷史記錄
- 可以復原
- 符合法規要求（GDPR 可能需要保留日誌）

---

9️⃣ 時間戳記（Timestamps）

@CreationTimestamp
@Column(nullable = false, updatable = false)
private LocalDateTime createdAt;

@UpdateTimestamp
@Column(nullable = false)
private LocalDateTime updatedAt;

| Annotation         | 作用             | 觸發時機            |
| ------------------ | ---------------- | ------------------- |
| @CreationTimestamp | 自動記錄建立時間 | INSERT 時           |
| @UpdateTimestamp   | 自動記錄更新時間 | INSERT 或 UPDATE 時 |

updatable = false 的作用：

@Column(nullable = false, updatable = false)
private LocalDateTime createdAt;

這代表：

- 第一次建立時會寫入時間
- 之後即使執行 UPDATE，這個欄位也不會被修改

實際效果：

User user = new User();
user.setUsername("john");
userRepository.save(user);
// createdAt = 2025-12-03 10:00:00
// updatedAt = 2025-12-03 10:00:00

// 過了一小時，修改使用者資料
user.setFullName("John Doe");
userRepository.save(user);
// createdAt = 2025-12-03 10:00:00 ← 不變
// updatedAt = 2025-12-03 11:00:00 ← 更新

---

🆚 三、Entity vs DTO 完整對照

讓我用表格清楚說明：

RegisterRequest（DTO）

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
@NotBlank
private String username;

      @NotBlank
      @Email
      private String email;

      @NotBlank
      @Size(min = 6, max = 100)
      private String password;

      private String fullName;
      private String phoneNumber;

}

User（Entity）

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

      @Column(nullable = false, unique = true, length = 50)
      private String username;

      @Column(nullable = false, unique = true, length = 100)
      private String email;

      @Column(nullable = false, length = 255)
      @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
      private String password;

      @Column(length = 100)
      private String fullName;

      @Column(length = 20)
      private String phoneNumber;

      @Enumerated(EnumType.STRING)
      @Column(nullable = false, length = 20)
      @Builder.Default
      private UserRole role = UserRole.USER;

      @Column(nullable = false)
      @Builder.Default
      private Boolean enabled = true;

      @CreationTimestamp
      private LocalDateTime createdAt;

      @UpdateTimestamp
      private LocalDateTime updatedAt;

}

差異對照表

| 欄位        | RegisterRequest (DTO)    | User (Entity)                 | 說明                                   |
| ----------- | ------------------------ | ----------------------------- | -------------------------------------- |
| id          | ❌ 沒有                  | ✅ 有                         | 前端不該傳 ID                          |
| username    | ✅ 有                    | ✅ 有                         | 兩邊都需要                             |
| email       | ✅ 有                    | ✅ 有                         | 兩邊都需要                             |
| password    | ✅ 有                    | ✅ 有                         | DTO 用明文，Entity 用加密              |
| fullName    | ✅ 有                    | ✅ 有                         | 兩邊都需要                             |
| phoneNumber | ✅ 有                    | ✅ 有                         | 兩邊都需要                             |
| role        | ❌ 沒有                  | ✅ 有                         | 系統自動設定，防止使用者自己設成 ADMIN |
| enabled     | ❌ 沒有                  | ✅ 有                         | 系統控制的欄位                         |
| createdAt   | ❌ 沒有                  | ✅ 有                         | 系統自動產生                           |
| updatedAt   | ❌ 沒有                  | ✅ 有                         | 系統自動產生                           |
| Annotations | @NotBlank, @Email, @Size | @Entity, @Table, @Column, @Id | DTO 用驗證，Entity 用資料庫映射        |
| 用途        | 接收前端資料             | 映射資料庫表格                | 不同的職責                             |

---

🔄 四、DTO → Entity 轉換流程

在 AuthService.register() 方法中（第 49-57 行）：

// 1. 接收 RegisterRequest（DTO）
public LoginResponse register(RegisterRequest request) {

      // 2. 轉換成 User（Entity）
      User user = User.builder()
              .username(request.getUsername())         // ← 從 DTO 取得
              .email(request.getEmail())               // ← 從 DTO 取得
              .password(passwordEncoder.encode(        // ← 加密密碼
                  request.getPassword()
              ))
              .fullName(request.getFullName())         // ← 從 DTO 取得
              .phoneNumber(request.getPhoneNumber())   // ← 從 DTO 取得
              .role(User.UserRole.USER)                // ← 系統設定（不是從 DTO）
              .enabled(true)                           // ← 系統設定（不是從 DTO）
              // id, createdAt, updatedAt 會自動產生
              .build();

      // 3. 儲存到資料庫
      User savedUser = userRepository.save(user);

}

流程圖：

前端送來 JSON
↓
Spring 自動轉成 RegisterRequest（DTO）
↓
Service 手動轉成 User（Entity）
↓
Repository 儲存到資料庫
↓
資料庫自動產生 id, createdAt

---

📊 五、資料庫表格實際長相

當你啟動應用程式，JPA 會根據 User Entity 自動建立表格：

CREATE TABLE users (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(50) NOT NULL UNIQUE,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
full_name VARCHAR(100),
phone_number VARCHAR(20),
role VARCHAR(20) NOT NULL,
enabled BOOLEAN NOT NULL,
created_at TIMESTAMP NOT NULL,
updated_at TIMESTAMP NOT NULL
);

欄位名稱的轉換（Naming Strategy）：

Java (駝峰式) → SQL (蛇形)

- fullName → full_name
- phoneNumber → phone_number
- createdAt → created_at

---

💡 六、為什麼需要 Entity？

❌ 如果沒有 Entity...

// 你要自己寫 SQL 建表
CREATE TABLE users (...);

// 你要自己寫 SQL 查詢
String sql = "SELECT \* FROM users WHERE username = ?";

// 你要自己把 ResultSet 轉成物件
ResultSet rs = statement.executeQuery(sql);
while (rs.next()) {
User user = new User();
user.setId(rs.getLong("id"));
user.setUsername(rs.getString("username"));
// ... 一堆 setter
}

✅ 有了 Entity...

// JPA 自動建表
// 不用寫 CREATE TABLE

// JPA 自動查詢
User user = userRepository.findByUsername("john");

// JPA 自動映射
// 不用寫一堆 setter

---

🎯 七、總結

Entity 的三大職責：

1. 定義資料庫表格結構
   - @Entity, @Table, @Column

2. 定義欄位規則
   - nullable, unique, length

3. 定義資料行為
   - @CreationTimestamp, @UpdateTimestamp, @Builder.Default

Entity vs DTO：

| 項目               | Entity                | DTO                      |
| ------------------ | --------------------- | ------------------------ |
| 用途               | 映射資料庫表格        | 傳輸資料                 |
| Annotations        | @Entity, @Column, @Id | @NotBlank, @Email, @Size |
| 欄位               | 包含所有資料庫欄位    | 只包含需要傳輸的欄位     |
| 是否直接暴露給前端 | ❌ 不應該             | ✅ 可以                  |

最重要的觀念：

Entity 是資料庫的鏡子，DTO 是前後端溝通的橋樑。
