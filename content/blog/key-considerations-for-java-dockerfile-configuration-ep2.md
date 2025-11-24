java 設定 Dockerfile 需要注意的事情 ep.2

Key Considerations for Java Dockerfile Configuration (Part 2)

打包和測試你的 Java 專案的完整步驟

步驟 1：建立 Docker Image

docker build -t myproject-backend .

- 這會根據你的 Dockerfile 建立 image
- 包含兩個階段：
  a. 用 Maven 編譯你的 Java 專案
  b. 建立最終的運行環境
- 預計需要 2-5 分鐘（第一次會比較久，因為要下載依賴）
- 如果有錯誤，檢查 Dockerfile 和 pom.xml

步驟 2：檢查建立好的 Image

docker images

- 確認 myproject-backend image 是否成功建立
- 查看 image 的大小

步驟 3：運行容器測試

docker run -d -p 3005:8080 --env-file .env myproject-backend

- 啟動容器並將 port 8080 對應到本機
- 使用你的 .env 檔案傳入環境變數（資料庫連接、JWT 密鑰等）

-d 背景運行

Port 對應說明：

- -p 3005:8080
- 前面（3005）= 你電腦的 port
- 後面（8080）= 容器內的 port

步驟 4：驗證應用程式

docker ps 找到 id
docker logs <container-id>
目的： 確認應用程式有沒有啟動成功檢查項目：

- Spring Boot 有沒有報錯？
- 資料庫連接成功了嗎？
- Tomcat 有沒有啟動？
- 監聽哪個 port？

步驟 5：測試健康檢查端點

目的： 用 Spring Boot Actuator 的健康檢查來快速驗證結果
目前尚未安裝 Actuator 未來可以考慮安裝 Actuator

curl http://localhost:8080/actuator/health

- 確認應用程式可以正常回應請求

步驟 6：停止並清理

docker stop <container-id>
docker rm <container-id>

- 停止測試容器
- 清理資源

容器管理指令

查看容器

# 查看運行中的容器

docker ps

# 查看所有容器（包含停止的）

docker ps -a

停止容器

# 方法 1：用 Container ID

docker stop 0813473d94d5

# 方法 2：用容器名稱

docker stop my-backend

刪除容器

# 先停止再刪除

docker stop <container-id>
docker rm <container-id>

# 強制刪除（運行中也能刪）

docker rm -f <container-id>

清理資源

# 刪除 Image

docker rmi myproject-backend

# 清理所有停止的容器

docker container prune

# 清理未使用的 Image

docker image prune
