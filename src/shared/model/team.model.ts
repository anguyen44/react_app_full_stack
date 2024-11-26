import IteamModel from "./ITeam.model";
import RoleModel from "./role.model";
import SubTeamModel from "./subTeam.model";
import { UserModel } from "./user.model";

class TeamModel extends IteamModel {
  subTeams: Array<SubTeamModel>;
  constructor(
    oid: string,
    name: string,
    displayName: string,
    createTimestamp: string,
    validateTimestamp: string,
    description: string,
    subTeams: Array<SubTeamModel> = [],
    members: Array<UserModel> = [],
    roles: Array<RoleModel> = [],
    owner: UserModel,
    isActive: boolean,
    readOnly: boolean,
  ) {
    super(
      oid,
      name,
      displayName,
      createTimestamp,
      validateTimestamp,
      description,
      members,
      roles,
      owner,
      isActive,
      readOnly,
    );
    this.subTeams = subTeams;
  }
}

export default TeamModel;
