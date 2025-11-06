## First Normal Form (1NF) 第一正規化

1. 不允許使用行的順序來傳達資訊 (Using row order to convey information is not permitted)
2. 不允許在同一個欄位中混合不同的資料類型 (Mixing data types within the same column is not permitted)
3. 不允許表格沒有主鍵 (Having a table without a primary key is not permitted)
4. 不允許有重複群組 (Repeating groups are not permitted)

---

## Second Normal Form (2NF) 第二正規化

表格中的每個非鍵屬性都必須完全依賴於整個主鍵 (Each non-key attribute in the table must be dependent on the entire primary key)

---

## Third Normal Form (3NF) 第三正規化

表格中的每個非鍵屬性都必須依賴於鍵（主鍵），完整的鍵，以及除了鍵之外什麼都不依賴 (Each non-key attribute in the table must depend on the key, the whole key, and nothing but the key)

---

## Boyce-Codd Normal Form (BCNF) Boyce-Codd 正規化

表格中的每個屬性都必須依賴於鍵（主鍵），完整的鍵，以及除了鍵之外什麼都不依賴 (Each attribute in the table must depend on the key, the whole key, and nothing but the key)

---

## Fourth Normal Form (4NF) 第四正規化

表格中唯一允許存在的多值相依性是對主鍵的多值相依性 (The only kinds of multivalued dependency allowed in a table are multivalued dependencies on the key)

---

## Fifth Normal Form (5NF) 第五正規化

表格不能被描述為其他表格進行聯結（join）後的邏輯結果 (It must not be possible to describe the table as being the logical result of joining some other tables together)
