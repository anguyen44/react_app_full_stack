import { GenericElementModel } from "./genericElement.model";
import RoleModel from "./role.model";
import { UserModel } from "./user.model";

class IteamModel extends GenericElementModel {
  createTimestamp: string;
  validateTimestamp: string;
  members: Array<UserModel>;
  roles: Array<RoleModel>;
  readOnly: boolean;

  constructor(
    oid: string,
    name: string,
    displayName: string,
    createTimestamp: string,
    validateTimestamp: string,
    description: string,
    members: Array<UserModel> = [],
    roles: Array<RoleModel> = [],
    owner: UserModel,
    isActive?: boolean,
    readOnly?: boolean,
  ) {
    super(oid, name, displayName, description, owner, isActive);
    this.createTimestamp = createTimestamp;
    this.validateTimestamp = validateTimestamp;
    this.members = members;
    this.roles = roles;
    this.readOnly = readOnly;
  }
}

export default IteamModel;
