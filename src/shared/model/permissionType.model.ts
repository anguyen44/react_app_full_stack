import { GenericNameDescriptionModel } from "./genericNameDescription.model";
import PermissionTemplateModel from "./permissionTemplate/permissionTemplate.model";

class PermissionTypeModel extends GenericNameDescriptionModel {
  permissionTemplate: PermissionTemplateModel;

  constructor(
    oid: string,
    name: string,
    description: string,
    permissionTemplate: PermissionTemplateModel,
  ) {
    super(oid, name, description);
    this.permissionTemplate = permissionTemplate;
  }
}

export default PermissionTypeModel;
