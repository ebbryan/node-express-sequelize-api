import { Response } from "express";
import { Error } from "sequelize";

export const handleErrorType = (
  statusCode: number,
  response: Response,
  error?: unknown,
  customMessage?: string
) => {
  const err = error as Error;
  return response.status(statusCode).json({
    error: customMessage ? customMessage : err.message,
    success: false,
  });
};
