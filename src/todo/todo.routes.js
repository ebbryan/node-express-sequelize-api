const express = require("express");
const router = express.Router();
const todoController = require("./todo.controller.js");

router.get("/get", todoController.getTodos);
router.post("/create", todoController.createTodo);
router.patch("/update/:id", todoController.updateTodo);
router.patch("/:id/archive", todoController.softDeleteTodo);

module.exports = router;