const Todo = require("./../model/todoModel");

function sendResponse(statusCode, status, message, res) {
  res.status(statusCode).json({
    status: status,
    message: message,
  });
}

exports.createTodo = function (req, res) {
  if (!req.body?.description) {
    // return res.status(500).json({
    //   status: "fail",
    //   message: "description cannot empty",
    // });
    return sendResponse(500, "fail", "description cannot empty", res);
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
  const trimString = updatedTodo.description.trim();
  if (trimString.length === 0) {
    return res.status(500).json({
      status: "fail",
      message: "description cannot empty",
    });
  }
  Todo.update(
    { ...updatedTodo, description: trimString },
    todoId,
    (err, data) => {
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
    }
  );
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

exports.getAllTodo = function (req, res) {
  let field = req.query.sort || "created_at";
  let sort = "ASC";
  if (field.includes("-")) {
    sort = "DESC";
    field = field.split("-")[1];
  }
  Todo.getAll(field, sort, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.status(200).json({
      status: "success",
      data: data,
    });
  });
};
