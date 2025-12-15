驗證資料庫
連進 PostgreSQL 查看資料表：
bash# 進入 Docker 容器
docker exec -it fivepapa-postgres psql -U fivepapa_user -d fivepapa_dev

# 查看所有資料表

\dt

# 查看 product 表結構

\d product

# 查看商品資料

SELECT \* FROM product;

# 離開

\q
