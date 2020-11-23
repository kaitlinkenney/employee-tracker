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
      // based on their answer, either call the bid or the post functions
      // if (answer.navigate === "View all employees") {
      //   viewAllEmployees();
      // }
      if (answer.nagivate === "Update employee role") {
        updateRole();
      }
      // else{
      //   addEmployee();
      // } 
    });
}

// function viewAllEmployees() {
//   connection.query(`SELECT
//   employee.first_name,
//   employee.last_name,
//   role.title,
//   role.salary,
//   department.name
//   FROM employee
//   INNER JOIN role ON role.id = employee.role_id;
//   INNER JOIN department ON department.id = role.department_id;`, function (err, res) {
//     if (err) throw err;
//     for (let i = 0; i < res.length; i++) {
//       console.log(res[i].first_name + " | " + res[i].last_name + " | " + res[i].tile + "|" + res[i].salary + "|" + res[i].name);
//       returnHome();
//     }
//   });
// }

function updateRole() {
  inquirer
    .prompt([
      {
        name: "udpateName",
        type: "input",
        message: "What is the employee's last name?"
      },
      {
        name: "updateRole",
        type: "input",
        message: "What is the employee's updated role?"
      },
    ])
    .then(function (answer) {
      connection.query(
        "UPDATE roles SET ? WHERE ?",
        [
          {
            title: answer.updateRole
          },
          {
            last_name: answer.updateName
          }
        ],
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + "employee(s) updated.\n");
          returnHome();
        }
      )
    });
  console.log(query.sql);
}

// function addEmployee() {
//   inquirer
//     .prompt([
//       {
//         name: "addFirst",
//         type: "input",
//         message: "Enter the employee's first name:"
//       },
//       {
//         name: "addLast",
//         type: "input",
//         message: "Enter the employee's last name:"
//       },
//       {
//         name: "addDept",
//         type: "input",
//         message: "Enter the employee's department name:"
//       },
//       {
//         name: "addTitle",
//         type: "input",
//         message: "Enter the employee's job title:"
//       },
//       {
//         name: "addSalary",
//         type: "input",
//         message: "Enter the employee's salary:"
//       }
//     ])
//     .then(function (answer) {
//       var query = connection.query(
//         "INSERT INTO department SET ?",
//         [
//           {
//             first_name: answer.addFirst
//           },
//           {
//             last_name: answer.addLast
//           },
//           {
//             name: answer.addDept
//           },
//           {
//             title: answer.addTitle
//           },
//           {
//             salary: answer.addSalary
//           }
//         ],
//         function (err, res) {
//           if (err) throw err;
//           console.log(res.affectedRows + " employee added!\n");
//           returnHome();
//         }
//       )
//     });
//   console.log(query.sql);
// }

function returnHome() {
  inquirer
    .prompt([
      {
        name: "home",
        type: "list",
        message: "Would you like to return home?",
        choices: ["Yes", "No"]
      },
    ])
    .then(function (answer) {
      if (answer.home === "Yes") {
        start();
      } else {
        connection.end();
      }
    })
}