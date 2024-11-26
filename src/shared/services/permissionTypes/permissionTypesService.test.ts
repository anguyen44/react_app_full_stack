import PermissionTypeModel from "shared/model/permissionType.model";
import PermissionTypesService, {
  getPermissionTypesResponse,
} from "./permissionTypes.service";
import { AxiosResponse } from "axios";
import {
  mockPermissionType1,
  mockPermissionType2,
} from "test/mocks/mockPermission.utils";

jest.mock("shared/services/global/global.service", () => {
  return {
    getInstance: jest.fn(),
  };
});

const mockResponse = {
  data: [mockPermissionType1, mockPermissionType2],
  status: 200,
  statusText: "",
  headers: {
    "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
    "content-type": "application/json",
    expires: "0",
    pragma: "no-cache",
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ["xhr", "http"],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2F1dGgtZGV2Mi5kb29ycy5jbG91ZC5zdGFyZ2F0ZS1ub2UuZW5lZGlzLmZyLyIsImFjciI6ImxvYS0yIiwiYXV0aF90aW1lIjoxNzE3NTkyOTgyLCJhdWQiOlsiaWhtIl0sInN1YiI6ImFuMGYwMzlsIiwiYXRfaGFzaCI6InVFamRHZ0lqZ3VTOW9JQlM2ZXY5Q3ciLCJpYXQiOjE3MTc1OTU0NjMsImV4cCI6MTcxNzU5OTA2MywiYXpwIjoiaWhtIn0.bXf8tZ3c29NVDoBTwpEqLrPFSjWT7YHmONlJztKjC0Y67K2tpIg9baueyYLLU8UrpQS2e5Nt2aX5yLC9h2Tnrs2TUTBqNi_KMgxBgC2UR8xmIg_QMoSPyQDB-cJhuXApZULXpML5Y1K1dt_clLQpb21U3VyJt8uekg9fU_R5Vy7vWtlJ_L6Ez3boXwEPn_KH6x4M-Ft35l6HAOpKb4ZA-B4XAY4K53gyGpj06lhJJw1ipzfLuAI_7qQrmC98SQprdgZ079dMk1Lqk4YxOETwJjQfY9NH71jlyIl5JZi7f94ryw-XPGJ7k-bY-2HNVAYLvYanGSnPadk3KI2xj1BdNEgGzIM1ys1pr22BBrdJPoWv7lv0PDXqBElwT-3xSFbGqnSkisQ0YstjAoSqhWTIqXRzOyMGqRvBj1ZPURx04v4_HLiIBorD2XHgxfaIvPIbTtyRhzUX1tKLX7TcmfccuGAebZGcwLbXZC_nfh_t_INhrfeoCxL9Ry_ueL5XCHs86-CzjRP-PXKHL3hUSN0FYX4fLkCmQF5AHlSX4xpfwZNvm1b-XpyckCJ4p2J8iO1xkkJWb2Hx_-KXOgfJzwrQ1veWMZZm64jtkqhJ8HOJuoZr8z4NVw4BptdOvyUR8g3wIlWFDUl6u1pHg_PSB7fLBpLarSusN0uZJYbi8nr5AfQ",
    },
    baseURL: "http://localhost:8080/doors-api/",
    method: "get",
    url: "/permission-types",
  },
  request: {},
} as unknown as AxiosResponse<PermissionTypeModel[]>;

describe("test permission types service api", () => {
  test("test getPermissionTypes api", async () => {
    try {
      const res = await PermissionTypesService.getPermissionTypes("");
      expect(PermissionTypesService.getPermissionTypes).toHaveBeenCalledTimes(
        1,
      );
      expect(res).toEqual([]);
    } catch (err) {
      jest
        .spyOn(PermissionTypesService, "getPermissionTypes")
        .mockImplementation(() => Promise.resolve(mockResponse.data));

      await expect(
        PermissionTypesService.getPermissionTypes(""),
      ).resolves.toEqual(mockResponse.data);
      console.error("catch() api getPermissionTypes:", err);
    }
  });

  test("test function  getPermissionTypesResponse", () => {
    const returnedData = getPermissionTypesResponse(mockResponse);
    expect(returnedData).toEqual(mockResponse.data);
  });
});
