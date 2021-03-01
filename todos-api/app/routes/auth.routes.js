module.exports = () => {
  const Auth = require("../controllers/auth.controller.js");

  const router = require("express").Router();

  // Register a new User
  router.post("/register", Auth.register);

  // Login a User
  router.post("/login", Auth.login);

  // Refresh a Token
  router.post("/refresh", Auth.refresh);

  return router;
};
