const inquirer = require('inquirer');
const db = require('./db/connection');
const util = require('util');
const { error } = require('console');


/*
-Connect SQL to db (done in connections.js)
-Run Init after establishing connection to db (done in connections.js)
-Initialization of inquirer prompting session
-Write Switch case expressions for selected action ie: View all dep. add a role etc.
-Write VIEW ALL (dep, roles, empl) functions
-Write  ADD (dep, roles, empl) functions
-Write UPDATE (employee role) function
- look up console.table NPM
*/

// *** convert the callback-based db.query function into a promise-based function.
db.query = util.promisify(db.query);

// *** Begin Inquirer prompting session: 
const mainMenu = async () => {
  try {
    // tell anwers to wait for prompt input
    let answers = await inquirer.prompt({
      type: 'list',
      name: 'userChoice',
      message: 'What would you like to do?',
      choices: [
        new inquirer.Separator('--View ALL Options:--'),
        'View all Departments',
        'View all Roles',
        'View all Employees',
        new inquirer.Separator('--Add NEW Options:--'),
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        new inquirer.Separator('--Update Options:--'),
        'Update employee role',
        new inquirer.Separator()],

    });
    // Case expression for menu options (answers input)
    switch (answers.userChoice) {
      case 'View all Departments':
        viewDepartments();
        break;
      case 'View all Roles':
        viewRoles();
        break;
      case 'View all Employees':
        viewEmployees();
        break;
      case 'Add a Department':
        addDepartment();
        break;
      case 'Add a Role':
        addRole();
        break;
      case 'Add an Employee':
        addEmployee();
        break;
      case 'Update employee role':
        updateEmployee();
        break;
    }

  } catch (error) {
    console.error(error);
    mainMenu();
  }
};

/** VIEW All Functions */

const viewDepartments = async () => {
  console.log('Departments:')
  try{
  db.query('SELECT * FROM department', function (err, results) {
    err ? console.error(error) : console.log(results);

  });
};
};

mainMenu();