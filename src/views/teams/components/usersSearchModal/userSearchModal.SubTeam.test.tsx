import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import TeamService from "shared/services/team/team.service";
import UserService from "shared/services/user/user.service";
import { render } from "test/utils";

import UsersSearchModal from "./usersSearchModal.component";
import { AxiosResponse } from "axios";
import { UserModel } from "shared/model/user.model";

jest.mock("../../../../shared/services/team/team.service", () => {
  return {
    addUserToTeam: jest.fn(),
  };
});

jest.mock("../../../../shared/services/user/user.service", () => {
  return {
    getMemberByNniOrEmail: jest.fn(),
  };
});

const addUserToTeam = TeamService.addUserToTeam as jest.MockedFunction<
  typeof TeamService.addUserToTeam
>;

const useReducerData = {
  teams: [
    {
      oid: "ec46e1b5-99f6-40e9-bb3f-32385ee834d0",
      name: "Team-00001",
      displayName: "MIA",
      createTimestamp: "",
      validateTimestamp: "",
      description: "MIA team description",
      members: [],
      roles: [],
      subTeams: [
        {
          oid: "6685dcac-ca80-4f14-b05c-2b2f545a8a6b",
          name: "SubT-00001-00002",
          displayName: "PGS Administrators",
          createTimestamp: "2023-11-02T14:55:31.375+01:00",
          isActive: true,
          description: "PGS Administrators",
          subTeams: null,
          members: null,
          roles: null,
        },
        {
          oid: "15c2465f-5fe0-40c0-96fe-16ecf53a14ab",
          name: "SubT-00001-00001",
          displayName: "Doors Administrators",
          createTimestamp: "2023-10-18T12:31:54.166+02:00",
          isActive: true,
          description: "Doors Administrators team description",
          subTeams: null,
          members: null,
          roles: null,
        },
      ],
    },
    {
      oid: "886c60de-caa3-4760-a6a3-ff1064829c65",
      name: "Team-00002",
      displayName: "IAM",
      createTimestamp: "",
      validateTimestamp: "",
      description: "DIGIT IAM",
      members: [],
      roles: [],
      subTeams: [
        {
          oid: "c7ed0eb8-319f-47d0-9ecb-82caa813ad3e",
          name: "SubT-00002-00001",
          displayName: "Caccia Admininstrators",
          createTimestamp: "2023-11-02T14:53:25.089+01:00",
          isActive: true,
          description: null,
          subTeams: null,
          members: null,
          roles: null,
        },
        {
          oid: "3c1b9fea-2d49-4dd7-90d2-4be6d9cc0352",
          name: "SubT-00002-00002",
          displayName: "ABBA Administrators",
          createTimestamp: "2023-11-02T14:55:31.401+01:00",
          isActive: true,
          description: null,
          subTeams: null,
          members: null,
          roles: null,
        },
      ],
    },
    {
      oid: "2a93d191-35d2-4d09-8c36-a2d9b8e9e7fb",
      name: "Team-00003",
      displayName: "PANDA",
      createTimestamp: "",
      validateTimestamp: "",
      description: "PANDA",
      members: [],
      roles: [],
      subTeams: [
        {
          oid: "23a40a6b-b886-4ce0-92f9-51a3da99f7fa",
          name: "SubT-00003-00001",
          displayName: "INXS Administrators",
          createTimestamp: "2023-11-02T15:28:02.388+01:00",
          isActive: true,
          description: "Equipe INXS",
          subTeams: null,
          members: null,
          roles: null,
        },
      ],
    },
    {
      oid: "254785df-f081-4e91-9bc6-bded6743cff9",
      name: "Team-00004",
      displayName: "KOALA",
      createTimestamp: "",
      validateTimestamp: "",
      description: null,
      members: [],
      roles: [],
      subTeams: [
        {
          oid: "29a02c6c-27e2-4d3b-9b43-a2cd858bdab1",
          name: "SubT-00004-00003",
          displayName: "NAVY Administrators",
          createTimestamp: "2023-11-02T15:35:17.766+01:00",
          isActive: true,
          description: null,
          subTeams: null,
          members: null,
          roles: null,
        },
        {
          oid: "85ee6e15-a0ac-4ba3-9abc-7ab1184a2180",
          name: "SubT-00004-00001",
          displayName: "KYSS Admin",
          createTimestamp: "2023-11-02T15:34:16.254+01:00",
          isActive: true,
          description: "Description",
          subTeams: null,
          members: null,
          roles: null,
        },
        {
          oid: "897bde1a-a6b9-4ad3-88d0-d4595ee60777",
          name: "SubT-00004-00002",
          displayName: "YMCA Admins",
          createTimestamp: "2023-11-02T15:34:44.874+01:00",
          isActive: true,
          description: null,
          subTeams: null,
          members: null,
          roles: null,
        },
      ],
    },
  ],
};

const mockUser = new UserModel(
  "G02471",
  "OUEDRAOGO",
  "ABDUL RASMANE A",
  "abdul-rasmane-a.ouedraogo@enedis.fr",
  true,
  "52449377-c70f-49bd-a93e-d04992ed05ec",
);

