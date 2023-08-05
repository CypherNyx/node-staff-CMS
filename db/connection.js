require('dotenv').config();

// ! FIND THE PROPER WAY TO USE DOTENV WITHOUT SEQUILIZE.

const db = mysql.createConnection(
  {
  host: 'localhost',
  user: DB_USER,
  password: DB_PASSWORD, 
  database: 'company_staff_db'
  },
  console.log(`Connected to the database`)
);