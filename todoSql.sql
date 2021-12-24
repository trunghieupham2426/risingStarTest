CREATE DATABASE todoApp;

USE todoApp;

CREATE TABLE todo (
	todo_id INT AUTO_INCREMENT PRIMARY KEY,
	description VARCHAR(200) NOT NULL,
	status BOOLEAN,
	created_at TIMESTAMP DEFAULT NOW()
);
