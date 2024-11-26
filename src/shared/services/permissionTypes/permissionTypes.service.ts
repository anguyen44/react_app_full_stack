import endpoints from "shared/config/constants/endpoints.config";
import PermissionTypeModel from "shared/model/permissionType.model";

import GlobalService from "../global/global.service";
import { AxiosResponse } from "axios";
import PermissionTemplateModel from "shared/model/permissionTemplate/permissionTemplate.model";
import PermissionTemplateSelectModel from "shared/model/permissionTemplate/permissionTemplateSelect.model";
import PermissionTemplateSelectItemModel, {
  buildPermissionTemplateSelectItemModel,
} from "shared/model/permissionTemplate/permissionTemplateSelectItem.model";
import PermissionTemplateSelectMidpointModel, {
  buildPermissionTemplateSelectMidpointModel,
} from "shared/model/permissionTemplate/permissionTemplateSelectMidpoint.model";
import PermissionTemplateSelectTypeEnum from "shared/model/permissionTemplate/permissionTemplateSelectType.enum";
import PermissionTemplateSelectUserInputModel, {
  buildPermissionTemplateSelectUserInputModel,
} from "shared/model/permissionTemplate/permissionTemplateSelectUserInput.model";
import PermissionTemplateItemModel from "shared/model/permissionTemplate/permissionTemplateItem.model";

const instance = GlobalService.getInstance();

const PermissionTypesService = {
  getPermissionTypes: (portfolioName: string) =>
    instance
      .get(endpoints.ENDPOINT_GET_PERMISSIONS_TYPES(portfolioName))
      .then(getPermissionTypesResponse),
};

const getPermissionTypesResponse = (
  response: AxiosResponse<PermissionTypeModel[]>,
) => {
  let data = response.data;
  return data?.map((permissionType) => {
    return new PermissionTypeModel(
      permissionType.oid,
      permissionType.name,
      permissionType.description,
      buildPermissionTemplate(permissionType.permissionTemplate),
    );
  });
};

const buildPermissionTemplate = (
  permissionTemplate: PermissionTemplateModel,
) => {
  let subTypes: Map<string, PermissionTemplateItemModel> = new Map();
  for (const subType in permissionTemplate.subTypes) {
    subTypes.set(subType, permissionTemplate.subTypes[subType]);
  }
  permissionTemplate.subTypes = subTypes;
  permissionTemplate.subTypes.forEach((subType) => {
    subType.val = buildPermissionTemplateSelectList(subType.val);
    subType.sousPerim = buildPermissionTemplateSelectList(subType.sousPerim);
    subType.zone = buildPermissionTemplateSelectList(subType.zone);
    subType.env = buildPermissionTemplateSelectList(subType.env);
  });

  return new PermissionTemplateModel(
    permissionTemplate.type,
    permissionTemplate.subTypes,
  );
};

const buildPermissionTemplateSelectList = (
  permissionTemplateSelectList: PermissionTemplateSelectModel[],
) => {
  return permissionTemplateSelectList?.map(buildPermissionTemplateSelect) ?? [];
};

const buildPermissionTemplateSelect = (
  permissionTemplateSelect: PermissionTemplateSelectModel,
) => {
  switch (permissionTemplateSelect.type) {
    case PermissionTemplateSelectTypeEnum.ITEM:
      return buildPermissionTemplateSelectItemModel(
        permissionTemplateSelect as PermissionTemplateSelectItemModel,
      );
    case PermissionTemplateSelectTypeEnum.MIDPOINT:
      return buildPermissionTemplateSelectMidpointModel(
        permissionTemplateSelect as PermissionTemplateSelectMidpointModel,
      );
    case PermissionTemplateSelectTypeEnum.USER_INPUT:
      return buildPermissionTemplateSelectUserInputModel(
        permissionTemplateSelect as PermissionTemplateSelectUserInputModel,
      );
  }
};

export { getPermissionTypesResponse };

export default PermissionTypesService;
