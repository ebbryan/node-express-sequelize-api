import { Request, Response } from "express";
import userService, { CreateRequestBody } from "./user.service";
import { handleErrorType } from "../../helpers/handleErrorType";

const createUser = async (req: Request, res: Response) => {
  try {
    const userData: CreateRequestBody = req.body;
    const response = await userService.createUser(userData);
    return res.status(201).json({ data: response, success: true });
  } catch (error) {
    return handleErrorType(400, res, error);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const response = await userService.getAllUsers();
    return res.status(200).json({ data: response, success: true });
  } catch (error) {
    return handleErrorType(400, res, error);
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await userService.getUserById(id);
    if (!response) {
      return handleErrorType(404, res, "User not Found!");
    }
    return res.status(200).json({ data: response, success: true });
  } catch (error) {
    return handleErrorType(400, res, error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const response = await userService.updateUser(id, userData);
    return res.status(200).json({ data: response, success: true });
  } catch (error) {
    return handleErrorType(400, res, error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await userService.deleteUser(id);
    return res.status(200).json(response);
  } catch (error) {
    return handleErrorType(400, res, error);
  }
};

const verifyPassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const isPasswordMatched = await userService.verifyPassword(email, password);
    return res.status(200).json({
      isMatch: isPasswordMatched,
    });
  } catch (error) {
    return handleErrorType(400, res, error);
  }
};

export default {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  verifyPassword,
};
