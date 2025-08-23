require("dotenv").config();
const cors = require("cors");
const express = require("express");

const todoRoutes = require("./src/todo/todo.routes.js");
const roleRoutes = require("./src/role/role.routes.js");
const { CustomMiddleware } = require("./middleware.js");
const { DBInit } = require("./config/db-init.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/todos", todoRoutes);
app.use("/roles", roleRoutes);

CustomMiddleware(app);
DBInit(app);
