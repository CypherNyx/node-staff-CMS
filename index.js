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
  console.log(`
  **********************
  View ALL Roles:`);
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
//! this one needs to be joined so that id shows the salary manager and department for each employee
//-- Worked this out with help from Christian Guido.
const viewEmployees = async () => {
  console.log(`
  **********************
  View All Employees: `);
  try {
    const results = await db.query(`
    SELECT
    e1.employee_id AS id,
    e1.first_name AS first_name,
    e1.last_name AS last_name,
    roleType.role_title AS title,
    department.department_name AS department,
    roleType.salary AS salary,
    CONCAT(m1.first_name, ' ', m1.last_name) AS manager_name
  FROM employee e1
  LEFT JOIN employee m1 ON e1.manager_id = m1.employee_id
  JOIN roleType ON roleType.role_id = e1.role_id
  JOIN department ON department.department_id = roleType.department_id;
        `);
    console.table(results);
    mainMenu();
  } catch (err) {
    handleError(err.message);
    mainMenu();
  };
};

/** ADD All Functions */
const addDepartment = async () => {
  console.log(`
  **********************
  Add a NEW Department:`);
  try {
    // tell answers to wait for prompt input
    let answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'newDepartment',
        message: 'What is the name of the new department?'
      }
    ]);
    let res = await db.query(`INSERT INTO department SET ?`, {
      department_name: answers.newDepartment
    });
    console.log(`${answers.newDepartment} successfully added to the departments database.\n`);
    mainMenu();
  } catch (err) {
    handleError(err.message);
    mainMenu();
  }
};

const addRole = async () => {
  console.log(`
  **********************
  Add a NEW Role:`);
  try {
    // Query all depts in db, then save it to depList
    const deptList = await db.query(`SELECT * FROM department`);
    // OUTSIDE of the Prompt function, Map over deptList to return new values from the (map) arrow function to build a new array.Creating object literals {key: value} extracts just the name and id, and then returns a new easy to use array for the prompt choices. -- Worked this out with help from Christian Guido.
    const deptChoices = deptList.map(dept => {
      return {
        name: dept.department_name,
        value: dept.department_id
      }
    });
    // tell answers to wait for prompt input
    let answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'newRole',
        message: 'What is the name of your new role?'
      },
      {
        type: 'input',
        name: 'newRoleSalary',
        message: 'What is the salary of your new role?'
      },
      {
        type: 'list',
        name: 'newRoleDept',
        choices: deptChoices
      }
    ]);

    let deptId = answers.newRoleDept;
    let res = await db.query(`INSERT INTO roleType SET ?`, {
      role_title: answers.newRole,
      salary: answers.newRoleSalary,
      department_id: deptId
    });
    console.log(`${answers.newRole} successfully added to the roles database.\n`);
    mainMenu();
  } catch (err) {
    handleError(err.message);
    mainMenu();
  }
};

const addEmployee = async () => {
  console.log(`
  **********************
  Add a NEW Employee:`);
  try {
    // Query all roles then Map over roleList
    const roleList = await db.query(`SELECT * FROM roleType`);
    const roleChoices = roleList.map(role => {
      return {
        name: role.role_title,
        value: role.role_id
      }
    });

    // Query all employees then map over to pick manager
    const managerList = await db.query(`SELECT * FROM employee`);
    const managerChoices = managerList.map(manager => {
      return {
        name: `${manager.first_name} ${manager.last_name}`,
        value: manager.employee_id
      }
    });

    // tell answers to wait for prompt input
    let answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'newEmpName',
        message: `What is the employee's first name?`
      },
      {
        type: 'input',
        name: 'newEmpSurname',
        message: `What is the employee's last name?`
      },
      {
        type: 'list',
        name: 'newEmpRole',
        choices: roleChoices
      },
      {
        type: 'list',
        name: 'newEmpManager',
        choices: managerChoices
      }
    ]);
    let addEmpRole = answers.newEmpRole;
    let managerID = answers.newEmpManager;
    let res = await db.query(`INSERT INTO employee SET ?`, {
      first_name: answers.newEmpName,
      last_name: answers.newEmpSurname,
      role_id: addEmpRole,
      manager_id: managerID
    });
    console.log(`Added ${answers.newEmpName} ${answers.newEmpSurname} to the database \n`);
    mainMenu();
  } catch (err) {
    handleError(err.message);
    mainMenu();
  }
};
init();

