const sequelize = require("./sequelize.js");
const { defineAssociations } = require("./associations.js");

function DBInit(app) {
  // Define model associations first
  defineAssociations();

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
}

module.exports = { DBInit };
