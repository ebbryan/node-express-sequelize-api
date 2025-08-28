import { Todo } from "./todo.model";

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

  async updateTodo(id: string, data: Partial<Todo>) {
    const [affectedRows] = await Todo.update(data, { where: { id } });
    return affectedRows > 0;
  }

  async getTodoById(id: string) {
    return await Todo.findByPk(id);
  }
}

export default new TodoService();
