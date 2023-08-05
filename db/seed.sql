DELETE FROM department;
DELETE FROM roleType;
DELETE FROM employee;

-- * Sample data for 'department' table
INSERT INTO department (department_id, department_name) VALUES
    (101, 'Sales'),
    (102, 'Marketing'),
    (103, 'Engineering'),
    (104, 'Finance');

-- * Sample data for 'role' table
INSERT INTO roleType (role_id, role_title, salary, department_id) VALUES
    (10, 'Company Director',  160000, 101),
    (20, 'Marketing Specialist', 55000, 102),
    (30, 'Software Engineer', 80000, 103),
    (40, 'Financial Analyst', 65000, 104);


-- * Sample data for 'employee' table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Joe', 'MacMillan', 10, NULL),
    ('Cameron', 'Howe', 20, 1),
    ('Gordon', 'Clark', 30, 1),
    ('Donna', 'Emerson', 40, 2),
    ('John', 'Bosworth', 20, 1),
    ('Haley', 'Clark', 30, 2),
    ('Ryan', 'Ray', 20, 2);