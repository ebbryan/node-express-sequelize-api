declare module "*.js" {
  const value: any;
  export default value;
}

// Temporary declarations for existing JS modules
declare module "@/lib/sequelize" {
  const value: any;
  export default value;
}

declare module "@routes/todo/todo.routes" {
  const value: any;
  export default value;
}

declare module "@controllers/todo/todo.controller" {
  export const getTodos: any;
  export const createTodo: any;
  export const updateTodo: any;
  export const softDeleteTodo: any;
  export const searchTodos: any;
}

declare module "@models/todo" {
  export const Todo: any;
  export type TodoAttributes = any;
}

declare module "@services/todo/todo.service" {
  const value: any;
  export default value;
}
