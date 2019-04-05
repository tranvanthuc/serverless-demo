const mysql = require("mysql");

let { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

DB_HOST = "laravelins.cyamlpynsgan.ap-northeast-1.rds.amazonaws.com";
DB_USERNAME = "root";
DB_PASSWORD = "root1234";
DB_NAME = "laraveldb";

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME
});

module.exports = pool;
