import express = require("express");
import roleController from "./role.controller";
import { validateRole } from "./role.validator";

const router = express.Router();

router.get("/", roleController.getRoles);
router.get("/:id", roleController.getRoleById);
router.post("/create", validateRole, roleController.createRole);
router.patch("/update/:id", validateRole, roleController.updateRole);
router.delete("/delete/:id", roleController.deleteRole);

export default router;
