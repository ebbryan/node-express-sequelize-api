import { Request, Response, NextFunction } from "express";
import { handleErrorType } from "../../helpers/handleErrorType";
import { User } from "./user.model";

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data: Partial<User> = req.body;
  const errors: string[] = [];
  const method = req.method;

  // For POST requests (create), validate required fields
  if (method === "POST") {
    const requiredFields = [
      "first_name",
      "last_name",
      "email",
      "password",
      "role_id",
    ];
    for (const field of requiredFields) {
      if (!data[field as keyof User]) {
        errors.push(`${field.replace("_", " ")} is required`);
      }
    }

    // Validate field types and formats
    if (
      data.first_name &&
      (typeof data.first_name !== "string" ||
        data.first_name.trim().length === 0)
    ) {
      errors.push("First name must be a non-empty string");
    }

    if (
      data.last_name &&
      (typeof data.last_name !== "string" || data.last_name.trim().length === 0)
    ) {
      errors.push("Last name must be a non-empty string");
    }

    if (
      data.email &&
      (typeof data.email !== "string" || !/\S+@\S+\.\S+/.test(data.email))
    ) {
      errors.push("Email must be a valid email address");
    }

    if (
      data.password &&
      (typeof data.password !== "string" || data.password.length < 6)
    ) {
      errors.push("Password must be at least 6 characters long");
    }

    if (
      data.role_id &&
      (typeof data.role_id !== "string" ||
        !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
          data.role_id
        ))
    ) {
      errors.push("Role ID must be a valid UUID");
    }
  }

  // For PATCH requests (update), validate provided fields
  if (method === "PATCH") {
    if (
      data.first_name !== undefined &&
      (typeof data.first_name !== "string" ||
        data.first_name.trim().length === 0)
    ) {
      errors.push("First name must be a non-empty string");
    }

    if (
      data.last_name !== undefined &&
      (typeof data.last_name !== "string" || data.last_name.trim().length === 0)
    ) {
      errors.push("Last name must be a non-empty string");
    }

    if (
      data.email !== undefined &&
      (typeof data.email !== "string" || !/\S+@\S+\.\S+/.test(data.email))
    ) {
      errors.push("Email must be a valid email address");
    }

    if (
      data.password !== undefined &&
      (typeof data.password !== "string" || data.password.length < 6)
    ) {
      errors.push("Password must be at least 6 characters long");
    }

    if (
      data.status !== undefined &&
      !["active", "in_active", "archived"].includes(data.status)
    ) {
      errors.push("Status must be one of: active, in_active, archived");
    }
  }

  // Validate field lengths
  if (data.first_name && data.first_name.trim().length > 50) {
    errors.push("First name must be less than 50 characters");
  }

  if (data.last_name && data.last_name.trim().length > 50) {
    errors.push("Last name must be less than 50 characters");
  }

  if (data.email && data.email.length > 100) {
    errors.push("Email must be less than 100 characters");
  }

  // Validate role_id format if provided
  if (data.role_id && typeof data.role_id !== "string") {
    errors.push("Role ID must be a string (UUID format)");
  }

  // Check for unknown fields
  const allowedFields = [
    "first_name",
    "last_name",
    "email",
    "password",
    "role_id",
    "status",
  ];
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

  // Trim whitespace from string fields
  if (data.first_name) {
    req.body.first_name = data.first_name.trim();
  }
  if (data.last_name) {
    req.body.last_name = data.last_name.trim();
  }
  if (data.email) {
    req.body.email = data.email.trim().toLowerCase();
  }

  next();
};
