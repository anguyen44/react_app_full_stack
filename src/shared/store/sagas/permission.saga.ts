import { PayloadAction, createAction } from "@reduxjs/toolkit";
import { call, takeEvery } from "redux-saga/effects";
import PermissionService from "shared/services/permission/permission.service";

export const deletePermissionInRoleByOidAction =
  createAction<DeletePermissionInRoleByOidParams>(
    "permissionSaga/deletePermissionInRoleByOid",
  );

type DeletePermissionInRoleByOidParams = ServiceVoidCallBackWithParams & {
  permissionOid: string;
};

function* deletePermissionInRoleByOid(
  data: PayloadAction<DeletePermissionInRoleByOidParams>,
) {
  try {
    const res = yield call(() =>
      PermissionService.deletePermissionInRoleByOid(
        data.payload.params[0],
        data.payload.params[1],
      ),
    );

    if (res) {
      data.payload.onSuccessCallback();
    }
  } catch (error) {
    console.error("Error while removing permission from role", error);
    data.payload.onFailureCallback();
  }
}

function* permissionSaga() {
  yield takeEvery(
    deletePermissionInRoleByOidAction,
    deletePermissionInRoleByOid,
  );
}

export default permissionSaga;
