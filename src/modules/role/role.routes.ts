import express = require("express");
import roleController from "./role.controller";
import { validateRole } from "./role.validator";

const router = express.Router();

router.get("/", roleController.getRoles);
router.get("/:id", roleController.getRoleById);
router.post("/create", roleController.createRole);
router.patch("/update/:id", roleController.updateRole);
// router.patch("/:id/archive", todoController.softDeleteTodo);

export default router;
