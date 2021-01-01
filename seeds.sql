INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 1000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Jo", 1, null);

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 2000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 2, null);

INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 3000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mary", "Major", 3, 2);

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 4000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joe", "Smith", 4, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kaitlin", "Kenney", 3, 2)