DROP DATABASE IF EXISTS newUsers_db;

CREATE DATABASE newUsers_db;
USE newUsers_db;

CREATE TABLE users (
	id int NOT NULL AUTO_INCREMENT,
	username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
	PRIMARY KEY (id)
);
