import endpoints from "shared/config/constants/endpoints.config";
import PermissionModel from "shared/model/permission.model";
import PortfolioModel from "shared/model/portfolio.model";
import RoleModel from "shared/model/role.model";
import RoleWithTeamModel from "shared/model/roleWithTeam.model";
import TeamRoleModel from "shared/model/teamRole.model";
import { UserModel } from "shared/model/user.model";
import urlJoin from "url-join";

import GlobalService from "../global/global.service";
import {
  buildTeamFromResponse,
  getTeamsResponse,
  rolesOfGetTeamByOidResponse,
  updateDescriptionBody,
  updateDisplayNameBody,
} from "../team/team.service";
import { AxiosResponse } from "axios";
import TeamModel from "shared/model/team.model";
import { getUserFromResponse } from "../user/user.service";

const instance = GlobalService.getInstance();

const RoleService = {
  getSelfRoles: () =>
    instance
      .get(endpoints.ENDPOINT_READ_SELF_ROLES_URL)
      .then(getRolesWithTeamResponse),
  getAllRoles: () =>
    instance
      .get(endpoints.ENDPOINT_READ_SELF_TEAMS_ROLES)
      .then(getAllRolesResponse),
  findSubTeamsForRole: (roleOid: string) =>
    instance
      .get(endpoints.ENDPOINT_READ_ROLE_SUBTEAMS_URL(roleOid))
      .then(getTeamsResponse),
  getRoleByOid: (oid: string, checkCaseValidation?: boolean) =>
    instance
      .get(
        urlJoin(endpoints.ENDPOINT_READ_ROLE_URL, oid),
        checkCaseValidation ? { params: { checkCaseValidation } } : null,
      )
      .then(getRoleByOidResponse),
  deleteRoleInTeamByOid: (roleOid: string, teamOid: string) =>
    instance.patch(
      endpoints.ENDPOINT_REMOVE_ROLE_IN_TEAM_URL,
      deleteRoleInTeamByOidBody(roleOid, teamOid),
    ),
  createNewRole: (
    roleDisplayName: string,
    roleDescription: string,
    portfolioOid: string,
    teamOid: string,
    teamName: string,
  ) =>
    instance
      .post(
        endpoints.ENDPOINT_CREATE_NEW_ROLE,
        createNewRoleQuery(
          roleDisplayName,
          roleDescription,
          portfolioOid,
          teamOid,
          teamName,
        ),
      )
      .then(createNewRoleResponse),
  updateRoleDisplayName: (oid, displayName) =>
    instance.put(
      endpoints.ENDPOINT_UPDATE_ROLE_DISPLAY_NAME_URL,
      updateDisplayNameBody(oid, displayName),
    ),

  updateRoleDescription: (oid, description) =>
    instance.put(
      endpoints.ENDPOINT_UPDATE_ROLE_DESCRIPTION_URL,
      updateDescriptionBody(oid, description),
    ),
  getByTeamOid: (teamOid: string, isMainTeam: boolean) =>
    instance
      .post(
        endpoints.ENDPOIN_READ_ROLES_BY_TEAM_OID,
        getByTeamOidBody(teamOid, isMainTeam),
      )
      .then(getByTeamOidResponse),
};

const createNewRoleResponse = (response: AxiosResponse<RoleModel>) => {
  const role = response.data;
  return new RoleModel(
    role.oid,
    role.name,
    role.displayName,
    role.description,
    extractPortfolioFromRoleInfo(role),
    role.isActive,
  );
};

const getByTeamOidBody = (teamOid: string, isMainTeam: boolean) => {
  return JSON.stringify({
    RoleByTeamOidInput: {
      teamOid,
      isMainTeam,
    },
  });
};

function getByTeamOidResponse(response: AxiosResponse<RoleModel[]>) {
  return rolesOfGetTeamByOidResponse(response.data);
}

const getRoleByOidResponse = (response: AxiosResponse<RoleModel>) => {
  let data = response.data;
  return buildRole(data);
};

