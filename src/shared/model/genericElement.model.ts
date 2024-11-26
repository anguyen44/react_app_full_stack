import { GenericDisplayModel } from "./genericDisplay.model";
import { UserModel } from "./user.model";

export class GenericElementModel extends GenericDisplayModel {
  owner: UserModel;
  isActive: boolean;

  constructor(
    oid: string,
    name: string,
    displayName: string,
    description: string,
    owner: UserModel,
    isActive: boolean,
  ) {
    super(oid, name, displayName, description);
    this.owner = owner;
    this.isActive = isActive;
  }
}
