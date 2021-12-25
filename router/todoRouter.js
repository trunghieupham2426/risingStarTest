const express = require("express");
const router = express.Router();
const todoController = require("./../controller/todoController");

router.post("/", todoController.createTodo);
router.get("/", todoController.getAllTodo);
router
  .route("/:id")
  .patch(todoController.updateTodo)
  .delete(todoController.deleteTodo);

module.exports = router;
