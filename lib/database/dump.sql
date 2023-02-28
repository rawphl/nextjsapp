CREATE DATABASE IF NOT EXISTS `my-website-db`;

USE `my-website-db`;

CREATE TABLE user (
	id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- user: admin@my-website.ch // pw: admin
INSERT INTO user (email, password) VALUES ("admin@my-website.ch", "$2a$10$yaKl0a0KEF4Hr3DXjJzqc.3qOohZ5NMbyXoACpyrTCatRcpSpZcoS")