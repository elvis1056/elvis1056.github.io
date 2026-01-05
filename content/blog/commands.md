Linux / MacOS 指令

新增 Linux/Docker 常用指令速查表

---

查 Port 被誰佔用

| 目的 | 指令 | 說明 |
|----|----|----|
| 查 8080 被誰用 | `lsof -i :8080` | 最常用，列出使用該 Port 的程式 |
| 只看 TCP | `lsof -i tcp:8080` | 排除 UDP 雜訊 |
| 顯示數字 | `lsof -i :8080 -P -n` | 不轉成服務名稱（http-alt） |

確認 Port 是否正在監聽

| 目的 | 指令 | 說明 |
|----|----|----|
| 確認監聽狀態 | `netstat -an | grep 8080` | 出現 `LISTEN` 代表有服務在跑 |
| 查看所有監聽 Port | `lsof -i -P -n \| grep LISTEN` | 檢查整台機器 |

查看與管理 Process

| 目的 | 指令 | 說明 |
|----|----|----|
| 查看 PID 詳細資訊 | `ps -fp <PID>` | 看啟動指令與參數 |
| 強制關閉程式 | `kill -9 <PID>` | ⚠️ 強制終止 |
| 直接殺佔用 Port | `kill -9 $(lsof -t -i :8080)` | 開發者懶人指令 |

Java / Spring Boot 專用

| 目的 | 指令 | 說明 |
|----|----|----|
| 列出所有 Java 程序 | `jps -l` | Java 工程師必備 |
| 找特定專案 | `jps -l \| grep my-project` | 快速定位 |
| 關閉 Java 程序 | `kill -9 <PID>` | 搭配 jps 使用 |

---

Docker 指令

顯示 docker 的版本
docker version

取得一個指定版本的 image 
如果不指定 image 版本該版本則為 latest
docker pull [Image 名稱]:[Image 版本]

查看正在執行的 containers
docker ps

查看所有的 containers
docker ps -a

---

指令詳細說明

```
lsof -i :8080

# 是一個用來查出「哪個程式正在使用 8080 這個網路埠（port）」的指令
# lsof = List Open Files
# lsof 不只能看一般檔案，也能看：
# 1. 網路連線
# 2. TCP / UDP Port
# 3. 哪個 process（程式）在用
# -i = 只顯示網路相關的檔案
# TCP / UDP
# IPv4 / IPv6
# 特定 port

```



