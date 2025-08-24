const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize.js");
const { Role } = require("../role/role.model.js");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "roles",
        key: "id",
      },
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

module.exports = { User };
