import express = require("express");
import roleController from "./role.controller";

const router = express.Router();

router.get("/", roleController.getRoles);
router.post("/create", roleController.createRole);
router.patch("/update/:id", roleController.updateRole);
// router.patch("/:id/archive", todoController.softDeleteTodo);

export default router;
