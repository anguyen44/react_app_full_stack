import { GenericElementModel } from "./genericElement.model";
import { UserModel } from "./user.model";

class PortfolioModel extends GenericElementModel {
  isCaseValidationImpossible?: boolean;

  constructor(
    oid: string,
    name: string,
    displayName: string,
    description: string,
    owner: UserModel,
    isActive: boolean,
    isCaseValidationImpossible?: boolean,
  ) {
    super(oid, name, displayName, description, owner, isActive);
    this.isCaseValidationImpossible = isCaseValidationImpossible;
  }

  getFullName() {
    return `${this.displayName} (${this.name})`;
  }
}

export default PortfolioModel;
