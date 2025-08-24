const { User } = require("../src/user/user.models");
const { Role } = require("../src/role/role.model");

function defineAssociations() {
  // User belongs to Role
  User.belongsTo(Role, {
    foreignKey: "role_id",
    as: "role",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });

  // Role has many Users
  Role.hasMany(User, {
    foreignKey: "role_id",
    as: "users",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  });

  console.log("Model associations defined successfully");
}

module.exports = { defineAssociations };
