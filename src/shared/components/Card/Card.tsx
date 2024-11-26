import { useEffect, useState } from "react";
import { resetAlertCard } from "shared/store/slices/globalUi/globalUi.slice";
import CustomAlert from "../customAlert/customAlert.component";
import { useAppDispatch } from "shared/store";

const Card = ({ open, type, message, duration }) => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  const onClose = () => {
    setShow(false);
  };

  useEffect(() => {
    setShow(open);
    const timeId = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(timeId);
    };
  }, [open]);

  useEffect(() => {
    if (!show) {
      const timeIdReset = setTimeout(() => {
        dispatch(resetAlertCard());
      }, 100);
      return () => {
        clearTimeout(timeIdReset);
      };
    }
  }, [show]);
  return (
    <CustomAlert
      {...{
        open: show,
        handleCloseAlert: onClose,
        alertMessage: message,
        type,
      }}
    />
  );
};

export default Card;
