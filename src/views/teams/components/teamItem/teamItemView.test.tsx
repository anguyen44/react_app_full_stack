import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import RoleService from "shared/services/role/role.service";
import UserService from "shared/services/user/user.service";
import { render } from "test/utils";
import { userReducerData } from "views/dashboardView/dashboardView.test.js";

import TeamItemComponent from "./TeamItem.component";
import { UserModel } from "shared/model/user.model";
import { Axios, AxiosResponse } from "axios";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
  useParams: jest.fn().mockReturnValue({ teamOid: "teamOid" }),
}));

jest.mock("shared/services/user/user.service", () => {
  return {
    deleteUserByOidInTeam: jest.fn(),
  };
});

jest.mock("shared/services/role/role.service", () => {
  return {
    deleteRoleInTeamByOid: jest.fn(),
    findSubTeamsForRole: jest.fn(),
  };
});

jest.mock("shared/services/global/global.service", () => {
  return {
    getInstance: jest.fn(),
  };
});

const mockUser = new UserModel(
  "G02471",
  "OUEDRAOGO",
  "Abdul rasmane a 2",
  "abdul-rasmane-a.ouedraogo@enedis.fr",
  true,
  "e201f906-75de-4eb9-bdf5-8591ed285b5v",
);

const mockUserDeleted = () => {
  const user = new UserModel(
    "G02470",
    "OUEDRAOGO",
    "Abdul rasmane a",
    "abdul-rasmane-a.ouedraogo@enedis.fr",
    true,
    "e201f906-75de-4eb9-bdf5-8591ed285b5b",
  );
  user.deleted = true;
  return user;
};

const data = {
  teamPageReducer: {
    changingInfo: {
      oid: "e827cc0c-efac-46ce-9392-3a0dac5185e8",
      displayName: "Administrateurs CACCIA 2",
      description: "Administrateurs de la Solution CACCIA",
    },
    isLoadingPage: false,
    readOnly: false,
    isWriting: false,
    searchedMembers: [],
    members: [mockUserDeleted(), mockUser],
    roles: [
      {
        oid: "1",
        name: "role_1",
        displayName: "role 1",
        description: "",
        portfolio: "",
        isActive: true,
        permissions: [],
        deleted: true,
      },
      {
        oid: "2",
        name: "role_2",
        displayName: "role 2",
        description: "",
        portfolio: "",
        isActive: true,
        permissions: [],
        deleted: false,
      },
    ],
    teamInfo: {
      oid: "e827cc0c-efac-46ce-9392-3a0dac5185e8",
      name: "TEAM-000003-000001",
      displayName: "Administrateurs CACCIA",
      createTimestamp: "2023-06-06T09:34:42.053+02:00",
      isActive: true,
      description: "Administrateurs de la Solution CACCIA",
      subTeams: null,
      members: [mockUserDeleted(), mockUser],
      roles: null,
    },
  },
  userReducer: userReducerData,
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
    permission: [],
  },
};

const deleteUserByOidInTeam =
  UserService.deleteUserByOidInTeam as jest.MockedFunction<
    typeof UserService.deleteUserByOidInTeam
  >;

const deleteRoleInTeamByOid =
  RoleService.deleteRoleInTeamByOid as jest.MockedFunction<
    typeof RoleService.deleteRoleInTeamByOid
  >;

describe("Testing TeamItemView Component", () => {
  beforeAll(() => {
    const findSubTeamsForRole =
      RoleService.findSubTeamsForRole as jest.MockedFunction<
        typeof RoleService.findSubTeamsForRole
      >;
    findSubTeamsForRole.mockImplementation(() => Promise.resolve([]));
  });

  test("Testing TeamItem View with mock data and deleteUserByOidInTeam launched with success", async () => {
    deleteUserByOidInTeam.mockImplementation(() =>
      Promise.resolve({ data: "ok" } as AxiosResponse<string>),
    );
    render(<TeamItemComponent />, null, { store: data });

    const removeMemberIcons = await waitFor(() =>
      screen.getAllByTestId(
        `deleteMemberBtn-${data.userReducer.teams[0].members[0].oid}`,
      ),
    );

    act(() => {
      fireEvent.click(removeMemberIcons[0]);
    });
  });
  test("Testing TeamItem View with mock data and deleteUserByOidInTeam launched with success and having null retured response", async () => {
    deleteUserByOidInTeam.mockImplementation(() => Promise.resolve(null));
    render(<TeamItemComponent />, null, { store: data });

    const removeMemberIcons = await waitFor(() =>
      screen.getAllByTestId(
        `deleteMemberBtn-${data.teamPageReducer.members[0].oid}`,
      ),
    );
    act(() => {
      fireEvent.click(removeMemberIcons[0]);
    });
  });
  test("Testing TeamItem View with mock data and deleteUserByOidInTeam launched with failure", async () => {
    deleteUserByOidInTeam.mockImplementation(() =>
      Promise.reject({ response: { data: "error" } }),
    );
    render(<TeamItemComponent />, null, { store: data });

    const removeMemberIcons = await waitFor(() =>
      screen.getAllByTestId(
        `deleteMemberBtn-${data.teamPageReducer.members[0].oid}`,
      ),
    );
    act(() => {
      fireEvent.click(removeMemberIcons[0]);
    });
  });

  test("Testing TeamItem View with mock data and deleteRoleInTeamByOid launched with success", async () => {
    deleteRoleInTeamByOid.mockImplementation(() =>
      Promise.resolve({ data: "ok" } as AxiosResponse<string>),
    );
    render(<TeamItemComponent />, null, { store: data });

    const rolesTab = screen.getByTestId(`tab-content-Rôles`);
    fireEvent.click(rolesTab);

    const removeMemberIcons = await waitFor(() =>
      screen.getAllByTestId(
        `deletRoleBtn-${data.teamPageReducer.roles[0].oid}`,
      ),
    );
    act(() => {
      fireEvent.click(removeMemberIcons[0]);
    });
  });

  test("Testing TeamItem View with mock data and deleteRoleInTeamByOid launched with success and having null retured response", async () => {
    deleteRoleInTeamByOid.mockImplementation(() => Promise.resolve(null));
    render(<TeamItemComponent />, null, { store: data });

    const rolesTab = screen.getByTestId(`tab-content-Rôles`);
    fireEvent.click(rolesTab);

    const removeMemberIcons = await waitFor(() =>
      screen.getAllByTestId(
        `deletRoleBtn-${data.teamPageReducer.roles[0].oid}`,
      ),
    );
    act(() => {
      fireEvent.click(removeMemberIcons[0]);
    });
  });

  test("Testing TeamItem View with mock data and deleteRoleInTeamByOid launched with success", async () => {
    deleteRoleInTeamByOid.mockImplementation(() =>
      Promise.reject({ response: { data: "error" } }),
    );
    render(<TeamItemComponent />, null, { store: data });

    const rolesTab = screen.getByTestId(`tab-content-Rôles`);
    fireEvent.click(rolesTab);

    const removeMemberIcons = await waitFor(() =>
      screen.getAllByTestId(
        `deletRoleBtn-${data.teamPageReducer.roles[0].oid}`,
      ),
    );
    act(() => {
      fireEvent.click(removeMemberIcons[0]);
    });
  });
});
