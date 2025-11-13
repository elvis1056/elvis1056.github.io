進入到 Render 的控制台(dashboard)，

![Render Dashboard 1](/images/blog/render-deploy-postgresql/render-dashboard-1.png)

由於要使用免費方案，

設定資料庫，設定時將「資料庫」和「網站」的伺服器選在同個區域。

（額外要注意資料只會保存官方所設定的時間）

![Render Dashboard 2](/images/blog/render-deploy-postgresql/render-dashboard-2.png)

先安裝好 pgAdmin

回到自己電腦安裝 pgAdmin 並開啟

然後選擇 Object -> Register -> Server

General 填寫 Name

Connection 填寫 Host name / Port / Maintenance database / Username / Password

![Render Dashboard 3](/images/blog/render-deploy-postgresql/render-dashboard-3.png)

![Render Dashboard 4](/images/blog/render-deploy-postgresql/render-dashboard-4.png)

![Render Dashboard 5](/images/blog/render-deploy-postgresql/render-dashboard-5.png)

外部網址設定：
postgres://[username]:[password]@[hostname].[伺服器位置].render.com/[database]

![Render Dashboard 6](/images/blog/render-deploy-postgresql/render-dashboard-6.png)

Render 有提供怎麼設定連線至「你的 database」。
https://render.com/docs/postgresql-creating-connecting#connect-to-your-database

參考文章：

https://medium.com/@King610160/render%E9%83%A8%E7%BD%B2-postgresql%E8%A8%AD%E7%BD%AE-e39ad7c3c862
