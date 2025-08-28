import { Request, Response, NextFunction } from "express";
import { handleErrorType } from "../../helpers/handleErrorType";
import { Role } from "./role.model";

export const validateRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data: Partial<Role> = req.body;
  const errors: string[] = [];
  const method = req.method;

  // For POST requests (create), name is required
  if (method === "POST") {
    if (
      !data.name ||
      typeof data.name !== "string" ||
      data.name.trim().length === 0
    ) {
      errors.push("Name is required and must be a non-empty string");
    }
  }

  // For PATCH requests (update), validate name if provided
  if (method === "PATCH" && data.name !== undefined) {
    if (typeof data.name !== "string" || data.name.trim().length === 0) {
      errors.push("Name must be a non-empty string");
    }
  }

  // Validate name length
  if (data.name && data.name.trim().length > 50) {
    errors.push("Name must be less than 50 characters");
  }

  // Check for unknown fields
  const allowedFields = ["name"];
  const providedFields = Object.keys(data);
  const unknownFields = providedFields.filter(
    (field) => !allowedFields.includes(field)
  );

  if (unknownFields.length > 0) {
    errors.push(
      `Unknown fields: ${unknownFields.join(
        ", "
      )}. Allowed fields: ${allowedFields.join(", ")}`
    );
  }

  if (errors.length > 0) {
    return handleErrorType(400, res, new Error(errors.join("; ")));
  }

  // Trim whitespace from name
  if (data.name) {
    req.body.name = data.name.trim();
  }

  next();
};
