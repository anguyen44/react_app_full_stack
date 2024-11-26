import { createAction } from "@reduxjs/toolkit";
import { put, select, takeLatest } from "redux-saga/effects";
import { LOGOUT_PATH } from "shared/config/constants/iodc.config";
import {
  getBasicUserProfileInfoAction,
  verifyEnablingSuperManagerModeAction,
  verifySelfUserSuperManagerAccessAction,
} from "shared/store/sagas/user.saga";

import { fetchRegexConfigAction } from "./globalUi.saga";

export const loginActionSaga = createAction("saga/oidc-login");
export const loginActionSagaSuccess = createAction("saga/oidc-login-success");
export const loginActionSagaFail = createAction("saga/oidc-login-fail");

function* login() {
  try {
    const oidcManager = yield select((state) => state.userReducer.oidc);
    yield oidcManager.login();
    yield put(loginActionSagaSuccess());
  } catch (error) {
    console.error("error when logging", error);
    yield put(loginActionSagaFail());
  }
}

export const loginCallBackActionSaga = createAction("saga/oidc-login-callback");
export const loginCallBackActionSagaSuccess = createAction(
  "saga/oidc-login-success",
);
export const loginCallBackActionSagaFail = createAction("saga/oidc-login-fail");

function* loginCallback() {
  try {
    const oidcManager = yield select((state) => state.userReducer.oidc);
    yield oidcManager.loginCallback();
    yield put(getBasicUserProfileInfoAction());
    yield put(fetchRegexConfigAction());
    yield put(verifySelfUserSuperManagerAccessAction());
    yield put(verifyEnablingSuperManagerModeAction());
    yield put(loginCallBackActionSagaSuccess());
  } catch (error) {
    console.error("error when logging in callback function", error);
    yield put(loginActionSagaFail());
  }
}

export const logoutActionSaga = createAction("saga/oidc-logout");
export const logoutActionSagaSuccess = createAction("saga/oidc-logout-success");
export const logoutActionSagaFail = createAction("saga/oidc-logout-fail");

function* logout() {
  try {
    yield localStorage.clear();
    yield sessionStorage.clear();
    yield put(logoutActionSagaSuccess());
    yield window.location.replace(LOGOUT_PATH);
  } catch (error) {
    console.error("error on logout", error);
    yield put(logoutActionSagaFail());
  }
}

function* oidcSaga() {
  yield takeLatest(loginActionSaga, login);
  yield takeLatest(loginCallBackActionSaga, loginCallback);
  yield takeLatest(logoutActionSaga, logout);
}

export default oidcSaga;
