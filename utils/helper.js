const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { JWT_SECRET_KEY } = require("../config");

exports.encryptPassword = (password) => {
  return bcrypt.hash(password, 10);
};

exports.checkPassword = (inpPassword, expPassword) => {
  return bcrypt.compare(inpPassword, expPassword);
};

exports.generateJWT = (data) => jwt.sign(data, JWT_SECRET_KEY);

exports.verifyJWT = (token) => jwt.verify(token, JWT_SECRET_KEY);
