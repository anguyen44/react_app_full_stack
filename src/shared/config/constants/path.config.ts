export const HOME_PATH = "/";
export const DASHBOARD_PATH = "/dashboard";
export const OAUTH_CALLBACK = "/callback";
export const RENEW = "/renew";
export const USER_INFOS_PATH = "/user_infos";
export const USER_AUTORIZATIONS = "/user_autorizations";
export const USER_CASES_PATH = "/user_cases";
export const TEAMS_PATH = "/teams";
export const SUB_TEAMS_PATH = "/sub_teams";
export const ROLES_PATH = "/roles";
export const PERMISSIONS_ROLE_PATH = (roleOid: string) =>
  `${ROLES_PATH}/${roleOid}/permissions`;
export const USERS_LAMDA_PATH = "/users";
export const PORTFOLIOS_PATH = "/portfolios";
