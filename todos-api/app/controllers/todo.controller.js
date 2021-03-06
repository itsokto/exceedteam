const mongoose = require("mongoose");
const db = require("../models");
const Todo = db.todos;
const User = db.users;

// Create and Save a new Todo
exports.create = async (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "Title can not be empty!" });
    return;
  }

  const todo = new Todo({
    title: req.body.title,
    isDone: false,
    user: req.user.id,
  });

  await todo.save();

  const user = await User.findById(req.user.id);

  user.todos.push(todo);

  await user.save();

  res.send(todo);
};

// Retrieve all Todos from the database.
exports.findAll = async (req, res) => {
  const todos = await Todo.find({
    user: mongoose.Types.ObjectId(req.user.id),
  });

  res.send(todos);
};

// Find a single Todo with an id
exports.findById = async (req, res) => {
  const id = req.params.id;

  const todo = await Todo.findOne({
    _id: id,
    user: mongoose.Types.ObjectId(req.user.id),
  });

  if (!todo) {
    res.status(404).send({ message: "Not found Todo with id " + id });
  } else {
    res.send(todo);
  }
};

// Update a Todo by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  const todo = await Todo.findOneAndUpdate(
    { _id: id, user: mongoose.Types.ObjectId(req.user.id) },
    req.body
  );

  if (!todo) {
    res.status(404).send({
      message: `Cannot update Todo with id=${id}. Maybe Todo was not found!`,
    });
  } else {
    res.send(todo);
  }
};

// Delete a Todo with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  const todo = await Todo.findOneAndDelete({
    _id: id,
    user: mongoose.Types.ObjectId(req.user.id),
  });

  if (!todo) {
    res.status(404).send({
      message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`,
    });
  } else {
    res.send(todo);
  }
};

// Delete completed Todos from the database.
exports.deleteCompleted = async (req, res) => {
  const result = await Todo.deleteMany(
    { user: mongoose.Types.ObjectId(req.user.id), isDone: true });

  res.send({
    message: `${result.deletedCount} Todos were deleted successfully!`,
  });
};

exports.toggleAll = async (req, res) => {
  const result = await Todo.updateMany(
    { user: mongoose.Types.ObjectId(req.user.id) }, { $set: { isDone: req.query.toggle } });

  res.send({
    message: `${result.nModified} Todos were updated successfully!`,
  });
};
