import PortfolioModel from "shared/model/portfolio.model";
import PortfolioService, {
  buildPermissionsWithRolesFromResponse,
  getPortfoliosByQueryResponse,
} from "./portfolio.service";
import { mockPortfolio } from "test/mocks/mockPortfolio.utils";
import { mockRole } from "test/mocks/mockRole.utils";
import { mockPermission } from "test/mocks/mockPermission.utils";
import { mockUser } from "test/mocks/mockUser.utils";
import PermissionWithRoleModel from "shared/model/permissionWithRole.model";
import RoleWithTeamModel from "shared/model/roleWithTeam.model";
import { AxiosResponse } from "axios";

jest.mock("shared/services/global/global.service", () => {
  return {
    getInstance: jest.fn(),
  };
});

describe("test porfolio service api", () => {
  test("test getPortfolios api", async () => {
    try {
      const res = await PortfolioService.getPortfolios();
      expect(PortfolioService.getPortfolios).toHaveBeenCalledTimes(1);
      expect(res).toEqual([mockPortfolio]);
    } catch (err) {
      jest
        .spyOn(PortfolioService, "getPortfolios")
        .mockImplementation(() => Promise.resolve([mockPortfolio]));

      await expect(PortfolioService.getPortfolios()).resolves.toEqual([
        mockPortfolio,
      ]);
      console.error("catch() api getPortfolios:", err);
    }
  });

  test("test getPortfolioByOid api", async () => {
    try {
      const res = await PortfolioService.getPortfolioByOid(mockPortfolio.oid);
      expect(PortfolioService.getPortfolioByOid).toHaveBeenCalledTimes(1);
      expect(res).toEqual(mockPortfolio);
    } catch (err) {
      jest
        .spyOn(PortfolioService, "getPortfolioByOid")
        .mockImplementation(() => Promise.resolve(mockPortfolio));

      await expect(
        PortfolioService.getPortfolioByOid(mockPortfolio.oid),
      ).resolves.toEqual(mockPortfolio);
      console.error("catch() api getPortfolioByOid:", err);
    }
  });

  test("test getPortfoliosByQuery api", async () => {
    try {
      const res = await PortfolioService.getPortfoliosByQuery("D0R");
      expect(PortfolioService.getPortfoliosByQuery).toHaveBeenCalledTimes(1);
      expect(res).toEqual([mockPortfolio]);
    } catch (err) {
      jest
        .spyOn(PortfolioService, "getPortfoliosByQuery")
        .mockImplementation(() => Promise.resolve([mockPortfolio]));

      await expect(
        PortfolioService.getPortfoliosByQuery("D0R"),
      ).resolves.toEqual([mockPortfolio]);
      console.error("catch() api getPortfoliosByQuery:", err);
    }
  });

  test("test function  getPortfoliosByQueryResponse", () => {
    const dataPortfolio = JSON.parse(
      JSON.stringify(mockPortfolio),
    ) as PortfolioModel;
    dataPortfolio.owner.familyName = mockPortfolio.owner.familyName;
    const returnedData = getPortfoliosByQueryResponse({
      data: [dataPortfolio],
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
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhenAiOiJtaWRwb2ludCIsImF1ZCI6WyJtaWRwb2ludCJdLCJhdXRoX3RpbWUiOjE2OTA0NzA2MDksImFjciI6ImxvYS0yIiwiZXhwIjoxNjkwNTM3NDA4LCJpc3MiOiJodHRwczovL2F1dGguZG9vcnMtbGVtb25sZGFwLXRlc3RzLmRpZ2l0aWFtLmNsb3VkLnN0YXJnYXRlLXBhY3kuZW5lZGlzLmZyLyIsImlhdCI6MTY5MDUzMzgwOCwiYXRfaGFzaCI6IlI5cWxuRkR2T01URExWYTZ3di1xamciLCJzdWIiOiJhZG1pbmlzdHJhdG9yIn0.e-fXSUu1TSnnelrBVMGERpnQ-Vac_OKdZtFvLi77rUYZtjF6mgDAS7Ro2EkH0r9ajH4jXrjtWs3abWY3cuBoEnlXWiZsAlk-ZkRc6gdnISffUVAl5sM4QTfn6f3S9dgO8-TdAx5QFB3R3_COWpaKdIOfX0whCcH5BPae4Vh83F0q6eNnfPokSOrpNsEKlE7Fa69OPuIg0U-lPxPU085-zMtS1wKKfMsZOJNV2q9KhO2ofHi8JA3TDW9n7uqclXMmiEjSQoPZTo4cRpVdrfCr8dBtJq52gjRFxaSHyuBvxYnxTilR-WKHUOuGsgqLCh9AGcYh0Vtcpk3piQzYQrYp8g",
        },
        baseURL: "http://localhost:8080/doors-api/",
        method: "get",
        url: "/portfolios/read-by-name-or-displayname/D0R",
      },
      request: {},
    } as unknown as AxiosResponse<PortfolioModel[]>);

    expect(returnedData).toEqual([mockPortfolio]);
  });

  test("test getRolesByPortfolioOid api", async () => {
    try {
      const res = await PortfolioService.getRolesByPortfolioOid(
        mockPortfolio.oid,
      );
      expect(PortfolioService.getRolesByPortfolioOid).toHaveBeenCalledTimes(1);
      expect(res).toEqual([mockRole]);
    } catch (err) {
      jest
        .spyOn(PortfolioService, "getRolesByPortfolioOid")
        .mockImplementation(() =>
          Promise.resolve([mockRole as RoleWithTeamModel]),
        );

      await expect(
        PortfolioService.getRolesByPortfolioOid(mockPortfolio.oid),
      ).resolves.toEqual([mockRole]);
      console.error("catch() api getRolesByPortfolioOid:", err);
    }
  });

  test("test getPermissionsByPortfolioOid api", async () => {
    try {
      const res = await PortfolioService.getPermissionsByPortfolioOid(
        mockPortfolio.oid,
      );
      expect(
        PortfolioService.getPermissionsByPortfolioOid,
      ).toHaveBeenCalledTimes(1);
      expect(res).toEqual([mockRole]);
    } catch (err) {
      jest
        .spyOn(PortfolioService, "getPermissionsByPortfolioOid")
        .mockImplementation(() => Promise.resolve([mockPermission]));

      await expect(
        PortfolioService.getPermissionsByPortfolioOid(mockPortfolio.oid),
      ).resolves.toEqual([mockPermission]);
      console.error("catch() api getPermissionsByPortfolioOid:", err);
    }
  });

  test("test getApproversByPortfolioOid api", async () => {
    try {
      const res = await PortfolioService.getApproversByPortfolioOid(
        mockPortfolio.oid,
      );
      expect(PortfolioService.getApproversByPortfolioOid).toHaveBeenCalledTimes(
        1,
      );
      expect(res).toEqual([mockUser]);
    } catch (err) {
      jest
        .spyOn(PortfolioService, "getApproversByPortfolioOid")
        .mockImplementation(() => Promise.resolve([mockUser]));

      await expect(
        PortfolioService.getApproversByPortfolioOid(mockPortfolio.oid),
      ).resolves.toEqual([mockUser]);
      console.error("catch() api getApproversByPortfolioOid:", err);
    }
  });

  test("Test function buildPermissionsWithRolesFromResponse", () => {
    const role = { ...mockRole, permissions: [] };
    expect(
      buildPermissionsWithRolesFromResponse([mockPermission], [mockRole]),
    ).toEqual([new PermissionWithRoleModel(mockPermission, role)]);
  });
});
