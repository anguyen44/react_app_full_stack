import { GenericModel } from "./generic.model";

export class GenericNameModel extends GenericModel {
  name: string;

  constructor(oid: string, name: string) {
    super(oid);
    this.name = name;
  }
}
