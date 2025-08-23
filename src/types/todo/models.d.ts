// Todo model and types
declare module "@models/todo" {
  import { Model, ModelStatic } from "sequelize";

  interface TodoAttributes {
    id: string;
    title: string;
    status: "pending" | "in_progress" | "completed" | "archived";
    createdAt?: Date;
    updatedAt?: Date;
  }

  interface TodoCreationAttributes extends Partial<TodoAttributes> {}

  class Todo
    extends Model<TodoAttributes, TodoCreationAttributes>
    implements TodoAttributes
  {
    public id: string;
    public title: string;
    public status: "pending" | "in_progress" | "completed" | "archived";
    public readonly createdAt: Date;
    public readonly updatedAt: Date;

    public static init(attributes: any, options: any): void;
    public static findAll(options?: any): Promise<Todo[]>;
    public static findOne(options?: any): Promise<Todo | null>;
    public static findByPk(id: string): Promise<Todo | null>;
    public static create(data: Omit<TodoAttributes, "id">): Promise<Todo>;
    public static update(
      data: Partial<TodoAttributes>,
      options: any
    ): Promise<[number]>;
  }

  export { Todo };
  export type { TodoAttributes };
}
