# 🚀 NAS 網站部署完整 Checklist

> 部署 Next.js + Spring Boot + PostgreSQL 到 Synology NAS  
> 使用 Cloudflare Tunnel（免費方案）

---

## 📋 環境資訊

- **NAS 型號**: Synology DS723+
- **DSM 版本**: 7.2.2-72806
- **前端**: Next.js (SSR)
- **後端**: Spring Boot (Java 17)
- **資料庫**: PostgreSQL
- **網路**: 中華電信（浮動 IP）

---

## ✅ 階段一：準備工作（本機操作）

### □ 1. 準備專案檔案

- [ ] 確認 Spring Boot 專案可以在本機正常運行
- [ ] 確認 Next.js 專案可以在本機正常運行
- [ ] 確認資料庫連線正常

---

### □ 2. 建立 Spring Boot Dockerfile

在 Spring Boot 專案根目錄建立 `Dockerfile`：

```dockerfile
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", \
    "-Djava.security.egd=file:/dev/./urandom", \
    "-XX:+UseContainerSupport", \
    "-XX:MaxRAMPercentage=75.0", \
    "-jar", "app.jar"]
```

**檢查項目：**
- [ ] Dockerfile 已建立在專案根目錄
- [ ] `pom.xml` 在相同目錄下
- [ ] `src/` 資料夾存在

---

### □ 3. 建立 Next.js Dockerfile

在 Next.js 專案根目錄建立 `Dockerfile`：

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

**檢查項目：**
- [ ] Dockerfile 已建立在專案根目錄
- [ ] `package.json` 在相同目錄下

---

### □ 4. 修改 Next.js 設定

編輯 `next.config.js` 或 `next.config.mjs`：

**如果是 `.js`：**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // 其他設定...
}

module.exports = nextConfig
```

**如果是 `.mjs`：**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // 其他設定...
}

export default nextConfig
```

**檢查項目：**
- [ ] 已加入 `output: 'standalone'`
- [ ] 檔案已儲存

---

### □ 5. 建立 docker-compose.yml

建立一個新資料夾 `mywebsite/`，在裡面建立 `docker-compose.yml`：

```yaml
version: '3.8'

services:
  # PostgreSQL 資料庫
  postgres:
    image: postgres:16-alpine
    container_name: mywebsite-postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: mywebsite
      POSTGRES_USER: dbuser
      POSTGRES_PASSWORD: 請改成強密碼123456
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - mywebsite-network

  # Spring Boot Backend
  backend:
    build: ./backend
    container_name: mywebsite-backend
    restart: unless-stopped
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/mywebsite
      SPRING_DATASOURCE_USERNAME: dbuser
      SPRING_DATASOURCE_PASSWORD: 請改成強密碼123456
      SERVER_PORT: 8080
    depends_on:
      - postgres
    networks:
      - mywebsite-network

  # Next.js Frontend
  frontend:
    build: ./frontend
    container_name: mywebsite-frontend
    restart: unless-stopped
    environment:
      NEXT_PUBLIC_API_URL: http://backend:8080
    depends_on:
      - backend
    networks:
      - mywebsite-network

  # Cloudflare Tunnel
  cloudflared:
    image: cloudflare/cloudflared:latest
    container_name: mywebsite-cloudflared
    restart: unless-stopped
    command: tunnel --no-autoupdate run
    environment:
      TUNNEL_TOKEN: 稍後從Cloudflare取得並填入
    networks:
      - mywebsite-network

volumes:
  postgres_data:

networks:
  mywebsite-network:
    driver: bridge
```

**檢查項目：**
- [ ] `docker-compose.yml` 已建立
- [ ] 密碼已修改（不要用預設的）
- [ ] 檔案已儲存

docker run cloudflare/cloudflared:latest tunnel --no-autoupdate run --token eyJhIjoiYWZhYmJkYzYxODg1YTk3NGQwOGUyN2Q5ZWIyM2FmNWMiLCJ0IjoiNGZhYjY4NzEtMzVhNi00Y2QyLTkxOGUtZWM1N2ZjNTBiMTJhIiwicyI6Ik5EWmtaVGd4WldNdFlqRXlZeTAwWWpjNUxXSXlNakF0WkRNMk1qWXpNV1JqTTJFeCJ9

