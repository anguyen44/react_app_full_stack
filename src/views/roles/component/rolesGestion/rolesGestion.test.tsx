import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import RoleService from "shared/services/role/role.service";
import { render } from "test/utils";

import RolesGestion from "./rolesGestion.component";
import { AxiosResponse } from "axios";
import TeamRoleModel from "shared/model/teamRole.model";
import {
  PORTFOLIO_ASSOCIATED,
  TEAM_ASSOCIATED,
} from "shared/config/constants/properties.config";

jest.mock("shared/services/role/role.service", () => {
  return {
    deleteRoleInTeamByOid: jest.fn(),
    getAllRoles: jest.fn(),
  };
});

const reduxMockState = {
  rolePageReducer: {
    baseInfo: {
      deleted: false,
      oid: "ff650ba8-177d-4f9d-a4c5-ae3b12e22624",
      name: "Role-00003-D0R-64G98P",
      displayName: "role_sans_validation",
      description: "test 444",
      portfolio: {
        oid: "1e381534-42f5-48e5-a3ed-c6ea59ec31da",
        name: "D0R",
        displayName: "D0R",
        description: "Actifs de DOORS",
        owner: {
          deleted: false,
          oid: "d147ba23-725d-41b4-b7d3-29e518e89059",
          nni: "FK7EFE5N",
          name: "KOUYATE",
          givenName: "FADJIMBA",
          email: "fadjimba-externe.kouyate@enedis.fr",
          isActive: false,
          lastSuccessfulLogin: "12/03/2024",
          lastFailedLogin: "12/03/2024",
          lastModifyPassword: "12/03/2024",
          description: null,
          fullName: "KOUYATE FADJIMBA",
        },
      },
      isActive: true,
      createTimestamp: "2024-01-24T10:18:46.552+01:00",
      modifyTimestamp: "2024-01-24T10:18:52.306+01:00",
      owner: {
        deleted: false,
        oid: "93265e94-ac17-458e-b0d5-a81dd7c08c66",
        nni: "JW1E54EL",
        name: "WILDENBERG",
        givenName: "JULIA",
        email: "julia-externe.wildenberg@enedis.fr",
        isActive: false,
        lastSuccessfulLogin: "12/03/2024",
        lastFailedLogin: "12/03/2024",
        lastModifyPassword: "12/03/2024",
        description: null,
        fullName: "JULIA WILDENBERG",
      },
    },
    permissions: [],
  },
};

