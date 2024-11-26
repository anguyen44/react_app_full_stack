import PermissionModel, {
  getInfosPermissionFromName,
} from "shared/model/permission.model";

import PermissionService, {
  getPermissionByQueryResponse,
} from "./permission.service";
import { AxiosResponse } from "axios";

jest.mock("../global/global.service", () => {
  return {
    ...jest.requireActual("../global/global.service"),
    getInstance: jest.fn(() => ({
      patch: jest.fn(() => Promise.resolve({ ok: true })),
    })),
  };
});

describe("Testing permission services api", () => {
  test("Testing function getPermissionByQueryResponse", () => {
    const data = getPermissionByQueryResponse({
      data: [
        {
          oid: "e13b1885-5e51-4d77-9762-b10de9de7286",
          name: "6YN_ZSEv2-ZA_POD1_Kyss-appli_Read",
          isActive: true,
          description: null,
        },
      ],
    } as AxiosResponse<PermissionModel[]>);
    expect(data).toEqual([
      {
        deleted: false,
        description: null,
        name: "6YN_ZSEv2-ZA_POD1_Kyss-appli_Read",
        oid: "e13b1885-5e51-4d77-9762-b10de9de7286",
        isActive: true,
        ...getInfosPermissionFromName("6YN_ZSEv2-ZA_POD1_Kyss-appli_Read"),
      },
    ]);
  });

  test("Testing addPermissionsToRole", () => {
    expect(
      PermissionService.addPermissionsToRole("roleOid", [
        "permissionOid1",
        "permissionOid2",
      ]),
    ).resolves.toEqual({ ok: true });
  });

  test("Testing deletePermissionInRoleByOid", () => {
    expect(
      PermissionService.deletePermissionInRoleByOid(
        ["permissionOid1", "permissionOid2"],
        "roleOid",
      ),
    ).resolves.toEqual({ ok: true });
  });
});
