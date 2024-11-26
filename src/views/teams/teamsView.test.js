import { act } from "@testing-library/react";
import TeamService from "shared/services/team/team.service";
import { render } from "test/utils";

import TeamsView from "./Teams.view";

const mockAxios = jest.genMockFromModule("axios");
mockAxios.create = jest.fn(() => mockAxios);

jest.mock("axios", () => {
  return {
    create: jest.fn(() => ({
      get: jest.fn(),
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },
    })),
  };
});

jest.mock("../../shared/services/team/team.service", () => {
  return {
    getTeams: jest.fn(),
  };
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/teams",
  }),
}));

const mockData = [
  {
    oid: "157e9d3d-7446-4d47-a225-1a6c237f9cbc",
    name: "SOLSEC",
    createTimestamp: "",
    validateTimestamp: "",
    description: null,
    members: [],
    roles: [],
    subTeams: [],
  },
  {
    oid: "7f5b7c08-2fd7-4961-8e41-bdfec9f10a2f",
    name: "BSR",
    createTimestamp: "",
    validateTimestamp: "",
    description: "description de la team BSR",
    members: [],
    roles: [],
    subTeams: [],
  },
  {
    oid: "2922a073-03d7-43d0-a04b-55810b36d675",
    name: "IAM",
    createTimestamp: "",
    validateTimestamp: "",
    description: "Identity Access Management team",
    members: [],
    roles: [],
    subTeams: [
      {
        oid: "e827cc0c-efac-46ce-9392-3a0dac5185e8",
        name: "TEAM-000003-000001",
        displayName: "Administrateurs CACCIA",
        createTimestamp: "2023-06-06T09:34:42.053+02:00",
        isActive: true,
        description: "Administrateurs de la Solution CACCIA",
        subTeams: null,
        members: [
          {
            oid: "e201f906-75de-4eb9-bdf5-8591ed285b5b",
            nni: "G02470",
            name: "OUEDRAOGO",
            givenName: "Abdul rasmane a",
            email: "abdul-rasmane-a.ouedraogo@enedis.fr",
            isActive: true,
            lastSuccessfulLogin: "06 juin 2023",
            lastFailedLogin: "06 juin 2023",
            lastModifyPassword: "06 juin 2023",
            description: "",
            deleted: true,
          },
          {
            oid: "e201f906-75de-4eb9-bdf5-8591ed285b5b",
            nni: "G02471",
            name: "OUEDRAOGO",
            givenName: "Abdul rasmane a 2",
            email: "abdul-rasmane-a.ouedraogo@enedis.fr",
            isActive: true,
            lastSuccessfulLogin: "06 juin 2023",
            lastFailedLogin: "06 juin 2023",
            lastModifyPassword: "06 juin 2023",
            description: "",
            deleted: false,
          },
        ],
        roles: null,
      },
      {
        oid: "3e1cb3b1-f608-4282-bf81-04dfaed98f8d",
        name: "TEAM-000003-000004",
        displayName: "Développeurs CACCIA",
        createTimestamp: null,
        isActive: true,
        description: "Développeurs de la Solution CACCIA",
        subTeams: null,
        members: null,
        roles: null,
      },
      {
        oid: "8bb0b47c-e3ba-4391-8fcd-a1ba6ca35e51",
        name: "TEAM-000003-000002",
        displayName: "Administrateurs PGS",
        createTimestamp: null,
        isActive: true,
        description: "Administrateurs de la Solution PGS",
        subTeams: null,
        members: null,
        roles: null,
      },
      {
        oid: "3509a288-e7b0-4e9e-80e3-b297bdc501b9",
        name: "TEAM-000003-000003",
        displayName: "Administrateurs DOORS",
        createTimestamp: "2023-03-30T16:24:22.919+02:00",
        isActive: true,
        description: "Administrateurs de la Solution DOORS",
        subTeams: null,
        members: null,
        roles: null,
      },
    ],
  },
];

describe("Testing Teams view service", () => {
  beforeEach(() => {
    TeamService.getTeams.mockResolvedValue([...mockData]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Testing TeamsView component", async () => {
    await act(async () => render(<TeamsView />));
  });
});
