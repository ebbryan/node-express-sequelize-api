import { Role } from "./role.model";

export type CreateRequestBody = Pick<Role, "name">;

class RoleService {
  async getAllRoles() {
    try {
      const roles = await Role.findAll();
      return roles;
    } catch (error: unknown) {
      const err = error as Error;
      throw new Error(`Error fetching roles: ${err.message}`);
    }
  }

  async getRoleById(id: string) {
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        throw new Error("Role not found");
      }
      return role;
    } catch (error: unknown) {
      const err = error as Error;
      throw new Error(`Error fetching role: ${err.message}`);
    }
  }

  async createRole(data: CreateRequestBody) {
    try {
      // Check if role with same name already exists
      const existingRole = await Role.findOne({ where: { name: data.name } });
      if (existingRole) {
        throw new Error(`Role with name '${data.name}' already exists`);
      }

      const role = await Role.create(data);
      return role;
    } catch (error: unknown) {
      const err = error as Error;
      throw new Error(`Error creating role: ${err.message}`);
    }
  }

  async updateRole(id: string, data: Partial<Role>) {
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        throw new Error("Role not found");
      }

      // If name is being updated, check for duplicates
      if (data.name && data.name !== role.name) {
        const existingRole = await Role.findOne({ where: { name: data.name } });
        if (existingRole) {
          throw new Error(`Role with name '${data.name}' already exists`);
        }
      }

      await role.update(data);
      return role;
    } catch (error: unknown) {
      const err = error as Error;
      throw new Error(`Error updating role: ${err.message}`);
    }
  }

  async deleteRole(id: string) {
    try {
      const role = await Role.findByPk(id);
      if (!role) {
        throw new Error("Role not found");
      }

      await role.destroy();
      return { message: "Role deleted successfully" };
    } catch (error: unknown) {
      const err = error as Error;
      throw new Error(`Error deleting role: ${err.message}`);
    }
  }
}

export default new RoleService();