const mainTeamMembersData = [
  mockUser,
  new UserModel(
    "A66978",
    "DUFLOT",
    "VIVIEN",
    "vivien.duflot@enedis.fr",
    true,
    "05d07c3b-7ea8-4bdb-883b-c281a880dd7d",
  ),
  new UserModel(
    "SGDDE25N",
    "SGDDE25N",
    "SEBASTIEN",
    "sebastien-externe.gaspard@enedis.fr",
    true,
    "116225a4-eed7-4f1f-812b-65832d2f6eeb",
  ),
];

describe("search users in subteam page", () => {
  test("add an user in subteam page", async () => {
    addUserToTeam.mockImplementation(() =>
      Promise.resolve({ data: "ok" } as AxiosResponse<string>),
    );
    window.history.pushState(
      {},
      "Test page",
      "/sub_teams/2922a073-03d7-43d0-a04b-55810b36d675",
    );
    render(<UsersSearchModal teamOid={"123"} />, null, {
      store: {
        teamPageReducer: {
          searchedMembers: [mockUser],
          mainTeamMembers: [...mainTeamMembersData],
          members: [],
        },
        userReducer: { ...useReducerData },
      },
    });
    const openModal = screen.getByTestId("open-modal");
    fireEvent.click(openModal);

    const textInput = screen.getByLabelText("text-input");
    act(() => {
      fireEvent.change(textInput, { target: { value: "G02471" } });
    });

    const searchedItemList = await waitFor(() =>
      screen.getAllByLabelText("searched-user-item"),
    );

    const searchedItem = searchedItemList[0];
    act(() => {
      fireEvent.click(searchedItem);
    });

    waitFor(() => {
      act(() => {
        const ajouterButtonApi = screen.getByTestId("ajouter-button-api");
        fireEvent.click(ajouterButtonApi);
      });
    });
  });

  test("add an user in subteam page, addUserToTeam no success", async () => {
    addUserToTeam.mockImplementation(() => Promise.reject("ok"));
    window.history.pushState(
      {},
      "Test page",
      "/sub_teams/2922a073-03d7-43d0-a04b-55810b36d675",
    );
    render(<UsersSearchModal teamOid={"123"} />, null, {
      store: {
        teamPageReducer: {
          searchedMembers: [mockUser],
          mainTeamMembers: [...mainTeamMembersData],
          members: [],
        },
        userReducer: { ...useReducerData },
      },
    });
    const openModal = screen.getByTestId("open-modal");
    fireEvent.click(openModal);

    const textInput = screen.getByLabelText("text-input");
    act(() => {
      fireEvent.change(textInput, { target: { value: "G02471" } });
    });

    const searchedItemList = await waitFor(() =>
      screen.getAllByLabelText("searched-user-item"),
    );

    const searchedItem = searchedItemList[0];
    act(() => {
      fireEvent.click(searchedItem);
    });

    waitFor(() => {
      act(() => {
        const ajouterButtonApi = screen.getByTestId("ajouter-button-api");
        fireEvent.click(ajouterButtonApi);
      });
    });
  });

  test("add an user which is existed in current members list", async () => {
    window.history.pushState(
      {},
      "Test page",
      "/sub_teams/2922a073-03d7-43d0-a04b-55810b36d675",
    );
    render(<UsersSearchModal teamOid={"123"} />, null, {
      store: {
        teamPageReducer: {
          members: [mockUser],
          searchedMembers: [],
          mainTeamMembers: [...mainTeamMembersData],
        },
        userReducer: { ...useReducerData },
      },
    });
    const openModal = screen.getByTestId("open-modal");
    fireEvent.click(openModal);

    const textInput = screen.getByLabelText("text-input");
    fireEvent.change(textInput, { target: { value: "G02471" } });

    const searchedItemList = await waitFor(() =>
      screen.getAllByLabelText("searched-user-item"),
    );

    const searchedItem = searchedItemList[0];
    act(() => {
      fireEvent.click(searchedItem);
    });
  });

  test("add an user in subteam page with null searchedData from mainTeamMembers", async () => {
    const getMemberByNniOrEmail =
      UserService.getMemberByNniOrEmail as jest.MockedFunction<
        typeof UserService.getMemberByNniOrEmail
      >;
    getMemberByNniOrEmail.mockImplementation(() =>
      Promise.resolve([
        new UserModel(
          "DFD9D78N",
          "FECHE",
          "Damien",
          "damien-externe.feche@enedis.fr",
          true,
          "eca77184-cf81-46ce-b9a6-220dad6e24f4",
        ),
      ] as UserModel[]),
    );
    window.history.pushState(
      {},
      "Test page",
      "/sub_teams/2922a073-03d7-43d0-a04b-55810b36d675",
    );
    render(<UsersSearchModal teamOid={"123"} />, null, {
      store: {
        teamPageReducer: {
          searchedMembers: [],
          mainTeamMembers: [...mainTeamMembersData],
          members: [],
        },
        userReducer: { ...useReducerData },
      },
    });
    const openModal = screen.getByTestId("open-modal");
    fireEvent.click(openModal);

    const textInput = screen.getByLabelText("text-input");
    fireEvent.change(textInput, { target: { value: "G0247122" } });

    waitFor(async () => {
      const searchedItemList = screen.getAllByLabelText("searched-user-item");
      const searchedItem = searchedItemList[0];
      act(() => {
        fireEvent.click(searchedItem);
      });
    });
  });
});
