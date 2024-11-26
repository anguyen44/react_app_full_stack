import { mockUser } from "test/mocks/mockUser.utils";
import { render } from "test/utils";
import UserAutorizationsView from "./userAutorizations.view";
import { userReducerData } from "views/dashboardView/dashboardView.test";
import TeamService from "shared/services/team/team.service";
import RoleService from "shared/services/role/role.service";
import { mockRole } from "test/mocks/mockRole.utils";
import PortfolioService from "shared/services/portfolio/portfolio.service";
import { mockPortfolio } from "test/mocks/mockPortfolio.utils";
import { fireEvent } from "@testing-library/react";

const mockStore = {
  store: {
    userReducer: {
      ...userReducerData,
      ...{
        userReducer: {
          user: mockUser,
        },
      },
    },
  },
};

describe("Test UserAutorizationView", () => {
  test("Testing render UserAutorizationView", () => {
    jest
      .spyOn(TeamService, "getSelfTeams")
      .mockImplementation(() => mockStore.store.userReducer.teams as any);

    jest
      .spyOn(RoleService, "getSelfRoles")
      .mockImplementation(() => [mockRole] as any);

    jest
      .spyOn(PortfolioService, "getPortfolios")
      .mockImplementation(() => [mockPortfolio] as any);

    const { getByText } = render(<UserAutorizationsView />, null, mockStore);

    mockStore.store.userReducer.teams.forEach((team) => {
      const teamName = getByText(team.displayName);
      expect(teamName).toBeInTheDocument();
    });

    fireEvent.click(getByText("Mes rôles"));
    let name = getByText(mockRole.displayName);
    expect(name).toBeInTheDocument();

    fireEvent.click(getByText("Mes ressources"));
    name = getByText(mockPortfolio.getFullName());
    expect(name).toBeInTheDocument();
  });

  test("Testing render UserAutorizationView with services error", () => {
    jest.spyOn(TeamService, "getSelfTeams").mockImplementation(() => {
      throw new Error("Error teams");
    });

    jest.spyOn(RoleService, "getSelfRoles").mockImplementation(() => {
      throw new Error("Error roles");
    });

    jest.spyOn(PortfolioService, "getPortfolios").mockImplementation(() => {
      throw new Error("Error portfolios");
    });

    render(<UserAutorizationsView />, null, mockStore);
  });
});
