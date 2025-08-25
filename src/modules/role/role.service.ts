import { Role } from "./role.model";

export type CreateRequestBody = Pick<Role, "name">;

class RoleService {
  async getAllRoles() {
    return await Role.findAll();
  }

  async getRoleById(id: string) {
    return await Role.findByPk(id);
  }

  async createRole(data: CreateRequestBody) {
    return await Role.create(data);
  }

  async updateRole(id: string, data: Partial<Role>) {
    return await Role.update(data, { where: { id } });
  }
}

export default new RoleService();
