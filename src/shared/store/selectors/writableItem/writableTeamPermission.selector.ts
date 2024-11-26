import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "shared/store";
import { CommonPageState } from "shared/store/slices/common/commonPageReducers";

export const writableTeamPermission = () =>
  createSelector(
    (state: RootState) => state.teamPageReducer.readOnly,
    (state: RootState) => state.teamPageReducer.isWriting,
    (readOnlyTeamPage, isWriting) => {
      if (readOnlyTeamPage) {
        return false;
      } else {
        if (isWriting) {
          return true;
        } else {
          return false;
        }
      }
    },
  );

export const writableItemPermission = (reducerState: CommonPageState) =>
  createSelector(
    () => reducerState.readOnly,
    () => reducerState.isWriting,
    (readOnlyItemPage, isWriting) => {
      if (readOnlyItemPage) {
        return false;
      } else {
        if (isWriting) {
          return true;
        } else {
          return false;
        }
      }
    },
  );
