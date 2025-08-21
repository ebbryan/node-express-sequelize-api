const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Todo = sequelize.define(
  "Todo",
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
    tableName: "todos",
    timestamps: true,
  }
);

module.exports = { Todo };
