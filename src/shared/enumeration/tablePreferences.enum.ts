enum TablePreferencesEnum {
  DEFAULT = "DEFAULT",
  ALL_CASES = "ALL_CASES",
  ALL_PORTFOLIOS = "ALL_PORTFOLIOS",
  ALL_ROLES = "ALL_ROLES",
  ALL_TEAMS = "ALL_TEAMS",
  APPROVERS = "APPROVERS",
  MEMBERS = "MEMBERS",
  OBJECTS = "OBJECTS",
  PERMISSIONS = "PERMISSIONS",
  ROLES = "ROLES",
  SUBTEAMS = "SUBTEAMS",
}

export enum CasesTableHeaderPreferencesEnum {
  CASES_TO_VALIDATE = "CASES_TO_VALIDATE",
  CASES_MADE_BY_USER = "CASES_MADE_BY_USER",
  CLOSED_CASES_TO_VALIDATE = "CLOSED_CASES_TO_VALIDATE",
  CLOSED_CASES_MADE_BY_USER = "CLOSED_CASES_MADE_BY_USER",
}

export const ROW_PER_PAGE = (table: TablePreferencesEnum) =>
  `rowPerPage_${table}`;

export const getDefaultRowPerPage = (table: TablePreferencesEnum) => {
  switch (table) {
    case TablePreferencesEnum.ALL_CASES:
      return 10;
    case TablePreferencesEnum.ALL_PORTFOLIOS:
      return 5;
    case TablePreferencesEnum.ALL_ROLES:
      return 10;
    case TablePreferencesEnum.ALL_TEAMS:
      return 5;
    case TablePreferencesEnum.APPROVERS:
      return 5;
    case TablePreferencesEnum.MEMBERS:
      return 10;
    case TablePreferencesEnum.OBJECTS:
      return 5;
    case TablePreferencesEnum.PERMISSIONS:
      return 10;
    case TablePreferencesEnum.ROLES:
      return 5;
    case TablePreferencesEnum.SUBTEAMS:
      return 5;
    case TablePreferencesEnum.DEFAULT:
    default:
      return 5;
  }
};

export const getCasesTableHeadersByType = (
  type: CasesTableHeaderPreferencesEnum,
  haveNoActions,
) => {
  const casesTableHeadersBases = [
    "Oid",
    "Équipe",
    "Ressource",
    "Action",
    "Typologie",
    "Qui / quoi ? ",
    "Dans quoi ?",
  ];
  switch (type) {
    case CasesTableHeaderPreferencesEnum.CASES_TO_VALIDATE:
    case CasesTableHeaderPreferencesEnum.CASES_MADE_BY_USER:
      return [
        ...casesTableHeadersBases,
        "Demandeur",
        "Valideur(s)",
        "Créée le",
        !haveNoActions && "Validation ?",
      ].filter((item) => item);
    case CasesTableHeaderPreferencesEnum.CLOSED_CASES_TO_VALIDATE:
    case CasesTableHeaderPreferencesEnum.CLOSED_CASES_MADE_BY_USER:
      return [
        ...casesTableHeadersBases,
        "Valideur",
        "Traitée le",
        "Validation",
      ];
    default:
      return casesTableHeadersBases;
  }
};

export default TablePreferencesEnum;
