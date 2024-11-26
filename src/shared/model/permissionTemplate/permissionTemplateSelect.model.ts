import PermissionTemplateSelectTypeEnum from "./permissionTemplateSelectType.enum";

abstract class PermissionTemplateSelectModel {
  type: PermissionTemplateSelectTypeEnum;

  constructor(type: PermissionTemplateSelectTypeEnum) {
    this.type = type;
  }

  isTypeUserInputValid() {
    return false;
  }
}

export default PermissionTemplateSelectModel;
