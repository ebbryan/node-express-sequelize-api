require("dotenv").config();
const cors = require("cors");
const express = require("express");
const sequelize = require("./config/sequelize.js");
const todoRoutes = require("./src/todo/todo.routes.js");
const roleRoutes = require("./src/role/role.routes.js");
const { CustomMiddleware } = require("./middleware.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/todos", todoRoutes);
app.use("/roles", roleRoutes);

CustomMiddleware(app);

// Test database connection and sync model
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database");
    return sequelize.sync();
  })
  .then(() => {
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Server is running on port ${process.env.SERVER_PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
