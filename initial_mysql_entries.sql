CREATE SCHEMA dbusers;

use dbusers;

CREATE TABLE `dbusers`.`tblusers` (
  `userid` INT NOT NULL,
  `uuid` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `address` TEXT NOT NULL,
  `postcode` VARCHAR(20) NOT NULL,
  `mobileno` VARCHAR(20) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`userid`));

INSERT INTO tblusers VALUES(1, '1', 'admin', 'admin', 'bernardo', 'tuyay', 'Mandaluyong', '1550', '09651930194', 'bernardotuyay@gmail.com');

ALTER USER 'root'@'localhost' IDENTIFIED BY 'p@ssw0rd'; 

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'p@ssw0rd';