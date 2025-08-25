import express = require("express");
import userController from "./user.controller";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/create", userController.createUser);
router.patch("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
router.post("/verify-password", userController.verifyPassword);

export default router;
