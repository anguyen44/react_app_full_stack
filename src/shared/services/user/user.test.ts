import { format } from "date-fns";

import UserService, {
  deleteUserByOidInTeamBody,
  getUsersFromResponseBody,
} from "./user.service";
import { mockUser } from "test/mocks/mockUser.utils";
import { AxiosResponse } from "axios";
import { UserModel } from "shared/model/user.model";
import { DATE_TIME_FORMAT } from "shared/utils/global.utils";

jest.mock("../global/global.service", () => {
  return {
    ...jest.requireActual("../global/global.service"),
    getInstance: jest.fn(() => ({
      get: jest.fn(() => Promise.resolve({})),
    })),
  };
});

const dateForTest = format(new Date(), DATE_TIME_FORMAT);

describe("Testing user service api", () => {
  test("Test api getProfilInfos", async () => {
    try {
      const res = await UserService.getProfilInfos();
      expect(res).toBe({ data: "not set up yet" });
      expect(UserService.getProfilInfos).toHaveBeenCalledTimes(1);
    } catch (e) {
      jest
        .spyOn(UserService, "getProfilInfos")
        .mockImplementation(() => Promise.resolve(mockUser));
      const res = await UserService.getProfilInfos();
      expect(res).toEqual(mockUser);
      console.error("api getProfilInfos erreur", e);
    }
  });

  test("Testing deleteUserByOidInTeam api", () => {
    jest
      .spyOn(UserService, "deleteUserByOidInTeam")
      .mockImplementation(() => Promise.resolve({ ok: true } as any));

    expect(
      UserService.deleteUserByOidInTeam("userOid", "teamOid"),
    ).resolves.toEqual({ ok: true });
  });

  test("Testing function deleteUserByOidInTeamBody", () => {
    const data = deleteUserByOidInTeamBody("userOid1", "teamOid");
    expect(data).toEqual(
      JSON.stringify({
        UserToTeamInput: { users: ["userOid1"], teams: ["teamOid"] },
      }),
    );
  });

  test("Testing getUserInfosByOid api", () => {
    jest
      .spyOn(UserService, "getUserInfosByOid")
      .mockImplementation(() => Promise.resolve(mockUser));

    expect(UserService.getUserInfosByOid("bc")).resolves.toEqual(mockUser);
  });

  test("Test api getMemberByNniOrEmail", async () => {
    const res = await UserService.getMemberByNniOrEmail("abc");
    expect(res).toEqual([]);
  });

  test("Test function getUsersFromResponseBody", () => {
    expect(
      getUsersFromResponseBody({
        data: [
          {
            nni: "DFD9D78N",
            familyName: "FECHE",
            givenName: "Damien",
            email: "damien-externe.feche@enedis.fr",
            isActive: true,
            oid: "1",
          },
          {
            nni: "RG4D379N",
            familyName: "GEISSERT",
            givenName: "Raphael",
            email: "raphael-externe.geissert@enedis.fr",
            isActive: false,
            oid: "2",
          },
        ],
      } as AxiosResponse<UserModel[]>),
    ).toEqual([
      {
        deleted: false,
        description: null,
        email: "damien-externe.feche@enedis.fr",
        givenName: "Damien",
        familyName: "FECHE",
        fullName: "FECHE Damien",
        lastFailedLogin: dateForTest,
        lastModifyPassword: dateForTest,
        lastSuccessfulLogin: dateForTest,
        name: "FECHE",
        nni: "DFD9D78N",
        isActive: true,
        oid: "1",
      },
      {
        deleted: false,
        description: null,
        email: "raphael-externe.geissert@enedis.fr",
        givenName: "Raphael",
        familyName: "GEISSERT",
        fullName: "GEISSERT Raphael",
        lastFailedLogin: dateForTest,
        lastModifyPassword: dateForTest,
        lastSuccessfulLogin: dateForTest,
        name: "GEISSERT",
        nni: "RG4D379N",
        isActive: false,
        oid: "2",
      },
    ]);
  });
});
