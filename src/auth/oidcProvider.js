import { UserManager } from "oidc-client-ts";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { settings } from "shared/config/constants/iodc.config";
import { loginActionSaga } from "shared/store/sagas/oidc.saga";
import { addOidc } from "shared/store/slices/user/user.slice";

import TokenService from "../shared/services/token/token.service";

export const useOidc = () => {
  const dispatch = useDispatch();
  const userManager = new UserManager(settings);

  //Listen to the event of user connexion, if success, update to user in oidc reducer
  userManager.events.addUserLoaded((user) => {
    TokenService.setToken(user.id_token);
  });

  userManager.events.addAccessTokenExpiring(function () {
    for (var key in sessionStorage) {
      if (key !== "currentPrivateRoute") {
        sessionStorage.removeItem(key);
      }
    }
    dispatch(loginActionSaga());
  });

  const login = () => userManager.signinRedirect();
  const loginCallback = () => userManager.signinRedirectCallback();

  useEffect(() => {
    dispatch(addOidc({ login, loginCallback }));
  }, []);

  return { login, loginCallback };
};

const OidcProvider = ({ children }) => {
  useOidc();
  return children;
};

export default OidcProvider;
