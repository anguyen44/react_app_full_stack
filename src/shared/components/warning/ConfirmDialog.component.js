import { createPortal } from "react-dom";

import { CustomDialog } from "../customDialog/customDialog";

const ConfirmDialog = ({ onConfirm, onCancel, show, text, title, type }) => {
  const portalElement = document.getElementById("portal");
  const component = show ? (
    <CustomDialog
      showDialog={show}
      confirmNavigation={onConfirm}
      cancelNavigation={onCancel}
      contentTextElement={text}
      titleText={title}
      type={type}
    />
  ) : null;

  return portalElement && createPortal(component, portalElement);
};
export default ConfirmDialog;
