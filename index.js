const inquirer = require('inquirer');
const db = require('./db/connection');
const util = require('util');
const { error } = require('console');
const consoleTable = require('console.table');


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

// *** Handle errors and print error message
const handleError = (errorMessage) => {
  error(`An error occurred: ${errorMessage}`);
};

// *** Connect db - Function to initialize the application
const init = async () => {
  try {
    // Connect to the database
    await db.connect();
    console.log('Connected to the database');

    // Call the mainMenu function to start the application
    await mainMenu();
  } catch (err) {
    handleError(err.message);
  }
};

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
        new inquirer.Separator(),
        'EXIT APPLICATION [X]'
      ],


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
      case 'EXIT APPLICATION [X]':
        process.exit(0); // exit inquirer with code 0 (sucess)
        break;
    }

  } catch (error) {
    handleError(err.message);
    mainMenu();
  }
};

/** VIEW All Functions */

const viewDepartments = async () => {
  console.log(`
  **********************
  View ALL Departments:
    `);
  try {
    const results = await db.query(`SELECT * FROM department`);
    console.table(results);
    mainMenu();

  } catch (err) {
    handleError(err.message);
    mainMenu();
  };
};
const viewRoles = async () => {
  console.log('View ALL Roles:');
  try {
    const results = await db.query(`
      SELECT * FROM roleType
      JOIN department ON department.department_id = roleType.department_id;
      `);
    console.table(results);
    mainMenu();
  } catch (err) {
    handleError(err.message);
    mainMenu();
  };
};
//! this one needs to be joined so that id shows the salary for each employee
const viewEmployees = async () => {
  console.log('View All Employees:');
  try {
    const results = await db.query(`
      SELECT * FROM employee
      JOIN roleType ON roleType.role_id = employee.role_id;
      `);
    console.table(results);
    mainMenu();
  } catch (err) {
    handleError(err.message);
    mainMenu();
  };
};

init();