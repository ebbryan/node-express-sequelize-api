// Todo service
declare module "@services/todo/todo.service" {
  import { Todo } from "@models/todo";
  import { TodoAttributes } from "@models/todo";

  interface TodoService {
    getAllTodos(): Promise<Todo[]>;
    getTodoByTitle(title: string): Promise<Todo | null>;
    createTodo(data: Omit<TodoAttributes, "id">): Promise<Todo>;
    updateTodo(id: string, data: Partial<TodoAttributes>): Promise<[number]>;
    getTodoById(id: string): Promise<Todo | null>;
    searchTodos(query: string): Promise<Todo[]>;
  }

  const todoService: TodoService;
  export default todoService;
}
