import express = require("express");
import todoController from "./todo.controller";
import { validateTodoUpdate } from "./todo.validator";

const router = express.Router();

router.get("/", todoController.getTodos);
router.get("/:id", todoController.getTodoById);
router.post("/create", todoController.createTodo);
router.patch("/update/:id", validateTodoUpdate, todoController.updateTodo);
router.patch("/:id/archive", todoController.softDeleteTodo);

export default router;
