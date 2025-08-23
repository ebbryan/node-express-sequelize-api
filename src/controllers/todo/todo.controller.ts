import { Request, Response } from "express";
import todoService from "@services/todo/todo.service";

async function getTodos(req: Request, res: Response): Promise<void> {
  try {
    const todos = await todoService.getAllTodos();
    res.json({ data: todos, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving todos", success: false });
  }
}

async function createTodo(req: Request, res: Response): Promise<void> {
  try {
    const { title, status }: { title: string; status: string } = req.body;
    const todos = await todoService.getAllTodos();

    const isExisting = todos.some((todo: any) => todo.title === title);

    if (isExisting) {
      res.status(400).json({
        message: "Todo with this title already exists",
        success: false,
      });
      return;
    }

    const validStatuses = [
      "pending",
      "in_progress",
      "completed",
      "archived",
    ] as const;

    const validatedStatus = validStatuses.includes(status as any)
      ? (status as "pending" | "in_progress" | "completed" | "archived")
      : "pending";

    const todo = await todoService.createTodo({
      title,
      status: validatedStatus,
    });
    res.status(201).json({ data: todo, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating todo", success: false });
  }
}

async function updateTodo(req: Request, res: Response): Promise<void> {
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

async function softDeleteTodo(req: Request, res: Response): Promise<void> {
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

async function searchTodos(req: Request, res: Response): Promise<void> {
  try {
    const { query } = req.query;

    if (!query) {
      res.status(400).json({ message: "Query is required", success: false });
      return;
    }

    const todos = await todoService.searchTodos(query as string);
    res.json({ data: todos, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error searching todos", success: false });
  }
}

export { getTodos, createTodo, updateTodo, softDeleteTodo, searchTodos };
