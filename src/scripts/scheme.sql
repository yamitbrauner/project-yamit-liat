
create table public.Category
(categoryId integer,
categoryName varchar(30),
primary key (categoryId));


create table public.Product
(prodId integer,
categoryId integer,
prodName varchar(30),
quantityInStock integer,
pricePerUnit numeric(5,0),
description varchar(512),
picUrl varchar(512),
primary key (prodId,categoryId),
foreign key (categoryId) references public.Category);


create table public.Role
(roleId integer,
roleName varchar(30),
primary key (roleId));


create table public.Users
(userId integer,
firstName varchar(50),
lastName varchar(50),
phone varchar(50),
address varchar(100),
mail varchar(100),
hashedPassword integer,
tempHash integer,
roleId integer,
primary key (userId),
foreign key (roleId) references public.Role);


create table public.Reservation
(reservationId integer,
userId integer,
total numeric(5,0),
paymentId integer,
reservationDate DATE,
deliveryDate DATE,
status varchar(512),
primary key (reservationId),
foreign key (userId) references public.Users);


create table public.Purchase
(purchaseId integer,
prodId integer,
categoryId integer,
reservationId integer,
quantity integer,
primary key (prodId,reservationId,categoryId),
foreign key (prodId,categoryId) references public.Product(prodId,categoryId),
foreign key (reservationId) references public.Reservation(reservationId));
