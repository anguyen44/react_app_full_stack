import { fireEvent, screen } from "@testing-library/react";
import { useParams } from "react-router-dom";
import { render } from "test/utils";
import { userReducerData } from "views/dashboardView/dashboardView.test.js";

import SubTeamsComponent from "./SubTeams.component";

const mock_store = (isWriting) => ({
  store: {
    userReducer: {
      token: "myToken",
      user: null,
      teams: userReducerData.teams,
    },
    teamPageReducer: {
      isLoadingPage: false,
      readOnly: false,
      isWriting: isWriting,
    },
    teamMenuReducer: {
      checkedSubMenu: [],
    },
  },
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
  useParams: jest.fn(), // use actual for all non-hook parts  useNavigate: () => mockedUseNavigate,
}));

describe("test subTeam Component", () => {
  beforeEach(() => {
    useParams.mockImplementation(() => {
      return {
        teamOid: "2922a073-03d7-43d0-a04b-55810b36d675",
      };
    });
  });
  test("Testing SubTeamsComponent with redux mock data and writable mode", async () => {
    render(
      <SubTeamsComponent teamOid={"2922a073-03d7-43d0-a04b-55810b36d675"} />,
      null,
      mock_store(true),
    );

    const openButton = screen.getByTestId("open-modal");
    fireEvent.click(openButton);

    const nameInput = screen.getByTestId("nameInput");
    fireEvent.change(nameInput, { target: { value: "team name" } });

    const descriptionInput = screen.getByTestId("nameInput");
    fireEvent.change(descriptionInput, {
      target: { value: "team description" },
    });

    const handleCreateSubTeamButton = screen.getByText("Créer");
    fireEvent.click(handleCreateSubTeamButton);

    const closeModal = screen.getByTestId("close-modal");
    fireEvent.click(closeModal);
  });
  test("Testing SubTeamsComponent with redux mock data and readable mode", async () => {
    render(
      <SubTeamsComponent teamOid={"2922a073-03d7-43d0-a04b-55810b36d675"} />,
      null,
      mock_store(false),
    );
  });
});
