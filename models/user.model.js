const db = require("./db");

const User = function (user) {
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
};

User.create = (user, result) => {
  db.query("INSERT INTO users SET ?", user, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err?.sqlMessage, null);
      return;
    }
    delete user.password;
    result(null, { id: res.insertId, ...user });
  });
};

User.getByEmail = (email, result) => {
  db.query("SELECT * FROM users WHERE email=?", email, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err?.sqlMessage, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }
    result({ type: "not_found", email }, null);
  });
};

module.exports = User;
