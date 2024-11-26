import PermissionElementModel from "./permissionElement.model";

class PermissionDetailsModel {
  name: string;
  perimeter: string;
  subPerimeter: PermissionElementModel;
  zone: PermissionElementModel;
  environment: PermissionElementModel;
  type: PermissionElementModel;
  subType: PermissionElementModel;
  value: PermissionElementModel;

  constructor(
    name: string,
    perimeter: string,
    subPerimeter: PermissionElementModel,
    zone: PermissionElementModel,
    environment: PermissionElementModel,
    type: PermissionElementModel,
    subType: PermissionElementModel,
    value: PermissionElementModel,
  ) {
    this.name = name;
    this.perimeter = perimeter;
    this.subPerimeter = subPerimeter;
    this.zone = zone;
    this.environment = environment;
    this.type = type;
    this.subType = subType;
    this.value = value;
  }
}

export default PermissionDetailsModel;
