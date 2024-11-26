import { createAction } from "@reduxjs/toolkit";
import { call, put, select, takeEvery } from "redux-saga/effects";
import CaseService from "shared/services/case/case.service";
import {
  initCaseStateByOid,
  removeCaseByOidTemporarily,
  setCasesOpenToValidate,
  setIsLoadingCasesOpenToValidate,
  setIsLoadingCasesOpenCurrent,
  setCasesOpenCurrent,
  setIsLoadingClosedValidationCases,
  setClosedValidationCases,
  setIsLoadingClosedTreatedCases,
  setClosedTreatedCases,
} from "shared/store/slices/casesGestionPage/casesGestionPage.slice";
import { addMonths, setTime } from "shared/utils/global.utils";

type GetWithParamsAsSuperManager = {
  asSuperManager: boolean;
};

export const proccessCaseAction = createAction("saga/proccessCase");
export const getClosedCasesByDatesPayloadAction =
  createAction<GetWithParamsAsSuperManager>(
    "saga/getClosedCasesByDatesPayload",
  );

export const getSelfCasesOpenToValidateAction =
  createAction<GetWithParamsAsSuperManager>("saga/getSelfCasesOpenToValidate");
export const getSelfCasesOpenCurrentAction =
  createAction<GetWithParamsAsSuperManager>("saga/getSelfCasesOpenCurrent");

export const getClosedValidationCasesAction =
  createAction<GetWithParamsAsSuperManager>("saga/getClosedValidationCases");
export const getClosedTreatedCasesAction =
  createAction<GetWithParamsAsSuperManager>("saga/getClosedTreatedCases");
export const getClosedValidationCasesByDatesPayloadAction =
  createAction<GetWithParamsAsSuperManager>(
    "saga/getClosedValidationCasesByDatesPayload",
  );
export const getClosedTreatedCasesByDatesPayloadAction =
  createAction<GetWithParamsAsSuperManager>(
    "saga/getClosedTreatedCasesByDatesPayload",
  );

function* proccessCase(data) {
  try {
    const [caseOid, isApproved, asSuperManager] = data.payload.params;
    yield call(() =>
      CaseService.proccessCase(caseOid, isApproved, asSuperManager),
    );
    data.payload.onSuccessCallback();
    yield put(removeCaseByOidTemporarily(data.payload.caseOid));
    yield put(getClosedValidationCasesAction({ asSuperManager }));
  } catch (error) {
    data.payload.onFailureCallback();
    yield put(initCaseStateByOid(data.payload.caseOid));
    console.error("error when proccessing the case", error);
  }
}

function* getSelfCasesOpenToValidate(data) {
  const { asSuperManager } = data.payload;
  yield put(setIsLoadingCasesOpenToValidate(true));
  try {
    const cases = yield call(() =>
      CaseService.getSelfCasesOpenToValidate(asSuperManager),
    );

    yield put(setCasesOpenToValidate(cases));
  } catch (error) {
    yield put(setCasesOpenToValidate([]));
    console.error("error when geting the self cases to validate list", error);
  } finally {
    yield put(setIsLoadingCasesOpenToValidate(false));
  }
}

function* getSelfCasesOpenCurrent(data) {
  const { asSuperManager } = data.payload;
  yield put(setIsLoadingCasesOpenCurrent(true));
  try {
    const cases = yield call(() =>
      CaseService.getSelfCasesOpenCurrent(asSuperManager),
    );

    yield put(setCasesOpenCurrent(cases));
  } catch (error) {
    yield put(setCasesOpenCurrent([]));
    console.error("error when geting the self current cases list", error);
  } finally {
    yield put(setIsLoadingCasesOpenCurrent(false));
  }
}

function* getClosedValidationCases(data) {
  const minimumValidationDate = addMonths(new Date(), -7);
  const maximumValidationDate = new Date();
  yield getClosedValidationCasesByDates(
    minimumValidationDate,
    maximumValidationDate,
    data.payload.asSuperManager,
  );
}

function* getClosedValidationCasesByDatesPayload(data) {
  const {
    minimumValidationDateClosedValidationCases,
    maximumValidationDateClosedValidationCases,
  } = yield select((state) => state.casesGestionPageReducer);

  yield getClosedValidationCasesByDates(
    minimumValidationDateClosedValidationCases,
    maximumValidationDateClosedValidationCases,
    data.payload.asSuperManager,
  );
}

function* getClosedValidationCasesByDates(
  minimumValidationDate,
  maximumValidationDate,
  asSuperManager,
) {
  yield put(setIsLoadingClosedValidationCases(true));
  try {
    const cases = yield call(() =>
      CaseService.getClosedValidationCases(
        setTime(minimumValidationDate, [0, 0, 0]),
        setTime(maximumValidationDate, [23, 59, 59]),
        asSuperManager,
      ),
    );
    yield put(setClosedValidationCases(cases));
  } catch (error) {
    yield put(setClosedValidationCases([]));
    console.error("error when geting the closed validations cases ", error);
  } finally {
    yield put(setIsLoadingClosedValidationCases(false));
  }
}

function* getClosedTreatedCases(data) {
  const minimumValidationDate = addMonths(new Date(), -7);
  const maximumValidationDate = new Date();
  yield getClosedTreatedCasesByDates(
    minimumValidationDate,
    maximumValidationDate,
    data.payload.asSuperManager,
  );
}

function* getClosedTreatedCasesByDatesPayload(data) {
  const {
    minimumValidationDateClosedTreatedCases,
    maximumValidationDateClosedTreatedCases,
  } = yield select((state) => state.casesGestionPageReducer);

  yield getClosedTreatedCasesByDates(
    minimumValidationDateClosedTreatedCases,
    maximumValidationDateClosedTreatedCases,
    data.payload.asSuperManager,
  );
}

function* getClosedTreatedCasesByDates(
  minimumValidationDate,
  maximumValidationDate,
  asSuperManager,
) {
  yield put(setIsLoadingClosedTreatedCases(true));
  try {
    const cases = yield call(() =>
      CaseService.getClosedTreatedCases(
        setTime(minimumValidationDate, [0, 0, 0]),
        setTime(maximumValidationDate, [23, 59, 59]),
        asSuperManager,
      ),
    );
    yield put(setClosedTreatedCases(cases));
  } catch (error) {
    yield put(setClosedTreatedCases([]));
    console.error("error when geting the closed treated cases ", error);
  } finally {
    yield put(setIsLoadingClosedTreatedCases(false));
  }
}

function* casesSaga() {
  yield takeEvery(proccessCaseAction, proccessCase);

  yield takeEvery(getSelfCasesOpenToValidateAction, getSelfCasesOpenToValidate);
  yield takeEvery(getSelfCasesOpenCurrentAction, getSelfCasesOpenCurrent);
  yield takeEvery(getClosedValidationCasesAction, getClosedValidationCases);
  yield takeEvery(
    getClosedValidationCasesByDatesPayloadAction,
    getClosedValidationCasesByDatesPayload,
  );

  yield takeEvery(getClosedTreatedCasesAction, getClosedTreatedCases);
  yield takeEvery(
    getClosedTreatedCasesByDatesPayloadAction,
    getClosedTreatedCasesByDatesPayload,
  );
}

export default casesSaga;
