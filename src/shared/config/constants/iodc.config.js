import { env } from "env";

const { REACT_APP_OIDC_BASE_URL } = env;
const {
  REACT_APP_OIDC_BASE_URL: DOORS_OIDC_BASE_URL,
  REACT_APP_OIDC_CLIENT_ID: DOORS_OIDC_CLIENT_ID,
} = env;

export const LOGOUT_PATH = `${REACT_APP_OIDC_BASE_URL}oauth2/logout`;
export const CHANGE_PASSWORD_PATH = `${REACT_APP_OIDC_BASE_URL}?tab=password`;
const { protocol, hostname, port } = window.location;
export const SUPER_MANAGER_AUTHENTIFICATION = `${REACT_APP_OIDC_BASE_URL}upgradesession?forceUpgrade=1`;

export const settings = {
  client_id: DOORS_OIDC_CLIENT_ID,
  redirect_uri: `${protocol}//${hostname}${port ? `:${port}` : ""}/callback`,
  response_type: "code",
  scope: "openid profile",
  authority: DOORS_OIDC_BASE_URL,
  automaticSilentRenew: false,
  filterProtocolClaims: true,
  loadUserInfo: true,
  metadata: {
    issuer: DOORS_OIDC_BASE_URL,
    jwks_uri: DOORS_OIDC_BASE_URL + "oauth2/jwks",
    authorization_endpoint: DOORS_OIDC_BASE_URL + "oauth2/authorize",
    userinfo_endpoint: DOORS_OIDC_BASE_URL + "oauth2/userinfo",
    token_endpoint: DOORS_OIDC_BASE_URL + "oauth2/token",
  },
};
