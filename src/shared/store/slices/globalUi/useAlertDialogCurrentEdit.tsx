import { useEffect } from "react";
import { useNavigatingAway } from "shared/hooks/usePrompt";
import useAlertDialog from "./useAlertDialog";

interface UseAlertDialogCurrentEditProps {
  isChangingInfo: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
}

const useAlertDialogCurrentEdit = ({
  isChangingInfo,
  title,
  description,
}: UseAlertDialogCurrentEditProps) => {
  const { showDialogPrompt, confirmNavigation, cancelNavigation } =
    useNavigatingAway(isChangingInfo);

  const { dispatchAlertDialog } = useAlertDialog();

  useEffect(() => {
    if (showDialogPrompt) {
      dispatchAlertDialog({
        title: title ?? "Modifications non enregistrées",
        description:
          description ??
          ((
            <>
              Les modification en cours n'ont pas été enregistrées.
              <br />
              Êtes-vous sûr de vouloir quitter cette page ?
            </>
          ) as React.ReactNode),
        handleAction: confirmNavigation,
        handleCancelAction: cancelNavigation,
      });
    }
  }, [showDialogPrompt]);
};

export default useAlertDialogCurrentEdit;
