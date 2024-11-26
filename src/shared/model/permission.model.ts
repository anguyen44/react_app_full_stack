import { GenericNameDescriptionModel } from "./genericNameDescription.model";

class PermissionModel extends GenericNameDescriptionModel {
  isActive: boolean;
  perimeter: string;
  subPerimeter: string;
  zone: string;
  environment: string;
  type: string;
  subType: string;
  value: string;

  constructor(
    oid: string,
    name: string,
    isActive: boolean,
    description: string,
  ) {
    super(oid, name, description);
    this.isActive = isActive;
    this.deleted = false;
    Object.assign(this, getInfosPermissionFromName(this.name));
  }
}

export function getInfosPermissionFromName(name: string) {
  let perimeter = null as string;
  let subPerimeter = null as string;
  let zone = null as string;
  let environment = null as string;
  let type = null as string;
  let subType = null as string;
  let value = null as string;

  let splitItems = name?.split("_");

  if (splitItems && splitItems.length == 5) {
    let i = 0;

    let splitPerimeter = splitItems[i++].split("-");
    perimeter = splitPerimeter[0];
    if (splitPerimeter.length == 2) {
      subPerimeter = splitPerimeter[1];
    }

    zone = splitItems[i++];
    environment = splitItems[i++];

    let splitType = splitItems[i++].split("-");
    type = splitType[0];
    if (splitType.length == 2) {
      subType = splitType[1];
    }

    value = splitItems[i];
  }

  return { perimeter, subPerimeter, zone, environment, type, subType, value };
}

export default PermissionModel;
