import { GenericNameDescriptionModel } from "./genericNameDescription.model";

export class GenericDisplayModel extends GenericNameDescriptionModel {
  displayName: string;

  constructor(
    oid: string,
    name: string,
    displayName: string,
    description: string,
  ) {
    super(oid, name, description);
    this.displayName = displayName?.trim();
  }
}
