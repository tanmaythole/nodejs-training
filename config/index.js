const dotenv = require("dotenv");
dotenv.config();

exports.dbConfig = {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
};

exports.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
