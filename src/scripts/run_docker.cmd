docker run --rm --name pg-docker -e POSTGRES_PASSWORD=12345678 -e POSTGRES_DB=dev -d -p 5432:5432 -v C:\Users\LIAT_ARAMA\Desktop\liat_op\matok_li\project-yamit-liat\src\scripts\ postgres
rem sleep 3
timeout /t 5
set PGPASSWORD=12345678

rem psql -U postgres -d dev -h localhost -p 5432 -f .\drop_all.sql

createdb -h localhost -p 5432 -U postgres  dev

psql -U postgres -d dev -h localhost -p 5432 -f .\scheme.sql
psql -U postgres -d dev -h localhost -p 5432 -f insert_Category.sql
psql -U postgres -d dev -h localhost -p 5432 -f insert_Product.sql
psql -U postgres -d dev -h localhost -p 5432 -f insert_Role.sql
psql -U postgres -d dev -h localhost -p 5432 -f insert_Users.sql
psql -U postgres -d dev -h localhost -p 5432 -f insert_Purchase.sql
psql -U postgres -d dev -h localhost -p 5432 -f insert_Reservation.sql


psql -U postgres -d dev -h localhost -p 5432 -f sequence.sql
