java 使用環境變數的知識

---

Spring Boot 設定的優先順序

Spring Boot 載入配置的順序：

1. application-{profile}.properties ← 優先
2. 環境變數 (如 .env 或系統環境變數)
3. application.properties
4. @Value 的預設值

---

✅ 正確的開發/部署流程

```
開發環境：

.env 只需要：

# 不用設定 COOKIE_SECURE（application-dev.properties 已經設定）

SPRING_PROFILES_ACTIVE=dev

# 如果要覆蓋其他設定，可以加上（可選）

JWT_SECRET=your-dev-secret

啟動 Docker：
docker run -d --name my-backend -p 8080:8080 --env-file .env myproject-backend
```

---

```
生產環境（Render / AWS / Heroku）：

只需要設定環境變數：
SPRING_PROFILES_ACTIVE=prod
DATABASE_URL=postgres://...
DATABASE_USERNAME=your_user
DATABASE_PASSWORD=your_password
JWT_SECRET=your-production-secret-here

# 不用設定 COOKIE_SECURE（application-prod.properties 已經設定為 true）

Spring Boot 會自動：
1. 讀取 SPRING_PROFILES_ACTIVE=prod
2. 載入 application-prod.properties
3. 使用 COOKIE_SECURE=true
```
