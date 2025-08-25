import { Request, Response, NextFunction } from "express";
import { handleErrorType } from "../../helpers/handleErrorType";

export const validateTodoUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = req.body;
  const errors: string[] = [];

  // Validate title if provided
  if (data.title !== undefined) {
    if (typeof data.title !== "string" || data.title.trim().length === 0) {
      errors.push("Title must be a non-empty string");
    }
  }

  // Validate status if provided
  if (data.status !== undefined) {
    const validStatuses = ["pending", "in_progress", "completed", "archived"];
    if (!validStatuses.includes(data.status)) {
      errors.push(`Status must be one of: ${validStatuses.join(", ")}`);
    }
  }

  // Check for unknown fields
  const allowedFields = ["title", "status"];
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
