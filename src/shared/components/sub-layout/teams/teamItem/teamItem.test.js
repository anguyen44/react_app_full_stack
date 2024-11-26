import { fireEvent, screen } from "@testing-library/react";
import { render } from "test/utils";

import TeamItem from "./teamItem.component";

const data_mock = {
  oid: "2922a073-03d7-43d0-a04b-55810b36d675",
  name: "IAM",
  displayName: "IAM",
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
};

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

beforeEach(() => {
  mockedUsedNavigate.mockReset();
});

test("test team item rendering", () => {
  window.history.pushState(
    {},
    "Test page",
    "/teams/2922a073-03d7-43d0-a04b-55810b36d675",
  );
  render(<TeamItem team={data_mock} />);
  const subMenuItem = screen.getByText("IAM");
  const collapseIcon = screen.getByTestId("collapse-icon");

  expect(subMenuItem).toBeInTheDocument();
  fireEvent.click(subMenuItem);
  expect(mockedUsedNavigate).toBeCalledTimes(1);
  expect(mockedUsedNavigate).toHaveBeenCalledWith(
    "/teams/2922a073-03d7-43d0-a04b-55810b36d675",
  );
  fireEvent.click(collapseIcon);
  fireEvent.click(collapseIcon);
});
