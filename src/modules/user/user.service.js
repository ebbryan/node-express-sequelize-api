const bcrypt = require("bcrypt");
const { User } = require("./user.model");
const { Role } = require("../role/role.model");

const UserService = {
  async createUser(userData) {
    try {
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      const user = await User.create({
        ...userData,
        password: hashedPassword,
      });
      return this.getUserById(user.id);
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  },

  async getAllUsers() {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password", "role_id"] },
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

  async getUserById(id) {
    try {
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password", "role_id"] },
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

  async updateUser(id, userData) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }

      if (userData.password) {
        const saltRounds = 12;
        userData.password = await bcrypt.hash(userData.password, saltRounds);
      }

      await user.update(userData);
      return this.getUserById(user.id);
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  },

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
