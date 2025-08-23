import { Op } from "sequelize";
import { Todo } from "@models/todo";
import type { TodoAttributes } from "@models/todo";

async function getAllTodos(): Promise<(typeof Todo)[]> {
  return await Todo.findAll({ order: [["createdAt", "DESC"]] });
}

async function getTodoByTitle(title: string): Promise<typeof Todo | null> {
  return await Todo.findOne({ where: { title } });
}

async function createTodo(
  data: Omit<TodoAttributes, "id">
): Promise<typeof Todo> {
  return await Todo.create(data);
}

async function updateTodo(
  id: string,
  data: Partial<TodoAttributes>
): Promise<[number]> {
  return await Todo.update(data, { where: { id } });
}

async function getTodoById(id: string): Promise<typeof Todo | null> {
  return await Todo.findByPk(id);
}

async function searchTodos(query: string): Promise<(typeof Todo)[]> {
  return await Todo.findAll({
    where: {
      title: {
        [Op.like]: `%${query}%`,
      },
    },
  });
}

export default {
  getAllTodos,
  createTodo,
  updateTodo,
  getTodoById,
  getTodoByTitle,
  searchTodos,
};
