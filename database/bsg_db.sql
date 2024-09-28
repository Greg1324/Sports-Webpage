-- Checkmark Inc DDL.
-- Group 51
-- Gregory Lion
-- Noddy Lam

SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- Create tables

/* Create Customers table */
CREATE OR REPLACE TABLE `Customers` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone_number` varchar(45) NOT NULL,
  `payment_information` varchar(45) NOT NULL,
  PRIMARY KEY (`customer_id`)
);

/* Create Employees table */
CREATE OR REPLACE TABLE `Employees` (
  `employee_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone_number` varchar(45) NOT NULL,
  `position` varchar(45) NOT NULL,
  `salary` int(11) NOT NULL,
  `hire_date` date NOT NULL,
  `Stores_store_id` int(11) NOT NULL,
  PRIMARY KEY (`employee_id`),
  FOREIGN KEY (`Stores_store_id`) REFERENCES `Stores` (`store_id`)
  ON DELETE CASCADE ON UPDATE CASCADE
);

/* Create Sales table */
CREATE OR REPLACE TABLE `Sales` (
  `sale_id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(45) NOT NULL,
  `total_amount` float NOT NULL,
  `sale_date` date NOT NULL,
  `Customers_customer_id` int(11),
  `Stores_store_id` int(11) NOT NULL,
  PRIMARY KEY (`sale_id`),
  FOREIGN KEY (`Customers_customer_id`) REFERENCES `Customers` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`Stores_store_id`) REFERENCES `Stores` (`store_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

/* Create Stores table */
CREATE OR REPLACE TABLE `Stores` (
  `store_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `location` varchar(45) NOT NULL,
  PRIMARY KEY (`store_id`)
);

