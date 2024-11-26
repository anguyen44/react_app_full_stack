import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import LoadingPage from "shared/components/LoadingPage";
import { loginActionSaga } from "shared/store/sagas/oidc.saga";

export const PrivateRoute = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;

  const user = useSelector((state) => state.userReducer.user);
  const oidc = useSelector((state) => state.userReducer.oidc);

  useEffect(() => {
    if (oidc && !user) {
      dispatch(loginActionSaga());
    }
    if (pathname) {
      sessionStorage.setItem("currentPrivateRoute", pathname);
    }
  }, [user, oidc, pathname]);

  //trigger the useOidc service in case that we open the path which a sub component.
  if (user) {
    return <Outlet />;
  }
  return <LoadingPage open />;
};