---

### □ 6. 整理專案結構

確認你的本機專案結構如下：

```
mywebsite/
├── docker-compose.yml
├── backend/              (你的 Spring Boot 專案)
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
└── frontend/             (你的 Next.js 專案)
    ├── src/ 或 app/
    ├── package.json
    ├── next.config.js
    └── Dockerfile
```

**檢查項目：**
- [ ] 資料夾結構正確
- [ ] 所有 Dockerfile 都在正確位置
- [ ] docker-compose.yml 在最外層

---

## ✅ 階段二：設定 Cloudflare Tunnel

### □ 7. 註冊 Cloudflare 帳號

- [ ] 前往 https://dash.cloudflare.com/sign-up
- [ ] 註冊免費帳號（**不需要信用卡**）
- [ ] 驗證 email 信箱
- [ ] 登入成功

---

### □ 8. 建立 Tunnel

1. [ ] 登入 Cloudflare Dashboard
2. [ ] 左側選單點選 **Zero Trust**
3. [ ] 點選 **Networks** → **Tunnels**
4. [ ] 點 **Create a tunnel**
5. [ ] 選擇 **Cloudflared**
6. [ ] 輸入 Tunnel 名稱（例如：`mywebsite`）
7. [ ] 點 **Save tunnel**

---

### □ 9. 複製 Tunnel Token

在建立 Tunnel 後的頁面：

1. [ ] 找到安裝指令區域
2. [ ] 看到類似這樣的指令：
   ```
   cloudflared tunnel run --token eyJhIjoixxxxxx...
   ```
3. [ ] 複製 `eyJhIjoixxxxxx...` 這段 token（從 eyJ 開始到結尾）
4. [ ] 回到本機，開啟 `docker-compose.yml`
5. [ ] 找到 `TUNNEL_TOKEN: 稍後從Cloudflare取得並填入`
6. [ ] 把 token 貼上替換掉那段文字
7. [ ] 儲存檔案

**檢查項目：**
- [ ] Token 已正確貼上
- [ ] Token 完整（通常很長）
- [ ] 檔案已儲存

---

### □ 10. 設定 Public Hostname

在 Tunnel 設定頁面：

1. [ ] 點選 **Public Hostname** tab
2. [ ] 點 **Add a public hostname**
3. [ ] 填入以下設定：
   - **Subdomain**: 輸入你想要的名稱（例如：`mywebsite`）
   - **Domain**: 選擇 Cloudflare 提供的免費網域（例如：`xxxxx.workers.dev`）
   - **Service Type**: 選擇 `HTTP`
   - **URL**: 輸入 `frontend:3000`
4. [ ] 點 **Save hostname**
5. [ ] 記下你的完整網址（例如：`https://mywebsite.xxxxx.workers.dev`）

**你的網站網址：** `https://____________________`

---

## ✅ 階段三：NAS 設定

### □ 11. 啟用 NAS SSH

1. [ ] 登入 Synology DSM (`http://192.168.1.113:5000`)
2. [ ] 進入 **控制台** → **終端機 & SNMP**
3. [ ] 勾選 **啟用 SSH 服務**
4. [ ] Port 保持預設 **22**（或記下你改的 port）
5. [ ] 點 **套用**

**檢查項目：**
- [ ] SSH 服務已啟用
- [ ] Port 已記下

---

### □ 12. 安裝 Container Manager

1. [ ] 在 DSM 開啟 **套件中心**
2. [ ] 搜尋 **Container Manager**
3. [ ] 點 **安裝**
4. [ ] 等待安裝完成
5. [ ] 安裝完成後可以在主選單找到 Container Manager

**檢查項目：**
- [ ] Container Manager 已安裝
- [ ] 可以開啟 Container Manager

---

### □ 13. 建立專案資料夾（透過 File Station）

1. [ ] 在 DSM 開啟 **File Station**
2. [ ] 進入根目錄
3. [ ] 如果沒有 `docker` 資料夾，先建立一個
4. [ ] 進入 `docker` 資料夾
5. [ ] 建立新資料夾 `mywebsite`

**資料夾路徑：** `/docker/mywebsite/`

