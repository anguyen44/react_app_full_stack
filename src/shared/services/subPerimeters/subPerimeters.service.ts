import endpoints from "shared/config/constants/endpoints.config";

import GlobalService from "../global/global.service";
import {
  createServiceCreationInput,
  createServicesSearchInput,
  getServiceResponse,
  getServicesResponse,
} from "shared/utils/permissionTemplate.util";
import PermissionTemplateSelectMidpointModel from "shared/model/permissionTemplate/permissionTemplateSelectMidpoint.model";
import PermissionTemplateSelectUserInputModel from "shared/model/permissionTemplate/permissionTemplateSelectUserInput.model";

const instance = GlobalService.getInstance();

const SubPerimetersService = {
  findAll: (
    permissionTemplateSelectMidpoint: PermissionTemplateSelectMidpointModel,
    portfolioOid: string,
  ) =>
    instance
      .post(
        endpoints.ENDPOINT_SEARCH_SUBPERIMETERS,
        createServicesSearchInput(
          permissionTemplateSelectMidpoint,
          portfolioOid,
        ),
      )
      .then(getServicesResponse),
  createSubPerimeter: (
    permissionTemplateSelectUserInput: PermissionTemplateSelectUserInputModel,
    name: string,
    description: string,
    portfolioOid: string,
  ) =>
    instance
      .post(
        endpoints.ENDPOINT_CREATE_SUBPERIMETERS,
        createServiceCreationInput(
          permissionTemplateSelectUserInput,
          name,
          description,
          portfolioOid,
        ),
      )
      .then(getServiceResponse),
};

export default SubPerimetersService;
