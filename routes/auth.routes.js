module.exports = (app) => {
  const authController = require("../controller/user.controller");
  const router = require("express").Router();

  router.post("/register", authController.create);
  router.post("/login", authController.login);

  app.use("/api/auth", router);
};
