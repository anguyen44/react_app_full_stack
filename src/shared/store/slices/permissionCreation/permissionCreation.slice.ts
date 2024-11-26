import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import union from "lodash/union";
import PermissionDetailsModel from "shared/model/permissionTemplate/permissionDetails.model";
import PermissionTypeModel from "shared/model/permissionType.model";

const initialStateValue = {
  permissionTypes: [] as PermissionTypeModel[],
  resourceTypeOid: null as string,
  subType: null as string,
  subPerimeter: null as string,
  environments: [] as string[],
  zones: [] as string[],
  values: [] as string[],
  permissionsGeneration: [] as PermissionDetailsModel[],
  selectedPermissionPosibilities: [] as string[],
  permissionsPosibilitiesInCart: [] as PermissionDetailsModel[],
};

const permissionCreationSlice = createSlice({
  name: "permissionCreationReducer",
  initialState: {
    ...initialStateValue,
    isFetchingPermissionsGeneration: false,
    isFetchingPermissionTemplate: false,
    isFetchingPermissionCreationApi: false,
  },
  reducers: {
    initState: (state) => {
      return { ...state, ...initialStateValue };
    },
    setResourceType: (state, action: PayloadAction<string>) => {
      state.resourceTypeOid = action.payload;
      state.subType = null;
      state.subPerimeter = null;
      state.environments = [];
      state.zones = [];
      state.values = [];
    },
    setSubType: (state, action: PayloadAction<string>) => {
      state.subType = action.payload;
      state.subPerimeter = null;
      state.zones = [];
      state.environments = [];
      state.values = [];
    },
    setSubPerimeter: (state, action: PayloadAction<string>) => {
      state.subPerimeter = action.payload;
    },
    setEnvironments: (state, action: PayloadAction<string[]>) => {
      state.environments = action.payload;
    },
    setZones: (state, action: PayloadAction<string[]>) => {
      state.zones = action.payload;
    },
    setValues: (state, action: PayloadAction<string[]>) => {
      state.values = action.payload;
    },
    setPermissionTypes: (
      state,
      action: PayloadAction<PermissionTypeModel[]>,
    ) => {
      state.permissionTypes = action.payload;
    },
    setPermissionsGeneration: (
      state,
      action: PayloadAction<PermissionDetailsModel[]>,
    ) => {
      state.permissionsGeneration = action.payload;
    },
    setSelectedPermissionPosibilities: (
      state,
      action: PayloadAction<string[]>,
    ) => {
      state.selectedPermissionPosibilities = action.payload;
    },
    addPermissionsPosibilitiesInCart: (
      state,
      action: PayloadAction<PermissionDetailsModel[]>,
    ) => {
      state.permissionsPosibilitiesInCart = union(
        state.permissionsPosibilitiesInCart,
        action.payload,
      );
    },
    removePermissionsPosibilitiesInCart: (
      state,
      action: PayloadAction<string>,
    ) => {
      const permissionName = action.payload;
      state.permissionsPosibilitiesInCart =
        state.permissionsPosibilitiesInCart.filter(
          (p) => p.name !== permissionName,
        );
    },
    removeAllPermissionsPosibilitiesInCart: (state) => {
      state.permissionsPosibilitiesInCart = [];
    },
    setIsFetchingPermissionTemplate: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.isFetchingPermissionTemplate = action.payload;
    },
    setIsFetchingPermissionsGeneration: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.isFetchingPermissionsGeneration = action.payload;
    },
    setIsFetchingPermissionCreationApi: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.isFetchingPermissionCreationApi = action.payload;
    },
  },
});

export const {
  setResourceType,
  setSubType,
  setSubPerimeter,
  setEnvironments,
  setZones,
  setValues,
  initState,
  setPermissionTypes,
  setIsFetchingPermissionTemplate,
  setIsFetchingPermissionsGeneration,
  setPermissionsGeneration,
  setSelectedPermissionPosibilities,
  addPermissionsPosibilitiesInCart,
  removePermissionsPosibilitiesInCart,
  removeAllPermissionsPosibilitiesInCart,
  setIsFetchingPermissionCreationApi,
} = permissionCreationSlice.actions;
export default permissionCreationSlice.reducer;
