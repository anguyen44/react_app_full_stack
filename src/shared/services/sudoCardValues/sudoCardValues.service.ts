import endpoints from "shared/config/constants/endpoints.config";

import GlobalService from "../global/global.service";
import {
  createServiceCreationInput,
  createServicesSearchInput,
} from "shared/utils/permissionTemplate.util";
import PermissionTemplateSelectMidpointModel from "shared/model/permissionTemplate/permissionTemplateSelectMidpoint.model";
import { AxiosResponse } from "axios";
import SudoCardValueModel from "shared/model/sudoCardValue.model";
import PermissionTemplateSelectUserInputModel from "shared/model/permissionTemplate/permissionTemplateSelectUserInput.model";

const instance = GlobalService.getInstance();

const SudoCardsValuesService = {
  findAll: (
    permissionTemplateSelectMidpoint: PermissionTemplateSelectMidpointModel,
    portfolioOid: string,
  ) =>
    instance
      .post(
        endpoints.ENDPOINT_SEARCH_SUDO_CARDS,
        createServicesSearchInput(
          permissionTemplateSelectMidpoint,
          portfolioOid,
        ),
      )
      .then(getSudoCardValuesResponse),
  createSudoCardValue: (
    permissionTemplateSelectUserInput: PermissionTemplateSelectUserInputModel,
    name: string,
    description: string,
    portfolioOid: string,
    serviceOid?: string,
  ) =>
    instance
      .post(
        endpoints.ENDPOINT_CREATE_SUDO_CARDS,
        createServiceCreationInput(
          permissionTemplateSelectUserInput,
          name,
          description,
          portfolioOid,
          serviceOid,
        ),
      )
      .then(getSudoCardValueResponse),
};

const getSudoCardValuesResponse = (
  response: AxiosResponse<SudoCardValueModel[]>,
) => {
  return response.data?.map(buildSudoCardValue) ?? [];
};

const getSudoCardValueResponse = (
  response: AxiosResponse<SudoCardValueModel>,
) => {
  return response.data ? buildSudoCardValue(response.data) : null;
};

const buildSudoCardValue = (sudoCard: SudoCardValueModel) =>
  new SudoCardValueModel(
    sudoCard.oid,
    sudoCard.name,
    sudoCard.description,
    sudoCard.isUserInputAllowed,
    sudoCard.localAccounts,
  );

export default SudoCardsValuesService;
