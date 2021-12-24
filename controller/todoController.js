const Todo = require("./../model/todoModel");

exports.createTodo = function (req, res) {
  if (!req.body?.description) {
    return res.status(500).json({
      status: "fail",
      message: "description cannot empty",
    });
  }
  const todo = new Todo(req.body);
  const trimString = todo.description.trim();
  if (trimString.length === 0) {
    return res.status(500).json({
      status: "fail",
      message: "description cannot empty",
    });
  }
  Todo.create({ description: trimString }, (err, data) => {
    if (err) {
      console.log(err.sqlMessage);
      return;
    }
    res.status(200).json({
      status: "success",
      data: data,
    });
  });
};

exports.updateTodo = function (req, res) {
  const todoId = req.params.id;
  const updatedTodo = new Todo(req.body);
  Todo.update(updatedTodo, todoId, (err, data) => {
    if (err) {
      return res.status(500).json({
        status: "fail",
        message: "invalid id or description empty",
      });
    }
    res.status(200).json({
      status: "success",
      data: data,
    });
  });
};

exports.deleteTodo = function (req, res) {
  const todoId = req.params.id;
  Todo.delete(todoId, (err, data) => {
    if (err) {
      return res.status(500).json({
        status: "fail",
        message: "invalid id",
      });
    }
    res.status(200).json({
      status: "success",
    });
  });
};
