import { useAppDispatch } from "shared/store";
import { triggerAlertDialog } from "./globalUi.slice";

const useAlertDialog = () => {
  const dispatch = useAppDispatch();

  type AlertDialogParams = {
    title: React.ReactNode;
    description: React.ReactNode;
    handleAction: HandleActionFunction;
    dataActions?: any;
    handleCancelAction?: VoidFunction;
    titleButtonAction?: string;
  };

  type HandleActionFunction = (params?: any) => void;

  const dispatchAlertDialog = (params: AlertDialogParams) => {
    dispatch(
      triggerAlertDialog({
        ...params,
        titleButtonAction: params.titleButtonAction ?? "Confirmer",
      }),
    );
  };

  type DispatchImpossibleCaseValidationAlertDialogParams = {
    handleAction: HandleActionFunction;
    title?: string;
    descriptionLabel?: string;
    isPortfolio?: boolean;
  };

  const dispatchImpossibleCaseValidationAlertDialog = ({
    handleAction,
    title,
    descriptionLabel,
    isPortfolio,
  }: DispatchImpossibleCaseValidationAlertDialogParams) => {
    const label =
      descriptionLabel ??
      `Attention personne n'est habilité à valider ${
        isPortfolio
          ? "les demandes d'ajout de permissions sur cette ressource"
          : "vos demandes d'ajout"
      }, elles risquent
      donc de ne pas aboutir.`;

    dispatchAlertDialog({
      title:
        title ??
        `${isPortfolio ? "Pas" : "Manque"} de valideur ${isPortfolio ? "sur" : "pour"} cette ${isPortfolio ? "ressource (INS)" : "équipe"}`,
      description: (
        <>
          {label}
          <br />
          Êtes-vous sûr de vouloir continuer ?
        </>
      ),
      handleAction: handleAction,
    });
  };

  type DispatchImpossibleDeleteCaseValidationAlertDialogParams = {
    handleAction: HandleActionFunction;
    dataActions: any;
    elementLabel: string;
    isFemaleLabel?: boolean;
  };

  const dispatchImpossibleDeleteCaseValidationAlertDialog = ({
    handleAction,
    dataActions,
    elementLabel,
    isFemaleLabel,
  }: DispatchImpossibleDeleteCaseValidationAlertDialogParams) => {
    const label = (isFemaleLabel ? "de la " : "du ") + elementLabel;
    dispatchAlertDialog({
      title: `Manque de valideur pour cette équipe`,
      description: (
        <>
          Attention personne n'est habilité à valider cette demande de
          suppression {label}, elle risque donc de ne pas aboutir.
          <br />
          Êtes-vous sûr de vouloir effectuer cette suppression ?
        </>
      ),
      handleAction: handleAction,
      dataActions: dataActions,
    });
  };

  return {
    dispatchAlertDialog,
    dispatchImpossibleCaseValidationAlertDialog,
    dispatchImpossibleDeleteCaseValidationAlertDialog,
  };
};

export default useAlertDialog;
