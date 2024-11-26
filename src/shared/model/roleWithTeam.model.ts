import RoleModel from "./role.model";
import TeamModel from "./team.model";

class RoleWithTeamModel extends RoleModel {
  team: TeamModel;

  constructor(role: RoleModel, team: TeamModel) {
    super(
      role.oid,
      role.name,
      role.displayName,
      role.description,
      role.portfolio,
      role.isActive,
      role.permissions,
      role.createTimestamp,
      role.modifyTimestamp,
      role.owner,
    );
    this.team = team;
  }
}

export default RoleWithTeamModel;
