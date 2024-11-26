import endpoints from "shared/config/constants/endpoints.config";

import GlobalService from "../global/global.service";
import {
  createServicesSearchInput,
  getServicesResponse,
} from "shared/utils/permissionTemplate.util";
import PermissionTemplateSelectMidpointModel from "shared/model/permissionTemplate/permissionTemplateSelectMidpoint.model";

const instance = GlobalService.getInstance();

const EnvironmentService = {
  findAll: (
    permissionTemplateSelectMidpoint: PermissionTemplateSelectMidpointModel,
    portfolioOid: string,
  ) =>
    instance
      .post(
        endpoints.ENDPOINT_SEARCH_ENV,
        createServicesSearchInput(
          permissionTemplateSelectMidpoint,
          portfolioOid,
        ),
      )
      .then(getServicesResponse),
};

export default EnvironmentService;
