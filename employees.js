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

//gives user the first prompt and directs them to the next function
function start() {
  inquirer
    .prompt({
      name: "navigate",
      type: "list",
      message: "What would you like to do?",
      choices: ["View all employees", "Update employee role", "Add employee", "Update a manager", "Delete an employee"]
    })
    .then(function (answer) {
      if (answer.navigate === "View all employees") {
        viewAllEmployees();
      }
      else if (answer.navigate === "Delete an employee"){
        delEmployee();
      }
      else if (answer.navigate === "Update a manager"){
        updateManager();
      }
      else if (answer.navigate === "Update employee role") {
        updateRole();
      } else {
        addEmployee();
      }
    });
}

//views all employees via a left table join
function viewAllEmployees() {
  connection.query(`SELECT
  employee.first_name,
  employee.last_name,
  role.title,
  role.salary,
  department.name,
  employee.id,
  employee.manager_id
  FROM employee
  LEFT JOIN role ON employee.role_id = role.id
  LEFT JOIN department ON role.department_id = department.id`, function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      function Person(id, first_name, last_name, title, salary, department_name, manager_id) {
        this.id = res[i].id;
        this.first_name = res[i].first_name;
        this.last_name = res[i].last_name;
        this.title = res[i].title;
        this.salary = res[i].salary;
        this.department_name = res[i].name;
        this.manager_id = res[i].manager_id;
      }
      let data = new Person(res.id, res.first_name, res.last_name, res.title, res.salary, res.name);
      console.table([data]);
    }
  });
}

//update an employee's role using a switch statement to assign the employee a new role ID
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
            break;
          case "Accountant":
            rolesId = 2;
            update(rolesId, newName);
            break;
          case "Lawyer":
            rolesId = 3;
            update(rolesId, newName);
            break;
          case "Engineer":
            rolesId = 4;
            update(rolesId, newName);
            break;
        }
      });
  });
}

//updates the corresponding employee based from results of the switch statement
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

function updateManager() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "updatePrompt",
          type: "input",
          message: "What is the employee's id?"
        },
        {
          name: "updateMgr",
          type: "input",
          message: "What is the new manager's id?"
        }
      ])
      .then(function (answer) {
        connection.query(
          "UPDATE employee SET ? WHERE ?",
          [{ manager_id: answer.updateMgr }, { id: answer.updatePrompt }],
      
          function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " manager updated.\n");
          }
        )
      });
  });
}

//adds a new employee
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
          //loops through until the user's answer matches a job role in the table
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

//delete employee
function delEmployee(){
  inquirer
    .prompt([
      {
        name: "who",
        type: "input",
        message: "Enter the id of the employee you would like to delete: "
      }
    ])
    .then(function (answer) {
      connection.query(
        `DELETE FROM employee WHERE id = ${answer.who}`,
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " employee deleted!\n");
        } 
      )
    })

}