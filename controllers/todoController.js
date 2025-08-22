const todoService = require("../services/todoService");

async function getTodos(req, res) {
  try {
    const todos = await todoService.getAllTodos();
    res.json({ data: todos, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving todos", success: false });
  }
}

async function createTodo(req, res) {
  try {
    const { title, status } = req.body;
    const todos = await todoService.getAllTodos();

    const isExisting = todos.some((todo) => todo.title === title);

    if (isExisting) {
      return res.status(400).json({
        message: "Todo with this title already exists",
        success: false,
      });
    }

    const todo = await todoService.createTodo({ title, status });
    res.status(201).json({ data: todo, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating todo", success: false });
  }
}

async function updateTodo(req, res) {
  try {
    const { id } = req.params;
    const { title, status } = req.body;
    const [updated] = await todoService.updateTodo(id, { title, status });
    if (updated) {
      const updatedTodo = await todoService.getTodoById(id);
      res.json({ data: updatedTodo, success: true });
    } else {
      res.status(404).json({ message: "Todo not found", success: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating todo", success: false });
  }
}

async function softDeleteTodo(req, res) {
  try {
    const { id } = req.params;
    const [updated] = await todoService.updateTodo(id, { status: "archived" });
    if (updated) {
      const archivedTodo = await todoService.getTodoById(id);
      res.json({ data: archivedTodo, success: true });
    } else {
      res.status(404).json({ message: "Todo not found", success: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error archiving todo", success: false });
  }
}

module.exports = { getTodos, createTodo, updateTodo, softDeleteTodo };
