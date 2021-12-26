const db = require("./../util/connect");

class Todo {
  constructor(todo) {
    this.description = todo.description;
    this.status = todo.status;
  }
  static create = (newTodo, result) => {
    db.query(
      "INSERT INTO todo(description) VALUES(?)",
      newTodo.description,
      (err, data) => {
        if (err) {
          result(err, null);
          return;
        }
        result(null, { id: data.insertId, ...newTodo });
      }
    );
  };
  static update = (updatedTodo, id, result) => {
    // console.log(updatedTodo);
    db.query(
      "UPDATE todo SET ? WHERE todo_id = ?",
      [updatedTodo, id],
      (err, data) => {
        if (err) {
          // console.log(err);
          result(err, null);
          return;
        }
        if (!data.affectedRows) {
          result("invalid id", null);
        } else {
          result(null, {
            id: id,
            description: updatedTodo.description,
            status: updatedTodo.status,
          });
        }
      }
    );
  };

  static delete = (id, result) => {
    db.query("DELETE FROM todo WHERE todo_id = ?", [id], (err, data) => {
      if (err) {
        result(err, null);
        return;
      }
      if (!data.affectedRows) {
        // nếu ko query dc thì affectRows = 0
        result("invalid id", null);
      } else {
        result(null, null);
      }
    });
  };
  static getAll = (field, sort, result) => {
    const sql = `SELECT * FROM todo ORDER BY ${field} ${sort} `;
    db.query(sql, (err, data) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, data);
    });
  };
}

module.exports = Todo;
