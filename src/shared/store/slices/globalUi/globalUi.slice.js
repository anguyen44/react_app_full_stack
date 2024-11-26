import { createSlice } from "@reduxjs/toolkit";

const dialogInitialState = {
  open: false,
  handleAction: () => {},
  dataActions: () => {},
  titleButtonAction: "No title button",
  title: "No title button",
  description: "No description",
  handleCancelAction: () => {},
};

const cardInitialState = {
  open: false,
  type: "success",
  message: "No message",
  duration: 3000,
};

const globalUiSlice = createSlice({
  name: "globalUi",
  initialState: {
    alert: {
      dialog: dialogInitialState,
      card: cardInitialState,
    },
    regexConfig: {},
  },
  reducers: {
    resetAlertDialog: (state) => {
      state.alert.dialog = dialogInitialState;
    },
    triggerAlertDialog: (state, action) => {
      const {
        handleAction,
        dataActions,
        titleButtonAction,
        title,
        description,
        handleCancelAction,
      } = action.payload;

      state.alert.dialog = {
        handleAction,
        dataActions,
        titleButtonAction,
        title,
        description,
        open: true,
        handleCancelAction,
      };
    },
    resetAlertCard: (state) => {
      state.alert.card = cardInitialState;
    },
    triggerAlertCard: (state, action) => {
      // type available: "success", "info", "warning", "error"
      // https://mui.com/material-ui/react-alert/
      const { type, message, duration } = action.payload;

      state.alert.card = {
        type,
        message,
        duration,
        open: true,
      };
    },
    updateRegexConfig: (state, action) => {
      state.regexConfig = action.payload;
    },
  },
});

export const {
  resetAlertDialog,
  triggerAlertDialog,
  resetAlertCard,
  triggerAlertCard,
  updateRegexConfig,
} = globalUiSlice.actions;

export default globalUiSlice.reducer;
