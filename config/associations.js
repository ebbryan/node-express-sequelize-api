const { Role } = require("../src/role/role.model");
const { User } = require("../src/user/user.model");

function defineAssociations() {
  Role.hasMany(User, { foreignKey: "role_id", as: "users" });
  User.belongsTo(Role, { foreignKey: "role_id", as: "role" });
}

module.exports = { defineAssociations };
