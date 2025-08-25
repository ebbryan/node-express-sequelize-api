import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Model,
} from "sequelize";
import { sequelize } from "../../config/sequelize";

export class Todo extends Model<
  InferAttributes<Todo>,
  InferCreationAttributes<Todo>
> {
  declare id: CreationOptional<string>;
  declare title: string;
  declare status: "pending" | "in_progress" | "completed" | "archived";
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
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
    createdAt: {
      type: DataTypes.DATE(),
      allowNull: false,
      defaultValue: new Date().toString(),
    },
    updatedAt: {
      type: DataTypes.DATE(),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "todos",
  }
);
