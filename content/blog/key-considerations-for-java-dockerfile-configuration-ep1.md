java 設定 Dockerfile 需要注意的事情 ep.1

Key Considerations for Java Dockerfile Configuration (Part 1)

1. java 後端 Dockerfile 設定版本時要注意不要寫死
2. Spring Boot 監聽 application.properties 裡面 port 的設定

---

### java 後端 Dockerfile 設定版本時要注意不要寫死

當 Dockerfile 寫死 backend-0.0.1.jar

只要 pom.xml 更新版本 version x.x.1 時 Docker 就會建立失敗

(X) COPY --from=build /app/target/backend-0.0.1.jar app.jar
(O) COPY --from=build /app/target/\*.jar app.jar

### Spring Boot 監聽 application.properties 裡面 port 的設定

server.port=${PORT:8080} (你的 application.properties)

- 這才是真正讓 Spring Boot 監聽 PORT 環境變數的設定
- 當你跑 docker run -e PORT=3000 時，你的 Java 程式就會監聽 3000 port

// Dockerfile
EXPOSE ${PORT:-8080} # 宣告 port（如果有 PORT 環境變數就用，沒有就用 8080

// application.properties
server.port=${PORT:8080} # Spring Boot 實際監聽的 port（跟上面一樣的邏輯）

---
