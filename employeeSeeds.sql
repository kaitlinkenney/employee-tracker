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

INSERT INTO department (name) values ('Department1');
INSERT INTO department (name) values ('Department2');

INSERT INTO roles (title, salary, department_id) values ('role1', '5.50', 1);
INSERT INTO roles (title, salary, department_id) values ('role2', '6.50', 2);

INSERT INTO employee (first_name, last_name, role_id) values ('firstName1', 'lastName1', 1);
INSERT INTO employee (first_name, last_name, role_id) values ('firstName2', 'lastName2', 2);