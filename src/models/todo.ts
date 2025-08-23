import Sequelize from "sequelize";
const { DataTypes, Model } = Sequelize;
import sequelize from "@/lib/sequelize";

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
  public id!: string;
  public title!: string;
  public status!: "pending" | "in_progress" | "completed" | "archived";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Todo.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "in_progress", "completed", "archived"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    tableName: "todos",
    timestamps: true,
  }
);

export { Todo };
export type { TodoAttributes };
