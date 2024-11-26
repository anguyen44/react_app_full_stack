import {
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  Paper,
  Slide,
} from "@mui/material";
import { forwardRef } from "react";
import { useDispatch } from "react-redux";
import { resetAlertDialog } from "shared/store/slices/globalUi/globalUi.slice";

import { Container, StyledDialogActions, StyledDialogTitle } from "./styled";

const TransitionComponent = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const AlertDialog = ({
  open,
  handleAction,
  dataActions,
  titleButtonAction,
  title,
  description,
  handleCancelAction = () => {},
}) => {
  const dispatch = useDispatch();
  const onAction = () => {
    handleAction(dataActions);
    reset();
  };

  const reset = () => {
    dispatch(resetAlertDialog());
  };

  const onClose = () => {
    handleCancelAction();
    reset();
  };

  const canShow = [title, description, titleButtonAction, open].every(Boolean);

  return (
    <>
      {canShow && (
        <Dialog {...{ open, onClose, TransitionComponent }}>
          <Container>
            <StyledDialogTitle>{title}</StyledDialogTitle>
            <DialogContent>{description}</DialogContent>
            <Paper elevation={4}>
              <StyledDialogActions>
                <ButtonGroup size="small" fullWidth={true}>
                  <Button variant="contained" onClick={onAction}>
                    {titleButtonAction}
                  </Button>
                  <Button
                    data-testid="cancel-btn"
                    variant="outlined"
                    onClick={onClose}
                  >
                    Annuler
                  </Button>
                </ButtonGroup>
              </StyledDialogActions>
            </Paper>
          </Container>
        </Dialog>
      )}
    </>
  );
};

export default AlertDialog;
