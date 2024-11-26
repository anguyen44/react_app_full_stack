import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import PermissionModel from "shared/model/permission.model";
import PortfolioModel from "shared/model/portfolio.model";
import { orgPageReducers, orgPageState } from "../common/orgPageReducers";

export type PortfolioPageReducer = typeof initialState;

const initialState = {
  ...orgPageState,
  portfolioInfos: {} as PortfolioModel,
  permissions: [] as PermissionModel[],
};

export const portfolioPageSlice = createSlice({
  name: "portfolioPageReducer",
  initialState: initialState,
  reducers: {
    ...orgPageReducers,
    setPortfolioInfos: (state, action: PayloadAction<PortfolioModel>) => {
      state.portfolioInfos = action.payload;
    },
    setPermissions: (state, action: PayloadAction<PermissionModel[]>) => {
      state.permissions = action.payload;
    },
  },
});

export const {
  setPortfolioInfos,
  allowToWrite,
  disAllowToWrite,
  setIsWrittingStatus,
  toggleIsWrittingStatus,
  setIsLoadingPage,
  setIsChangingInfo,
  setChangingInfo,
  setRoles,
  removeRoleByOid,
  addRolesTemporarily,
  enableDeletingRoleByOid,
  disableDeletingRoleByOid,
  setPermissions,
  setIsOwner,
  setApprovers,
  removeApproverByOid,
  addSearchedMember,
  deleteSearchedMember,
  resetSearchedMember,
} = portfolioPageSlice.actions;
export default portfolioPageSlice.reducer;
