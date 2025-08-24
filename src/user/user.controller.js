const UserService = require("./user.service");

const UserController = {
  async createUser(req, res) {
    try {
      const userData = req.body;
      const user = await UserService.createUser(userData);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const userData = req.body;
      const user = await UserService.updateUser(id, userData);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const response = await UserService.deleteUser(id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};

module.exports = UserController;
