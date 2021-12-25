const express = require("express");
const app = express();
const todoRoute = require("./router/todoRouter");
const cors = require("cors");
app.use(cors());

app.use(express.json());

app.use("/api/todo", todoRoute);

module.exports = app;
