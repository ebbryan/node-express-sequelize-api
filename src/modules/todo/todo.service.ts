import { Todo } from "./todo.model";
import { TodoTypes } from "./todo.type";

export type TodoRequestBodyType = Pick<Todo, "title" | "status">;

class TodoService {
  async getAllTodos() {
    return await Todo.findAll();
  }

  async getTodoByTitle(title: string) {
    return await Todo.findOne({ where: { title: title } });
  }

  async createTodo(data: TodoRequestBodyType) {
    return await Todo.create(data);
  }

  async updateTodo(id: string, data: Partial<TodoTypes>) {
    return await Todo.update(data, { where: { id } });
  }

  async getTodoById(id: string) {
    return await Todo.findByPk(id);
  }
}

export default new TodoService();
