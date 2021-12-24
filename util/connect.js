const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123123",
  database: "todoApp",
});
connection.connect((err) => {
  if (err) {
    console.log("can not connect database");
  }
});
module.exports = connection;
