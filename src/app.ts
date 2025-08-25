require("dotenv").config();
import express = require("express");
import cors = require("cors");
import CustomMiddleware from "./middleware";
import DBInit from "./config/db-init";
import todoRoutes from "./modules/todo/todo.routes";
import roleRoutes from "./modules/role/role.routes";
import userRoutes from "./modules/user/user.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/todos", todoRoutes);
app.use("/roles", roleRoutes);
app.use("/users", userRoutes);

CustomMiddleware(app);
DBInit(app);
