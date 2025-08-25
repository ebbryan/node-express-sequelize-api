const express = require("express");
const UserController = require("./user.controller");

const router = express.Router();

// User routes
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.post("/create", UserController.createUser);
router.patch("/update/:id", UserController.updateUser);
router.delete("/delete/:id", UserController.deleteUser);
router.post("/verify-password", UserController.verifyPassword);

module.exports = router;
