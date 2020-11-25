DROP DATABASE IF EXISTS employeesDB;

CREATE DATABASE employeesDB;

USE employeesDB;

CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);
CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  INDEX dep_ind (department_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);
CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  INDEX role_ind (role_id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  manager_id INT UNSIGNED,
  INDEX man_ind (manager_id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

INSERT INTO department (name)
VALUES ("coolness");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 1000, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Kaitlin", "Kenney", 1);




--CREATE TABLE department (
  --id INT NOT NULL AUTO_INCREMENT,
  --name VARCHAR(45),
 -- PRIMARY KEY (id)
--);

--CREATE TABLE role (
 -- id INT NOT NULL AUTO_INCREMENT,
 -- title VARCHAR(30),
 -- salary DECIMAL(10,2),
 -- department_id INT,
 -- PRIMARY KEY (id)
--);

--CREATE TABLE employee (
 -- id INT NOT NULL AUTO_INCREMENT,
 -- first_name VARCHAR(30),
 -- last_name VARCHAR(30),
 -- role_id INT,
 -- PRIMARY KEY (id)
--);

--INSERT INTO department (name)
--VALUES ("awesomeness");

--INSERT INTO role (title, salary)
--VALUES ("boss", "1.50");
--NSERT INTO employee (first_name, last_name)
--VALUES ("Kaitlin", "Kenney");--