const mock_roles = [
  {
    deleted: false,
    teamOid: "254785df-f081-4e91-9bc6-bded6743cff9",
    teamDisplayName: "KSS - Team",
    oid: "8d006258-cd2b-4d2e-80ff-973add458258",
    name: "Role-00004-KSS-6RFE2Y-254785df-f081-4e91-9bc6-bded6743cff9",
    displayName: "Role-Kyss-01",
    description: "role test 01",
    portfolio: {
      oid: "6a5d636c-095c-4367-9387-86492db53231",
      name: "KSS",
      displayName: "KYSS",
      description: null,
      owner: {
        deleted: false,
        lastSuccessfulLogin: "14/06/2024",
        lastFailedLogin: "14/06/2024",
        lastModifyPassword: "14/06/2024",
      },
    },
    isActive: true,
    teamRoleAssociate: TEAM_ASSOCIATED,
  },
  {
    deleted: false,
    teamOid: "c31990a6-e2aa-4ae6-83d0-8299a9ff87fe",
    teamDisplayName: "YMC - Team",
    oid: "8ae628ce-9a64-41eb-8089-6d5268a97684",
    name: "Role-00007-02H-T0XKLO-c31990a6-e2aa-4ae6-83d0-8299a9ff87fe",
    displayName: "Test Permission Role",
    description: "Role de création de permission",
    portfolio: {
      oid: "e82febaf-40d5-4cc4-840c-54ec33b456f3",
      name: "02H",
      displayName: "SIG Elec",
      description: null,
      owner: {
        deleted: false,
        lastSuccessfulLogin: "14/06/2024",
        lastFailedLogin: "14/06/2024",
        lastModifyPassword: "14/06/2024",
      },
    },
    isActive: true,
    teamRoleAssociate: PORTFOLIO_ASSOCIATED,
  },
  {
    deleted: false,
    teamOid: "c31990a6-e2aa-4ae6-83d0-8299a9ff87fe",
    teamDisplayName: "YMC - Team",
    oid: "1121d435-db90-4150-9108-44fe7b06f255",
    name: "Role-00007-D0R-HCXBVH-c31990a6-e2aa-4ae6-83d0-8299a9ff87fe",
    displayName: "Test Role",
    description: "test",
    portfolio: {
      oid: "75296e99-216c-4498-8cd0-15b1cae1dc5b",
      name: "D0R",
      displayName: "THE DOORS",
      description: null,
      owner: {
        deleted: false,
        lastSuccessfulLogin: "14/06/2024",
        lastFailedLogin: "14/06/2024",
        lastModifyPassword: "14/06/2024",
      },
    },
    isActive: true,
    teamRoleAssociate: TEAM_ASSOCIATED,
  },
  {
    deleted: false,
    teamOid: "ec46e1b5-99f6-40e9-bb3f-32385ee834d0",
    teamDisplayName: "D0R - TeamS",
    oid: "885bcd40-3659-41a5-8d75-69b0a18149ec",
    name: "Role-00001-D0R-GUZE17-ec46e1b5-99f6-40e9-bb3f-32385ee834d0",
    displayName: "Test FK",
    description: "Test FK 1",
    portfolio: {
      oid: "75296e99-216c-4498-8cd0-15b1cae1dc5b",
      name: "D0R",
      displayName: "THE DOORS",
      description: null,
      owner: {
        deleted: false,
        lastSuccessfulLogin: "14/06/2024",
        lastFailedLogin: "14/06/2024",
        lastModifyPassword: "14/06/2024",
      },
    },
    isActive: true,
    teamRoleAssociate: TEAM_ASSOCIATED,
  },
  {
    deleted: false,
    teamOid: "ec46e1b5-99f6-40e9-bb3f-32385ee834d0",
    teamDisplayName: "D0R - TeamS",
    oid: "7f076b1f-371e-47ef-8d4f-18cff0a8d82b",
    name: "Role-D0R-00001-ec46e1b5-99f6-40e9-bb3f-32385ee834d0",
    displayName: "DOORS management",
    description: null,
    portfolio: {
      oid: "75296e99-216c-4498-8cd0-15b1cae1dc5b",
      name: "D0R",
      displayName: "THE DOORS",
      description: null,
      owner: {
        deleted: false,
        lastSuccessfulLogin: "14/06/2024",
        lastFailedLogin: "14/06/2024",
        lastModifyPassword: "14/06/2024",
      },
    },
    isActive: true,
    teamRoleAssociate: TEAM_ASSOCIATED,
  },
] as TeamRoleModel[];

describe("test RolesGestion component", () => {
  beforeAll(() => {
    const getAllRolesMock = RoleService.getAllRoles as jest.MockedFunction<
      typeof RoleService.getAllRoles
    >;
    getAllRolesMock.mockImplementation(() => Promise.resolve(mock_roles));
  });

  test("render RolesGestion component", () => {
    render(<RolesGestion />, null, { store: reduxMockState });
  });

  test("render RolesGestion component and deleteRoleInTeamByOid api launched with failure", async () => {
    jest
      .spyOn(RoleService, "deleteRoleInTeamByOid")
      .mockRejectedValue({ error: "error" });

    render(<RolesGestion />, null, { store: reduxMockState });

    const confirmRemoveButton = await waitFor(() =>
      screen.getByTestId(`deleteRoleBtn-${mock_roles[0].oid}`),
    );
    act(() => {
      fireEvent.click(confirmRemoveButton);
    });
  });
});