type TeamRolesResponse = {
  team: TeamModel;
  roles: RoleModel[];
  teamRoleAssociate: string;
};

const getRolesWithTeamResponse = (
  response: AxiosResponse<TeamRolesResponse[]>,
) => {
  let data = response.data;
  if (data?.length > 0) {
    return data
      .filter((teamRole) => teamRole.roles?.length > 0)
      .map((teamRole) => buildRoleWithTeam(teamRole.roles[0], teamRole.team));
  } else {
    return [];
  }
};

const buildRole = (role: RoleModel) => {
  const permissions = permissionsOfGetRoleByOidResponse(role.permissions);
  return new RoleModel(
    role.oid,
    role.name,
    role.displayName,
    role.description,
    extractPortfolioFromRoleInfo(role),
    role.isActive,
    permissions,
    role.createTimestamp,
    role.modifyTimestamp,
    extractOwnerFromRoleInfo(role),
    role.isTeamCaseValidationImpossible,
  );
};

const buildRoleWithTeam = (role: RoleModel, team: TeamModel) => {
  return new RoleWithTeamModel(buildRole(role), buildTeamFromResponse(team));
};

const extractOwnerFromRoleInfo = (roleInfo: RoleModel) => {
  const roleOwner = roleInfo?.owner;
  if (roleOwner) {
    return getUserFromResponse(roleOwner);
  }
  return {} as UserModel;
};

const extractPortfolioFromRoleInfo = (roleInfo: RoleModel) => {
  const portfolio = roleInfo?.portfolio;
  if (portfolio) {
    return new PortfolioModel(
      portfolio.oid,
      portfolio.name,
      portfolio.displayName,
      portfolio.description,
      extractOwnerFromPortfolioInfo(portfolio),
      portfolio.isActive,
      portfolio.isCaseValidationImpossible,
    );
  }
  return {} as PortfolioModel;
};

const extractOwnerFromPortfolioInfo = (portfolioInfo: PortfolioModel) => {
  const owner = portfolioInfo?.owner;
  if (owner) {
    return getUserFromResponse(owner);
  }
  return {} as UserModel;
};

const permissionsOfGetRoleByOidResponse = (
  rawPermissions: PermissionModel[],
) => {
  let permissions = [];
  if (rawPermissions) {
    permissions = rawPermissions.map((permission) => {
      return new PermissionModel(
        permission.oid,
        permission.name,
        permission.isActive,
        permission.description,
      );
    });
  }
  return permissions;
};

function deleteRoleInTeamByOidBody(roleOid: string, teamOid: string) {
  return JSON.stringify({
    RemoveRoleFromTeamInput: { role: roleOid, team: teamOid },
  });
}

const getAllRolesResponse = (response: AxiosResponse<TeamRolesResponse[]>) => {
  let data = response.data;
  return data.reduce((acc, element) => {
    const roles = element.roles;
    if (roles.length > 0) {
      roles.forEach((role) => {
        acc = [
          ...acc,
          new TeamRoleModel(
            element.team?.oid,
            element.team?.displayName,
            role.oid,
            `${role.name}-${element.team?.oid}`,
            role.displayName,
            role.description,
            extractPortfolioFromRoleInfo(role),
            role.isActive,
            element.teamRoleAssociate,
          ),
        ];
      });
    }
    return acc;
  }, []) as TeamRoleModel[];
};

const createNewRoleQuery = (
  roleDisplayName: string,
  roleDescription: string,
  portfolioOid: string,
  teamOid: string,
  teamName: string,
) => {
  return JSON.stringify({
    CreateRoleInput: {
      teamOid,
      teamName,
      portfolioOid,
      roleDisplayName,
      roleDescription,
    },
  });
};

export {
  extractOwnerFromPortfolioInfo,
  extractOwnerFromRoleInfo,
  extractPortfolioFromRoleInfo,
  getAllRolesResponse,
  getRoleByOidResponse,
  getRolesWithTeamResponse,
  permissionsOfGetRoleByOidResponse,
};

export default RoleService;
