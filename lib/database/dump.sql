CREATE DATABASE `my-website-db`;

USE `my-website-db`;

CREATE TABLE user (
	id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);