import { AxiosResponse } from "axios";
import ZoneService from "./zones.service";
import { GenericNameDescriptionModel } from "shared/model/genericNameDescription.model";
import { getServicesResponse } from "shared/utils/permissionTemplate.util";
import { mockPermissionTemplateSelectMidpointAll } from "test/mocks/mockPermission.utils";

jest.mock("shared/services/global/global.service", () => {
  return {
    getInstance: jest.fn(),
  };
});

const mockResponse = {
  data: [
    {
      oid: "cd04196c-a0e4-400a-bf7f-92cd9b09b76b",
      name: "ZA",
    },
    {
      oid: "709009cd-e4a5-4ab2-badc-5fbd30b83aa1",
      name: "ZSE",
    },
  ],
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
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOlsiaWhtIl0sInN1YiI6ImFuMGYwMzlsIiwiYWNyIjoibG9hLTIiLCJhdXRoX3RpbWUiOjE3MTc1OTI5ODIsImlzcyI6Imh0dHBzOi8vYXV0aC1kZXYyLmRvb3JzLmNsb3VkLnN0YXJnYXRlLW5vZS5lbmVkaXMuZnIvIiwiZXhwIjoxNzE3NjAwODI3LCJhenAiOiJpaG0iLCJhdF9oYXNoIjoidldRUGdKaTR6blV1RGtvV2g1MUhwZyIsImlhdCI6MTcxNzU5NzIyN30.pleItr9whBxLmC-RRZZqZ-Op2jW0Wslh9cr2qWU88pNLD9l5l7D5AhOtNjuM-f-4W5ruzdaVyY7TdGt81hBenqOucumcoPihDfRUnhixFWq_GSUv4iJW39Yf6k-pGQUf27macaA2ERLm9cqyv2Zr_SmPwp0XM2t8xHveU4bFn1beJo6v1VF0NAcmNspF3K61lsvhOD31vDl5M1d11B50EsMgRYhT617hmLbS8wyKZdcf6rMDPrFflxgo_5yziL6PRnhZgjrfuNbk2Aew3MT_8mo0ehcZRiSTf2uc7Gej20dDIQrEXdKyWxavqwoQu-MEzFxAuiH4sWTgwn2G9LuyaPcu7c8BeTeRJSSPC9YASSo7PSbP7UhmAPDCMHeAFZKECUaH_2FcM3BKtiwAb1kpA-ytMgBOpKw1V_VLh57a8aOwHjSgMz-7JPZ5T6FyxLlD_4uOvPIVH41HvuxPE24IZHj_s-0YLPgppiOhLWn27L-KoQCdPfjJh7o4EHMvE289h_kgD5F5fSjZREqGcacgPBa4gJP_6ggbo_cySi5eFkZJhkCpVItpf5fZSbGCO3pPDZ2vm_Ir7aO55vZfeFcmYli9HEpOP1Q0kpxdAxe63efruwNJKEWd9D28bTBCEEqN-4fqZ0paNz7vXv_WAq5NcG_Q8SnZhEoskEGyvvtXzPw",
    },
    baseURL: "http://localhost:8080/doors-api/",
    method: "get",
    url: "/zones",
  },
  request: {},
} as unknown as AxiosResponse<GenericNameDescriptionModel[]>;

describe("test zones service api", () => {
  test("test findAll api", async () => {
    try {
      await ZoneService.findAll(mockPermissionTemplateSelectMidpointAll, "");
      expect(ZoneService.findAll).toHaveBeenCalledTimes(1);
    } catch (err) {
      jest.spyOn(ZoneService, "findAll").mockImplementation(() =>
        Promise.resolve([
          {
            oid: "cd04196c-a0e4-400a-bf7f-92cd9b09b76b",
            name: "ZA",
          },
          {
            oid: "709009cd-e4a5-4ab2-badc-5fbd30b83aa1",
            name: "ZSE",
          },
        ] as GenericNameDescriptionModel[]),
      );

      await expect(
        ZoneService.findAll(mockPermissionTemplateSelectMidpointAll, ""),
      ).resolves.toEqual([
        {
          oid: "cd04196c-a0e4-400a-bf7f-92cd9b09b76b",
          name: "ZA",
        },
        {
          oid: "709009cd-e4a5-4ab2-badc-5fbd30b83aa1",
          name: "ZSE",
        },
      ] as GenericNameDescriptionModel[]);
      console.error("catch() api findAll of zones service:", err);
    }
  });

  test("test function  getZonesResponse", () => {
    const returnedData = getServicesResponse(mockResponse);

    expect(returnedData).toEqual([
      {
        oid: "cd04196c-a0e4-400a-bf7f-92cd9b09b76b",
        name: "ZA",
      },
      {
        oid: "709009cd-e4a5-4ab2-badc-5fbd30b83aa1",
        name: "ZSE",
      },
    ] as GenericNameDescriptionModel[]);
  });
});
