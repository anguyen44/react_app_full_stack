import { createPortal } from "react-dom";

import Card from "./Card";

const Alert = (props) => {
  const portalElement = document.getElementById("portal");

  return portalElement && createPortal(<Card {...props} />, portalElement);
};
export default Alert;
