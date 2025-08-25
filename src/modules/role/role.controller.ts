import { Request, Response } from "express";
import roleService, { CreateRequestBody } from "./role.service";
import { handleErrorType } from "../../helpers/handleErrorType";

const getRoles = async (req: Request, res: Response) => {
  try {
    const response = await roleService.getAllRoles();
    return res.json({ data: response, success: true });
  } catch (error) {
    return handleErrorType(500, res, "Error retrieving roles.");
  }
};

const getRoleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await roleService.getRoleById(id);
    return res.json({ data: response, success: true });
  } catch (error) {
    return handleErrorType(500, res, "Error retrieving a role.");
  }
};

const createRole = async (req: Request, res: Response) => {
  try {
    const payload: CreateRequestBody = req.body;
    const roles = await roleService.getAllRoles();

    const isExisting = roles.some((role) => role.name === payload.name);

    if (isExisting) {
      return handleErrorType(400, res, `${payload.name} role already exists`);
    }

    const response = await roleService.createRole(payload);
    return res.status(201).json({ data: response, success: true });
  } catch (error) {
    return handleErrorType(500, res, "Error creating Role.");
  }
};

async function updateRole(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const [updated] = await roleService.updateRole(id, { name });

    if (updated) {
      const updatedRole = await roleService.getRoleById(id);
      return res.json({ data: updatedRole, success: true });
    } else {
      return handleErrorType(404, res, "Role not found");
    }
  } catch (error) {
    return handleErrorType(500, res, "Error updating Role");
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

export default { getRoles, getRoleById, createRole, updateRole };
