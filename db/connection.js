const mysql = require('mysql2');
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../.env')
});

const db = mysql.createConnection(
  {
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME,
  },
  console.log(`Connected to the database`)
);
db.connect( (error) => {
  if (error) {
    console.error(error);
  }
})

module.exports = db;