/* Create Suppliers table */
CREATE OR REPLACE TABLE `Suppliers` (
  `supplier_id` int(11) NOT NULL AUTO_INCREMENT,
  `supplier_name` varchar(45) NOT NULL,
  `category` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone_number` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  PRIMARY KEY (`supplier_id`)
);

/* Create Suppliers_has_Stores table */
CREATE OR REPLACE TABLE `Suppliers_has_Stores` (
  `Suppliers_supplier_id` int(11) NOT NULL,
  `Stores_store_id` int(11) NOT NULL,
  FOREIGN KEY (`Stores_store_id`) REFERENCES `Stores` (`store_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`Suppliers_supplier_id`) REFERENCES `Suppliers` (`supplier_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert data into tables

/* Insert data into Customers table */
INSERT INTO `Customers` (`first_name`, `last_name`, `email`, `phone_number`, `payment_information`) VALUES
('Jonathan', 'Smith', 'jonsmith@gmail.com', '2192345789', 'Mastercard 1789'),
('Mitchell', 'Sampson', 'sampsonm@gmail.com', '6144801085', 'Visa 5674'),
('Lauren', 'Jennings', 'jenningsl@hotmail.com', '2182744839', 'AMEX 10398');

/* Insert data into Stores table */
INSERT INTO `Stores` (`name`, `location`) VALUES
('Checkmark One', 'Downtown Portland, OR'),
('Checkmark OSU', 'Corvallis, OR'),
('Checkmark Outlet', 'Beaverton, OR');

/* Insert data into Suppliers table */
INSERT INTO `Suppliers` (`supplier_name`, `category`, `email`, `phone_number`, `address`) VALUES
('Gildan', 'Tees', 'business@gildan.com', '5039279472', '133 SW Oak St., Portland, OR 97205'),
('Apparel Supply Inc.', 'Pants', 'contact@apparelinc.com', '5032740158', '18 SW Hall Blvd., Beaverton, OR 97005'),
('PDX Soles Inc.', 'Shoes', 'sales@pdxsoles.com', '9714635982', '4892 Lancaster Dr., Salem OR 97305');

/* Insert data into Suppliers_has_Stores table */
INSERT INTO `Suppliers_has_Stores` (`Suppliers_supplier_id`, `Stores_store_id`) VALUES
((SELECT `supplier_id` FROM `Suppliers` where `supplier_name` = 'Gildan'), (SELECT `store_id` FROM `Stores` where `name` = 'Checkmark One')),
((SELECT `supplier_id` FROM `Suppliers` where `supplier_name` = 'Apparel Supply Inc.'), (SELECT `store_id` FROM `Stores` where `name` = 'Checkmark One')),
((SELECT `supplier_id` FROM `Suppliers` where `supplier_name` = 'PDX Soles Inc.'), (SELECT `store_id` FROM `Stores` where `name` = 'Checkmark One')),
((SELECT `supplier_id` FROM `Suppliers` where `supplier_name` = 'Gildan'), (SELECT `store_id` FROM `Stores` where `name` = 'Checkmark OSU'));

/* Insert data into Employees table */
INSERT INTO `Employees` (`first_name`, `last_name`, `email`, `phone_number`, `position`, `salary`, `hire_date`, `Stores_store_id`) VALUES
('Candace', 'Wolf', 'wolfc89@gmail.com', '7269751283', 'Store Manager', 56890, '2023-01-28', (SELECT `store_id` FROM `Stores` where `name` = 'Checkmark One')),
('Clifford', 'Quick', 'cliffordq74@gmail.com', '6037410624', 'Assistant Manager', 52700, '2023-02-13', (SELECT `store_id` FROM `Stores` where `name` = 'Checkmark One')),
('Edward', 'Chan', 'edwardc92@hotmail.com', '8642067319', 'Cashier', 38651, '2023-05-08', (SELECT `store_id` FROM `Stores` where `name` = 'Checkmark OSU')),
('Bryan', 'Jenkins', 'jenkinsbryan@gmail.com', '7328124592', 'Stocker', 36293, '2023-08-25', (SELECT `store_id` FROM `Stores` where `name` = 'Checkmark OSU')),
('Spencer', 'Lim', 'spencerlim23@gmail.com', '3475573900', 'Cashier', 37921, '2023-09-19', (SELECT `store_id` FROM `Stores` where `name` = 'Checkmark Outlet'));

/* Insert data into Sales table */
INSERT INTO `Sales` (`description`, `total_amount`, `sale_date`, `Customers_customer_id`, `Stores_store_id`) VALUES
('Checkmark Blue Tee, Checkmark  Sock 3-Pack', 38.99, '2023-04-12', (SELECT `customer_id` FROM `Customers` where `first_name` = 'Mitchell' and `last_name` = 'Sampson'), (SELECT `store_id` FROM `Stores` where `name` = 'Checkmark One')),
('Checkmark Red Running shoes', 114.99, '2023-04-13', (SELECT `customer_id` FROM `Customers` where `first_name` = 'Jonathan' and `last_name` = 'Smith'), (SELECT `store_id` FROM `Stores` where `name` = 'Checkmark One')),
('Checkmark Black Hoodie, Checkmark Gray Hoodie', 84.99, '2023-05-09', (SELECT `customer_id` FROM `Customers` where `first_name` = 'Mitchell' and `last_name` = 'Sampson'), (SELECT `store_id` FROM `Stores` where `name` = 'Checkmark OSU')),
('Checkmark Dad Hat', 22.00, '2023-06-28', (SELECT `customer_id` FROM `Customers` where `first_name` = 'Jonathan' and `last_name` = 'Smith'), (SELECT `store_id` FROM `Stores` where `name` = 'Checkmark Outlet')),
('Checkmark Backpack, Checkmark Black Athletic Pants, Checkmark Khaki Pants', 96.99, '2023-07-28', (SELECT `customer_id` FROM `Customers` where `first_name` = 'Lauren' and `last_name` = 'Jennings'), (SELECT `store_id` FROM `Stores` where `name` = 'Checkmark OSU'));

SET FOREIGN_KEY_CHECKS=1;
COMMIT;