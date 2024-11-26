import { call, put, takeEvery } from "redux-saga/effects";
import CaseService from "shared/services/case/case.service";

import {
  setCasesNumber,
  updateIsLoadingCasesNumber,
} from "../slices/dashboardPage/dashboardPage.slice";

function* getDashboardInfos(data) {
  yield put(updateIsLoadingCasesNumber(true));
  try {
    const casesNumber = yield call(() =>
      CaseService.getCasesNumber(data.payload.asSuperManager),
    );
    yield put(setCasesNumber(casesNumber));
    yield put(updateIsLoadingCasesNumber(false));
  } catch (error) {
    console.error("error when geting the number of cases", error);
    yield put(setCasesNumber("?"));
  } finally {
    yield put(updateIsLoadingCasesNumber(false));
  }
}

function* dashboardSaga() {
  yield takeEvery(
    "dashboardPageReducer/fetchDashboardInfos",
    getDashboardInfos,
  );
}

export default dashboardSaga;
