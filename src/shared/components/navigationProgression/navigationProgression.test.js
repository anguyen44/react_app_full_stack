import * as ReactRouterDom from "react-router-dom";
import { mockRole } from "test/mocks/mockRole.utils";
import { render } from "test/utils";
import { userReducerData } from "views/dashboardView/dashboardView.test.js";

import NavigationProgression from "./NavigationProgression";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
  useParams: jest.fn(),
}));

const mockStates = {
  userReducer: userReducerData,
};

describe("list of tests on NavigationProgression component", () => {
  test("render NavigationProgression component and try to access team menu for testing", () => {
    ReactRouterDom.useLocation.mockImplementation(() => {
      return {
        pathname: "/teams",
      };
    });
    ReactRouterDom.useParams.mockImplementation(() => {
      return {
        teamOid: "",
      };
    });

    render(<NavigationProgression />, null, { store: mockStates });
  });
  test("render NavigationProgression component and try to access team page for testing", () => {
    ReactRouterDom.useLocation.mockImplementation(() => {
      return {
        pathname: "/teams",
      };
    });
    ReactRouterDom.useParams.mockImplementation(() => {
      return {
        teamOid: "2922a073-03d7-43d0-a04b-55810b36d675",
      };
    });
    render(<NavigationProgression />, null, { store: mockStates });
  });
  test("render NavigationProgression component and try to access sub team page for testing", () => {
    ReactRouterDom.useLocation.mockImplementation(() => {
      return {
        pathname: "/sub_teams",
      };
    });
    ReactRouterDom.useParams.mockImplementation(() => {
      return {
        teamOid: "e827cc0c-efac-46ce-9392-3a0dac5185e8",
      };
    });
    render(<NavigationProgression />, null, { store: mockStates });
  });
  test("render NavigationProgression component and try to access sub team page for testing but not having teamOid", () => {
    ReactRouterDom.useLocation.mockImplementation(() => {
      return {
        pathname: "/sub_teams",
      };
    });
    ReactRouterDom.useParams.mockImplementation(() => {
      return {
        teamOid: "",
      };
    });
    render(<NavigationProgression />, null, { store: mockStates });
  });
  test("render NavigationProgression component and try to access list of roles page for testing", () => {
    ReactRouterDom.useLocation.mockImplementation(() => {
      return {
        pathname: "/roles",
        state: {
          roleDiplayName: "",
        },
      };
    });
    ReactRouterDom.useParams.mockImplementation(() => {
      return {
        roleOid: "",
      };
    });
    render(<NavigationProgression />, null, { store: mockStates });
  });
  test("render NavigationProgression component and try to access a role page for testing", () => {
    ReactRouterDom.useLocation.mockImplementation(() => {
      return {
        pathname: "/roles",
        state: {
          roleDiplayName: "",
        },
      };
    });
    ReactRouterDom.useParams.mockImplementation(() => {
      return {
        roleOid: mockRole.oid,
      };
    });
    render(<NavigationProgression />, null, { store: mockStates });
  });
  test("render NavigationProgression component and try to access a permissions page of role for testing", () => {
    ReactRouterDom.useLocation.mockImplementation(() => {
      return {
        pathname: `/roles/${mockRole.oid}/permissions`,
        state: {
          roleDiplayName: "",
        },
      };
    });
    ReactRouterDom.useParams.mockImplementation(() => {
      return {
        roleOid: mockRole.oid,
      };
    });
    render(<NavigationProgression />, null, { store: mockStates });
  });
  test("render NavigationProgression component and try to access waiting cases page for testing", () => {
    ReactRouterDom.useLocation.mockImplementation(() => {
      return {
        pathname: "/user_cases",
        state: {
          roleDiplayName: "",
        },
      };
    });
    ReactRouterDom.useParams.mockImplementation(() => {
      return {
        teamOid: "",
        roleOid: "",
      };
    });
    render(<NavigationProgression />, null, { store: mockStates });
  });
  test("render NavigationProgression component and try to access user infos page for testing", () => {
    ReactRouterDom.useLocation.mockImplementation(() => {
      return {
        pathname: "/user_infos",
        state: {
          roleDiplayName: "",
        },
      };
    });
    ReactRouterDom.useParams.mockImplementation(() => {
      return {
        teamOid: "",
        roleOid: "",
      };
    });
    render(<NavigationProgression />, null, { store: mockStates });
  });
  test("render NavigationProgression component and try to access user autorizations page for testing", () => {
    ReactRouterDom.useLocation.mockImplementation(() => {
      return {
        pathname: "/user_autorizations",
      };
    });
    render(<NavigationProgression />, null, { store: mockStates });
  });
  test("render NavigationProgression component and try to access dashboard page for testing", () => {
    ReactRouterDom.useLocation.mockImplementation(() => {
      return {
        pathname: "/dashboard",
        state: {
          roleDiplayName: "",
        },
      };
    });
    ReactRouterDom.useParams.mockImplementation(() => {
      return {
        teamOid: "",
        roleOid: "",
      };
    });
    render(<NavigationProgression />, null, { store: mockStates });
  });
  test("render NavigationProgression component and try to access portfolio page for testing", () => {
    ReactRouterDom.useLocation.mockImplementation(() => {
      return {
        pathname: "/portfolios",
      };
    });
    ReactRouterDom.useParams.mockImplementation(() => {
      return {
        portfolioOid: "",
      };
    });

    render(<NavigationProgression />, null, mockStates);
  });
  test("render NavigationProgression component and try to access portfolio page for testing", () => {
    ReactRouterDom.useLocation.mockImplementation(() => {
      return {
        pathname: "/portfolios",
      };
    });
    ReactRouterDom.useParams.mockImplementation(() => {
      return {
        portfolioOid: "75296e99-216c-4498-8cd0-15b1cae1dc5b",
      };
    });
    render(<NavigationProgression />, null, mockStates);
  });
});
