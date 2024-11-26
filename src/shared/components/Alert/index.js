import { createPortal } from "react-dom";

import Dialog from "./AlertDialog";

const AlertDialog = (props) => {
  const portalElement = document.getElementById("portal");

  return portalElement && createPortal(<Dialog {...props} />, portalElement);
};
export default AlertDialog;
