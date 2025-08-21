const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

router.get("/", todoController.getTodos);
router.post("/", todoController.createTodo);
router.patch("/:id", todoController.updateTodo);
router.patch("/:id/archive", todoController.softDeleteTodo);

module.exports = router;
