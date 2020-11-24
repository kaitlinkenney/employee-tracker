DROP DATABASE IF EXISTS employeesDB;

CREATE DATABASE employeesDB;

USE employeesDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL(10,2),
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("awesomeness");

INSERT INTO role (title, salary)
VALUES ("boss", "1.50");

INSERT INTO employee (first_name, last_name)
VALUES ("Kaitlin", "Kenney");