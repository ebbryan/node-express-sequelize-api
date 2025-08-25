const { v4: uuidv4 } = require("uuid");

const sequelize = require("../../config/sequelize.js");
const { Role } = require("../role/role.model.js");

async function seedRoles() {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");

    await sequelize.sync({ alter: true });

    const roles = [
      { id: uuidv4(), name: "admin" },
      { id: uuidv4(), name: "user" },
      { id: uuidv4(), name: "guest" },
    ];

    const existingRoles = await Role.findAll();
    if (existingRoles.length > 0) {
      console.log("Roles already seeded.");
      return;
    }

    await Role.bulkCreate(roles);
    console.log("Roles seeded successfully.");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await sequelize.close();
    console.log("Database connection closed.");
  }
}

seedRoles();
