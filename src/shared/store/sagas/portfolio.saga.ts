import { PayloadAction, createAction } from "@reduxjs/toolkit";
import { all, call, put, takeEvery } from "redux-saga/effects";
import PortfolioModel from "shared/model/portfolio.model";
import PortfolioService, {
  buildPermissionsWithRolesFromResponse,
} from "shared/services/portfolio/portfolio.service";
import {
  removeApproverByOid,
  setApprovers,
  setChangingInfo,
  setIsLoadingPage,
  setIsOwner,
  setPermissions,
  setPortfolioInfos,
  setRoles,
} from "shared/store/slices/portfolioPage/portfolioPage.slice";
import { addPortfolios } from "shared/store/slices/user/user.slice";

export const getPortfoliosListAction = createAction(
  "portfolioSaga/getPortfoliosList",
);

export const getSelfPortfoliosAction = createAction<
  ServiceListCallBack<PortfolioModel>
>("portfolioSaga/getSelfPortfolios");

export const getPortfolioInfosAction = createAction<GetPortfolioInfosParams>(
  "portfolioSaga/getPortfolioInfosAction",
);

export const addApproverToPortfolioAction =
  createAction<ServiceVoidCallBackWithParams>(
    "portfolioSaga/addApproverToPortfolio",
  );

export const removeApproverFromPortfolioAction =
  createAction<RemoveApproverFromPortfolioParams>(
    "teamSaga/removeApproverFromPortfolio",
  );

function* getPortfoliosList() {
  try {
    const portfoliosList: PortfolioModel[] = yield call(() =>
      PortfolioService.getPortfolios(),
    );
    yield put(addPortfolios(portfoliosList));
  } catch (error) {
    console.error("Error when getting the portfolios list", error);
  }
}

function* getSelfPortfolios(
  data: PayloadAction<ServiceListCallBack<PortfolioModel>>,
) {
  const { onSuccessCallback, onFailureCallback } = data.payload;
  try {
    const portfoliosList: PortfolioModel[] = yield call(() =>
      PortfolioService.getPortfolios(),
    );
    onSuccessCallback(portfoliosList);
  } catch (error) {
    onFailureCallback();
    console.error("error when getting the self portfolios list", error);
  }
}

type GetPortfolioInfosParams = {
  portfolioOid: string;
  userOid: string;
};

function* getPortfolioInfos(data: PayloadAction<GetPortfolioInfosParams>) {
  const { portfolioOid, userOid } = data.payload;

  try {
    yield put(setIsLoadingPage(true));
    const {
      portfolioByOidRes,
      rolesByPortfolioOidRes,
      permissionsByPortfolioOidRes,
      approversByPortfolioOidRes,
    } = yield all({
      portfolioByOidRes: call(() =>
        PortfolioService.getPortfolioByOid(portfolioOid),
      ),
      rolesByPortfolioOidRes: call(() =>
        PortfolioService.getRolesByPortfolioOid(portfolioOid),
      ),
      permissionsByPortfolioOidRes: call(() =>
        PortfolioService.getPermissionsByPortfolioOid(portfolioOid),
      ),
      approversByPortfolioOidRes: call(() =>
        PortfolioService.getApproversByPortfolioOid(portfolioOid),
      ),
    });

    const permissions = buildPermissionsWithRolesFromResponse(
      permissionsByPortfolioOidRes,
      rolesByPortfolioOidRes,
    );

    yield put(setPortfolioInfos(portfolioByOidRes));
    yield put(setRoles(rolesByPortfolioOidRes));
    yield put(setPermissions(permissions));

    yield put(setApprovers(approversByPortfolioOidRes));

    const { oid, displayName, description } = portfolioByOidRes;

    yield put(setChangingInfo({ oid, displayName, description }));
    yield put(setIsOwner(userOid === portfolioByOidRes?.owner?.oid));
    yield put(setIsLoadingPage(false));
  } catch (error) {
    console.error("saga getPortfolioInfosAction", error);
  }
}

function* addApproverToPortfolio(
  data: PayloadAction<ServiceVoidCallBackWithParams>,
) {
  const { onSuccessCallback, onFailureCallback, params } = data.payload;
  try {
    yield call(() =>
      (PortfolioService as any).addApproverToPortfolio(...params),
    );
    onSuccessCallback();
  } catch (error) {
    onFailureCallback();
    console.error("Error while adding approver to portfolio", error);
  }
}

type RemoveApproverFromPortfolioParams = ServiceVoidCallBack & {
  approverOid: string;
  portfolioOid: string;
};

function* removeApproverFromPortfolio(
  data: PayloadAction<RemoveApproverFromPortfolioParams>,
) {
  const { onSuccessCallback, onFailureCallback, approverOid, portfolioOid } =
    data.payload;
  try {
    yield call(() =>
      PortfolioService.removeApproverFromPortfolio(portfolioOid, approverOid),
    );
    onSuccessCallback();
    yield put(removeApproverByOid(approverOid));
  } catch (error) {
    onFailureCallback();
    console.error("Error while deleting approver in portfolio", error);
  }
}

function* portfolioSaga() {
  yield takeEvery(getPortfoliosListAction, getPortfoliosList);
  yield takeEvery(getSelfPortfoliosAction, getSelfPortfolios);
  yield takeEvery(getPortfolioInfosAction, getPortfolioInfos);
  yield takeEvery(addApproverToPortfolioAction, addApproverToPortfolio);
  yield takeEvery(
    removeApproverFromPortfolioAction,
    removeApproverFromPortfolio,
  );
}

export default portfolioSaga;
