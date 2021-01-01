# MySQL: Employee Tracker

 This application contains a **C**ontent **M**anagement **S**ystem. This app manages a company's employees using node, inquirer, and MySQL.

## Instructions

The following database schema contains three tables:

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to the manager of the employee
  
The command-line application allows the user to:

  * Add departments, roles, employees

  * View departments, roles, employees, and managers

  * Update employee roles

  * Update employees' managers
   
  * Delete an employee


Problem Statement: 

As a business owner, I want to be able to view and manage the departments, roles, and employees in my company so that I can organize and plan my business.

* Uses [MySQL](https://www.npmjs.com/package/mysql) NPM package to connect to your MySQL database and perform queries.

* Uses [InquirerJs](https://www.npmjs.com/package/inquirer/v/0.2.3) NPM package to interact with the user via the command-line.

* Uses [console.table](https://www.npmjs.com/package/console.table) to print MySQL rows to the console.

screenshot: <img width="958" alt="screenshot employeesjs" src="https://user-images.githubusercontent.com/67657449/100479074-23a58600-30bb-11eb-89f1-ba7e0013963e.png">

link to Screencastify video: https://drive.google.com/file/d/1qsMD6eBLb2imkib5W2iXAwBelavW8h3I/view