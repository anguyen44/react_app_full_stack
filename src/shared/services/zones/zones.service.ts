import endpoints from "shared/config/constants/endpoints.config";

import GlobalService from "../global/global.service";
import {
  createServicesSearchInput,
  getServicesResponse,
} from "shared/utils/permissionTemplate.util";
import PermissionTemplateSelectMidpointModel from "shared/model/permissionTemplate/permissionTemplateSelectMidpoint.model";

const instance = GlobalService.getInstance();

const ZoneService = {
  findAll: (
    permissionTemplateSelectMidpoint: PermissionTemplateSelectMidpointModel,
    portfolioOid: string,
  ) =>
    instance
      .post(
        endpoints.ENDPOINT_SEARCH_ZONE,
        createServicesSearchInput(
          permissionTemplateSelectMidpoint,
          portfolioOid,
        ),
      )
      .then(getServicesResponse),
};

export default ZoneService;
