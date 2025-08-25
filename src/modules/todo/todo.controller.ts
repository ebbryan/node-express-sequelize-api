import { handleErrorType } from "../../helpers/handleErrorType";
import { Todo } from "./todo.model";
import todoService, { TodoRequestBodyType } from "./todo.service";
import { Request, Response } from "express";

const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await todoService.getAllTodos();
    return res.json({ data: todos, success: true });
  } catch (error) {
    return handleErrorType(500, res, error, "Error retrieving todos");
  }
};

const getTodoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await todoService.getTodoById(id);
    return res.json({ data: response, success: true });
  } catch (error) {
    return handleErrorType(500, res, error, "Error retrieving a todo");
  }
};

const createTodo = async (req: Request, res: Response) => {
  try {
    const payload: TodoRequestBodyType = req.body;
    const todos = await todoService.getAllTodos();

    const isExisting = todos.some((todo) => todo.title === payload.title);

    if (isExisting) {
      return handleErrorType(400, res, "Todo with this title already exists");
    }

    const todo = await todoService.createTodo(payload);
    return res.status(201).json({ data: todo, success: true });
  } catch (error) {
    return handleErrorType(500, res, "Error creating todo");
  }
};

const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data: Partial<Todo> = req.body;

    const isUpdated = await todoService.updateTodo(id, data);

    if (!isUpdated) {
      return handleErrorType(404, res, "Todo not found");
    }

    const updatedTodo = await todoService.getTodoById(id);
    return res.json({ data: updatedTodo, success: true });
  } catch (err) {
    return handleErrorType(500, res, "Error updating todo");
  }
};

const softDeleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const isUpdated = await todoService.updateTodo(id, { status: "archived" });
    if (isUpdated) {
      const archivedTodo = await todoService.getTodoById(id);
      return res.json({ data: archivedTodo, success: true });
    } else {
      return handleErrorType(404, res, "Todo not found");
    }
  } catch (err) {
    return handleErrorType(500, res, "Error archiving todo");
  }
};

export default {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  softDeleteTodo,
};
