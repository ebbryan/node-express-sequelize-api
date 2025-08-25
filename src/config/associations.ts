import { Role } from "../modules/role/role.model";
import { User } from "../modules/user/user.model";

export function defineAssociations() {
  Role.hasMany(User, { foreignKey: "role_id", as: "users" });
  User.belongsTo(Role, { foreignKey: "role_id", as: "role" });
}
