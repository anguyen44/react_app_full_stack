import PermissionModel from "shared/model/permission.model";
import PermissionDetailsModel from "shared/model/permissionTemplate/permissionDetails.model";
import PermissionElementModel from "shared/model/permissionTemplate/permissionElement.model";
import PermissionTemplateModel from "shared/model/permissionTemplate/permissionTemplate.model";
import PermissionTemplateItemModel from "shared/model/permissionTemplate/permissionTemplateItem.model";
import PermissionTemplateSelectModel from "shared/model/permissionTemplate/permissionTemplateSelect.model";
import PermissionTemplateSelectItemModel from "shared/model/permissionTemplate/permissionTemplateSelectItem.model";
import PermissionTemplateSelectMidpointModel from "shared/model/permissionTemplate/permissionTemplateSelectMidpoint.model";
import PermissionTemplateSelectTypeEnum from "shared/model/permissionTemplate/permissionTemplateSelectType.enum";
import PermissionTemplateSelectUserInputModel, {
  INS_ASSIGNMENT_PROCESS,
} from "shared/model/permissionTemplate/permissionTemplateSelectUserInput.model";
import PermissionTypeModel from "shared/model/permissionType.model";

export const mockPermission = new PermissionModel(
  "e13b1885-5e51-4d77-9762-b10de9de7286",
  "6YN-NULL_ZSEv2-ZA_POD1_Kyss-appli_Read",
  true,
  null,
);

const buildSubTypesPermissionTemplateItems = (items: number[]) => {
  let subTypes: Map<string, PermissionTemplateItemModel> = new Map();
  items.forEach((item) =>
    subTypes.set("menu" + item, buildPermissionTemplateItemModel(item)),
  );
  return subTypes;
};

const mockTemplateValues = (item: number) => {
  switch (item) {
    case 2:
      return ["lecteur", "auditeur"];
    default:
      return ["lecteur", "editeur", "auditeur"];
  }
};

const mockTemplateSousPerim = (item: number) => {
  switch (item) {
    case 1:
      return ["B001", "B002"];
    default:
      return [];
  }
};

const mockTemplateZones = (item: number) => {
  switch (item) {
    case 1:
      return ["ZA"];
    case 2:
      return ["ZSE"];
    default:
      return [];
  }
};

const mockTemplateEnvironments = (item: number) => {
  switch (item) {
    case 1:
      return ["dev", "prod"];
    case 3:
      return ["prod", "qual", "dev"];
    default:
      return [];
  }
};

const buildPermissionTemplateSelectItems = (values: string[]) => {
  return values.map(
    (value) =>
      new PermissionTemplateSelectItemModel(
        PermissionTemplateSelectTypeEnum.ITEM,
        value,
        "display_" + value,
      ),
  );
};

const buildPermissionTemplateSelectMidpoint = (
  process: string,
  affichage?: string,
  filter?: string,
) => {
  return new PermissionTemplateSelectMidpointModel(
    PermissionTemplateSelectTypeEnum.MIDPOINT,
    process,
    affichage,
    filter,
  );
};

const buildPermissionTemplateSelectUserInput = (
  placeholder: string,
  affichage: string,
  validator: string,
  process: string,
) => {
  return new PermissionTemplateSelectUserInputModel(
    PermissionTemplateSelectTypeEnum.USER_INPUT,
    placeholder,
    affichage,
    validator,
    process,
  );
};

const buildPermissionTemplateSelectList = (
  values: string[],
  addMidPointAll?: boolean,
  addUserInputINSAssignment?: boolean,
) => {
  let permissionTemplateSelectList: PermissionTemplateSelectModel[] = [];
  if (values?.length > 0) {
    permissionTemplateSelectList.push.apply(
      permissionTemplateSelectList,
      buildPermissionTemplateSelectItems(values),
    );
  }
  if (addMidPointAll) {
    permissionTemplateSelectList.push(
      buildPermissionTemplateSelectMidpoint("ALL"),
    );
  }
  if (addUserInputINSAssignment) {
    permissionTemplateSelectList.push(
      buildPermissionTemplateSelectMidpoint(
        INS_ASSIGNMENT_PROCESS,
        "Briques applicatives",
        "^B[0-9]{3}$",
      ),
    );
    permissionTemplateSelectList.push(
      buildPermissionTemplateSelectUserInput(
        "Bxxx",
        "Numéro de brique",
        "^B[0-9]{3}$",
        INS_ASSIGNMENT_PROCESS,
      ),
    );
  }
  return permissionTemplateSelectList;
};

const buildPermissionTemplateItemModel = (item: number) => {
  let values = [...buildPermissionTemplateSelectList(mockTemplateValues(item))];
  let sousPerim = [
    ...buildPermissionTemplateSelectList(
      mockTemplateSousPerim(item),
      false,
      item == 3,
    ),
  ];
  let zones = [
    ...buildPermissionTemplateSelectList(
      mockTemplateZones(item),
      [2, 3].includes(item),
    ),
  ];
  let environments = [
    ...buildPermissionTemplateSelectList(
      mockTemplateEnvironments(item),
      item == 2,
    ),
  ];
  return new PermissionTemplateItemModel(
    values,
    sousPerim,
    zones,
    environments,
    "",
  );
};

const mockPermissionTemplate = (name: string, items: number[]) =>
  new PermissionTemplateModel(
    name,
    buildSubTypesPermissionTemplateItems(items),
  );

export const mockPermissionType1 = new PermissionTypeModel(
  "815a8b99-7b34-4d60-966b-4c3f1a5428ff",
  "D0R_LemonLDAP",
  "",
  mockPermissionTemplate("D0R_LemonLDAP", [1, 2]),
);

export const mockPermissionType2 = new PermissionTypeModel(
  "af0e8bd4-58dc-47df-bfbb-bcc1cc2c8eca",
  "D0R_Midpoint",
  "",
  mockPermissionTemplate("D0R_Midpoint", [1, 3]),
);

export const mockPermissionTemplateSelectMidpointAll =
  buildPermissionTemplateSelectMidpoint("ALL");

export const buildPermissionDetailsModelMock = (name: string) => {
  let permission = new PermissionModel("", name, true, "");
  return new PermissionDetailsModel(
    name,
    permission.perimeter,
    new PermissionElementModel(
      permission.subPerimeter,
      "Description du sous-périmètre",
    ),
    new PermissionElementModel(permission.zone, "Description de la zone"),
    new PermissionElementModel(
      permission.environment,
      "Description de l'environnement",
    ),
    new PermissionElementModel(permission.type, "Description du type"),
    new PermissionElementModel(permission.subType, "Description du sous-type"),
    new PermissionElementModel(permission.value, "Description de la valeur"),
  );
};
