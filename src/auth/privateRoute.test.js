import * as ReactRouterDom from "react-router-dom";
import { render } from "test/utils";

import { userReducerData } from "../views/dashboardView/dashboardView.test";
import { PrivateRoute } from "./privateRoute";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
  useParams: jest.fn(),
}));

describe("Test PrivateRoute Component", () => {
  it("Render PrivateRoute when having user data", () => {
    render(<PrivateRoute />, null, {
      store: {
        userReducer: {
          user: {
            deleted: false,
            oid: "b76da5b7-5d5c-45fa-8575-13bcc152bad0",
            nni: "AN0F039L",
            name: "NGUYEN",
            givenName: "ANH",
            email: "anh-externe.nguyen@enedis.fr",
            isActive: true,
            lastSuccessfulLogin: "05/06/2024",
            lastFailedLogin: "05/06/2024",
            lastModifyPassword: "05/06/2024",
          },
        },
      },
    });
  });
  it("Render PrivateRoute when not having user data", () => {
    ReactRouterDom.useLocation.mockImplementation(() => {
      return {
        pathname: "/teams",
      };
    });
    render(<PrivateRoute />, null, {
      store: {
        userReducer: {
          user: null,
          teams: userReducerData.teams,
          oidc: {
            login: jest.fn(),
            loginCallBack: jest.fn(),
          },
        },
      },
    });
  });
  it("Render PrivateRoute when not having user data and pathname data", () => {
    ReactRouterDom.useLocation.mockImplementation(() => {
      return {
        pathname: "",
      };
    });
    render(<PrivateRoute />, null, {
      store: {
        userReducer: {
          user: null,
          teams: userReducerData.teams,
          oidc: {
            login: jest.fn(),
            loginCallBack: jest.fn(),
          },
        },
      },
    });
  });
});
