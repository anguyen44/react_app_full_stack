import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { FaCheckCircle, GiCancelCircled } from "icons";
import PropTypes from "prop-types";

import {
  ApprouveButton,
  CustomDialogTitle,
  RejectButton,
} from "./CustomDialog.styled";

export const CustomDialog = ({
  showDialog,
  titleText = "Modifications non enregistrées",
  contentTextElement,
  cancelNavigation,
  confirmNavigation,
  type,
}) => {
  const titleComponent = () => {
    switch (type) {
      case "danger":
        return (
          <>
            <GiCancelCircled color="#C91432" size={30} />
            <span style={{ color: "#C91432", marginLeft: "5px" }}>
              {titleText}
            </span>
          </>
        );
      case "success":
        return (
          <>
            <FaCheckCircle color="#10B581" size={30} />
            <span style={{ color: "#10B581", marginLeft: "5px" }}>
              {titleText}
            </span>
          </>
        );
      default:
        return <>{titleText}</>;
    }
  };
  return (
    <Dialog
      fullWidth={true}
      open={showDialog}
      PaperProps={{ sx: { position: "fixed", top: "100px" } }}
    >
      <CustomDialogTitle>{titleComponent()}</CustomDialogTitle>
      <DialogContent
        dividers={titleText ? true : false}
        sx={{
          fontSize: "14px",
          color: "#7A7A7A",
          textAlign: "center",
          fontWeight: 500,
        }}
      >
        {contentTextElement}
      </DialogContent>
      <DialogActions sx={{ padding: "20px", alignSelf: "start" }}>
        <ApprouveButton
          data-testid="ConfirmCheckButton"
          variant="contained"
          onClick={confirmNavigation}
        >
          Oui
        </ApprouveButton>
        <RejectButton
          data-testid="ConfirmCancelButton"
          variant="outlined"
          onClick={cancelNavigation}
        >
          Non
        </RejectButton>
      </DialogActions>
    </Dialog>
  );
};

CustomDialog.propTypes = {
  showDialog: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  titleText: PropTypes.string,
  contentTextElement: PropTypes.node,
  cancelNavigation: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  confirmNavigation: PropTypes.func,
  type: PropTypes.string,
};
