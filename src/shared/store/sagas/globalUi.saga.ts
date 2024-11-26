import { createAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import GlobalService from "shared/services/global/global.service";
import { updateRegexConfig } from "../slices/globalUi/globalUi.slice";

export const fetchRegexConfigAction = createAction(
  "globalUiSaga/fetchRegexConfig",
);

function* fetchRegexConfig() {
  try {
    const regexConfig = yield call(() => GlobalService.getRegexConfig());
    yield put(updateRegexConfig(regexConfig));
  } catch (error) {
    console.error("error when getting regex configuration", error);
  }
}

function* globalUiSaga() {
  yield takeEvery(fetchRegexConfigAction, fetchRegexConfig);
}

export default globalUiSaga;
