import { waitFor } from "@testing-library/react";
import UserService from "shared/services/user/user.service";
import { render } from "test/utils";

import UserItemView from "./UserItem.view";

jest.mock("shared/services/global/global.service", () => {
  return {
    getInstance: jest.fn(),
  };
});

describe("Testing UserInfosView component ", () => {
  test("with user Data", () => {
    jest.spyOn(UserService, "getUserInfosByOid").mockImplementation(() =>
      Promise.resolve({
        oid: "00000000-0000-0000-0000-000000000002",
        nni: "administrator",
        givenName: "Administrateur",
        email: "dsi-aude-digit-infra-iam@g.enedis.fr",
        familyName: "Midpoint",
        fullName: "Administrateur Midpoint",
      }),
    );
    waitFor(() => {
      render(<UserItemView />);
    });
  });
  test("with user Data", () => {
    jest
      .spyOn(UserService, "getUserInfosByOid")
      .mockImplementation(() => Promise.resolve(null));
    render(<UserItemView />);
  });
});
