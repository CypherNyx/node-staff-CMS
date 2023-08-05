DROP DATABASE IF EXISTS company_staff_db;
CREATE DATABASE company_staff_db;

USE company_staff_db;
/*table begins here*/
CREATE TABLE department (
    department_id INT NOT NULL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL     
);
CREATE TABLE roleType (
  role_id INT NOT NULL PRIMARY KEY,
  role_title VARCHAR(100) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INT, 
  FOREIGN KEY (department_id) 
  REFERENCES department(department_id) 
  ON DELETE SET NULL
);

CREATE TABLE employee(
  employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(200) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES roleType(role_id) ON DELETE SET NULL,
  FOREIGN KEY (manager_id) REFERENCES employee(employee_id) ON DELETE SET NULL
);