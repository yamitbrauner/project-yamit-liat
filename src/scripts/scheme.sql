create table Category
(category_id integer,
category_name varchar(30),
primary key (category_id));


create table Product
(prod_id integer,
category_id integer,
prod_name varchar(30),
quantity_ordered integer,
quantity_in_stock integer,
price_per_unit numeric(5,0),
description varchar(512),
pic_url varchar(512),
primary key (prod_id),
foreign key (category_id) references Category);


create table Role
(role_id integer,
role_name varchar(30),
primary key (role_id));

create table Users
(user_id integer,
user_name varchar(30),
role_id integer,
password varchar(15),
primary key (user_id),
foreign key (role_id) references Role);


create table Reservation
(reservation_id integer,
user_id integer,
total numeric(5,0),
payment_details varchar(512),
payment_method varchar(20),
payment_id integer,
payment_approved integer,
reservation_date DATE,
status varchar(512),
primary key (reservation_id),
foreign key (user_id) references Users);


create table Delivery
(delivery_id integer,
type_of_delivery varchar(30),
delivery_date Date,
primary key (delivery_id));


create table UserInformation
(info_id integer,
user_id integer,
first_name varchar(30),
last_name varchar(30), 
email varchar(100),
mobile varchar(100),
address varchar(100),
primary key (info_id),
foreign key (user_id) references Users);