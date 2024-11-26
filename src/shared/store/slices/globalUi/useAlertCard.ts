import { ReactNode } from "react";
import { triggerAlertCard } from "./globalUi.slice";
import { useAppDispatch } from "shared/store";

const useAlertCard = () => {
  const dispatch = useAppDispatch();

  const dispatchAlertSuccess = (message: string, duration?: number) => {
    dispatchAlert(message, "success", duration);
  };

  const dispatchAlertError = (message: string, duration?: number) => {
    dispatchAlert(message, "error", duration);
  };

  const dispatchAlertInfo = (
    message: string | ReactNode,
    duration?: number,
  ) => {
    dispatchAlert(message, "info", duration);
  };

  const dispatchAlert = (
    message: string | ReactNode,
    type: AlertType,
    duration?: number,
  ) => {
    dispatch(
      triggerAlertCard({
        type: type,
        message: message,
        duration: duration ?? 5000,
      }),
    );
  };

  return { dispatchAlertSuccess, dispatchAlertError, dispatchAlertInfo };
};

export default useAlertCard;
