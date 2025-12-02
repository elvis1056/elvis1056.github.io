java 從「本地開發」->「Docker」測試->「部署上線」

---

### 本地開發（不用 Docker）

步驟 1：確認配置檔案

檢查你的檔案：

# 你已經有這些檔案

.env
src/main/resources/application-dev.properties

.env 內容（開發用）：
SPRING_PROFILES_ACTIVE=dev
COOKIE_SECURE=false
JWT_SECRET=xxx
JWT_EXPIRATION_MS=3600000
JWT_REFRESH_EXPIRATION_MS=604800000
REFRESH_TOKEN_EXPIRATION_DAYS=7

步驟 2：本地運行測試

# 用 Maven 直接運行（不用 Docker）

./mvnw spring-boot:run

# 或用 IDE (IntelliJ/Eclipse) 直接執行 Application.java

步驟 3：測試 API

# 測試 CSRF

curl http://localhost:8080/api/csrf

# 測試登入（如果有測試帳號）

curl -X POST http://localhost:8080/api/auth/login \
 -H "Content-Type: application/json" \
 -d '{"username":"test","password":"test"}'

確認功能正常後，進入下一階段。

---

### Docker 本地測試

步驟 1：確認 Dockerfile 正確

你的 Dockerfile 已經沒問題了。

步驟 2：確認 .env 設定（開發用）

.env 應該保持開發環境的設定：
SPRING_PROFILES_ACTIVE=dev
COOKIE_SECURE=false
JWT_SECRET=xxx
JWT_EXPIRATION_MS=3600000
JWT_REFRESH_EXPIRATION_MS=604800000
REFRESH_TOKEN_EXPIRATION_DAYS=7

步驟 3：建立 Docker Image

# 建立 image

docker build -t myproject-backend .

# 確認 image 建立成功

docker images | grep myproject-backend

步驟 4：運行 Docker 容器

# 運行容器

docker run -d --name my-backend -p 8080:8080 --env-file .env myproject-backend

# 確認容器運行中

docker ps

步驟 5：測試 Docker 容器

# 查看日誌

docker logs my-backend

# 測試 API

curl http://localhost:8080/api/csrf

步驟 6：測試完畢，清理容器

# 停止並刪除容器

docker stop my-backend && docker rm my-backend

Docker 測試通過後，準備部署。

---

### 署到生產環境（Render / AWS / Heroku / xxx）

步驟 1：準備生產環境的配置

重要：不要把 .env 提交到 Git！

檢查 .gitignore 是否有：
.env

步驟 2：推送程式碼到 Git

# 確認狀態

git status

# 提交變更

git add .
git commit -m "準備部署到生產環境"

# 推送到 GitHub

git push origin main

步驟 3：在部署平台設定環境變數

以 Render 為例，在 Dashboard 設定：

進入你的 Web Service → Environment 分頁 → 新增環境變數：

| Key                           | Value                             | 說明                               |
| ----------------------------- | --------------------------------- | ---------------------------------- |
| SPRING_PROFILES_ACTIVE        | prod                              | 使用生產環境配置                   |
| DATABASE_URL                  | postgres://user:pass@host:5432/db | PostgreSQL 連線（Render 自動提供） |
| DATABASE_USERNAME             | your_username                     | 資料庫帳號                         |
| DATABASE_PASSWORD             | your_password                     | 資料庫密碼                         |
| JWT_SECRET                    | 生產環境專用的密鑰                | 不要用開發的！重新生成             |
| JWT_EXPIRATION_MS             | 3600000                           | Access token 過期時間              |
| JWT_REFRESH_EXPIRATION_MS     | 604800000                         | Refresh token 過期時間             |
| REFRESH_TOKEN_EXPIRATION_DAYS | 7                                 | Refresh token cookie 天數          |

不需要設定 COOKIE_SECURE ← 因為 application-prod.properties 已經設定為 true

步驟 4：生成生產環境專用的 JWT_SECRET

# 在你的電腦執行（生成安全的密鑰）

openssl rand -base64 64 | tr -d '\n'

# 把輸出的結果複製到 Render 的 JWT_SECRET 環境變數

步驟 5：部署

Render 會自動：

1. 拉取你的 Git 程式碼
2. 執行 Dockerfile 建立 image
3. 用你設定的環境變數運行容器
4. 提供 HTTPS 網址（例如：https://your-app.onrender.com）

步驟 6：測試生產環境

# 測試 CSRF（注意是 HTTPS）

curl https://your-app.onrender.com/api/csrf

# 檢查 Cookie 是否有 Secure 標記

curl -v https://your-app.onrender.com/api/csrf 2>&1 | grep -i "set-cookie"

# 應該看到：Set-Cookie: XSRF-TOKEN=xxx; Path=/; Secure
