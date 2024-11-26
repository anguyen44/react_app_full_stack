import { format } from "date-fns";
import { DATE_TIME_FORMAT } from "shared/utils/global.utils";
import { mockRole } from "test/mocks/mockRole.utils";

import RoleService, {
  extractOwnerFromPortfolioInfo,
  extractOwnerFromRoleInfo,
  extractPortfolioFromRoleInfo,
  getAllRolesResponse,
  getRoleByOidResponse,
} from "./role.service";

const dateForTest = format(new Date(), DATE_TIME_FORMAT);
jest.mock("../global/global.service", () => {
  return {
    getInstance: jest.fn(() => ({
      patch: jest.fn().mockImplementation(() => Promise.resolve({})),
      get: jest.fn().mockImplementation(() => Promise.resolve({ ok: true })),
      post: jest.fn().mockImplementation(() => Promise.resolve({ ok: true })),
      put: jest.fn().mockImplementation(() => Promise.resolve({ ok: true })),
    })),
  };
});

describe("Testing role service", () => {
  test("testing getRolesByOid", async () => {
    try {
      const res = await RoleService.getRoleByOid(
        "e927cc0c-efac-46ce-9392-3a0dac5185e8",
      );
      expect(RoleService.getRoleByOid).toHaveBeenCalledTimes(1);
      expect(res).toEqual({ ok: true });
    } catch (err) {
      jest
        .spyOn(RoleService, "getRoleByOid")
        .mockImplementation(() => Promise.resolve({ ok: true }));

      await expect(
        RoleService.getRoleByOid("e927cc0c-efac-46ce-9392-3a0dac5185e8"),
      ).resolves.toEqual({ ok: true });
      console.error("catch() api getRoleByOid:", err);
    }
  });
  test("testing deleteRoleInTeamByOid", async () => {
    const res = await RoleService.deleteRoleInTeamByOid(
      "e927cc0c-efac-46ce-9392-3a0dac5185e8",
      "2a93d191-35d2-4d09-8c36-a2d9b8e9e7fb",
    );
    expect(res).toEqual({});
  });

  test("Testing function responseSearchPermissionByQuery with having permissions", () => {
    const data = getRoleByOidResponse({
      data: mockRole,
    });
    expect(data).toEqual({
      deleted: false,
      description: null,
      displayName: "CACCIA_ACCES_POD1",
      name: "000003-6YN-000002",
      oid: "7735af60-d9c5-4987-90a2-a961d5f4c3b6",
      permissions: [
        {
          deleted: false,
          description: null,
          name: "6YN-NULL_ZSEv2-ZA_POD1_Kyss-appli_Read",
          oid: "e13b1885-5e51-4d77-9762-b10de9de7286",
          isActive: true,
          perimeter: "6YN",
          subPerimeter: "NULL",
          zone: "ZSEv2-ZA",
          environment: "POD1",
          type: "Kyss",
          subType: "appli",
          value: "Read",
        },
      ],
      portfolio: {},
      isActive: true,
      createTimestamp: "2023-01-23T14:44:45.072+01:00",
      modifyTimestamp: "2023-01-23T14:44:45.072+01:00",
      owner: {},
    });
  });

  test("Testing function responseSearchPermissionByQuery with not having permissions", () => {
    const data = getRoleByOidResponse({
      data: {
        oid: "7735af60-d9c5-4987-90a2-a961d5f4c3b6",
        name: "000003-6YN-000002",
        displayName: "CACCIA_ACCES_POD1",
        createTimestamp: "2023-01-23T14:44:45.072+01:00",
        modifyTimestamp: "2023-01-23T14:44:45.072+01:00",
        isActive: true,
        description: null,
        portfolio: null,
        permissions: null,
        owner: null,
      },
    });
    expect(data).toEqual({
      deleted: false,
      description: null,
      displayName: "CACCIA_ACCES_POD1",
      name: "000003-6YN-000002",
      oid: "7735af60-d9c5-4987-90a2-a961d5f4c3b6",
      permissions: [],
      portfolio: {},
      isActive: true,
      createTimestamp: "2023-01-23T14:44:45.072+01:00",
      modifyTimestamp: "2023-01-23T14:44:45.072+01:00",
      owner: {},
    });
  });

  test("Testing createNewRole api for creating a new role", async () => {
    try {
      await RoleService.createNewRole(
        "roleDisplayName",
        "roleDescription",
        "portfolioName",
        "teamOid",
        "teamName",
      );
      expect(RoleService.createNewRole).toHaveBeenCalledTimes(1);
    } catch (error) {
      jest
        .spyOn(RoleService, "createNewRole")
        .mockImplementation(() => Promise.resolve({ data: true }));
      await expect(
        RoleService.createNewRole(
          "roleDisplayName",
          "roleDescription",
          "portfolioName",
          "teamOid",
          "teamName",
        ),
      ).resolves.toEqual({ data: true });
    }
  });

  test("test getSelfRoles api", async () => {
    try {
      await RoleService.getSelfRoles();
      expect(RoleService.getSelfRoles).toHaveBeenCalledTimes(1);
    } catch (err) {
      jest
        .spyOn(RoleService, "getSelfRoles")
        .mockImplementation(() => Promise.resolve({ data: "ok" }));

      await expect(RoleService.getSelfRoles()).resolves.toEqual({ data: "ok" });
      console.error("catch() api getSelfRoles:", err);
    }
  });

  test("test getAllRoles api get all role-teams items", async () => {
    try {
      await RoleService.getAllRoles();
      expect(RoleService.getAllRoles).toHaveBeenCalledTimes(1);
    } catch (err) {
      jest
        .spyOn(RoleService, "getAllRoles")
        .mockImplementation(() => Promise.resolve({ data: "ok" }));

      await expect(RoleService.getAllRoles()).resolves.toEqual({ data: "ok" });
      console.error("catch() api getAllRoles:", err);
    }
  });

  test("Testing function getAllRolesResponse ", () => {
    const data = getAllRolesResponse({
      data: [
        {
          team: {
            oid: "e827cc0c-efac-46ce-9392-3a0dac5185e8",
            name: "Administrateurs CACCIA",
          },
          roles: [
            {
              oid: "81a38333-d7d9-4698-8c48-f15f4ef6297e",
              name: "TEAM-000003-6YN-6BX88A",
              displayName: "CACCIA_ZCE_v2",
              createTimestamp: "2023-07-13T14:54:04.665+02:00",
              isActive: true,
              description: "description",
              portfolio: null,
              permissions: null,
            },
            {
              oid: "7735af60-d9c5-4987-90a2-a961d5f4c3b6",
              name: "000003-6YN-000002",
              displayName: "CACCIA_POD1",
              createTimestamp: "2023-07-12T12:37:27.159+02:00",
              isActive: true,
              description: "",
              portfolio: null,
              permissions: null,
            },
            {
              oid: "bf84d674-027f-4861-8429-d77ae46eb978",
              name: "000003-6YN-000001",
              displayName: "CACCIA_N3",
              createTimestamp: "2023-07-13T14:52:31.981+02:00",
              isActive: true,
              description: "description",
              portfolio: null,
              permissions: null,
            },
          ],
        },
        {
          teamOid: "157e9d3d-7446-4d47-a225-1a6c237f9cbc",
          teamName: "SOLSEC",
          roles: [],
        },
      ],
      status: 200,
      statusText: "",
      headers: {
        "content-type": "application/json",
      },
      config: {
        transitional: {
          silentJSONParsing: true,
          forcedJSONParsing: true,
          clarifyTimeoutError: false,
        },
        transformRequest: [null],
        transformResponse: [null],
        timeout: 0,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        maxContentLength: -1,
        maxBodyLength: -1,
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsibWlkcG9pbnQiXSwiYXpwIjoibWlkcG9pbnQiLCJpc3MiOiJodHRwczovL2F1dGguZG9vcnMtbGVtb25sZGFwLXRlc3RzLmRpZ2l0aWFtLmNsb3VkLnN0YXJnYXRlLXBhY3kuZW5lZGlzLmZyLyIsImF1dGhfdGltZSI6MTY5MDQ3MDYwOSwiZXhwIjoxNjkwNTQyMzExLCJhY3IiOiJsb2EtMiIsImF0X2hhc2giOiJTbG1kVzREQTB6YkxzNzJ0QWt2T1pRIiwiaWF0IjoxNjkwNTM4NzExLCJzdWIiOiJhZG1pbmlzdHJhdG9yIn0.hrwnlcMr38bGvWiLLmlL87qP8cD1eeABvWKuoSpNl790uPWubaX9VqXqAQUlSSiD63r-Ynl0s7O8MkvQaOI5GyIiwXyDO2SAmP1w2kRZUwRGkLdI4_DR5oPQUz1Dd0STwGtMAVzUJSIDAw_0IOivCnl3zja-r9vCZTSuh86paQEeBfhxtkxDfQ47UWwFlX2-lDzLY15ZfswuSLKl82MT5cs_hDDxO8j5Ee3MhoQaDTD2ySV9tyqLq3tgDtOdmAedHbIvm_XiLR-SWYsTvUNwA3VjcvCyMBg7HVQiY-CNQ028vmFmN76lKgzoVKbredtCuvTaMqOOA0pc7PihuF7Vug",
        },
        baseURL: "http://localhost:8080/doors-api/",
        method: "get",
        url: "/users/self-teams-roles",
      },
      request: {},
    });

    expect(data).toEqual([
      {
        deleted: false,
        teamOid: "e827cc0c-efac-46ce-9392-3a0dac5185e8",
        teamDisplayName: undefined,
        oid: "81a38333-d7d9-4698-8c48-f15f4ef6297e",
        name: "TEAM-000003-6YN-6BX88A-e827cc0c-efac-46ce-9392-3a0dac5185e8",
        displayName: "CACCIA_ZCE_v2",
        description: "description",
        portfolio: {},
        isActive: true,
      },
      {
        deleted: false,
        teamOid: "e827cc0c-efac-46ce-9392-3a0dac5185e8",
        teamDisplayName: undefined,
        oid: "7735af60-d9c5-4987-90a2-a961d5f4c3b6",
        name: "000003-6YN-000002-e827cc0c-efac-46ce-9392-3a0dac5185e8",
        displayName: "CACCIA_POD1",
        description: "",
        portfolio: {},
        isActive: true,
      },
      {
        deleted: false,
        teamOid: "e827cc0c-efac-46ce-9392-3a0dac5185e8",
        teamDisplayName: undefined,
        oid: "bf84d674-027f-4861-8429-d77ae46eb978",
        name: "000003-6YN-000001-e827cc0c-efac-46ce-9392-3a0dac5185e8",
        displayName: "CACCIA_N3",
        description: "description",
        portfolio: {},
        isActive: true,
      },
    ]);
  });

  test("Testing function extractOwnerFromPortfolioInfo", () => {
    const noTestData = extractOwnerFromPortfolioInfo(null);
    expect(noTestData).toEqual({});

    const testData = extractOwnerFromPortfolioInfo({
      oid: "3f23107a-c25c-49a6-ac0b-5b4c5fb2e0ff",
      name: "6YN",
      displayName: "6YN",
      description: "CACCIA",
      owner: {
        oid: "5f677741-7618-41d8-aa7c-24ab95c79934",
        nni: "A66978",
        givenName: "Vivien",
        email: "vivien.duflot@enedis.fr",
        familyName: "DUFLOT",
        fullName: "Vivien DUFLOT",
        isActive: false,
      },
    });
    expect(testData).toEqual({
      deleted: false,
      description: null,
      email: "vivien.duflot@enedis.fr",
      fullName: "Vivien DUFLOT",
      givenName: "Vivien",
      lastFailedLogin: dateForTest,
      lastModifyPassword: dateForTest,
      lastSuccessfulLogin: dateForTest,
      name: "DUFLOT",
      familyName: "DUFLOT",
      nni: "A66978",
      oid: "5f677741-7618-41d8-aa7c-24ab95c79934",
      isActive: false,
    });
  });

  test("Testing function extractOwnerFromRoleInfo", () => {
    const noTestData = extractOwnerFromRoleInfo(null);
    expect(noTestData).toEqual({});

    const testData = extractOwnerFromRoleInfo({
      oid: "bf84d674-027f-4861-8429-d77ae46eb978",
      name: "000003-6YN-000001",
      displayName: "CACCIA_N3",
      createTimestamp: "2023-07-13T14:52:31.981+02:00",
      isActive: true,
      description: "description",
      portfolio: {
        oid: "3f23107a-c25c-49a6-ac0b-5b4c5fb2e0ff",
        name: "6YN",
        displayName: "6YN",
        description: "CACCIA",
        owner: {
          oid: "5f677741-7618-41d8-aa7c-24ab95c79934",
          nni: "A66978",
          givenName: "Vivien",
          email: "vivien.duflot@enedis.fr",
          familyName: "DUFLOT",
          fullName: "Vivien DUFLOT",
          isActive: true,
        },
      },
      owner: {
        oid: "c0ed754f-851f-4555-965d-96ea63d784dd",
        nni: "SGDDE25N",
        givenName: "Sebastien",
        email: "sebastien-externe.gaspard@enedis.fr",
        familyName: "GASPARD",
        fullName: "Sebastien GASPARD",
        isActive: true,
      },
      permissions: [],
    });
    expect(testData).toEqual({
      deleted: false,
      description: null,
      email: "sebastien-externe.gaspard@enedis.fr",
      fullName: "Sebastien GASPARD",
      givenName: "Sebastien",
      familyName: "GASPARD",
      lastFailedLogin: dateForTest,
      lastModifyPassword: dateForTest,
      lastSuccessfulLogin: dateForTest,
      name: "GASPARD",
      nni: "SGDDE25N",
      oid: "c0ed754f-851f-4555-965d-96ea63d784dd",
      isActive: true,
    });
  });

  test("Testing function extractPortfolioFromRoleInfo", () => {
    const noTestData = extractPortfolioFromRoleInfo(null);
    expect(noTestData).toEqual({});

    const testData = extractPortfolioFromRoleInfo({
      oid: "bf84d674-027f-4861-8429-d77ae46eb978",
      name: "000003-6YN-000001",
      displayName: "CACCIA_N3",
      createTimestamp: "2023-07-13T14:52:31.981+02:00",
      isActive: true,
      description: "description",
      portfolio: {
        oid: "3f23107a-c25c-49a6-ac0b-5b4c5fb2e0ff",
        name: "6YN",
        displayName: "6YN",
        description: "CACCIA",
        isActive: true,
        owner: {
          oid: "5f677741-7618-41d8-aa7c-24ab95c79934",
          nni: "A66978",
          givenName: "Vivien",
          email: "vivien.duflot@enedis.fr",
          familyName: "DUFLOT",
          fullName: "Vivien DUFLOT",
          isActive: true,
        },
      },
      owner: {
        oid: "c0ed754f-851f-4555-965d-96ea63d784dd",
        nni: "SGDDE25N",
        givenName: "Sebastien",
        email: "sebastien-externe.gaspard@enedis.fr",
        familyName: "GASPARD",
        fullName: "Sebastien GASPARD",
        isActive: true,
      },
      permissions: [],
    });
    expect(testData).toEqual({
      description: "CACCIA",
      displayName: "6YN",
      name: "6YN",
      oid: "3f23107a-c25c-49a6-ac0b-5b4c5fb2e0ff",
      isActive: true,
      owner: {
        deleted: false,
        description: null,
        email: "vivien.duflot@enedis.fr",
        fullName: "Vivien DUFLOT",
        givenName: "Vivien",
        familyName: "DUFLOT",
        lastFailedLogin: dateForTest,
        lastModifyPassword: dateForTest,
        lastSuccessfulLogin: dateForTest,
        name: "DUFLOT",
        nni: "A66978",
        oid: "5f677741-7618-41d8-aa7c-24ab95c79934",
        isActive: true,
      },
    });
  });
});
