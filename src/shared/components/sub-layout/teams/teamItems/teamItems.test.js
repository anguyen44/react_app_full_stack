import { render } from "test/utils";

import TeamItems from "./teamItems.component";

export const team_mock_data = [
  {
    oid: "7f5b7c08-2fd7-4961-8e41-bdfec9f10a2f",
    name: "BSR",
    createTimestamp: "",
    validateTimestamp: "",
    members: [],
    roles: [],
    subTeams: [],
  },
  {
    oid: "157e9d3d-7446-4d47-a225-1a6c237f9cbc",
    name: "SOLSEC",
    createTimestamp: "",
    validateTimestamp: "",
    members: [],
    roles: [],
    subTeams: [
      {
        oid: "e927cc0c-efac-46ce-9392-3a0dac5185e8",
        name: "SOLSEC sub team 1",
        createTimestamp: "",
        validateTimestamp: "",
        description: [],
        members: [],
        roles: [],
      },
      {
        oid: "3g1cb3b1-f608-4282-bf81-04dfaed98f8d",
        name: "SOLSEC sub team 2",
        createTimestamp: "",
        validateTimestamp: "",
        description: [],
        members: [],
        roles: [],
      },
      {
        oid: "8cb0b47c-e3ba-4391-8fcd-a1ba6ca35e51",
        name: "SOLSEC sub team 3",
        createTimestamp: "",
        validateTimestamp: "",
        description: [],
        members: [],
        roles: [],
      },
    ],
  },
  {
    oid: "2922a073-03d7-43d0-a04b-55810b36d675",
    name: "IAM",
    createTimestamp: "",
    validateTimestamp: "",
    description: "Gestion Equipe IAM",
    members: [],
    roles: [],
    subTeams: [
      {
        oid: "e827cc0c-efac-46ce-9392-3a0dac5185e8",
        name: "CACCIA Administrateurs",
        createTimestamp: "",
        validateTimestamp: "",
        description: [],
        members: [],
        roles: [],
      },
      {
        oid: "3e1cb3b1-f608-4282-bf81-04dfaed98f8d",
        name: "CACCIA Développeurs",
        createTimestamp: "",
        validateTimestamp: "",
        description: [],
        members: [],
        roles: [],
      },
      {
        oid: "8bb0b47c-e3ba-4391-8fcd-a1ba6ca35e51",
        name: "PGS Administrateurs",
        createTimestamp: "",
        validateTimestamp: "",
        description: [],
        members: [],
        roles: [],
      },
    ],
  },
];

export const team_mock_data2 = [
  {
    oid: "7f5b7c08-2fd7-4961-8e41-bdfec9f10a2f",
    name: "BSR",
    createTimestamp: "",
    validateTimestamp: "",
    members: [],
    roles: [],
    subTeams: [
      {
        oid: "e827cc0c-efac-46ce-9392-3a0dac5185e8",
        name: "BSR Administrateurs",
        createTimestamp: "",
        validateTimestamp: "",
        description: [],
        members: [],
        roles: [],
      },
    ],
  },
  {
    oid: "157e9d3d-7446-4d47-a225-1a6c237f9cbc",
    name: "SOLSEC",
    createTimestamp: "",
    validateTimestamp: "",
    members: [],
    roles: [],
    subTeams: [
      {
        oid: "e927cc0c-efac-46ce-9392-3a0dac5185e8",
        name: "SOLSEC sub team 1",
        createTimestamp: "",
        validateTimestamp: "",
        description: [],
        members: [],
        roles: [],
      },
      {
        oid: "3g1cb3b1-f608-4282-bf81-04dfaed98f8d",
        name: "SOLSEC sub team 2",
        createTimestamp: "",
        validateTimestamp: "",
        description: [],
        members: [],
        roles: [],
      },
      {
        oid: "8cb0b47c-e3ba-4391-8fcd-a1ba6ca35e51",
        name: "SOLSEC sub team 3",
        createTimestamp: "",
        validateTimestamp: "",
        description: [],
        members: [],
        roles: [],
      },
    ],
  },
  {
    oid: "2922a073-03d7-43d0-a04b-55810b36d675",
    name: "IAM",
    createTimestamp: "",
    validateTimestamp: "",
    description: "Gestion Equipe IAM",
    members: [],
    roles: [],
    subTeams: [
      {
        oid: "e827cc0c-efac-46ce-9392-3a0dac5185e8",
        name: "CACCIA Administrateurs",
        createTimestamp: "",
        validateTimestamp: "",
        description: [],
        members: [],
        roles: [],
      },
      {
        oid: "3e1cb3b1-f608-4282-bf81-04dfaed98f8d",
        name: "CACCIA Développeurs",
        createTimestamp: "",
        validateTimestamp: "",
        description: [],
        members: [],
        roles: [],
      },
      {
        oid: "8bb0b47c-e3ba-4391-8fcd-a1ba6ca35e51",
        name: "PGS Administrateurs",
        createTimestamp: "",
        validateTimestamp: "",
        description: [],
        members: [],
        roles: [],
      },
    ],
  },
];

const mainTeamOfSubTeam = {
  oid: "886c60de-caa3-4760-a6a3-ff1064829c65",
  name: "Team-00002",
  displayName: "6YN - Team",
};

const nullMainTeamOfSubTeam = {
  oid: null,
  name: null,
  displayName: null,
};

describe("testing correct rendering of team lists on sidebar menu", () => {
  test("rendering teams list component with data", () => {
    const { getAllByTestId } = render(
      <TeamItems teams={team_mock_data} mainTeam={mainTeamOfSubTeam} />,
    );
    const listMenuItemsInstance = getAllByTestId("team-item");
    expect(listMenuItemsInstance).toHaveLength(3);
  });
  test("rendering teams list component with data and first team having sub teams", () => {
    const { getAllByTestId } = render(
      <TeamItems teams={team_mock_data2} mainTeam={mainTeamOfSubTeam} />,
    );
    const listMenuItemsInstance = getAllByTestId("team-item");
    expect(listMenuItemsInstance).toHaveLength(3);
  });
  test("rendering teams list component with no data", () => {
    render(<TeamItems teams={[]} mainTeam={nullMainTeamOfSubTeam} />);
  });
});
