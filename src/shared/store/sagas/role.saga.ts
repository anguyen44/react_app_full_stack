import { PayloadAction, createAction } from "@reduxjs/toolkit";
import { call, put, select, takeEvery } from "redux-saga/effects";
import RoleService from "shared/services/role/role.service";

import {
  setBaseInfo,
  setChangingInfo,
  setIsFetching,
  setPermissionsList,
} from "../slices/rolePage/rolePage.slice";
import RoleWithTeamModel from "shared/model/roleWithTeam.model";
import RoleModel from "shared/model/role.model";
import { setIsChangingInfo, setRoles } from "../slices/teamPage/teamPage.slice";
import TeamRoleModel from "shared/model/teamRole.model";

export const getAllRolesManagementAction = createAction<
  ServiceListCallBack<TeamRoleModel>
>("roleSaga/getRolesByUserOid");
export const getSelfRolesAction = createAction<
  ServiceListCallBack<RoleWithTeamModel>
>("roleSaga/getSelfRoles");
export const createNewRoleAction = createAction<CreateNewRoleParams>(
  "roleSaga/createNewRole",
);
export const getRoleByOidAction = createAction<GetRoleByOidParams>(
  "roleSaga/getRoleByOid",
);

export const updateRoleDisplayNameAction =
  createAction<UpdateRoleDisplayNameActionParams>(
    "roleSaga/updateRoleDisplayName",
  );

export const updateRoleDescriptionAction =
  createAction<UpdateRoleDescriptionActionParams>(
    "roleSaga/updateRoleDescription",
  );

function* getAllRolesManagement(
  data: PayloadAction<ServiceListCallBack<TeamRoleModel>>,
) {
  const { onSuccessCallback, onFailureCallback } = data.payload;
  try {
    const roles: TeamRoleModel[] = yield call(() => RoleService.getAllRoles());
    onSuccessCallback(roles);
  } catch (error) {
    onFailureCallback();
    console.error("error when getting roles by user oid", error);
  }
}

function* getSelfRoles(
  data: PayloadAction<ServiceListCallBack<RoleWithTeamModel>>,
) {
  const { onSuccessCallback, onFailureCallback } = data.payload;
  try {
    const roles: RoleWithTeamModel[] = yield call(() =>
      RoleService.getSelfRoles(),
    );
    onSuccessCallback(roles);
  } catch (error) {
    onFailureCallback();
    console.error("error when geting the self roles list", error);
  }
}

type GetRoleByOidParams = { roleOid: string; checkCaseValidation?: boolean };

function* getRoleByOid(data: PayloadAction<GetRoleByOidParams>) {
  yield put(setIsFetching(true));
  try {
    const { permissions, ...info }: RoleModel = yield call(() =>
      RoleService.getRoleByOid(
        data.payload.roleOid,
        data.payload.checkCaseValidation,
      ),
    );

    const { oid, displayName, description } = info;
    yield put(setPermissionsList(permissions));
    yield put(setBaseInfo(info));
    yield put(setIsFetching(false));
    yield put(setChangingInfo({ oid, displayName, description }));
    yield put(setIsChangingInfo(false));
  } catch (error) {
    yield put(setIsFetching(false));
    console.error("error when getting the role by oid", error);
  }
}

type CreateNewRoleParams = ServiceVoidCallBackWithParams & {
  teamOid: string;
};

function* createNewRole(data: PayloadAction<CreateNewRoleParams>) {
  const { onSuccessCallback, onFailureCallback } = data.payload;

  try {
    const newRole: RoleModel = yield call(() =>
      (RoleService as any).createNewRole(...data.payload.params),
    );
    if (newRole) {
      onSuccessCallback();
      const roles = yield select((state) => state.teamPageReducer.roles);
      yield put(setRoles([newRole, ...roles]));
    }
  } catch (error) {
    onFailureCallback();
    console.error("error when creating a new role", error);
  }
}

type UpdateRoleDisplayNameActionParams = {
  oid: String;
  displayName: String;
  callback: () => void;
};

function* updateRoleDisplayName(
  data: PayloadAction<UpdateRoleDisplayNameActionParams>,
) {
  const { oid, displayName, callback } = data.payload;
  try {
    yield call(() => RoleService.updateRoleDisplayName(oid, displayName));
    const baseInfo = yield select((state) => state.rolePageReducer.baseInfo);
    yield put(
      setBaseInfo({
        ...baseInfo,
        displayName: displayName,
      }),
    );
  } catch (error) {
    console.error("eError while updating role display name", error);
  } finally {
    callback();
  }
}

type UpdateRoleDescriptionActionParams = {
  oid: String;
  description: String;
  callback: () => void;
};

function* updateRoleDescription(
  data: PayloadAction<UpdateRoleDescriptionActionParams>,
) {
  const { oid, description, callback } = data.payload;
  try {
    yield call(() => RoleService.updateRoleDescription(oid, description));
    const baseInfo = yield select((state) => state.rolePageReducer.baseInfo);
    yield put(
      setBaseInfo({
        ...baseInfo,
        description: description,
      }),
    );
  } catch (error) {
    console.error("eError while updating role description", error);
  } finally {
    callback();
  }
}

function* roleSaga() {
  yield takeEvery(getAllRolesManagementAction, getAllRolesManagement);
  yield takeEvery(getSelfRolesAction, getSelfRoles);
  yield takeEvery(getRoleByOidAction, getRoleByOid);
  yield takeEvery(createNewRoleAction, createNewRole);
  yield takeEvery(updateRoleDisplayNameAction, updateRoleDisplayName);
  yield takeEvery(updateRoleDescriptionAction, updateRoleDescription);
}

export default roleSaga;
