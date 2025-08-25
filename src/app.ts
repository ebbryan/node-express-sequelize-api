require("dotenv").config();
import express from "express";
import cors from "cors";
import CustomMiddleware from "./middleware";
import DBInit from "./config/db-init";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/todos", todoRoutes);
app.use("/roles", roleRoutes);
app.use("/users", userRoutes);

CustomMiddleware(app);
DBInit(app);
