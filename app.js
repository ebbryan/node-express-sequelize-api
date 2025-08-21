require("dotenv").config();
const cors = require("cors");
const express = require("express");
const sequelize = require("./sequelize");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/todos", todoRoutes);

// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Middleware to handle 404 errors
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

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
