import RoleModel from "shared/model/role.model";
import { commonInitialState, commonPageReducers } from "./commonPageReducers";
import { PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "shared/model/user.model";
import { sortUsersByName } from "shared/utils/sort.utils";

export type OrgPageState = typeof orgPageState;

export const orgPageState = {
  ...commonInitialState,
  roles: [] as RoleModel[],
  approvers: [] as UserModel[],
  isOwner: false,
  searchedMembers: [] as UserModel[],
  isCaseValidationImpossible: false,
};

export type OrgPageReducers = typeof orgPageReducers;

export const orgPageReducers = {
  ...commonPageReducers,
  setRoles: (state: OrgPageState, action: PayloadAction<RoleModel[]>) => {
    state.roles = action.payload;
  },
  enableDeletingRoleByOid: (
    state: OrgPageState,
    action: PayloadAction<string>,
  ) => {
    const roleOid = action.payload;
    state.roles = state.roles.map((role) =>
      role.oid === roleOid ? { ...role, deleted: true } : role,
    );
  },
  disableDeletingRoleByOid: (
    state: OrgPageState,
    action: PayloadAction<string>,
  ) => {
    const roleOid = action.payload;
    state.roles = state.roles.map((role) =>
      role.oid === roleOid ? { ...role, deleted: false } : role,
    );
  },
  removeRoleByOid: (state: OrgPageState, action: PayloadAction<string>) => {
    state.roles = state.roles.filter((r) => r.oid !== action.payload);
  },
  addRolesTemporarily: (
    state: OrgPageState,
    action: PayloadAction<RoleModel[]>,
  ) => {
    const transformedData = action.payload.map(
      (role) =>
        new RoleModel(
          role.oid,
          role.name,
          role.displayName,
          role.description,
          role.portfolio,
          role.isActive,
        ),
    );
    state.roles = [...state.roles, ...transformedData];
  },
  setApprovers: (state: OrgPageState, action: PayloadAction<UserModel[]>) => {
    state.approvers = action.payload;
  },
  removeApproverByOid: (state: OrgPageState, action: PayloadAction<string>) => {
    state.approvers = state.approvers.filter((m) => m.oid !== action.payload);
  },
  setIsOwner: (state: OrgPageState, action: PayloadAction<boolean>) => {
    state.isOwner = action.payload;
  },
  addSearchedMember: (
    state: OrgPageState,
    action: PayloadAction<UserModel>,
  ) => {
    state.searchedMembers = sortUsersByName([
      action.payload,
      ...state.searchedMembers,
    ]);
  },
  deleteSearchedMember: (
    state: OrgPageState,
    action: PayloadAction<string>,
  ) => {
    state.searchedMembers = state.searchedMembers.filter(
      (m) => m.oid !== action.payload,
    );
  },
  resetSearchedMember: (state: OrgPageState) => {
    state.searchedMembers = [];
  },
  setIsCaseValidationImpossible: (state, action: PayloadAction<boolean>) => {
    state.isCaseValidationImpossible = action.payload;
  },
};
