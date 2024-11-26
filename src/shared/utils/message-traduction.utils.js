import endpoints from "shared/config/constants/endpoints.config";
import MESSAGES from "shared/config/constants/message.config";

const ErrorMessageTransformation = (error) => {
  const englishErrorMessage = error.response?.data.message;
  switch (englishErrorMessage) {
    case "The user not authorized for operation !":
      return "L'utilisateur n'est pas authorisé pour cette opération !";
    case "A technical problem occurred when calling midpoint !":
      return "Un problème technique est survenu lors de l'appel du midpoint !";
    case "Not found resource in midpoint !":
      return "Ressource introuvable dans midpoint !";
    case "Missing option !":
      return "Option manquante !";
    case "Invalid credentials !":
      return "Les informations d'identification invalides !";
    case "bad token option !":
      return "Mauvaise option de token !";
    case "Bad nni or email !":
      return "Mauvais NNI ou email !";
    case "This team cannot be deleted because it contains members or roles":
      return "Impossible de supprimer une sous équipe qui contient des roles ou des membres";
    default:
      return "Erreur inconnu !";
  }
};

const checkTriggerCard = (error) => {
  const responseURL = error.request?.responseURL;
  return ![endpoints.ENDPOINT_USER_SEARCH_NNI_EMAIL].some((element) =>
    responseURL?.includes(element),
  );
};

const ErrorCodeTransformToMessage = (error) => {
  const isTriggerCard = checkTriggerCard(error);
  const responseCode = error.response?.status;
  switch (responseCode) {
    case 401:
      return {
        isTriggerCard: isTriggerCard,
        code: responseCode,
        errorMessage: MESSAGES.UNAUTHORIZED,
      };
    case 403:
      return {
        isTriggerCard: isTriggerCard,
        code: responseCode,
        errorMessage: MESSAGES.FORBIDDEN,
      };
    case 404:
      return {
        isTriggerCard: isTriggerCard,
        code: responseCode,
        errorMessage: MESSAGES.NOT_FOUND,
      };
    default:
      return {
        isTriggerCard: isTriggerCard,
        code: responseCode,
        errorMessage: MESSAGES.TECHNICAL_PROBLEM,
      };
  }
};

export { ErrorCodeTransformToMessage, ErrorMessageTransformation };
