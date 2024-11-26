import { env } from "env";
import IntlMessageFormat from "intl-messageformat";

export default {
  BASE_URL: env.REACT_APP_MIDPOINT_BASE_URL,

  /** USER ENDPOINTS */
  ENDPOINT_USER_SEARCH_NNI_EMAIL: "/users/read-by-nni-or-email",
  ENDPOINT_ADD_USER_TO_TEAM_URL: "/users/add-to-team",
  ENDPOINT_REMOVE_USER_IN_TEAM_URL: "/users/remove-from-team",
  ENDPOINT_READ_USER_URL: "/users",
  ENDPOINT_READ_USER_INFOS_URL: "users/self",
  ENDPOINT_READ_SELF_TEAMS_ROLES: "/users/self-teams-roles",
  ENDPOINT_VERIFY_SELF_USE_SUPER_MANAGER: "/users/is-super-manager",

  /** TEAM ENDPOINTS */
  ENDPOINT_READ_SELF_TEAMS_URL: "/teams/self",
  ENDPOINT_READ_TEAMS_URL: "/teams/main/self",
  ENDPOINT_READ_TEAM_URL: "/teams",
  ENDPOINT_UPDATE_TEAM_DISPLAY_NAME_URL: "/teams/display-name/update",
  ENDPOINT_UPDATE_TEAM_DESCRIPTION_URL: "/teams/description/update",
  ENDPOINT_GET_APPROVERS_BY_TEAM_OID: new IntlMessageFormat(
    "/teams/{teamOid}/approvers",
    "fr-FA",
  ),
  ENDPOINT_REMOVE_APPROVER_IN_TEAM_URL: "/teams/remove-approvers",
  ENDPOINT_ADD_APPROVER_IN_TEAM_URL: "/teams/add-approvers",
  ENDPOINT_GET_TEAM_OWNER: (oid) => `/teams/${oid}/owner`,
  ENDPOINT_GET_TEAM_MEMBERS_BY_TEAM_OID: (oid) => `/teams/${oid}/members`,
  ENDPOINT_VERIFY_TEAM_CASE_VALIDATION_POSSIBLE: (teamOid) =>
    `/teams/${teamOid}/is-case-validation-possible`,

  /** SUBTEAM ENDPOINTS */
  ENDPOINT_CREATE_SUBTEAMS_URL: "/subteams/create",
  ENDPOINT_DELETE_SUBTEAMS_URL: "/subteams",
  ENDPOINT_VERIFY_DELETABLE_SUBTEAM_ELIGIBILITY: (subTeamOid) =>
    `/subteams/${subTeamOid}/is-deletable`,

  /** ROLES ENDPOINTS */
  ENDPOINT_READ_ROLE_URL: "/roles",
  ENDPOINT_READ_SELF_ROLES_URL: "/roles/self",
  ENDPOIN_READ_ROLES_BY_TEAM_OID: "/roles/find-by-team",
  ENDPOINT_ADD_ROLE_TO_TEAM_URL: "/roles/add-to-team",
  ENDPOINT_REMOVE_ROLE_IN_TEAM_URL: "/roles/remove-from-team",
  ENDPOINT_CREATE_NEW_ROLE: "roles/create",
  ENDPOINT_UPDATE_ROLE_DISPLAY_NAME_URL: "roles/display-name/update",
  ENDPOINT_UPDATE_ROLE_DESCRIPTION_URL: "roles/description/update",
  ENDPOINT_READ_ROLE_SUBTEAMS_URL: (roleOid) => `roles/${roleOid}/subteams`,

  /** CASES ENDPOINTS */
  ENDPOINT_PROCESS_CASE_URL: "/cases/process",
  ENDPOINT_GET_CASE_NUMBER_URL: "/cases/read-work-items-number",
  ENDPOINT_GET_SELF_CASE_OPEN_TO_VALIDATE: "/cases/self/open-to-validate",
  ENDPOINT_GET_SELF_CASE_OPEN_CURRENT: "/cases/self/open-current",
  ENDPOINT_GET_SELF_CASE_CLOSED_VALIDATION: "/cases/self/closed-validation",
  ENDPOINT_GET_SELF_CASE_CLOSED_TREATED: "/cases/self/closed-treated",

  /**PERMISSION ENDPOINTS */
  ENDPOINT_ADD_PERMISSION_TO_ROLE_URL: "/permissions/add-to-role",
  ENDPOINT_REMOVE_PERMISSION_IN_ROLE_URL: "/permissions/remove-from-role",
  ENDPOINT_GET_PERMISSION_GENERATION: "/permissions/generate",
  ENDPOINT_CREATE_PERMISSIONS_URL: "permissions/create",

  /** PORTFOLIO ENDPOINTS */
  ENDPOINT_READ_SELF_PORTFOLIOS_URL: "/portfolios/self",
  ENDPOINT_READ_PORTFOLIO_URL: "/portfolios",
  ENDPOINT_PORTFOLIO_SEARCH_BY_NAME_OR_DISPLAYNAME:
    "/portfolios/read-by-name-or-displayname",
  ENDPOINT_READ_PERMISSIONS_PORTFOLIO_URL: (oid) =>
    `/portfolios/${oid}/permissions`,
  ENDPOINT_READ_ROLES_PORTFOLIO_URL: (oid) => `/portfolios/${oid}/roles`,
  ENDPOINT_GET_APPROVERS_PORTFOLIO_URL: (oid) => `/portfolios/${oid}/approvers`,
  ENDPOINT_REMOVE_APPROVER_IN_PORTFOLIO_URL: "/portfolios/remove-approvers",
  ENDPOINT_ADD_APPROVER_IN_PORTFOLIO_URL: "/portfolios/add-approvers",

  /** PERMISSIONS TYPES ENDPOINTS */
  ENDPOINT_GET_PERMISSIONS_TYPES: (portfolioName) =>
    `/permission-types/${portfolioName}`,

  /** SUBPERIMETERS ENDPOINTS */
  ENDPOINT_SEARCH_SUBPERIMETERS: "/subperimeters/search",
  ENDPOINT_CREATE_SUBPERIMETERS: "/subperimeters/assign",

  /** ENVIRONMENTS ENDPOINTS */
  ENDPOINT_SEARCH_ENV: "/environments/search",

  /** ZONES ENDPOINTS */
  ENDPOINT_SEARCH_ZONE: "/zones/search",

  /** CONFIGURATIONS ENDPOINTS */
  ENDPOINT_REGEX_CONFIG: "/configurations/regex",

  /** SUDO CARDS ENDPOINTS */
  ENDPOINT_SEARCH_SUDO_CARDS: "/sudo-cards/search",
  ENDPOINT_CREATE_SUDO_CARDS: "/sudo-cards/create",
};
