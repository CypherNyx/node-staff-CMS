DELETE FROM department;
DELETE FROM roleType;
DELETE FROM employee;

INSERT INTO department (department_id, department_name) VALUES
    (101, 'Sales'),
    (102, 'Marketing'),
    (103, 'Engineering'),
    (104, 'Finance');


INSERT INTO roleType (role_id, role_title, salary, department_id) VALUES
    (10, 'Company Director',  160000, 101),
    (20, 'Marketing Specialist', 55000, 102),
    (30, 'Software Engineer', 80000, 103),
    (40, 'Financial Analyst', 65000, 104);



INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Joe', 'MacMillan', 10, NULL),
    ('Cameron', 'Howe', 20, 1),
    ('Gordon', 'Clark', 30, 1),
    ('Donna', 'Emerson', 40, 2),
    ('John', 'Bosworth', 20, 1),
    ('Haley', 'Clark', 30, 2),
    ('Ryan', 'Ray', 20, 2);

 /* this is the OLD code when tried Auto Increment instead of custom role and dep ID:

INSERT INTO department (department_name) VALUES
    ('Sales'),
    ('Marketing'),
    ('Engineering'),
    ('Finance');


INSERT INTO roleType (role_title, salary, department_id) VALUES
    ('Company Director',  160000, 1),
    ('Marketing Specialist', 55000, 2),
    ('Software Engineer', 80000, 3),
    ('Financial Analyst', 65000, 4);



INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Joe', 'MacMillan', 1, NULL),
    ('Cameron', 'Howe', 2, 1),
    ('Gordon', 'Clark', 3, 1),
    ('Donna', 'Emerson', 4, 2),
    ('John', 'Bosworth', 2, 1),
    ('Haley', 'Clark', 3, 2),
    ('Ryan', 'Ray', 2, 2);
    
    */