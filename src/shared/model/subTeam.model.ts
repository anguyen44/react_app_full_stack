import IteamModel from "./ITeam.model";
import RoleModel from "./role.model";
import { UserModel } from "./user.model";

class SubTeamModel extends IteamModel {
  constructor(
    oid: string,
    name: string,
    displayName: string,
    createTimestamp: string,
    validateTimestamp: string,
    members: Array<UserModel> = [],
    roles: Array<RoleModel> = [],
    owner?: UserModel,
    isActive?: boolean,
  ) {
    super(
      oid,
      name,
      displayName,
      createTimestamp,
      validateTimestamp,
      undefined,
      members,
      roles,
      owner,
      isActive,
    );
  }
}

export default SubTeamModel;
