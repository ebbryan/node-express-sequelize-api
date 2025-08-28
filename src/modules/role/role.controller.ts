import { Request, Response } from "express";
import roleService, { CreateRequestBody } from "./role.service";
import { handleErrorType } from "../../helpers/handleErrorType";

const getRoles = async (req: Request, res: Response) => {
  try {
    const response = await roleService.getAllRoles();
    return res.status(200).json({ data: response, success: true });
  } catch (error: unknown) {
    const err = error as Error;
    return handleErrorType(400, res, err.message);
  }
};

const getRoleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await roleService.getRoleById(id);
    return res.status(200).json({ data: response, success: true });
  } catch (error: unknown) {
    const err = error as Error;
    return handleErrorType(400, res, err.message);
  }
};

const createRole = async (req: Request, res: Response) => {
  try {
    const payload: CreateRequestBody = req.body;
    const response = await roleService.createRole(payload);
    return res.status(201).json({ data: response, success: true });
  } catch (error: unknown) {
    const err = error as Error;
    return handleErrorType(400, res, err.message);
  }
};

const updateRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const response = await roleService.updateRole(id, { name });
    return res.status(200).json({ data: response, success: true });
  } catch (error: unknown) {
    const err = error as Error;
    return handleErrorType(400, res, err.message);
  }
};

const deleteRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await roleService.deleteRole(id);
    return res.status(200).json({ data: response, success: true });
  } catch (error: unknown) {
    const err = error as Error;
    return handleErrorType(400, res, err.message);
  }
};

export default { getRoles, getRoleById, createRole, updateRole, deleteRole };