**檢查項目：**
- [ ] 資料夾已建立
- [ ] 路徑正確

---

## ✅ 階段四：上傳檔案到 NAS

### □ 14. 測試 SSH 連線

開啟本機 Terminal，執行：

```bash
ssh 你的NAS帳號@192.168.1.113
```

**如果成功：**
- 會要求輸入密碼
- 輸入後會看到 NAS 的命令列提示

**測試完成後：**
```bash
exit
```

**檢查項目：**
- [ ] SSH 連線成功
- [ ] 可以登入 NAS

---

### □ 15. 上傳專案到 NAS

選擇以下其中一種方法：

#### 方法 A：使用 rsync（Mac/Linux 推薦）

```bash
# 1. 進入你的專案資料夾
cd /path/to/mywebsite

# 2. 上傳整個專案到 NAS
rsync -avz --progress \
  --exclude 'node_modules' \
  --exclude 'target' \
  --exclude '.git' \
  --exclude '.next' \
  ./ 你的NAS帳號@192.168.1.113:/volume1/docker/mywebsite/
```

#### 方法 B：使用 scp（所有系統通用）

```bash
# 1. 進入你的專案資料夾
cd /path/to/mywebsite

# 2. 上傳整個專案
scp -r ./ 你的NAS帳號@192.168.1.113:/volume1/docker/mywebsite/
```

#### 方法 C：使用 File Station（最簡單但較慢）

1. [ ] 開啟 Synology File Station
2. [ ] 進入 `/docker/mywebsite/`
3. [ ] 點擊「上傳」按鈕
4. [ ] 選擇你本機的 `backend` 資料夾並上傳
5. [ ] 選擇你本機的 `frontend` 資料夾並上傳
6. [ ] 選擇 `docker-compose.yml` 並上傳

**檢查項目：**
- [ ] 檔案上傳完成
- [ ] 沒有錯誤訊息

---

### □ 16. 驗證檔案已正確上傳

SSH 連線到 NAS 並檢查：

```bash
# 1. 連線到 NAS
ssh 你的NAS帳號@192.168.1.113

# 2. 列出檔案
ls -la /volume1/docker/mywebsite/
```

**應該看到：**
```
drwxr-xr-x  backend/
drwxr-xr-x  frontend/
-rw-r--r--  docker-compose.yml
```

**檢查項目：**
- [ ] `backend/` 資料夾存在
- [ ] `frontend/` 資料夾存在
- [ ] `docker-compose.yml` 存在

如果正確，輸入 `exit` 登出。

---

## ✅ 階段五：啟動服務

### □ 17. SSH 連線到 NAS

```bash
ssh 你的NAS帳號@192.168.1.113
```

---

### □ 18. 進入專案目錄

```bash
cd /volume1/docker/mywebsite
```

---

### □ 19. 檢查 Docker 是否可用

```bash
# 檢查 Docker 版本
sudo docker --version

# 檢查 Docker Compose 版本
sudo docker-compose --version
```

**應該顯示版本資訊**，例如：
```
Docker version 24.0.7
Docker Compose version 2.23.0
```

**檢查項目：**
- [ ] Docker 可以執行
- [ ] Docker Compose 可以執行

---

### □ 20. 啟動所有服務

```bash
# 第一次啟動（會自動建置 Docker images）
sudo docker-compose up -d
```

**這個步驟會：**
1. 下載 PostgreSQL image
2. 建置 Spring Boot image（會花比較久時間）
3. 建置 Next.js image（會花比較久時間）
4. 下載 Cloudflare Tunnel image
5. 啟動所有容器

**預計時間：** 5-15 分鐘（依 NAS 效能和網路速度）

**檢查項目：**
- [ ] 指令執行中
- [ ] 沒有立即錯誤

---

### □ 21. 查看啟動 Logs

```bash
# 查看所有服務的 logs（即時更新）
sudo docker-compose logs -f
```

**正常情況應該看到：**
- `postgres` 啟動成功
- `backend` 連線資料庫成功
- `frontend` 啟動成功
- `cloudflared` 連線到 Cloudflare

**按 `Ctrl+C` 停止查看（不會停止服務）**

