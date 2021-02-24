module.exports = () => {
  const Todos = require("../controllers/todo.controller.js");

  const router = require("express").Router();

  // Create a new Todo
  router.post("/", Todos.create);

  // Retrieve all Todos
  router.get("/", Todos.findAll);

  // Retrieve a single Todo with id
  router.get("/:id", Todos.findById);

  // Toggle all Todos
  router.patch("/", Todos.toggleAll);

  // Update a Todo with id
  router.put("/:id", Todos.update);

  // Delete a Todo with id
  router.delete("/:id", Todos.delete);

  // Delete a Completed Todo
  router.delete("/", Todos.deleteCompleted);

  return router;
};
