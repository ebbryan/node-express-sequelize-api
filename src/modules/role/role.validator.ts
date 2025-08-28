import { Request, Response, NextFunction } from "express";
import { handleErrorType } from "../../helpers/handleErrorType";
import { Role } from "./role.model";

export const validateRole = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data: Pick<Role, "name"> = req.body;
  const errors: string[] = [];

  // Validate title if provided
  if (data.name !== undefined) {
    if (typeof data.name !== "string" || data.name.trim().length === 0) {
      errors.push("Title must be a non-empty string");
    }
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

  next();
};
