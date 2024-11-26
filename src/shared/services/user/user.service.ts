import endpoints from "shared/config/constants/endpoints.config";
import { UserModel } from "shared/model/user.model";
import urlJoin from "url-join";

import GlobalService from "../global/global.service";
import { AxiosResponse } from "axios";

const instance = GlobalService.getInstance();

const UserService = {
  getProfilInfos: () =>
    instance
      .get(endpoints.ENDPOINT_READ_USER_INFOS_URL)
      .then(getUserFromResponseBody),
  getUserInfosByOid: (userOid: string) =>
    instance
      .get(urlJoin(endpoints.ENDPOINT_READ_USER_URL, userOid))
      .then(getUserFromResponseBody),
  getMemberByNniOrEmail: (query: string) =>
    instance
      .get(urlJoin(endpoints.ENDPOINT_USER_SEARCH_NNI_EMAIL, query))
      .then(getUsersFromResponseBody),
  deleteUserByOidInTeam: (userOid: string, teamOid: string) =>
    instance.patch(
      endpoints.ENDPOINT_REMOVE_USER_IN_TEAM_URL,
      deleteUserByOidInTeamBody(userOid, teamOid),
    ),
  verifySelfUserSuperManager: () =>
    instance
      .get(endpoints.ENDPOINT_VERIFY_SELF_USE_SUPER_MANAGER)
      .then((res) => res.data),
};

function deleteUserByOidInTeamBody(userOid: string, teamOid: string) {
  return JSON.stringify({
    UserToTeamInput: { users: new Array(userOid), teams: [teamOid] },
  });
}

function getUserFromResponseBody(res: AxiosResponse<UserModel>) {
  return getUserFromResponse(res?.data);
}

function getUsersFromResponseBody(res: AxiosResponse<UserModel[]>) {
  return getUsersFromResponse(res?.data);
}

function getUsersFromResponse(rawUsers: UserModel[]) {
  return rawUsers?.map(getUserFromResponse) ?? ([] as UserModel[]);
}

function getUserFromResponse(userResponse: UserModel) {
  return userResponse
    ? new UserModel(
        userResponse.nni,
        userResponse.familyName,
        userResponse.givenName,
        userResponse.email,
        userResponse.isActive,
        userResponse.oid,
        userResponse.fullName,
      )
    : (null as UserModel);
}

export {
  deleteUserByOidInTeamBody,
  getUserFromResponse,
  getUserFromResponseBody,
  getUsersFromResponse,
  getUsersFromResponseBody,
};

export default UserService;
