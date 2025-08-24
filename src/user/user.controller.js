const UserService = require("./user.service");

const UserController = {
  async createUser(req, res) {
    try {
      const userData = req.body;
      const response = await UserService.createUser(userData);
      return res.status(201).json({ data: response, success: true });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async getAllUsers(req, res) {
    try {
      const response = await UserService.getAllUsers();
      return res.status(200).json({ data: response, success: true });
    } catch (error) {
      return res.status(400).json({ error: error.message, success: false });
    }
  },

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const response = await UserService.getUserById(id);
      if (!response) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(200).json({ data: response, success: true });
    } catch (error) {
      return res.status(400).json({ error: error.message, success: false });
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const userData = req.body;
      const response = await UserService.updateUser(id, userData);
      return res.status(200).json({ data: response, success: true });
    } catch (error) {
      return res.status(400).json({ error: error.message, success: false });
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
