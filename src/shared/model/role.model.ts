import { GenericElementModel } from "./genericElement.model";
import PermissionModel from "./permission.model";
import PortfolioModel from "./portfolio.model";
import { UserModel } from "./user.model";

class RoleModel extends GenericElementModel {
  portfolio: PortfolioModel;
  permissions: Array<PermissionModel>;
  createTimestamp: string;
  modifyTimestamp: string;
  isTeamCaseValidationImpossible?: boolean;

  constructor(
    oid: string,
    name: string,
    displayName: string,
    description: string,
    portfolio: PortfolioModel,
    isActive: boolean,
    permissions?: Array<PermissionModel>,
    createTimestamp?: string,
    modifyTimestamp?: string,
    owner?: UserModel,
    isTeamCaseValidationImpossible?: boolean,
  ) {
    super(oid, name, displayName, description, owner, isActive);
    this.portfolio = portfolio;
    this.permissions = permissions;
    this.createTimestamp = createTimestamp;
    this.modifyTimestamp = modifyTimestamp;
    this.isTeamCaseValidationImpossible = isTeamCaseValidationImpossible;
    this.deleted = false;
  }
}

export default RoleModel;
