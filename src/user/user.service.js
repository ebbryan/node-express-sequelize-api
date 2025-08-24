const bcrypt = require("bcrypt");
const { User } = require("./user.model");
const { Role } = require("../role/role.model");

const UserService = {
  // Create a new user with password hashing
  async createUser(userData) {
    try {
      // Hash the password before saving
      const saltRounds = 12; // High level of security
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      const user = await User.create({
        ...userData,
        password: hashedPassword,
      });

      return user;
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  },

  // Get all users with role information
  async getAllUsers() {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password"] }, // Exclude password from results
        include: [
          {
            model: Role,
            as: "role",
            attributes: ["id", "name"],
          },
        ],
      });
      return users;
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  },

  // Get user by ID with role information
  async getUserById(id) {
    try {
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] }, // Exclude password from results
        include: [
          {
            model: Role,
            as: "role",
            attributes: ["id", "name"],
          },
        ],
      });
      return user;
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  },

  // Update user
  async updateUser(id, userData) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }

      // If password is being updated, hash it
      if (userData.password) {
        const saltRounds = 12;
        userData.password = await bcrypt.hash(userData.password, saltRounds);
      }

      await user.update(userData);
      return user;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  },

  // Delete user
  async deleteUser(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }

      await user.destroy();
      return { message: "User deleted successfully" };
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  },

  // Verify user password
  async verifyPassword(email, password) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return false;
      }

      const isValid = await bcrypt.compare(password, user.password);
      return isValid;
    } catch (error) {
      throw new Error(`Error verifying password: ${error.message}`);
    }
  },
};

module.exports = UserService;
