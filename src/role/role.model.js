const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize.js");
const { User } = require("../user/user.models.js");

const Role = sequelize.define(
  "Role",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "roles",
    timestamps: true,
  }
);

// Association: One Role hasMany Users
Role.hasMany(User, {
  foreignKey: "role_id",
  as: "users",
});

module.exports = { Role };
