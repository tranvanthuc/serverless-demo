const mysql = require("mysql");

let { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME
});

module.exports = pool;
