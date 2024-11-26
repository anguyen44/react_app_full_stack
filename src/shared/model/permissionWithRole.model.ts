import PermissionModel from "./permission.model";
import RoleModel from "./role.model";

class PermissionWithRoleModel extends PermissionModel {
  role: RoleModel;

  constructor(permission: PermissionModel, role: RoleModel) {
    super(
      permission.oid,
      permission.name,
      permission.isActive,
      permission.description,
    );
    this.role = role;
  }
}

export default PermissionWithRoleModel;
