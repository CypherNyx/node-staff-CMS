const inquirer = require('inquirer');
const db = require('./db/connection');
const util = require('util');
const { error } = require('console');


/*
-Connect SQL to db
-Run Init after establishing connection to db
-Initialization of inquirer prompting session
-Write Switch case expressions for selected action ie: View all dep. add a role etc.
-Write VIEW ALL (dep, roles, empl) functions
-Write  ADD (dep, roles, empl) functions
-Write UPDATE (employee role) function
- look up console.table NPM
*/

const mainMenu = () => {
 inquirer.prompt([
  {
    type: 'list',
    name: 'userChoice',
    choices: ['View all departments', 
    'View all roles', 
    'View all employees', 
    'Add a department',
    ' Add a role',
    'Add an employee',
    'Update employee role'],


  },
 ])
 .then ((answers) => {
    switch(answers.userChoice){
      case 'View all departments': 
      viewAllDepartments();
      break;
    }
 });

};

/** VIEW All Functions */

const viewAllDepartments = () => {
    db.query('SELECT * FROM department', function (err, results){
        err? console.error(error): console.log(results);
        
    });
};

mainMenu();