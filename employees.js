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
      console.log(answer);
      if (answer.navigate === "View all employees"){
        viewAllEmployees();
      }
      else if (answer.navigate === "Update employee role") {
        updateRole();
      }
      else if (answer.navigate === "Add employee") {
        addEmployee();
      } else{
        console.log(answer.navigate);
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
    console.log("hi");
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
    //   console.log("here?");
      // returnHome();
    }
  });
}

function updateRole() {
  connection.query(`SELECT
  employee.first_name,
  employee.last_name,
  role.title,
  role.salary,
  department.name,
  department.id
  FROM employee
  LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id`, function (err, res){
    if (err) throw err;
  inquirer
    .prompt([
      {
        name: "udpateName",
        type: "input",
        message: "What is the employee's last name?"
      },
      {
        name: "updateRole",
        type: "list",
        message: "What is the employee's updated role?",
        choices: ["Sales Lead", "Accountant"]
      },
    ])
    .then(function (answer) {
      connection.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [ 1, 2],
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
          // returnHome();
          start();
        }
      )
    });
  });
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
        type: "input",
        message: "Please choose the desired department:"
        // choices: ["Sales", "Engineering", "Finance", "Legal"]
      },
      {
        name: "addTitle",
        type: "input",
        message: "Enter the employee's job title:"
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
        choices: ["Accountant", "Sales Lead"]
      }
    ])
    .then(function (answer) {
      connection.query(
      `SELECT * FROM role`, function(err, res) {
        let roleId;
        console.log(res);
        for (let i = 0; i < res.length; i++) {
          if (res[i].title === answer.promptRole){
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
        // "INSERT INTO department SET ?",
        // [
        //   {
        //     name: answer.addDept
        //   }
        // ],
        // "INSERT INTO role SET ?",
        // [
        //   {
        //     title: answer.addTitle
        //   },
        //   {
        //     salary: answer.addSalary
        //   }
        // ],
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " employee added!\n");
          // returnHome();
        }
      )
      // console.log(query.sql);
    })
    });
  }
// function returnHome() {
//   inquirer
//     .prompt({
//         name: "home",
//         type: "list",
//         message: "Would you like to return home?",
//         choices: ["Yes", "No"]
//     })
//     .then(function (answer) {
//       if (answer.home === "Yes") {
//         start();
//       } else {
//         connection.end();
//       }
//     })
// }