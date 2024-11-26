import PermissionTemplateSelectModel from "./permissionTemplateSelect.model";
import PermissionTemplateSelectTypeEnum from "./permissionTemplateSelectType.enum";

class PermissionTemplateSelectUserInputModel extends PermissionTemplateSelectModel {
  placeholder: string;
  affichage: string;
  validator: string;
  process: string;

  constructor(
    type: PermissionTemplateSelectTypeEnum,
    placeholder: string,
    affichage: string,
    validator: string,
    process: string,
  ) {
    super(type);
    this.placeholder = placeholder;
    this.affichage = affichage;
    this.validator = validator;
    this.process = process;
  }

  isTypeUserInputValid() {
    return this.process != null;
  }
}

export const buildPermissionTemplateSelectUserInputModel = (
  permissionTemplateSelectUserInputModel: PermissionTemplateSelectUserInputModel,
) => {
  return new PermissionTemplateSelectUserInputModel(
    permissionTemplateSelectUserInputModel.type,
    permissionTemplateSelectUserInputModel.placeholder,
    permissionTemplateSelectUserInputModel.affichage,
    permissionTemplateSelectUserInputModel.validator,
    permissionTemplateSelectUserInputModel.process,
  );
};

export const INS_ASSIGNMENT_PROCESS = "INS_ASSIGNMENT";

export const SUDO_MAP = "SUDO_MAP";

export default PermissionTemplateSelectUserInputModel;
