const { Todo } = require("../models/todo");

async function getAllTodos() {
  return await Todo.findAll();
}

async function getTodoByTitle(title) {
  return await Todo.findOne({ where: { title: title } });
}

async function createTodo(data) {
  return await Todo.create(data);
}

async function updateTodo(id, data) {
  return await Todo.update(data, { where: { id } });
}

async function getTodoById(id) {
  return await Todo.findByPk(id);
}

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  getTodoById,
  getTodoByTitle,
};
