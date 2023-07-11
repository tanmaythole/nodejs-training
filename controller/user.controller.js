const User = require("../models/user.model");
const {
  encryptPassword,
  checkPassword,
  generateJWT,
} = require("../utils/helper");

exports.create = async (req, res) => {
  const { name, email, password, ...reqBody } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send({ message: "All fields are required!" });
  }

  const hashedPassword = await encryptPassword(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    ...reqBody,
  });

  // check whether user with email already exist
  User.getByEmail(email, (err, data) => {
    if (data && data.email) {
      return res
        .status(409)
        .send({ message: "User already exist with this email. Please login!" });
    }
    if (err && err.type !== "not_found") {
      return res.status(500).send({ message: "Something Went wrong" });
    }
  });

  // if email not already exist then create new user
  User.create(user, (err, data) => {
    if (err) {
      return res.status(400).send({
        message: err || "Something went wrong!",
      });
    }
    res.send({ message: "User created Successfully!", data });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send({ message: "Email and password are required fields." });
  }

  User.getByEmail(email, async (err, data) => {
    if (err) {
      if (err.type === "not_found") {
        return res.status(401).send("Invalid credentials!");
      }
      return res.status(400).send(err || "Something went wrong!");
    }

    if (data && (await checkPassword(password, data.password))) {
      delete data.password;
      data.authToken = generateJWT({ id: data.id });
      return res.json(data);
    }
    res.status(401).send({ message: "Invalid credentials" });
  });
};
