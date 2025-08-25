import todoService, { TodoRequestBodyType } from "./todo.service";
import { Request, Response } from "express";

const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await todoService.getAllTodos();
    res.json({ data: todos, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving todos", success: false });
  }
};

const createTodo = async (req: Request, res: Response) => {
  try {
    const payload: TodoRequestBodyType = req.body;
    const todos = await todoService.getAllTodos();

    const isExisting = todos.some((todo) => todo.title === payload.title);

    if (isExisting) {
      return res.status(400).json({
        message: "Todo with this title already exists",
        success: false,
      });
    }

    const todo = await todoService.createTodo(payload);
    res.status(201).json({ data: todo, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating todo", success: false });
  }
};

const updateTodo = async (req: Request, res: Response) => {
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
};

const softDeleteTodo = async (req: Request, res: Response) => {
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
};

export default { getTodos, createTodo, updateTodo, softDeleteTodo };
