import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingPage from "shared/components/LoadingPage";
import { loginCallBackActionSaga } from "shared/store/sagas/oidc.saga";

export const Callback = () => {
  const user = useSelector((state) => state.userReducer.user);
  const oidc = useSelector((state) => state.userReducer.oidc);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPrivateRoute = sessionStorage.getItem("currentPrivateRoute");

  useEffect(() => {
    if (oidc) {
      if (!user) {
        dispatch(loginCallBackActionSaga());
      } else {
        if (currentPrivateRoute) {
          navigate(currentPrivateRoute);
        } else {
          navigate("/dashboard");
        }
      }
    }
  }, [user, oidc]);

  return <LoadingPage open />;
};
