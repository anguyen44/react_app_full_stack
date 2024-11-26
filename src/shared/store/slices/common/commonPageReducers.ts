import { PayloadAction } from "@reduxjs/toolkit";

export type CommonPageState = typeof commonInitialState;

export const commonInitialState = {
  readOnly: false,
  isWriting: false,
  isLoadingPage: false,
  isChangingInfo: false,
  changingInfo: {
    oid: null as string,
    displayName: null as string,
    description: null as string,
  },
};

export type CommonPageReducers = typeof commonPageReducers;

export const commonPageReducers = {
  allowToWrite: (state: CommonPageState) => {
    state.readOnly = false;
  },
  disAllowToWrite: (state: CommonPageState) => {
    state.readOnly = true;
  },
  setReadOnlyState: (
    state: CommonPageState,
    action: PayloadAction<boolean>,
  ) => {
    state.readOnly = action.payload;
  },
  setIsWrittingStatus: (
    state: CommonPageState,
    action: PayloadAction<boolean>,
  ) => {
    state.isWriting = action.payload;
  },
  toggleIsWrittingStatus: (state: CommonPageState) => {
    state.isWriting = !state.isWriting;
  },
  setIsLoadingPage: (
    state: CommonPageState,
    action: PayloadAction<boolean>,
  ) => {
    state.isLoadingPage = action.payload;
  },
  setIsChangingInfo: (
    state: CommonPageState,
    action: PayloadAction<boolean>,
  ) => {
    state.isChangingInfo = action.payload;
  },
  setChangingInfo: (
    state: CommonPageState,
    action: PayloadAction<{
      oid: string;
      displayName: string;
      description: string;
    }>,
  ) => {
    state.changingInfo = action.payload;
  },
};

export type ChangingInfo = CommonPageState["changingInfo"];
