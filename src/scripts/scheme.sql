
create table public.Category
(category_id integer,
category_name varchar(30),
primary key (category_id));


create table public.Product
(prod_id integer,
category_id integer,
prod_name varchar(30),
quantity_in_stock integer,
price_per_unit numeric(5,0),
description varchar(512),
pic_url varchar(512),
primary key (prod_id, category_id),
foreign key (category_id) references public.Category);


create table public.Role
(role_id integer,
role_name varchar(30),
primary key (role_id));


create table public.Users
(user_id integer,
first_name varchar(50),
last_name varchar(50),
phone varchar(50),
address varchar(100),
mail varchar(100),
hashed_password varchar(100),
temp_hash varchar(200),
role_id integer,
primary key (user_id),
foreign key (role_id) references public.Role);


create table public.Reservation
(reservation_id integer,
user_id integer,
total numeric(5,0),
payment_id integer,
reservation_date DATE,
delivery_date DATE,
status varchar(512),
primary key (reservation_id),
foreign key (user_id) references public.Users);


create table public.Purchase
(purchase_id integer,
prod_id integer,
category_id integer,
reservation_id integer,
quantity integer,
primary key (prod_id, reservation_id, category_id),
foreign key (prod_id, category_id) references public.Product(prod_id, category_id),
foreign key (reservation_id) references public.Reservation(reservation_id));
