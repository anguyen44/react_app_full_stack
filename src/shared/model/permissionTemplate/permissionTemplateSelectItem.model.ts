import PermissionTemplateSelectModel from "./permissionTemplateSelect.model";
import PermissionTemplateSelectTypeEnum from "./permissionTemplateSelectType.enum";

class PermissionTemplateSelectItemModel extends PermissionTemplateSelectModel {
  name: string;
  displayName: string;

  constructor(
    type: PermissionTemplateSelectTypeEnum,
    name: string,
    displayName: string,
  ) {
    super(type);
    this.name = name;
    this.displayName = displayName;
  }
}

export const buildPermissionTemplateSelectItemModel = (
  permissionTemplateSelectItemModel: PermissionTemplateSelectItemModel,
) => {
  return new PermissionTemplateSelectItemModel(
    permissionTemplateSelectItemModel.type,
    permissionTemplateSelectItemModel.name,
    permissionTemplateSelectItemModel.displayName,
  );
};

export default PermissionTemplateSelectItemModel;
