const express = require("express");
const router = express.Router();
const roleController = require("./role.controller.js");

router.get("/", roleController.getRoles);
router.post("/create", roleController.createRole);
router.patch("/update/:id", roleController.updateRole);
// router.patch("/:id/archive", todoController.softDeleteTodo);

module.exports = router;
