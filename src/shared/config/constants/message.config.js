/**Recherche d'utilisateur pour l'ajout */
import IntlMessageFormat from "intl-messageformat";

export default {
  NOT_FOUND: "Pas trouvé",
  EMPTY_ENTRY: "Recherche vide ou incomplète",
  UNAUTHORIZED: "Votre session a expiré. Veuillez vous authentifier à nouveau",
  FORBIDDEN: "Vous n'avez pas le droit d'effectuer cette opération",
  NOT_ACCEPT_SAME_DEMANDER_APPROVER:
    "Vous ne pouvez pas être demandeur et valideur d'une même demande",
  TECHNICAL_PROBLEM:
    "Un problème technique est survenu. Veuillez réessayer ultérieurement",
  UNAVAILABLE_FUNCTIONALITY: "La fonctionnalité n'est pas encore disponible",
  UNAVAILABLE_PAGE: "La page n'est pas encore disponible",

  /**Portfolio Search */
  SEARCH_PORTFOLIO_BAD_REQUEST: "Requête erronée - Nom rentré incorrect",
  SEARCH_PORTFOLIO_NONE:
    "Vous n'êtes propriétaire ou suppléant d'aucune ressource.",

  /**Add action */
  ADD_USER_FAIL_SEARCHING_MESSAGE: "Requête erronée - NNI ou email incorrect",
  ADD_USER_TO_TEAM_SUCCESS:
    "L'ajout de l'utilisateur a été effectué avec succès",
  ADD_USER_TO_TEAM_SUCCESS_NEED_VALIDATION:
    "La demande d'ajout de l'utilisateur a été effectuée avec succès",
  ADD_ROLE_TO_TEAM_SUCCESS: "L'ajout du rôle a été effectué avec succès",
  ADD_ROLE_TO_TEAM_SUCCESS_NEED_VALIDATION:
    "La demande d'ajout du rôle a été effectuée avec succès",
  ADD_PERMISSION_TO_ROLE_SUCCESS:
    "L'ajout de la permission a été effectué avec succès",
  ADD_PERMISSION_TO_ROLE_SUCCESS_NEED_VALIDATION:
    "La demande d'ajout de la permission a été effectuée avec succès",
  ADD_APPROVER_TO_TEAM_SUCCESS:
    "L'ajout de ce(s) suppléant(s) a été effectué avec succès",
  ADD_APPROVER_TO_ORG_SUCCESS_NEED_VALIDATION: (plural) =>
    `La demande d'ajout de ce${plural ? "s" : ""} suppléant${plural ? "s" : ""} a été effectuée avec succès`,

  /**action on users */
  USER_EXISTED_IN_TEAM: new IntlMessageFormat(
    "L'utilisateur {fullName} est déjà présent dans l'équipe.",
    "fr-FA",
  ),
  USER_EXISTED_IN_SUB_TEAM: new IntlMessageFormat(
    "L'utilisateur {fullName} est déjà présent dans la sous-équipe.",
    "fr-FA",
  ),
  APPROVER_EXISTED_IN_TEAM: new IntlMessageFormat(
    "L'utilisateur {fullName} est déjà un suppléant de l'équipe.",
    "fr-FA",
  ),
  APPROVER_EXISTED_IN_PORTFOLIO: new IntlMessageFormat(
    "L'utilisateur {fullName} est déjà un suppléant de la ressource.",
    "fr-FA",
  ),
  USER_ADDED_IN_WAITING_LIST: new IntlMessageFormat(
    "L'utilisateur {fullName} a déjà été ajouté au panier.",
    "fr-FA",
  ),
  USER_NOT_FOUND: "Aucun utilisateur trouvé",
  DELETE_USER_SUCCESS: new IntlMessageFormat(
    "La suppression de l'utilisateur {memberName} a été effectuée avec succès",
    "fr-FA",
  ),
  DELETE_USER_SUCCESS_NEED_VALIDATION: new IntlMessageFormat(
    "La demande de suppression de l'utilisateur {memberName} a été effectuée avec succès",
    "fr-FA",
  ),
  DELETE_USER_CONFIRM: new IntlMessageFormat(
    "Êtes-vous sûr de vouloir supprimer le membre {memberName} ?",
    "fr-FA",
  ),
  DELETE_APPROVER_SUCCESS: new IntlMessageFormat(
    "La suppression du suppléant {approverName} a été effectuée avec succès",
    "fr-FA",
  ),
  DELETE_APPROVER_SUCCESS_NEED_VALIDATION: new IntlMessageFormat(
    "La demande de suppression du suppléant {approverName} a été effectuée avec succès",
    "fr-FA",
  ),

  /**action on role */
  ROLE_EXISTED_IN_SUB_TEAM: new IntlMessageFormat(
    "Le rôle {roleName} est déjà présent dans la sous-équipe.",
    "fr-FA",
  ),
  ROLE_ADDED_IN_WAITING_LIST: new IntlMessageFormat(
    "Le rôle {roleName} a déjà été ajouté au panier.",
    "fr-FA",
  ),
  DELETE_ROLE_SUCCESS: new IntlMessageFormat(
    "La suppression du rôle {roleDiplayName} a été effectuée avec succès",
    "fr-FA",
  ),
  DELETE_ROLE_SUCCESS_NEED_VALIDATION: new IntlMessageFormat(
    "La demande de suppression du rôle {roleDiplayName} a été effectuée avec succès",
    "fr-FA",
  ),
  CREATE_NEW_ROLE_SUCCESS: new IntlMessageFormat(
    "Le rôle {roleDisplayName} a été créé avec succès",
    "fr-FA",
  ),
  CREATE_NEW_ROLE_SUCCESS_NEED_VALIDATION: new IntlMessageFormat(
    "La demande de création du rôle {roleDisplayName} a été effectuée avec succès",
    "fr-FA",
  ),
  UPDATE_INFO_ROLE_SUCCESS:
    "La mise à jour des informations du rôle a été effectuée avec succès",
  NO_ROLE_FOUND: "Aucun rôle trouvé",

  /**action on team */
  SEARCH_TEAM_NONE:
    "Vous n'êtes gestionnaire, suppléant ou membre d'aucune équipe.",
  UPDATE_INFO_TEAM_SUCCESS:
    "La demande de mise à jour des informations de l'équipe a été effectuée avec succès",
  DELETE_SUB_TEAM_SUCCESS: new IntlMessageFormat(
    "La suppression de la sous équipe {subTeamDisplayName} a été effectuée avec succès",
    "fr-FA",
  ),
  DELETE_SUB_TEAM_ERROR:
    "Impossible de supprimer une sous équipe qui contient des roles ou des membres",
  CREATE_SUBTEAM_DESCRIPTION_REGEX_ERROR:
    "Pour des raisons de sécurité et de compatibilité, certains caractères spéciaux ne sont pas autorisés.",
  CREATE_SUBTEAM_NAME_REGEX_ERROR:
    "Pour des raisons de sécurité et de compatibilité, certains caractères spéciaux ne sont pas autorisés." +
    " Veuillez utiliser uniquement les lettres, les chiffres, les espaces et les tirets (-,_).",
  /**action on role */
  DELETE_ROLE_ERROR: (plural) =>
    `Ce rôle ne peut pas être supprimé car il est associé ${plural ? "aux sous-équipes " : "à la sous-équipe"}  ci-dessous :`,
  DELETE_PERMISSION_SUCCESS: new IntlMessageFormat(
    "La suppression de la permission {permissionName} a été effectuée avec succès",
    "fr-FA",
  ),
  DELETE_PERMISSION_SUCCESS_NEED_VALIDATION: new IntlMessageFormat(
    "La demande de suppression de la permission {permissionName} a été effectuée avec succès",
    "fr-FA",
  ),
  CREATE_PERMISSION_SUCCESS:
    "La demande de création des permissions a été traitée avec succès",
  DELETE_ROLE_CONFIRM:
    "Si vous confirmez, ce rôle sera définitivement supprimé.",
  DELETE_ROLE_CONFIRM_NEED_VALIDATION:
    "Si vous confirmez, une demande de suppression du rôle sera créée.",

  /** Action on case */
  PROCESS_CASE_APPROVAL_SUCCESS: "La demande a été traitée avec succès",
  PROCESS_CASE_REFUSE_SUCCESS: "La demande a bien été refusée",

  CREATE_SUBTEAM_SUCCESS: new IntlMessageFormat(
    `Sous-équipe {name} créée avec succès`,
    "fr-FA",
  ),
  ERROR_API_FAIL: new IntlMessageFormat(`API: failed: {error}`, "fr-FA"),

  // Permission template actions
  ADD_PERMISSION_TEMPLATE_ELEMENT: (label, name) =>
    `${label} ${name} a été créé avec succès.`,
  CHECK_PERMISSION_TEMPLATE_NAME_EMPTY: "Le nom doit être saisi.",
  CHECK_PERMISSION_TEMPLATE_NAME_NOT_EXIST: (label, name) =>
    `${label} ${name} saisi existe déjà.`,

  DISPLAY_NAME_NOT_ALLOW_NULL: "Le nom d'affichage ne peut pas être vide",
  COPIED_DATA: "Données copiées",
  IN_PROGRESS: "Traitement en cours... Veuillez patienter.",
};
