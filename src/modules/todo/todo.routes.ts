import express = require("express");
import todoController from "./todo.controller";
import { validateTodo } from "./todo.validator";

const router = express.Router();

router.get("/", todoController.getTodos);
router.get("/:id", todoController.getTodoById);
router.post("/create", validateTodo, todoController.createTodo);
router.patch("/update/:id", validateTodo, todoController.updateTodo);
router.patch("/:id/archive", todoController.softDeleteTodo);

export default router;
