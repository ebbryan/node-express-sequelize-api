const { Role } = require("./role.model");

async function getAllRoles() {
  return await Role.findAll();
}

async function createRole(data) {
  return await Role.create(data);
}

async function updateRole(id, data) {
  return await Role.update(data, { where: { id } });
}

async function getRoleById(id) {
  return await Role.findByPk(id);
}

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
};
