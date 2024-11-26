import { createAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { call, put, takeEvery } from "redux-saga/effects";
import TokenService from "shared/services/token/token.service";

import UserService from "../../services/user/user.service";
import { removeMemberByOid } from "../slices/teamPage/teamPage.slice";
import {
  updateIsSuperManager,
  updateModeSuperManagerEnable,
  updateUser,
  updateUserInfosByOid,
} from "../slices/user/user.slice";

export const getBasicUserProfileInfoAction = createAction(
  "userSaga/getBasicUserProfileInfo",
);
export const getUserInfosByOidAction = createAction(
  "userSaga/getUserInfosByOid",
);
export const removeUserFromTeamAction = createAction(
  "userSaga/removeUserFromTeam",
);
export const getMemberByNniOrEmailAction = createAction(
  "userSaga/getMemberByNniOrEmail",
);

export const verifySelfUserSuperManagerAccessAction = createAction(
  "userSaga/verifySelfUserSuperManager",
);

export const verifyEnablingSuperManagerModeAction = createAction(
  "userSage/verifyEnablingSuperManagerMode",
);

function* getBasicUserProfileInfo() {
  try {
    const profile = yield call(() => UserService.getProfilInfos());
    yield put(updateUser(profile));
  } catch (error) {
    console.error("saga getBasicUserProfileInfo", error);
  }
}

function* getUserInfosByOid(data) {
  try {
    const userInfosByOid = yield call(() =>
      UserService.getUserInfosByOid(data.payload),
    );
    yield put(updateUserInfosByOid(userInfosByOid));
  } catch (error) {
    console.error("Error while getting user infos by oid", error);
  }
}

function* removeUserFromTeam(data) {
  try {
    yield call(() => UserService.deleteUserByOidInTeam(...data.payload.params));
    if (!data.payload.isSubTeamPage) {
      yield put(removeMemberByOid(data.payload.memberOid));
    }
    data.payload.onSuccessCallback();
  } catch (error) {
    data.payload.onFailureCallback();
    console.error("Error while removing user from team", error);
  }
}

function* getMemberByNniOrEmail(data) {
  try {
    const res = yield call(() =>
      UserService.getMemberByNniOrEmail(data.payload.query),
    );
    if (res?.length > 0) {
      data.payload.onSetExistedDatas(res);
    } else {
      data.payload.onSetNoData();
    }
    data.payload.onSuccessCallback();
  } catch (error) {
    data.payload.onFailureCallback(error);
    console.error("Error while getting user by nni or email", error);
  }
}

function* verifySelfUserSuperManagerAccess() {
  yield put(updateIsSuperManager(false));
  try {
    const { isSuperManager } = yield call(() =>
      UserService.verifySelfUserSuperManager(),
    );
    yield put(updateIsSuperManager(isSuperManager));
  } catch (error) {
    console.error("Error while getting user infos by oid", error);
  }
}

function* verifyEnablingSuperManagerMode() {
  yield put(updateModeSuperManagerEnable(false));
  const token = yield TokenService.getToken();
  if (token) {
    const decoded = jwtDecode(token);
    yield put(updateModeSuperManagerEnable(decoded?.["acr"] === "loa-5"));
  }
}

function* userSaga() {
  yield takeEvery(getBasicUserProfileInfoAction, getBasicUserProfileInfo);
  yield takeEvery(getUserInfosByOidAction, getUserInfosByOid);
  yield takeEvery(removeUserFromTeamAction, removeUserFromTeam);
  yield takeEvery(getMemberByNniOrEmailAction, getMemberByNniOrEmail);
  yield takeEvery(
    verifySelfUserSuperManagerAccessAction,
    verifySelfUserSuperManagerAccess,
  );
  yield takeEvery(
    verifyEnablingSuperManagerModeAction,
    verifyEnablingSuperManagerMode,
  );
}

export default userSaga;
