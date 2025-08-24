const express = require("express");
const UserController = require("./user.controller");

const router = express.Router();

// User routes
router.post("/create", UserController.createUser);
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.patch("/update/:id", UserController.updateUser);
router.delete("/delete/:id", UserController.deleteUser);

module.exports = router;
