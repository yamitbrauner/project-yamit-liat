General\
MATOKLI is an on-line shop web application, it represent a virtual store where customers can browse the catalog and select products. \
The selected items may be collected in a shopping cart. \
At checkout time, the items in the shopping cart will be presented as an order. \
At that time, more information will be needed to complete the transaction such as payment and delivery date.\
After placing your order you will receive an email with the order details.\
To place an order in the store, you must register.\
In this project we also used Spring Security with java and annotation configuration.


Abstract\
Electronic Commerce is process of doing business through computer networks. \
A person sitting on his chair in front of a computer can access all the facilities of the Internet to buy or sell the products.\
Unlike traditional commerce that is carried out physically with effort of a person to go & get products, ecommerce has made it easier for human to reduce physical work and to save time. \
The main advantage of e-commerce over traditional commerce is the user can browse on-line shops, compare prices and order merchandise sitting at home on their PC.

The integration of information and communications technology in business has revolutionized relationships within organizations and those between and among organizations and individuals. \
Specifically, the use of internet in business has enhanced productivity, encouraged greater customer participation, and enabled mass customization, besides reducing costs.

Electronic commerce, commonly written as e-commerce, is the trading or facilitation of trading in products or services using computer networks, such as the Internet.

Modern electronic commerce typically uses the World Wide Web for at least one part of the transaction's life cycle, although it may also use other technologies such as e-mail.


Purpose of system\
The on-line shop is expanded permanently through new products and services to offer a product portfolio corresponding to the market. \
Private customers and business customers can order the selected products of the on-line service on-line quickly and comfortably.


Requirements\
For building and running the application you need:\
JDK 15.0.2\
Maven 3\
npm 16+\
docker\
postgresql

Running the Project Locally:\
First, clone the repository to your local machine:\
git clone https://github.com/yamitbrauner/project-yamit-liat.git


Create the database:\
cd scripts\
run_docker.cmd

Run Project One time using Spring boot command:\
mvn spring-boot:run\
or \
using IDE run as Java Application

Install the requirements:\
cd frontend\
npm install

And run the front side in terminal:\
cd frontend\
npm start
