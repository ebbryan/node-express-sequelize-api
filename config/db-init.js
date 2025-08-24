const sequelize = require("./sequelize.js");
const { defineAssociations } = require("./associations.js");

function DBInit(app) {
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
}

module.exports = { DBInit };
