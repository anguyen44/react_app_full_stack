import React from "react";

export const useSnackbar = () => {
  const [isActive, setIsActive] = React.useState(false);
  const [message, setMessage] = React.useState();
  const [alertType, setAlertType] = React.useState();

  React.useEffect(() => {
    if (isActive === true) {
      setTimeout(() => {
        setIsActive(false);
      }, 6000);
    }
  }, [isActive]);

  const openSnackBar = (
    msg = "Quelque chose s'est mal passé...",
    type = "error",
  ) => {
    setMessage(msg);
    setIsActive(true);
    setAlertType(type);
  };

  const closeSnackBar = () => {
    setMessage("");
    setIsActive(false);
  };

  return { isActive, message, alertType, openSnackBar, closeSnackBar };
};
