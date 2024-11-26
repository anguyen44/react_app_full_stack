import PermissionTemplateSelectModel from "./permissionTemplateSelect.model";
import PermissionTemplateSelectTypeEnum from "./permissionTemplateSelectType.enum";

class PermissionTemplateSelectMidpointModel extends PermissionTemplateSelectModel {
  process: string;
  affichage?: string;
  filter?: string;

  constructor(
    type: PermissionTemplateSelectTypeEnum,
    process: string,
    affichage?: string,
    filter?: string,
  ) {
    super(type);
    this.process = process;
    this.affichage = affichage;
    this.filter = filter;
  }
}

export const buildPermissionTemplateSelectMidpointModel = (
  permissionTemplateSelectMidpointModel: PermissionTemplateSelectMidpointModel,
) => {
  return new PermissionTemplateSelectMidpointModel(
    permissionTemplateSelectMidpointModel.type,
    permissionTemplateSelectMidpointModel.process,
    permissionTemplateSelectMidpointModel.affichage,
    permissionTemplateSelectMidpointModel.filter,
  );
};

export default PermissionTemplateSelectMidpointModel;
