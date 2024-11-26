import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import PermissionModel from "shared/model/permission.model";
import RoleModel from "shared/model/role.model";
import { ChangingInfo } from "../common/commonPageReducers";

type RoleInfos = Omit<RoleModel, "permissions">;

const rolePageSlice = createSlice({
  name: "rolePageReducer",
  initialState: {
    permissions: [] as PermissionModel[],
    baseInfo: null as RoleInfos,
    isFetching: false,
    changingInfo: {
      oid: undefined,
      displayName: null,
      description: null,
    } as ChangingInfo,
    isChangingInfo: false,
  },
  reducers: {
    setIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },

    setPermissionsList: (state, action: PayloadAction<PermissionModel[]>) => {
      state.permissions = action.payload;
    },
    setBaseInfo: (state, action: PayloadAction<RoleInfos>) => {
      state.baseInfo = action.payload;
    },
    addPermissionsTemporarily: (
      state,
      action: PayloadAction<PermissionModel[]>,
    ) => {
      const permissions = action.payload.map(
        (permission) =>
          new PermissionModel(
            permission.oid,
            permission.name,
            permission.isActive,
            permission.description,
          ),
      );
      state.permissions = [...state.permissions, ...permissions];
    },
    enableDeletingPermissionByOid: (state, action: PayloadAction<string>) => {
      const permissionOid = action.payload;
      state.permissions = state.permissions.map((p) =>
        p.oid === permissionOid ? { ...p, deleted: true } : p,
      );
    },
    disableDeletingPermissionByOid: (state, action: PayloadAction<string>) => {
      const permissionOid = action.payload;
      state.permissions = state.permissions.map((p) =>
        p.oid === permissionOid ? { ...p, deleted: false } : p,
      );
    },
    setIsChangingInfo: (state, action: PayloadAction<boolean>) => {
      state.isChangingInfo = action.payload;
    },
    setChangingInfo: (state, action: PayloadAction<ChangingInfo>) => {
      state.changingInfo = action.payload;
    },
  },
});

export const {
  setPermissionsList,
  setBaseInfo,
  setIsFetching,
  addPermissionsTemporarily,
  setIsChangingInfo,
  setChangingInfo,
  enableDeletingPermissionByOid,
  disableDeletingPermissionByOid,
} = rolePageSlice.actions;

export default rolePageSlice.reducer;
