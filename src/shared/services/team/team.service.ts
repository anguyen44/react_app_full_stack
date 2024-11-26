import endpoints from "shared/config/constants/endpoints.config";
import RoleModel from "shared/model/role.model";
import TeamModel from "shared/model/team.model";
import urlJoin from "url-join";

import GlobalService, { retryWrapper } from "../global/global.service";
import { extractPortfolioFromRoleInfo } from "../role/role.service";
import {
  getUserFromResponse,
  getUserFromResponseBody,
  getUsersFromResponse,
  getUsersFromResponseBody,
} from "../user/user.service";
import { AxiosResponse } from "axios";

const instance = GlobalService.getInstance();

const TeamService = {
  getSelfTeams: () =>
    instance.get(endpoints.ENDPOINT_READ_SELF_TEAMS_URL).then(getTeamsResponse),
  getTeams: () =>
    instance.get(endpoints.ENDPOINT_READ_TEAMS_URL).then(getTeamsResponse),
  getTeamByOid: (teamOid: string) => {
    const retryInstance = retryWrapper(instance, {
      retry_times: 1,
      retry_status_code: 401,
    });
    return retryInstance
      .get(urlJoin(endpoints.ENDPOINT_READ_TEAM_URL, teamOid.toString()))
      .then(getTeamByOidResponse);
  },
  getOwnerByOid: (teamOid: string) =>
    instance
      .get(endpoints.ENDPOINT_GET_TEAM_OWNER(teamOid))
      .then(getUserFromResponseBody),
  getMembersByOid: (teamOid: string) =>
    instance
      .get(endpoints.ENDPOINT_GET_TEAM_MEMBERS_BY_TEAM_OID(teamOid))
      .then(getUsersFromResponseBody),
  getApproversByTeamOid: (teamOid: string) =>
    instance
      .get(
        endpoints.ENDPOINT_GET_APPROVERS_BY_TEAM_OID.format({
          teamOid,
        }) as string,
      )
      .then(getUsersFromResponseBody),
  addApproverToTeam: (orgOid: string, userOids: string[]) =>
    instance.patch(
      endpoints.ENDPOINT_ADD_APPROVER_IN_TEAM_URL,
      addApproverToTeamBody(orgOid, userOids),
    ),
  removeApproverFromTeam: (teamOid: string, approverOid: string) =>
    instance.patch(
      endpoints.ENDPOINT_REMOVE_APPROVER_IN_TEAM_URL,
      removeApproverByOidInTeamBody(teamOid, approverOid),
    ),
  updateTeamDisplayName: (oid: string, displayName: string) =>
    instance.put(
      endpoints.ENDPOINT_UPDATE_TEAM_DISPLAY_NAME_URL,
      updateDisplayNameBody(oid, displayName),
    ),
  updateTeamDescription: (oid: string, description: string) =>
    instance.put(
      endpoints.ENDPOINT_UPDATE_TEAM_DESCRIPTION_URL,
      updateDescriptionBody(oid, description),
    ),
  addUserToTeam: (teamOids: string[], userOids: string[]) =>
    instance.patch(
      endpoints.ENDPOINT_ADD_USER_TO_TEAM_URL,
      addUserToTeamBody(teamOids, userOids),
    ),
  addRoleToTeam: (teamOid: string, roleOidList: string[]) =>
    instance.patch(
      endpoints.ENDPOINT_ADD_ROLE_TO_TEAM_URL,
      addRoleToTeamBody(teamOid, roleOidList),
    ),
  createSubTeam: (
    teamOid: string,
    subTeamName: string,
    subTeamDescription: string,
  ) =>
    instance.post(
      endpoints.ENDPOINT_CREATE_SUBTEAMS_URL,
      createSubTeamBody(teamOid, subTeamName, subTeamDescription),
    ),
  deleteSubTeam: (subTeamOid: string) =>
    instance.delete(
      urlJoin(endpoints.ENDPOINT_DELETE_SUBTEAMS_URL, subTeamOid.toString()),
    ),
  verifyDeletableSubTeam: (subTeamOid: string) =>
    instance.get(
      endpoints.ENDPOINT_VERIFY_DELETABLE_SUBTEAM_ELIGIBILITY(subTeamOid),
    ),
  verifyTeamCaseValidationPossible: (teamOid: string) =>
    instance
      .get(endpoints.ENDPOINT_VERIFY_TEAM_CASE_VALIDATION_POSSIBLE(teamOid))
      .then((res) => res.data as boolean),
};

const removeApproverByOidInTeamBody = (
  teamOid: string,
  approverOid: string,
) => {
  return JSON.stringify({
    ApproverToTeamInput: { users: new Array(approverOid), team: teamOid },
  });
};

export const updateDisplayNameBody = (oid: string, displayName: string) => {
  return JSON.stringify({
    UpdateDisplayNameInput: {
      oid,
      displayName,
    },
  });
};

export const updateDescriptionBody = (oid: string, description: string) => {
  return JSON.stringify({
    UpdateDescriptionInput: {
      oid,
      description,
    },
  });
};

function addRoleToTeamBody(teamOid: string, rolesOid: string[]) {
  return JSON.stringify({
    AddRoleToTeamInput: {
      roles: [...rolesOid],
      team: teamOid,
    },
  });
}

function addUserToTeamBody(teamOids: string[], userOids: string[]) {
  return JSON.stringify({
    UserToTeamInput: {
      users: [...userOids],
      teams: [...teamOids],
    },
  });
}

function addApproverToTeamBody(teamOid: string, userOids: string[]) {
  return JSON.stringify({
    ApproverToTeamInput: {
      users: [...userOids],
      team: teamOid,
    },
  });
}

const createSubTeamBody = (
  teamOid: string,
  displayName: string,
  description: string,
) => {
  return {
    CreateSubTeamInput: {
      parentTeamOid: teamOid,
      subTeamDisplayName: displayName,
      subTeamDescription: description,
    },
  };
};

function getTeamsResponse(response: AxiosResponse<TeamModel[]>) {
  let data = response.data;
  return data?.map((team) => {
    return buildTeamFromResponse(team);
  });
}

function buildTeamFromResponse(team: TeamModel) {
  return team
    ? new TeamModel(
        team.oid,
        team.name,
        team.displayName,
        team.createTimestamp,
        "",
        team.description,
        team.subTeams,
        [],
        [],
        team.owner,
        team.isActive,
        team.readOnly,
      )
    : null;
}

function getTeamByOidResponse(response: AxiosResponse<TeamModel>) {
  const team = response.data;
  const owner = getUserFromResponse(team.owner);
  const members = getUsersFromResponse(team.members);
  const roles = rolesOfGetTeamByOidResponse(team.roles);
  return new TeamModel(
    team.oid,
    team.name,
    team.displayName,
    team.createTimestamp,
    "",
    team.description,
    new Array(),
    members,
    roles,
    owner,
    team.isActive,
    team.readOnly,
  );
}

function rolesOfGetTeamByOidResponse(rawRoles: RoleModel[]) {
  let roles: RoleModel[] = [];
  if (rawRoles) {
    roles = rawRoles.map((role) => {
      return new RoleModel(
        role.oid,
        role.name,
        role.displayName,
        role.description,
        extractPortfolioFromRoleInfo(role),
        role.isActive,
      );
    });
  }
  return roles;
}

export {
  addApproverToTeamBody,
  buildTeamFromResponse,
  getTeamByOidResponse,
  getTeamsResponse,
  removeApproverByOidInTeamBody,
  rolesOfGetTeamByOidResponse,
};

export default TeamService;
