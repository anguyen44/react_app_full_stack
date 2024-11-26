import { all } from "redux-saga/effects";

import casesSaga from "./cases.saga";
import dashboardSaga from "./dashboard.saga";
import globalUiSaga from "./globalUi.saga";
import oidcSaga from "./oidc.saga";
import permissionSaga from "./permission.saga";
import permissionTemplateSaga from "./permissionTemplate.saga";
import portfolioSaga from "./portfolio.saga";
import roleSaga from "./role.saga";
import teamSaga from "./team.saga";
import userSaga from "./user.saga";

function* rootSaga() {
  yield all([
    teamSaga(),
    roleSaga(),
    dashboardSaga(),
    oidcSaga(),
    userSaga(),
    permissionSaga(),
    casesSaga(),
    permissionTemplateSaga(),
    portfolioSaga(),
    globalUiSaga(),
  ]);
}
export default rootSaga;
