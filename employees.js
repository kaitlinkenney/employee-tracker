const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "employeesDB"
});

connection.connect(function (err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt({
      name: "navigate",
      type: "list",
      message: "What would you like to do?",
      choices: ["View all employees", "Update employee role", "Add employee"]
    })
    .then(function (answer) {
      if (answer.navigate === "View all employees") {
        viewAllEmployees();
      }
      else if (answer.navigate === "Update employee role") {
        updateRole();
      } else {
        addEmployee();
      }
    });
}

function viewAllEmployees() {
  connection.query(`SELECT
  employee.first_name,
  employee.last_name,
  role.title,
  role.salary,
  department.name,
  department.id
  FROM employee
  LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id`, function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      function Person(id, first_name, last_name, title, salary, department_name) {
        this.id = res[i].id;
        this.first_name = res[i].first_name;
        this.last_name = res[i].last_name;
        this.title = res[i].title;
        this.salary = res[i].salary;
        this.department_name = res[i].name;
      }
      let data = new Person(res.id, res.first_name, res.last_name, res.title, res.salary, res.name);
      console.table([data]);
    }
  });
}

function updateRole() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "updateName",
          type: "input",
          message: "What is the employee's last name?"
        },
        {
          name: "updateRole",
          type: "list",
          message: "What is the employee's updated role?",
          choices: ["Sales Lead", "Accountant", "Lawyer", "Engineer"]
        }
      ])
      .then(function (answer) {
        let newName = answer.updateName;
        let rolesId;
        switch (answer.updateRole) {
          case "Sales Lead":
            rolesId = 1;
            update(rolesId, newName);
          case "Accountant":
            rolesId = 2;
            update(rolesId, newName);
          case "Lawyer":
            rolesId = 3;
            update(rolesId, newName);
          case "Engineer":
            rolesId = 4;
            update(rolesId, newName);
        }
      });
  });
}

function update(rolesId, newName) {
  connection.query(
    "UPDATE employee SET ? WHERE ?",
    [{ role_id: rolesId }, { last_name: newName }],

    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + "employee(s) updated.\n");
    }
  )
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "addFirst",
        type: "input",
        message: "Enter the employee's first name:"
      },
      {
        name: "addLast",
        type: "input",
        message: "Enter the employee's last name:"
      },
      {
        name: "addDept",
        type: "list",
        message: "Please choose the desired department:",
        choices: ["Sales", "Finance", "Legal", "Engineering"]
      },
      {
        name: "promptRole",
        type: "list",
        message: "Which role?",
        choices: ["Sales Lead", "Accountant", "Lawyer", "Engineer"]
      }
    ])
    .then(function (answer) {
      connection.query(
        `SELECT * FROM role`, function (err, res) {
          let roleId;

          for (let i = 0; i < res.length; i++) {
            if (res[i].title === answer.promptRole) {
              roleId = res[i].id;
            }
          }
          if (err) throw err;
        
          connection.query(
            "INSERT INTO employee SET ?",
            [
              {
                first_name: answer.addFirst,
                last_name: answer.addLast,
                role_id: roleId
              }
            ],
            function (err, res) {
              if (err) throw err;
              console.log(res.affectedRows + " employee added!\n");
            }
          )
        })
    });
}
