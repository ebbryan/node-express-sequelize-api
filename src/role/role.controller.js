const roleService = require("./role.service.js");

async function getRoles(req, res) {
  try {
    const response = await roleService.getAllRoles();
    res.json({ data: response, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving roles", success: false });
  }
}

async function createRole(req, res) {
  try {
    const { name } = req.body;
    const roles = await roleService.getAllRoles();

    const isExisting = roles.some((role) => role.title === title);

    if (isExisting) {
      return res.status(400).json({
        message: `${title} role already exists`,
        success: false,
      });
    }

    const response = await roleService.createRole({ name });
    res.status(201).json({ data: response, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating Role", success: false });
  }
}

async function updateRole(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const [updated] = await roleService.updateRole(id, { name });

    if (updated) {
      const updatedRole = await roleService.getRoleById(id);
      res.json({ data: updatedRole, success: true });
    } else {
      res.status(404).json({ message: "Role not found", success: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating Role", success: false });
  }
}

// async function softDeleteTodo(req, res) {
//   try {
//     const { id } = req.params;
//     const [updated] = await todoService.updateTodo(id, { status: "archived" });
//     if (updated) {
//       const archivedTodo = await todoService.getTodoById(id);
//       res.json({ data: archivedTodo, success: true });
//     } else {
//       res.status(404).json({ message: "Todo not found", success: false });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error archiving todo", success: false });
//   }
// }

module.exports = { getRoles, createRole, updateRole };
