// const mysql = require("mysql2");
const mysql = require("mysql2/promise");
// const namedPlaceholders = require("named-placeholders")();
const namedPlaceholders = require("named-placeholders")();
require("dotenv").config();

const pool = mysql.createPool({
  host: "localhost",
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: "modern_style",
  connectionLimit: 10, // number of connections to allow in the pool
  namedPlaceholders: true,
});

module.exports = pool;
