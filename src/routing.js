import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingPage from "shared/components/LoadingPage";
import {
  DASHBOARD_PATH,
  HOME_PATH,
  OAUTH_CALLBACK,
  PERMISSIONS_ROLE_PATH,
  PORTFOLIOS_PATH,
  ROLES_PATH,
  SUB_TEAMS_PATH,
  TEAMS_PATH,
  USER_AUTORIZATIONS,
  USER_CASES_PATH,
  USER_INFOS_PATH,
  USERS_LAMDA_PATH,
} from "shared/config/constants/path.config";

import { Callback } from "./auth/callback";
import { PrivateRoute } from "./auth/privateRoute";

const DashboardView = lazy(
  () =>
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "dashboard-view" */
      "views/dashboardView/dashboard.view"
    ),
);
const Home = lazy(
  () =>
    import(
      /* webpackChunkName: "home" */
      "views/homeView/home.view"
    ),
);
const UserInfosView = lazy(
  () =>
    import(
      /* webpackChunkName: "user-infos-view" */
      "views/profil/userInfos.view"
    ),
);
const UserAutorizationsView = lazy(
  () =>
    import(
      /* webpackChunkName: "user-autorizations-view" */
      "views/profil/userAutorizations.view"
    ),
);
const RoleItemComponent = lazy(
  () =>
    import(
      /* webpackChunkName: "role-item-component" */
      "views/roles/component/roleItem/roleItem.component"
    ),
);
const PermissionCreationView = lazy(
  () =>
    import(
      /* webpackChunkName: "permission-creation-view" */
      "views/permissionCreation/permissionCreation.view"
    ),
);
const RolesView = lazy(
  () =>
    import(
      /* webpackChunkName: "roles-view" */
      "views/roles/Roles.view"
    ),
);
const TeamItemComponent = lazy(
  () =>
    import(
      /* webpackChunkName: "team-item-component" */
      "views/teams/components/teamItem/TeamItem.component"
    ),
);
const TeamsView = lazy(
  () =>
    import(
      /* webpackChunkName: "teams-view" */
      "views/teams/Teams.view"
    ),
);
const UserCasesView = lazy(
  () =>
    import(
      /* webpackChunkName: "user-cases-view" */
      "views/userCases/userCases.view"
    ),
);
const UserItemView = lazy(
  () =>
    import(
      /* webpackChunkName: "user-item-view" */
      "views/users/UserItem.view"
    ),
);

const PortfoliosView = lazy(
  () =>
    import(
      /* webpackChunkName: "portfolios-view" */
      "views/portfolios/portfolios.view"
    ),
);

const PortfolioItemComponent = lazy(
  () =>
    import(
      /* webpackChunkName: "portfolios-item-component" */
      "views/portfolios/components/portfolioItem/portfolioItem.component"
    ),
);

const Routing = () => {
  return (
    <Suspense fallback={<LoadingPage open />}>
      <Routes>
        <Route path={OAUTH_CALLBACK} element={<Callback />} />
        <Route path={HOME_PATH} element={<Home />} />

        <Route exact path={DASHBOARD_PATH} element={<PrivateRoute />}>
          <Route path={DASHBOARD_PATH} element={<DashboardView />} />
        </Route>
        <Route exact path={TEAMS_PATH} element={<PrivateRoute />}>
          <Route path={TEAMS_PATH} element={<TeamsView />}>
            <Route path=":teamOid" element={<TeamItemComponent />} />
          </Route>
        </Route>

        <Route path={SUB_TEAMS_PATH} element={<PrivateRoute />}>
          <Route path={SUB_TEAMS_PATH} element={<TeamsView />}>
            <Route path=":teamOid" element={<TeamItemComponent />} />
          </Route>
        </Route>

        <Route path={ROLES_PATH} element={<PrivateRoute />}>
          <Route path={ROLES_PATH} element={<RolesView />}>
            <Route path=":roleOid" element={<RoleItemComponent />} />
          </Route>
          <Route
            path={PERMISSIONS_ROLE_PATH(":roleOid")}
            element={<PermissionCreationView />}
          />
        </Route>

        <Route path={USER_INFOS_PATH} element={<PrivateRoute />}>
          <Route path={USER_INFOS_PATH} element={<UserInfosView />} />
        </Route>

        <Route path={USER_AUTORIZATIONS} element={<PrivateRoute />}>
          <Route
            path={USER_AUTORIZATIONS}
            element={<UserAutorizationsView />}
          />
        </Route>

        <Route path={USER_CASES_PATH} element={<PrivateRoute />}>
          <Route path={USER_CASES_PATH} element={<UserCasesView />} />
        </Route>

        <Route path={USERS_LAMDA_PATH} element={<PrivateRoute />}>
          <Route path={USERS_LAMDA_PATH}>
            <Route path=":userOid" element={<UserItemView />} />
          </Route>
        </Route>

        <Route exact path={PORTFOLIOS_PATH} element={<PrivateRoute />}>
          <Route path={PORTFOLIOS_PATH} element={<PortfoliosView />}>
            <Route path=":portfolioOid" element={<PortfolioItemComponent />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to={HOME_PATH} />} />
      </Routes>
    </Suspense>
  );
};

export default Routing;
