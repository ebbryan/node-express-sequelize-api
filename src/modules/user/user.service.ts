import bcrypt = require("bcrypt");
import { User } from "./user.model";
import { Role } from "../role/role.model";

export type CreateRequestBody = Pick<
  User,
  "first_name" | "last_name" | "email" | "password" | "role_id"
>;

class UserService {
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
    } catch (error: unknown) {
      const err = error as Error;
      throw new Error(`Error fetching users: ${err.message}`);
    }
  }

  async createUser(userData: CreateRequestBody) {
    try {
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      const user = await User.create({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: hashedPassword,
        role_id: userData.role_id,
        status: "active",
      });
      return this.getUserById(user.id);
    } catch (error: unknown) {
      const err = error as Error;
      throw new Error(`Error creating user: ${err.message}`);
    }
  }

  async getUserById(id: string) {
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
    } catch (error: unknown) {
      const err = error as Error;
      throw new Error(`Error fetching user: ${err.message}`);
    }
  }

  async updateUser(id: string, userData: Partial<User>) {
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
      const err = error as Error;
      throw new Error(`Error updating user: ${err.message}`);
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("User not found");
      }

      await user.destroy();
      return { message: "User deleted successfully" };
    } catch (error: unknown) {
      const err = error as Error;
      throw new Error(`Error deleting user: ${err.message}`);
    }
  }

  async verifyPassword(email: string, password: string) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return false;
      }

      const isValid = await bcrypt.compare(password, user.password);
      return isValid;
    } catch (error: unknown) {
      const err = error as Error;
      throw new Error(`Error verifying password: ${err.message}`);
    }
  }
}

export default new UserService();
