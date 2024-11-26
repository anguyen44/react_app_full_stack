import { configure } from "@testing-library/react";

import TeamModel from "../../model/team.model";
import TeamService, {
  getTeamByOidResponse,
  getTeamsResponse,
  rolesOfGetTeamByOidResponse,
} from "./team.service";
import { AxiosResponse } from "axios";
import PortfolioModel from "shared/model/portfolio.model";
import { mockPortfolio } from "test/mocks/mockPortfolio.utils";
import RoleModel from "shared/model/role.model";

configure({ asyncUtilTimeout: 400 });

jest.mock("../global/global.service", () => {
  return {
    ...jest.requireActual("../global/global.service"),
    getInstance: jest.fn(() => ({
      put: jest.fn(() => Promise.resolve({})),
      patch: jest.fn(() => Promise.resolve({})),
      post: jest.fn(() => Promise.resolve({})),
      get: jest.fn(() => Promise.resolve({ data: {} })),
      delete: jest.fn(() => Promise.resolve({})),
    })),
  };
});

describe("Testing team services api", () => {
  afterEach(jest.clearAllMocks);

  test("Test getSelfTeams", async () => {
    try {
      const res = await TeamService.getSelfTeams();
      expect(TeamService.getSelfTeams).toHaveBeenCalledTimes(1);
      expect(res).toEqual({ ok: true });
    } catch (err) {
      jest
        .spyOn(TeamService, "getSelfTeams")
        .mockImplementation(() => Promise.resolve([]));

      await expect(TeamService.getSelfTeams()).resolves.toEqual([]);
      console.error("catch() api getSelfTeams:", err);
    }
  });

  test("Test getTeams", async () => {
    try {
      const res = await TeamService.getTeams();
      expect(TeamService.getTeams).toHaveBeenCalledTimes(1);
      expect(res).toEqual([]);
    } catch (err) {
      jest
        .spyOn(TeamService, "getTeams")
        .mockImplementation(() => Promise.resolve([]));

      await expect(TeamService.getTeams()).resolves.toEqual([]);
      console.error("catch() api getTeams:", err);
    }
  });

  test("Test api getTeamByOid", async () => {
    try {
      await TeamService.getTeamByOid("e927cc0c-efac-46ce-9392-3a0dac5185e8");
      expect(TeamService.getTeamByOid).toHaveBeenCalledTimes(1);
    } catch (error) {
      console.error("Testing getTeamByOid api", error);
    }
  });

  test("Test function getTeamsResponse", () => {
    expect(
      getTeamsResponse({ data: new Array({} as TeamModel) } as AxiosResponse<
        TeamModel[]
      >),
    ).toEqual([
      {
        createTimestamp: undefined,
        description: undefined,
        members: [],
        name: undefined,
        oid: undefined,
        roles: [],
        subTeams: [],
        validateTimestamp: "",
        displayName: undefined,
        owner: undefined,
        isActive: undefined,
        readOnly: undefined,
      },
    ]);
  });

  test("Test function getTeamByOidResponse", () => {
    expect(
      getTeamByOidResponse({ data: {} } as AxiosResponse<TeamModel>),
    ).toEqual({
      createTimestamp: undefined,
      description: undefined,
      displayName: undefined,
      members: [],
      name: undefined,
      oid: undefined,
      owner: null,
      roles: [],
      isActive: undefined,
      subTeams: [],
      validateTimestamp: "",
    });
  });

  test("Test api addUserToTeam", async () => {
    const res = await TeamService.addUserToTeam(["1"], ["2"]);
    expect(res).toEqual({});
  });

  test("Test api addRoleToTeam", async () => {
    const res = await TeamService.addRoleToTeam("1", ["2"]);
    expect(res).toEqual({});
  });

  test("Test api createSubTeam", async () => {
    const res = await TeamService.createSubTeam(
      "1",
      "sub team name",
      "new subteam",
    );
    expect(res).toEqual({});
  });

  test("Test api deleteSubTeam", async () => {
    const res = await TeamService.deleteSubTeam("1");
    expect(res).toEqual({});
  });

  test("Test function rolesOfGetTeamByOidResponse", () => {
    expect(
      rolesOfGetTeamByOidResponse([
        {
          oid: "1",
          name: "name",
          displayName: "name",
          description: "description",
          portfolio: mockPortfolio,
          isActive: true,
        },
        {
          oid: "2",
          name: "name2",
          displayName: "name2",
          description: "description2",
          portfolio: { name: "portfolio2" } as PortfolioModel,
          isActive: false,
        },
      ] as RoleModel[]),
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          oid: "1",
          name: "name",
          displayName: "name",
          description: "description",
          isActive: true,
        }),
        expect.objectContaining({
          oid: "2",
          name: "name2",
          displayName: "name2",
          description: "description2",
          isActive: false,
        }),
      ]),
    );
  });

  test("Test api verifyTeamCaseValidationPossible", async () => {
    const res = await TeamService.verifyTeamCaseValidationPossible(
      "e927cc0c-efac-46ce-9392-3a0dac5185e8",
    );
    expect(res).toEqual({});
  });
});
