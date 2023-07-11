const mysql = require("mysql");

const { dbConfig } = require("../config");

const conn = mysql.createPool({
    host: dbConfig.DB_HOST,
    user: dbConfig.DB_USER,
    password: dbConfig.DB_PASS,
    database: dbConfig.DB_NAME,
});

module.exports = conn;
