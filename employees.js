const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employeesDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
});

function start() {
  inquirer
    .prompt({
      name: "navigate",
      type: "list",
      message: "Would you like to do?",
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
    // console.log(res[0].first_name)
    for (let i = 0; i < res.length; i++) {
      function Person(id, first_name, last_name, title, salary, department_name) {
        this.id = res[i].id;
        this.first_name = res[i].first_name;
        this.last_name = res[i].last_name;
        this.title = res[i].title;
        this.salary = res[i].salary;
        this.department_name = res[i].name;
      }
      var data = new Person(res.id, res.first_name, res.last_name, res.title, res.salary, res.name);
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
        // console.log(answer.updateName);
      });
  });
}

function update(rolesId, newName){
  connection.query(
    "UPDATE employee SET ? WHERE ?",
    [{role_id: rolesId}, {last_name: newName}],
    // {
    //   role_id: 1
    // },
    // {
    //   id: 2
    // }
    // ],
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + "employee(s) updated.\n");
      // start();
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
        choices: ["Sales", "Engineering", "Finance", "Legal"]
      },
      {
        name: "addSalary",
        type: "input",
        message: "Enter the employee's salary:"
      },
      {
        name: "promptRole",
        type: "list",
        message: "Which role?",
        choices: ["Accountant", "Sales Lead", "Lawyer", "Engineer"]
      }
    ])
    .then(function (answer) {
      connection.query(
        `SELECT * FROM role`, function (err, res) {
          let roleId;
          console.log(res);
          for (let i = 0; i < res.length; i++) {
            if (res[i].title === answer.promptRole) {
              roleId = res[i].id;
            }
          }
          if (err) throw err;
          console.log(answer);
          connection.query(
            "INSERT INTO employee SET ?",
            [
              {
                first_name: answer.addFirst,
                last_name: answer.addLast,
                role_id: roleId
              }
            ],
          )
        })
      connection.query(
        `SELECT * FROM department`, function (err, res) {
          let deptId;
          console.log(res);
          for (let i = 0; i < res.length; i++) {
            if (res[i].name === answer.addDept) {
              deptId = res[i].id;
            }
          }
          if (err) throw err;
          console.log(answer);
          connection.query(
            "INSERT INTO role SET ?",
            [
              {
                title: answer.promptRole,
                salary: answer.addSalary,
                department_id: deptId
              }
            ],
            function (err, res) {
              if (err) throw err;
              console.log(res.affectedRows + " employee added!\n");
            }
          )
        });
    });
}