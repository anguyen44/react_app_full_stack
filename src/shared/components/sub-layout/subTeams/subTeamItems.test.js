import { fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import SubTeamModel from "shared/model/subTeam.model";
import { render } from "test/utils";

import SubTeamItems from "./subTeamItems.component";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return {
    user: userEvent.setup(),
    ...render(ui),
  };
};

const subTeams = new Array(
  new SubTeamModel(
    "e927cc0c-efac-46ce-9392-3a0dac5185e8",
    "SOLSEC sub team 1",
    "SOLSEC sub team 1",
    "",
    "",
    new Array(),
    new Array(),
  ),
  new SubTeamModel(
    "3g1cb3b1-f608-4282-bf81-04dfaed98f8d",
    "SOLSEC sub team 2",
    "SOLSEC sub team 2",
    "",
    "",
    new Array(),
    new Array(),
  ),
  new SubTeamModel(
    "8cb0b47c-e3ba-4391-8fcd-a1ba6ca35e51",
    "SOLSEC sub team 3",
    "SOLSEC sub team 3",
    "",
    "",
    new Array(),
    new Array(),
  ),
);

describe("subTeamItems component and its internal fucntions be testing", () => {
  beforeEach(() => {
    mockedUsedNavigate.mockReset();
  });
  it(
    "render the sub team item",
    async () => {
      // You can get the query methods directly from render
      const { getAllByLabelText } = render(
        <SubTeamItems subTeams={subTeams} />,
      );

      const listItems = getAllByLabelText("li");
      expect(listItems).toHaveLength(3);

      fireEvent.click(listItems[2]);
      expect(listItems[0].textContent).toBe("SOLSEC sub team 1");
      expect(mockedUsedNavigate).toHaveBeenCalledWith(
        "/sub_teams/8cb0b47c-e3ba-4391-8fcd-a1ba6ca35e51",
      );

      expect(mockedUsedNavigate).toBeCalledTimes(1);
    },
    { timeout: 5000 },
  );

  it("testing sub team item in menu activate", () => {
    const route = "/sub_teams/8cb0b47c-e3ba-4391-8fcd-a1ba6ca35e51";
    renderWithRouter(<SubTeamItems subTeams={subTeams} />, { route });
  });
});