**檢查項目：**
- [ ] 沒有明顯的錯誤訊息
- [ ] 看到服務啟動的訊息

---

### □ 22. 檢查容器狀態

```bash
sudo docker-compose ps
```

**應該看到 4 個容器都是 `Up` 狀態：**

```
NAME                        STATUS
mywebsite-postgres          Up
mywebsite-backend           Up
mywebsite-frontend          Up
mywebsite-cloudflared       Up
```

**檢查項目：**
- [ ] 4 個容器都在運行
- [ ] 狀態都是 `Up`
- [ ] 沒有 `Exited` 或 `Restarting`

---

### □ 23. 檢查個別服務 Logs（如果有問題）

```bash
# 查看 Backend logs
sudo docker-compose logs -f backend

# 查看 Frontend logs
sudo docker-compose logs -f frontend

# 查看 Database logs
sudo docker-compose logs -f postgres

# 查看 Cloudflare Tunnel logs
sudo docker-compose logs -f cloudflared
```

---

## ✅ 階段六：測試與驗證

### □ 24. 測試網站訪問

1. [ ] 開啟瀏覽器
2. [ ] 前往你的 Cloudflare 網址（階段二步驟 10 記下的網址）
3. [ ] 確認網站正常顯示
4. [ ] 測試網站各項功能

**你的網站：** `https://____________________`

---

### □ 25. 測試 API 連線

- [ ] 測試前端是否能正確呼叫後端 API
- [ ] 測試資料庫讀寫功能
- [ ] 檢查是否有錯誤訊息

---

### □ 26. 檢查 HTTPS

1. [ ] 確認網址列開頭是 `https://`
2. [ ] 確認有鎖頭圖示 🔒
3. [ ] 點擊鎖頭，確認憑證有效

---

## ✅ 階段七：日常維護

### 常用指令清單

儲存這些指令，之後維護會用到：

```bash
# ===== 連線到 NAS =====
ssh 你的NAS帳號@192.168.1.113

# ===== 進入專案目錄 =====
cd /volume1/docker/mywebsite

# ===== 查看服務狀態 =====
sudo docker-compose ps

# ===== 查看 Logs =====
sudo docker-compose logs -f                    # 所有服務
sudo docker-compose logs -f backend            # 只看 Backend
sudo docker-compose logs -f frontend           # 只看 Frontend
sudo docker-compose logs -f postgres           # 只看資料庫
sudo docker-compose logs -f cloudflared        # 只看 Tunnel

# ===== 重啟服務 =====
sudo docker-compose restart                    # 重啟所有服務
sudo docker-compose restart backend            # 重啟 Backend
sudo docker-compose restart frontend           # 重啟 Frontend

# ===== 停止服務 =====
sudo docker-compose down                       # 停止並移除容器（資料保留）

# ===== 啟動服務 =====
sudo docker-compose up -d                      # 啟動所有服務

# ===== 更新程式碼後重新建置 =====
sudo docker-compose down
sudo docker-compose build --no-cache
sudo docker-compose up -d

# ===== 只重建特定服務 =====
sudo docker-compose build backend
sudo docker-compose up -d backend

# ===== 清理舊的 images（節省空間）=====
sudo docker image prune -a

# ===== 查看 Docker 磁碟使用 =====
sudo docker system df

# ===== 進入容器內部（除錯用）=====
sudo docker exec -it mywebsite-backend bash
sudo docker exec -it mywebsite-frontend sh
sudo docker exec -it mywebsite-postgres psql -U dbuser -d mywebsite
```

---

## 📝 更新程式碼流程

當你修改程式碼後，按照以下步驟更新到 NAS：

### 步驟 1：在本機上傳更新

```bash
# 進入本機專案目錄
cd /path/to/mywebsite

# 上傳到 NAS
rsync -avz --progress \
  --exclude 'node_modules' \
  --exclude 'target' \
  --exclude '.git' \
  --exclude '.next' \
  ./ 你的NAS帳號@192.168.1.113:/volume1/docker/mywebsite/
```

### 步驟 2：在 NAS 重新建置並啟動

