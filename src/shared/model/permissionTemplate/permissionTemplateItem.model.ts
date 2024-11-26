import PermissionTemplateSelectModel from "./permissionTemplateSelect.model";

class PermissionTemplateItemModel {
  val: PermissionTemplateSelectModel[];
  sousPerim: PermissionTemplateSelectModel[];
  zone: PermissionTemplateSelectModel[];
  env: PermissionTemplateSelectModel[];
  description: string;

  constructor(
    val: PermissionTemplateSelectModel[],
    sousPerim: PermissionTemplateSelectModel[],
    zone: PermissionTemplateSelectModel[],
    env: PermissionTemplateSelectModel[],
    description: string,
  ) {
    this.val = val;
    this.sousPerim = sousPerim;
    this.zone = zone;
    this.env = env;
    this.description = description;
  }
}

export default PermissionTemplateItemModel;
