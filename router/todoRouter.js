const express = require("express");
const router = express.Router();
const todoController = require("./../controller/todoController");

router.post("/", todoController.createTodo);
router
  .route("/:id")
  .patch(todoController.updateTodo)
  //   .patch(todoController.updateTodoStatus)
  .delete(todoController.deleteTodo);

module.exports = router;
