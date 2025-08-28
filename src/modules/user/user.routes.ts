import express = require("express");
import userController from "./user.controller";
import { validateUser } from "./user.validator";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/create", validateUser, userController.createUser);
router.patch("/update/:id", validateUser, userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
router.post("/verify-password", userController.verifyPassword);

export default router;
