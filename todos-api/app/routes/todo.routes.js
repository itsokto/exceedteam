module.exports = () => {
  const verifyToken = require("../middlewares/verify-token");

  const Todos = require("../controllers/todo.controller.js");

  const router = require("express").Router();

  // Create a new Todo
  router.post("/", verifyToken, Todos.create);

  // Retrieve all Todos
  router.get("/", verifyToken, Todos.findAll);

  // Retrieve a single Todo with id
  router.get("/:id", verifyToken, Todos.findById);

  // Toggle all Todos
  router.patch("/", verifyToken, Todos.toggleAll);

  // Update a Todo with id
  router.put("/:id", verifyToken, Todos.update);

  // Delete a Todo with id
  router.delete("/:id", verifyToken, Todos.delete);

  // Delete a Completed Todo
  router.delete("/", verifyToken, Todos.deleteCompleted);

  return router;
};
