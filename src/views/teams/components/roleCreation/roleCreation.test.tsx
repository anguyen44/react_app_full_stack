import { fireEvent, screen, waitFor } from "@testing-library/react";
import PortfolioService from "shared/services/portfolio/portfolio.service";
import RoleService from "shared/services/role/role.service";
import { render } from "test/utils";

import RoleCreationComponent from "./RoleCreation.component";
import { mockPortfolio } from "test/mocks/mockPortfolio.utils";

jest.mock("shared/services/role/role.service", () => {
  return {
    createNewRole: jest.fn(),
    deleteRoleInTeamByOid: jest.fn(),
  };
});

jest.mock("shared/services/global/global.service", () => {
  return {
    getInstance: jest.fn(),
  };
});

const reduxMockData = {
  teamPageReducer: {
    teamInfo: {
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
          oid: "e201f906-75de-4eb9-bdf5-8591ed285b5v",
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
  },
};

describe("test RoleCreationComponent component", () => {
  test("testing RoleCreationComponent with mock data api with success", async () => {
    jest
      .spyOn(RoleService, "createNewRole")
      .mockResolvedValue({ data: "ok" } as any);
    jest
      .spyOn(PortfolioService, "getPortfoliosByQuery")
      .mockResolvedValue([mockPortfolio]);

    render(<RoleCreationComponent />, null, reduxMockData);

    const modal = screen.getByTestId("open-modal");
    fireEvent.click(modal);

    const inputs = screen.getAllByLabelText("text-input");
    const roleNameInput = inputs[0];
    const searchPortfolioInput = inputs[1];
    const roleDescriptionInput = screen.getByTestId("roleDescriptionInput");

    fireEvent.change(roleNameInput, {
      target: { value: "name_role" },
    });

    fireEvent.change(roleDescriptionInput, {
      target: { value: "description for role" },
    });

    fireEvent.change(searchPortfolioInput, {
      target: { value: mockPortfolio.name },
    });
    fireEvent.keyDown(searchPortfolioInput, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    const searchedPortfolioItems = await waitFor(() =>
      screen.getAllByLabelText("searchedPortfolioItem"),
    );
    fireEvent.click(searchedPortfolioItems[0]);

    waitFor(() => {
      const roleCreationButton = screen.getByTestId("ajouter-button-api");
      fireEvent.click(roleCreationButton);
    });

    const closeModal = screen.getByTestId("close-modal");
    fireEvent.click(closeModal);
  });

  test("mock api for portfolio seraching with no keywords", async () => {
    jest.spyOn(PortfolioService, "getPortfoliosByQuery").mockResolvedValue([]);

    render(<RoleCreationComponent />, null, reduxMockData);

    const modal = screen.getByTestId("open-modal");
    fireEvent.click(modal);

    const inputs = screen.getAllByLabelText("text-input");
    const searchPortfolioInput = inputs[1];

    fireEvent.change(searchPortfolioInput, {
      target: { value: "" },
    });
    fireEvent.keyDown(searchPortfolioInput, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    const closeModal = screen.getByTestId("close-modal");
    fireEvent.click(closeModal);
  });

  test("test removing searched portfolio item", async () => {
    jest
      .spyOn(PortfolioService, "getPortfoliosByQuery")
      .mockResolvedValue([mockPortfolio]);
    render(<RoleCreationComponent />, null, reduxMockData);

    const modal = screen.getByTestId("open-modal");
    fireEvent.click(modal);

    const inputs = screen.getAllByLabelText("text-input");
    const searchPortfolioInput = inputs[1];

    fireEvent.change(searchPortfolioInput, {
      target: { value: mockPortfolio.name },
    });
    fireEvent.keyDown(searchPortfolioInput, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    const searchedPortfolioItems = await waitFor(() =>
      screen.getAllByLabelText("searchedPortfolioItem"),
    );
    fireEvent.click(searchedPortfolioItems[0]);

    const searchedPortfolioItemsRemove = await waitFor(() =>
      screen.getAllByLabelText("removePortfolioItem"),
    );
    fireEvent.click(searchedPortfolioItemsRemove[0]);

    const closeModal = screen.getByTestId("close-modal");
    fireEvent.click(closeModal);
  });

  test("mock api for portfolio seraching with success but no data", async () => {
    jest.spyOn(PortfolioService, "getPortfoliosByQuery").mockResolvedValue([]);

    render(<RoleCreationComponent />, null, reduxMockData);

    const modal = screen.getByTestId("open-modal");
    fireEvent.click(modal);

    const inputs = screen.getAllByLabelText("text-input");
    const searchPortfolioInput = inputs[1];

    fireEvent.change(searchPortfolioInput, {
      target: { value: "fezhfuezih" },
    });
    const portfoliosSearchIcon = screen.getByTestId("portfoliosSearchIcon");
    fireEvent.click(portfoliosSearchIcon);

    const closeModal = screen.getByTestId("close-modal");
    fireEvent.click(closeModal);
  });

  test("mock api for portfolio seraching with failure", async () => {
    jest
      .spyOn(PortfolioService, "getPortfoliosByQuery")
      .mockRejectedValue({ error: "error" });

    render(<RoleCreationComponent />, null, reduxMockData);

    const modal = screen.getByTestId("open-modal");
    fireEvent.click(modal);

    const inputs = screen.getAllByLabelText("text-input");
    const searchPortfolioInput = inputs[1];

    fireEvent.change(searchPortfolioInput, {
      target: { value: mockPortfolio.name },
    });
    fireEvent.keyDown(searchPortfolioInput, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    const closeModal = screen.getByTestId("close-modal");
    fireEvent.click(closeModal);
  });

  test("mock api for portfolio seraching with failure with code 400", async () => {
    jest.spyOn(PortfolioService, "getPortfoliosByQuery").mockRejectedValue({
      response: {
        data: { status: 400 },
      },
    });

    render(<RoleCreationComponent />, null, reduxMockData);

    const modal = screen.getByTestId("open-modal");
    fireEvent.click(modal);

    const inputs = screen.getAllByLabelText("text-input");
    const searchPortfolioInput = inputs[1];

    fireEvent.change(searchPortfolioInput, {
      target: { value: mockPortfolio.name },
    });
    fireEvent.keyDown(searchPortfolioInput, {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      charCode: 27,
    });
    fireEvent.keyDown(searchPortfolioInput, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    const closeModal = screen.getByTestId("close-modal");
    fireEvent.click(closeModal);
  });

  test("mock api for role creation with failure", async () => {
    jest
      .spyOn(RoleService, "createNewRole")
      .mockRejectedValue({ error: "error" });

    jest
      .spyOn(PortfolioService, "getPortfoliosByQuery")
      .mockResolvedValue([mockPortfolio]);

    render(<RoleCreationComponent />, null, reduxMockData);

    const modal = screen.getByTestId("open-modal");
    fireEvent.click(modal);

    const inputs = screen.getAllByLabelText("text-input");
    const roleNameInput = inputs[0];
    const searchPortfolioInput = inputs[1];
    const roleDescriptionInput = screen.getByTestId("roleDescriptionInput");

    fireEvent.change(roleNameInput, {
      target: { value: "name_role" },
    });

    fireEvent.change(roleDescriptionInput, {
      target: { value: "description for role" },
    });

    fireEvent.change(searchPortfolioInput, {
      target: { value: mockPortfolio.name },
    });
    fireEvent.keyDown(searchPortfolioInput, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    const searchedPortfolioItems = await waitFor(() =>
      screen.getAllByLabelText("searchedPortfolioItem"),
    );
    fireEvent.click(searchedPortfolioItems[0]);

    waitFor(() => {
      const roleCreationButton = screen.getByTestId("ajouter-button-api");
      fireEvent.click(roleCreationButton);
    });

    const closeModal = screen.getByTestId("close-modal");
    fireEvent.click(closeModal);
  });

  test("mock api for role creation with success but no response", async () => {
    jest.spyOn(RoleService, "createNewRole").mockResolvedValue(null);

    jest
      .spyOn(PortfolioService, "getPortfoliosByQuery")
      .mockResolvedValue([mockPortfolio]);

    render(<RoleCreationComponent />, null, reduxMockData);

    const modal = screen.getByTestId("open-modal");
    fireEvent.click(modal);

    const inputs = screen.getAllByLabelText("text-input");
    const roleNameInput = inputs[0];
    const searchPortfolioInput = inputs[1];
    const roleDescriptionInput = screen.getByTestId("roleDescriptionInput");

    fireEvent.change(roleNameInput, {
      target: { value: "name_role" },
    });

    fireEvent.change(roleDescriptionInput, {
      target: { value: "description for role" },
    });

    fireEvent.change(searchPortfolioInput, {
      target: { value: mockPortfolio.name },
    });
    fireEvent.keyDown(searchPortfolioInput, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    const searchedPortfolioItems = await waitFor(() =>
      screen.getAllByLabelText("searchedPortfolioItem"),
    );
    fireEvent.click(searchedPortfolioItems[0]);

    waitFor(() => {
      const roleCreationButton = screen.getByTestId("ajouter-button-api");
      fireEvent.click(roleCreationButton);
    });

    const closeModal = screen.getByTestId("close-modal");
    fireEvent.click(closeModal);
  });
});
