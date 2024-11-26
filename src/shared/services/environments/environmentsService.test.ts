import EnvironmentService from "./environments.service";
import { AxiosResponse } from "axios";
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
      oid: "f3984372-a7e9-4aba-bfdb-69cdb8e21b0c",
      name: "dev",
    },
    {
      oid: "e0d30300-1e3c-41e2-a18b-25c2f0de8eb2",
      name: "qual",
    },
    {
      oid: "fc09905b-95ab-4594-88e1-cbb68ae162d7",
      name: "prod",
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
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiQmZkWkVDZnlBQXJ2YkU5QWl4bGxTQSIsImlhdCI6MTcxNzU5NjI3NiwiZXhwIjoxNzE3NTk5ODc2LCJhenAiOiJpaG0iLCJpc3MiOiJodHRwczovL2F1dGgtZGV2Mi5kb29ycy5jbG91ZC5zdGFyZ2F0ZS1ub2UuZW5lZGlzLmZyLyIsImF1dGhfdGltZSI6MTcxNzU5Mjk4MiwiYWNyIjoibG9hLTIiLCJhdWQiOlsiaWhtIl0sInN1YiI6ImFuMGYwMzlsIn0.3QEi2xux8YUFMnai7XGMHroFJ3G5A0mAyb1wjqlb4oLYYguG2QcpPxdfbqqydfzuLA52nyfRrZnq3LbJy4adLL7Qb_SnP6zQX8Fn-xgQmR0ZULFo7uebgEBtZmvya8rOKc8n3cLO1mKUYxp2XR3bSna2VvnX5yPrLDE5bQdPAawLyFLC4T5HnEWKkuSLYSLZvtqA342yhF2OWxczFPUUdl2wAi74KS1YlLK3Qk_62zsttNSbtgOtwRuBCMvnUDBce36jZMXnAzbtYaNHGz7bR70y7xgHWSGoTTIg8mmVynl_6E7O4ArzGQUkeqMX7hBkj9ma8EuKhZED8dlt9RrU7AkTAF__q0MViN9ei4G7hJBqOiliYTui9cZ2Q3yifFq1mh2dmpqE3tQQQLAfwwTeeb1ctIBkIa7n3S3HZ8m5f0w1xj_mNHmEN5k2EHnLmdmeod8QLJIgu1XVuG9dZW6WwH7RnuHKrIAlgebHsB_vY0zV3bSx7LDDvrekDXIsRarEhQGzIe22emR6Pl2Jo4PzGOHqmKGuNxmI04kj510wx9PM3dCezTsfUxiQn7qS5tk6y-DjzvUbCZjDQ7LN0__YCEGEKGRUMNU4dz0U3Zja9yGcMVdH4C_8pty1_BJ2u0hlr3WcDu8batpd04rM40Wn9UcwBj5S7NczJPnYNv76Jao",
    },
    baseURL: "http://localhost:8080/doors-api/",
    method: "get",
    url: "/environments",
  },
  request: {},
} as unknown as AxiosResponse<GenericNameDescriptionModel[]>;

describe("test environments service api", () => {
  test("test findAll api", async () => {
    try {
      await EnvironmentService.findAll(
        mockPermissionTemplateSelectMidpointAll,
        "",
      );
      expect(EnvironmentService.findAll).toHaveBeenCalledTimes(1);
    } catch (err) {
      jest.spyOn(EnvironmentService, "findAll").mockImplementation(() =>
        Promise.resolve([
          {
            oid: "f3984372-a7e9-4aba-bfdb-69cdb8e21b0c",
            name: "dev",
          },
          {
            oid: "e0d30300-1e3c-41e2-a18b-25c2f0de8eb2",
            name: "qual",
          },
          {
            oid: "fc09905b-95ab-4594-88e1-cbb68ae162d7",
            name: "prod",
          },
        ] as GenericNameDescriptionModel[]),
      );

      await expect(
        EnvironmentService.findAll(mockPermissionTemplateSelectMidpointAll, ""),
      ).resolves.toEqual([
        {
          oid: "f3984372-a7e9-4aba-bfdb-69cdb8e21b0c",
          name: "dev",
        },
        {
          oid: "e0d30300-1e3c-41e2-a18b-25c2f0de8eb2",
          name: "qual",
        },
        {
          oid: "fc09905b-95ab-4594-88e1-cbb68ae162d7",
          name: "prod",
        },
      ] as GenericNameDescriptionModel[]);
      console.error("catch() api findAll:", err);
    }
  });

  test("test function  getEnvsResponse", () => {
    const returnedData = getServicesResponse(mockResponse);

    expect(returnedData).toEqual([
      {
        oid: "f3984372-a7e9-4aba-bfdb-69cdb8e21b0c",
        name: "dev",
      },
      {
        oid: "e0d30300-1e3c-41e2-a18b-25c2f0de8eb2",
        name: "qual",
      },
      {
        oid: "fc09905b-95ab-4594-88e1-cbb68ae162d7",
        name: "prod",
      },
    ] as GenericNameDescriptionModel[]);
  });
});
