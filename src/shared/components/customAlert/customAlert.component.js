import { Alert, Snackbar } from "@mui/material";

const CustomAlert = ({
  open,
  vertical = "top",
  horizontal = "center",
  handleCloseAlert,
  alertMessage,
  type = "error",
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      message="I love snacks"
      key={vertical + horizontal}
      data-testid="alert"
    >
      <Alert
        severity={type}
        sx={{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          whiteSpace: "pre-line",
        }}
        onClose={handleCloseAlert}
      >
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
