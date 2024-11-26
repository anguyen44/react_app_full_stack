import { GenericNameModel } from "./genericName.model";

export class GenericNameDescriptionModel extends GenericNameModel {
  description: string;

  constructor(oid: string, name: string, description: string) {
    super(oid, name);
    this.description = description?.trim() ?? description;
  }
}
export { GenericNameModel };
