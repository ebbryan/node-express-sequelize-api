import express from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  softDeleteTodo,
  searchTodos,
} from "@controllers/todo/todo.controller";

const router = express.Router();

router.get("/get", getTodos);
router.get("/search", searchTodos);
router.post("/create", createTodo);
router.patch("/update/:id", updateTodo);
router.patch("/:id/archive", softDeleteTodo);

export default router;
