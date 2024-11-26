import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import RoleModel from "shared/model/role.model";
import TeamModel from "shared/model/team.model";
import { UserModel } from "shared/model/user.model";
import { orgPageReducers, orgPageState } from "../common/orgPageReducers";
import { getUserFromResponse } from "shared/services/user/user.service";

export type TeamPageReducer = typeof initialState;

const initialState = {
  ...orgPageState,
  mainTeamMembers: [] as UserModel[],
  mainTeamRoles: [] as RoleModel[],
  isLoadingMainTeamInfos: false,
  members: [] as UserModel[],
  teamInfo: {} as TeamModel,
};

export const teamPageSlice = createSlice({
  name: "teamPageReducer",
  initialState: initialState,
  reducers: {
    ...orgPageReducers,
    setMembers: (state, action: PayloadAction<UserModel[]>) => {
      state.members = action.payload;
    },
    setMainTeamRoles: (state, action: PayloadAction<RoleModel[]>) => {
      state.mainTeamRoles = action.payload;
    },
    setIsLoadingMainTeamInfos: (state, action: PayloadAction<boolean>) => {
      state.isLoadingMainTeamInfos = action.payload;
    },
    setMainTeamMembers: (state, action: PayloadAction<UserModel[]>) => {
      state.mainTeamMembers = action.payload;
    },
    removeMemberByOid: (state, action: PayloadAction<string>) => {
      state.members = state.members.filter((m) => m.oid !== action.payload);
    },
    enableDeletingMemberByOid: (state, action: PayloadAction<string>) => {
      const memberOid = action.payload;
      state.members = state.members.map((member) =>
        member.oid === memberOid ? { ...member, deleted: true } : member,
      );
    },
    disableDeletingMemberByOid: (state, action: PayloadAction<string>) => {
      const memberOid = action.payload;
      state.members = state.members.map((member) =>
        member.oid === memberOid ? { ...member, deleted: false } : member,
      );
    },
    addMembersTemporarily: (state, action: PayloadAction<UserModel[]>) => {
      const transformedData = action.payload.map(getUserFromResponse);
      state.members = [...state.members, ...transformedData];
    },
    setTeamInfo: (state, action: PayloadAction<TeamModel>) => {
      state.teamInfo = action.payload;
    },
  },
});

export const {
  addSearchedMember,
  deleteSearchedMember,
  resetSearchedMember,
  setMembers,
  addMembersTemporarily,
  setTeamInfo,
  setIsWrittingStatus,
  toggleIsWrittingStatus,
  setIsLoadingPage,
  setIsChangingInfo,
  setChangingInfo,
  setRoles,
  removeRoleByOid,
  removeMemberByOid,
  addRolesTemporarily,
  setMainTeamRoles,
  setMainTeamMembers,
  setIsLoadingMainTeamInfos,
  enableDeletingRoleByOid,
  disableDeletingRoleByOid,
  enableDeletingMemberByOid,
  disableDeletingMemberByOid,
  setIsOwner,
  setApprovers,
  removeApproverByOid,
  setReadOnlyState,
  setIsCaseValidationImpossible,
} = teamPageSlice.actions;
export default teamPageSlice.reducer;