```bash
# SSH 連線到 NAS
ssh 你的NAS帳號@192.168.1.113

# 進入專案目錄
cd /volume1/docker/mywebsite

# 停止服務
sudo docker-compose down

# 重新建置（加 --no-cache 確保使用最新程式碼）
sudo docker-compose build --no-cache

# 啟動服務
sudo docker-compose up -d

# 查看 logs 確認啟動成功
sudo docker-compose logs -f
```

---

## 🔧 常見問題排除

### 問題 1：SSH 連線失敗

```bash
# 確認 NAS IP
ping 192.168.1.113

# 確認 SSH port
ssh -p 22 你的NAS帳號@192.168.1.113

# 如果還是不行，檢查 NAS 的 SSH 設定是否開啟
```

---

### 問題 2：容器無法啟動

```bash
# 查看詳細錯誤
sudo docker-compose logs backend
sudo docker-compose logs frontend

# 檢查容器狀態
sudo docker-compose ps

# 重新啟動
sudo docker-compose restart
```

---

### 問題 3：資料庫連線失敗

**檢查項目：**
1. PostgreSQL 容器是否正常運行
2. `docker-compose.yml` 中的資料庫密碼是否一致
3. Spring Boot 的環境變數是否正確

```bash
# 進入資料庫容器測試連線
sudo docker exec -it mywebsite-postgres psql -U dbuser -d mywebsite

# 如果成功，會進入 PostgreSQL 命令列
# 輸入 \q 離開
```

---

### 問題 4：Cloudflare Tunnel 無法連線

**檢查項目：**
1. Token 是否正確複製
2. Public Hostname 是否正確設定
3. Service URL 是否指向 `frontend:3000`

```bash
# 查看 Cloudflare Tunnel logs
sudo docker-compose logs -f cloudflared

# 應該看到 "Connection established" 字樣
```

---

### 問題 5：網站可以訪問但 API 無法呼叫

**可能原因：**
- Frontend 的 API URL 設定錯誤
- Backend 未正常啟動
- CORS 設定問題

**解決方法：**

1. 檢查 Frontend 環境變數：
   ```yaml
   # docker-compose.yml
   frontend:
     environment:
       NEXT_PUBLIC_API_URL: http://backend:8080
   ```

2. 如果是 client-side 呼叫 API，需要設定第二個 Public Hostname：
   - Subdomain: `api.mywebsite`（或其他）
   - Service Type: `HTTP`
   - URL: `backend:8080`

3. 檢查 Spring Boot CORS 設定：
   ```java
   @Configuration
   public class CorsConfig {
       @Bean
       public WebMvcConfigurer corsConfigurer() {
           return new WebMvcConfigurer() {
               @Override
               public void addCorsMappings(CorsRegistry registry) {
                   registry.addMapping("/**")
                       .allowedOrigins("https://你的cloudflare網址.workers.dev")
                       .allowedMethods("*");
               }
           };
       }
   }
   ```

---

### 問題 6：Docker 指令需要 sudo 權限

```bash
# 將你的帳號加入 docker 群組
sudo synogroup --add docker 你的NAS帳號

# 登出後重新登入即可
exit
ssh 你的NAS帳號@192.168.1.113
```

---

## 🎯 部署完成確認

當你完成所有步驟後，確認以下項目：

- [ ] 可以透過 Cloudflare 網址訪問網站
- [ ] 網站有 HTTPS 鎖頭
- [ ] 前端可以正常顯示
- [ ] 後端 API 可以正常呼叫
- [ ] 資料庫讀寫正常
- [ ] 所有容器狀態都是 `Up`
- [ ] 你已經儲存了維護指令清單

---

## 📚 參考資源

- Synology DSM: `http://192.168.1.113:5000`
- Container Manager: DSM → Container Manager
- Cloudflare Dashboard: https://dash.cloudflare.com
- 你的網站: `https://____________________`

---

## 💡 提示

- 每次更新程式碼記得重新建置 Docker images
- 定期備份資料庫（可以用 Synology 的 Hyper Backup）
- 監控 Docker 容器的資源使用狀況
- 查看 logs 來除錯問題
- 保持 DSM 和 Docker images 更新

---

**🎉 恭喜！你已經完成所有部署步驟！**

有任何問題都可以參考「常見問題排除」章節，或重新檢查 Checklist。