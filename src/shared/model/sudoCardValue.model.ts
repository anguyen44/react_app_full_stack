import { GenericNameDescriptionModel } from "./genericNameDescription.model";
import { UserModel } from "./user.model";

class SudoCardValueModel extends GenericNameDescriptionModel {
  isUserInputAllowed: boolean;
  localAccounts: UserModel[];

  constructor(
    oid: string,
    name: string,
    description: string,
    isUserInputAllowed: boolean,
    localAccounts: UserModel[],
  ) {
    super(oid, name, description);
    this.isUserInputAllowed = isUserInputAllowed;
    this.localAccounts = localAccounts;
  }
}

export default SudoCardValueModel;
