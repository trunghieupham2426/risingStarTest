const Todo = require("./../model/todoModel");
const { sendResponseErr, sendResponse } = require("./../util/sendResponse");

exports.createTodo = function (req, res) {
  if (!req.body?.description) {
    return sendResponseErr(500, "fail", "description cannot empty", res);
  }
  const todo = new Todo(req.body);
  const trimString = todo.description.trim();
  if (trimString.length === 0) {
    return sendResponseErr(500, "fail", "description cannot empty", res);
  }
  Todo.create({ description: trimString }, (err, data) => {
    if (err) {
      console.log(err.sqlMessage);
      return;
    }
    sendResponse(200, "success", data, res);
  });
};

exports.updateTodo = function (req, res) {
  const todoId = req.params.id;
  let updatedTodo = { ...req.body };
  if (updatedTodo?.description) {
    if (updatedTodo.description.trim().length === 0) {
      return sendResponseErr(500, "fail", "description cannot empty", res);
    }
    updatedTodo = {
      ...updatedTodo,
      description: updatedTodo.description.trim(),
    };
  }
  Todo.update(updatedTodo, todoId, (err, data) => {
    if (err) {
      return sendResponseErr(500, "fail", "invalid id or field empty", res);
    }
    sendResponse(200, "success", data, res);
  });
};

exports.deleteTodo = function (req, res) {
  const todoId = req.params.id;
  Todo.delete(todoId, (err, data) => {
    if (err) {
      return sendResponseErr(500, "fail", "invalid id", res);
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
    sendResponse(200, "success", data, res);
  });
};
