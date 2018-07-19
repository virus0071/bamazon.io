DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;


CREATE TABLE products (

    item_id INTEGER(10) AUTO_INCREMENT NOT NULL ,

    product_name VARCHAR(60) NULL,

    department_name VARCHAR(30) NULL,

    price DECIMAL(10,2),

    stock_quantity INTEGER(10),

    PRIMARY KEY (item_id)

);


show variables like '%secure%';

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Intel Core i9-7980XE", "Technical", "1799.99", "4");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Intel Core i9-7900X", "Technical", "699.99", "6");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Intel Core i7-7820X", "Technical", "399.99", "8");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Intel Core i7-8086K", "Technical", "379.99", "12");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Intel Core i7-8700K", "Technical", "299.99", "4");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("EVGA GeForce GTX 1080 Ti", "Experience", "799.99", "2");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("ASUS GeForce GTX 1080 Ti", "Experience", "829.99", "4");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("MSI GeForce GTX 1080 Ti", "Experience", "834.99", "8");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("ASUS ROG RAMPAGE VI EXTREME", "Technical", "649.99", "5");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("ASUS PRIME X299-DELUXE", "Technical", "489.99", "6");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Samsung 960 PRO 2TB V-NAND", "Technical", "1194.99", "1");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Samsung 860 PRO 2TB MLC V-NAND", "Technical", "849.99", "8");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Razer Huntsman Elite", "Gaming", "199.99", "9");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Razer BlackWidow X Chroma Mechanical", "Gaming", "139.99", "7");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Razer Orbweaver Chroma RGB", "Gaming", "119.99", "6");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Razer Mamba 16000", "Gaming", "139.99", "4");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Razer Naga Trinity", "Gaming", "99.99", "8");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Razer Mamba TE", "Gaming", "74.99", "12");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Dell Alienware AW3418DW 34.1 UW-QHD", "Experience", "999.99", "2");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("ASUS ROG SWIFT PG348Q 34 UW-QHD", "Experience", "999.99", "2");


CREATE TABLE departments (

    department_id INTEGER(10) AUTO_INCREMENT NOT NULL,

    department_name VARCHAR(30) NULL,

    over_head_costs DECIMAL (10,2) NULL,

    PRIMARY KEY (department_id)
);


INSERT INTO departments (department_name, over_head_costs)
VALUE ("Technical", "20000");

INSERT INTO departments (department_name, over_head_costs)
VALUE ("Experience", "11000");

INSERT INTO departments (department_name, over_head_costs)
VALUE ("Gaming", "4000");




SELECT * FROM products;

SELECT * FROM departments;