export class GenericModel implements IGenericModel {
  oid: string;
  deleted?: boolean;

  constructor(oid: string) {
    this.oid = oid;
  }
}
