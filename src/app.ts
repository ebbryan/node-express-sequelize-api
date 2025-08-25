require("dotenv").config();
import express = require("express");
import cors = require("cors");
import CustomMiddleware from "./middleware";
import DBInit from "./config/db-init";
import routes from "./routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", routes);

CustomMiddleware(app);
DBInit(app);
