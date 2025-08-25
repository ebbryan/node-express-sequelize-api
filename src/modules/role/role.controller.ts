import { Request, Response } from "express";
import roleService, { CreateRequestBody } from "./role.service";

const getRoles = async (req: Request, res: Response) => {
  try {
    const response = await roleService.getAllRoles();
    res.json({ data: response, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving roles", success: false });
  }
};

const createRole = async (req: Request, res: Response) => {
  try {
    const payload: CreateRequestBody = req.body;
    const roles = await roleService.getAllRoles();

    const isExisting = roles.some((role) => role.name === payload.name);

    if (isExisting) {
      return res.status(400).json({
        message: `${payload.name} role already exists`,
        success: false,
      });
    }

    const response = await roleService.createRole(payload);
    res.status(201).json({ data: response, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating Role", success: false });
  }
};

async function updateRole(req: Request, res: Response) {
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

export default { getRoles, createRole, updateRole };
