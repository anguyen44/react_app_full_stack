import PermissionTemplateItemModel from "./permissionTemplateItem.model";

class PermissionTemplateModel {
  type: string;
  subTypes: Map<string, PermissionTemplateItemModel>;

  constructor(
    type: string,
    subTypes: Map<string, PermissionTemplateItemModel>,
  ) {
    this.type = type;
    this.subTypes = subTypes;
  }
}

export default PermissionTemplateModel;
