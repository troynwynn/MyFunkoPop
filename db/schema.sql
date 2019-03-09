DROP DATABASE IF EXISTS funko_db;

CREATE DATABASE funko_db;
USE funko_db;

CREATE TABLE toys (
	id int NOT NULL AUTO_INCREMENT,
	head varchar(255) NOT NULL,
    body varchar(255) NOT NULL,
	legs varchar(255) NOT NULL,
    background varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE Users (
	id int NOT NULL AUTO_INCREMENT,
    email varchar(255) NOT NULL,
    CONSTRAINT Email UNIQUE(email),
	password varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

