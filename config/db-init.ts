import sequelize from "./sequelize";
import { defineAssociations } from "./associations";
import { Express } from "express";

const DBInit = (app: Express) => {
  sequelize
    .authenticate()
    .then(() => {
      defineAssociations();
      console.log("Connected to the database and associations defined.");
      return sequelize.sync({ alter: true });
    })
    .then(() => {
      app.listen(process.env.SERVER_PORT, () => {
        console.log(`Server is running on port ${process.env.SERVER_PORT}`);
      });
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
};

export default DBInit;
