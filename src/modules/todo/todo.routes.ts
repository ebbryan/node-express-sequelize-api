import express = require("express");
import todoController from "./todo.controller";
const router = express.Router();

router.get("/get", todoController.getTodos);
router.post("/create", todoController.createTodo);
router.patch("/update/:id", todoController.updateTodo);
router.patch("/:id/archive", todoController.softDeleteTodo);

export default router;
