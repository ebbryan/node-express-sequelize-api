// Todo controller functions
declare module "@controllers/todo/todo.controller" {
  import { RequestHandler } from "express";

  export const getTodos: RequestHandler;
  export const createTodo: RequestHandler;
  export const updateTodo: RequestHandler;
  export const softDeleteTodo: RequestHandler;
  export const searchTodos: RequestHandler;
}
