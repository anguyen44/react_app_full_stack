import { createSelector } from "@reduxjs/toolkit";
import { OrgPageState } from "../slices/common/orgPageReducers";
import { sortUsersByName } from "shared/utils/sort.utils";

export const sortApproversListByName = (reducerState: OrgPageState) =>
  createSelector(
    () => reducerState.approvers,
    (approvers) => {
      if (approvers) {
        if (approvers.length > 0) {
          return sortUsersByName(approvers);
        } else {
          return [];
        }
      }
    },
  );
