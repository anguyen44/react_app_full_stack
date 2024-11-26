import { GenericDisplayModel } from "./genericDisplay.model";
import PortfolioModel from "./portfolio.model";

class TeamRoleModel extends GenericDisplayModel {
  teamOid: string;
  teamDisplayName: string;
  portfolio: PortfolioModel;
  isActive: boolean;
  teamRoleAssociate: string;

  constructor(
    teamOid: string,
    teamDisplayName: string,
    oid: string,
    name: string,
    displayName: string,
    description: string,
    portfolio: PortfolioModel,
    isActive: boolean,
    teamRoleAssociate: string,
  ) {
    super(oid, name, displayName, description);
    this.teamOid = teamOid;
    this.teamDisplayName = teamDisplayName;
    this.portfolio = portfolio;
    this.isActive = isActive;
    this.deleted = !teamOid;
    this.teamRoleAssociate = teamRoleAssociate;
  }
}

export default TeamRoleModel;
