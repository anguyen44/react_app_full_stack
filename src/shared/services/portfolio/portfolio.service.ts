import endpoints from "shared/config/constants/endpoints.config";
import PermissionWithRoleModel from "shared/model/permissionWithRole.model";
import PortfolioModel from "shared/model/portfolio.model";
import urlJoin from "url-join";

import GlobalService from "../global/global.service";
import { getPermissionByQueryResponse } from "../permission/permission.service";
import { getRolesWithTeamResponse } from "../role/role.service";
import {
  getUserFromResponse,
  getUsersFromResponseBody,
} from "../user/user.service";
import { AxiosResponse } from "axios";
import PermissionModel from "shared/model/permission.model";
import RoleModel from "shared/model/role.model";

const instance = GlobalService.getInstance();

const PortfolioService = {
  getPortfolios: () =>
    instance
      .get(endpoints.ENDPOINT_READ_SELF_PORTFOLIOS_URL)
      .then(getPortfoliosByQueryResponse),
  getPortfolioByOid: (oid: string) =>
    instance
      .get(urlJoin(endpoints.ENDPOINT_READ_PORTFOLIO_URL, oid))
      .then(getPortfolioFromResponse),
  getPortfoliosByQuery: (query: string) =>
    instance
      .get(
        urlJoin(
          endpoints.ENDPOINT_PORTFOLIO_SEARCH_BY_NAME_OR_DISPLAYNAME,
          query,
        ),
      )
      .then(getPortfoliosByQueryResponse),
  getRolesByPortfolioOid: (oid: string) =>
    instance
      .get(endpoints.ENDPOINT_READ_ROLES_PORTFOLIO_URL(oid))
      .then(getRolesWithTeamResponse),
  getPermissionsByPortfolioOid: (oid: string) =>
    instance
      .get(endpoints.ENDPOINT_READ_PERMISSIONS_PORTFOLIO_URL(oid))
      .then(getPermissionByQueryResponse),
  getApproversByPortfolioOid: (oid: string) =>
    instance
      .get(endpoints.ENDPOINT_GET_APPROVERS_PORTFOLIO_URL(oid))
      .then(getUsersFromResponseBody),
  addApproverToPortfolio: (orgOid: string, userOids: string[]) =>
    instance.patch(
      endpoints.ENDPOINT_ADD_APPROVER_IN_PORTFOLIO_URL,
      buildApproversToPortfolioInput(orgOid, userOids),
    ),
  removeApproverFromPortfolio: (portfolioOid: string, approverOid: string) =>
    instance.patch(
      endpoints.ENDPOINT_REMOVE_APPROVER_IN_PORTFOLIO_URL,
      buildApproverToPortfolioInput(portfolioOid, approverOid),
    ),
};

const getPortfoliosByQueryResponse = (
  response: AxiosResponse<PortfolioModel[]>,
) => {
  const data = response.data;
  return data?.map((p) => buildPortfolioFromResponse(p));
};

const getPortfolioFromResponse = (response) => {
  return response.data
    ? buildPortfolioFromResponse(response.data)
    : ({} as PortfolioModel);
};

const buildPortfolioFromResponse = (portfolio: PortfolioModel) => {
  const owner = getUserFromResponse(portfolio.owner);
  return new PortfolioModel(
    portfolio.oid,
    portfolio.name,
    portfolio.displayName,
    portfolio.description,
    owner,
    portfolio.isActive,
    portfolio.isCaseValidationImpossible,
  );
};

const buildPermissionsWithRolesFromResponse = (
  permissionsRes: PermissionModel[],
  rolesRes: RoleModel[],
) => {
  let permissions = new Array<PermissionModel>();
  permissionsRes.forEach((permission) => {
    let roles = rolesRes.filter(
      (role) =>
        role.permissions &&
        role.permissions.some(
          (permissionRole) => permissionRole.oid === permission.oid,
        ),
    );
    if (roles && roles.length > 0) {
      roles.forEach((role) => {
        permissions.push(new PermissionWithRoleModel(permission, role));
      });
    } else {
      permissions.push(new PermissionWithRoleModel(permission, null));
    }
  });
  rolesRes.forEach((role) => (role.permissions = []));
  return permissions;
};

function buildApproversToPortfolioInput(
  portfolioOid: string,
  userOids: string[],
) {
  return JSON.stringify({
    ApproverToPortfolioInput: {
      users: [...userOids],
      portfolio: portfolioOid,
    },
  });
}

function buildApproverToPortfolioInput(
  portfolioOid: string,
  approverOid: string,
) {
  return buildApproversToPortfolioInput(portfolioOid, new Array(approverOid));
}

export { buildPermissionsWithRolesFromResponse, getPortfoliosByQueryResponse };
export default PortfolioService;
