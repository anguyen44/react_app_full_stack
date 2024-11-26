import UserService from "shared/services/user/user.service";
import { render } from "test/utils";
import { userReducerData } from "views/dashboardView/dashboardView.test.js";

import UserInfosView from "./userInfos.view";

jest.mock("../../shared/services/user/user.service", () => {
  return {
    getProfilInfos: jest.fn(),
  };
});

describe("test profilInfos component", () => {
  test("Testing UserInfosView component and getProfilInfos api with success and user status is disabled", () => {
    render(<UserInfosView />, null, {
      store: {
        userReducer: {
          ...userReducerData,
          ...{
            user: {
              nni: "administrator",
              name: "Midpoint",
              givenName: "Administrateur",
              email: "abc@g.enedis.fr",
              isActive: false,
              lastSuccessfulLogin: "31 juillet 2023",
              lastFailedLogin: "31 juillet 2023",
              lastModifyPassword: "31 juillet 2023",
              deleted: false,
            },
          },
        },
      },
    });
  });
  test("Testing UserInfosView component and getProfilInfos api with success and user status is enabled", () => {
    render(<UserInfosView />, null, {
      store: {
        userReducer: {
          ...userReducerData,
          ...{
            user: {
              nni: "administrator",
              name: "Midpoint",
              givenName: "Administrateur",
              email: "abc@g.enedis.fr",
              isActive: true,
              lastSuccessfulLogin: "31 juillet 2023",
              lastFailedLogin: "31 juillet 2023",
              lastModifyPassword: "31 juillet 2023",
              deleted: false,
            },
          },
        },
      },
    });
  });
  test("Testing UserInfosView component and getProfilInfos api with failure", () => {
    UserService.getProfilInfos.mockImplementation(() =>
      Promise.reject({ error: "failure error" }),
    );
    // jest
    //   .spyOn(UserService, "getProfilInfos") //1st param can be path or parent instance of child method which we want to mock
    //   .mockRejectedValue({
    //     error: "errors",
    //   });
    render(<UserInfosView />);
  });
});
