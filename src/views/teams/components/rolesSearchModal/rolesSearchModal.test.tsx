import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import * as ReactRouterDom from "react-router-dom";
import MESSAGES from "shared/config/constants/message.config";
import TeamService from "shared/services/team/team.service";
import { render } from "test/utils";
import { userReducerData } from "views/dashboardView/dashboardView.test.js";

import RoleSearchModal from "./RolesSearchModal.component";
import { AxiosResponse } from "axios";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock("shared/services/global/global.service", () => {
  return {
    getInstance: jest.fn(),
  };
});

const data = {
  teamPageReducer: {
    roles: [
      {
        oid: "81a38333-d7d9-4698-8c48-f15f4ef6297e",
        name: "TEAM-000003-6YN-6BX88A",
        displayName: "CACCIA_ZCE_v2",
        description: "description",
        portfolio: null,
        isActive: true,
        deleted: false,
      },
    ],
    mainTeamRoles: [
      {
        oid: "bf84d674-027f-4861-8429-d77ae46eb978",
        name: "000003-6YN-000001",
        displayName: "CACCIA_N3",
        description: "description",
        portfolio: null,
        isActive: true,
        deleted: false,
      },
      {
        oid: "81a38333-d7d9-4698-8c48-f15f4ef6297e",
        name: "TEAM-000003-6YN-6BX88A",
        displayName: "CACCIA_ZCE_v2",
        description: "description",
        portfolio: null,
        isActive: true,
        deleted: false,
      },
      {
        oid: "f292f8ce-b98b-4f25-a4ea-457b1e1e6bee",
        name: "TEAM-000003-D0R-JJ0PZ8",
        displayName: "D0R-Role",
        description: "mon role doors",
        portfolio: null,
        isActive: true,
        deleted: false,
      },
      {
        oid: "da137e22-4f7e-4fa4-9c38-b711e7119659",
        name: "TEAM-000001-6YN-Q8GPQ2",
        displayName: "New-CAC-ROLE",
        description: "My role",
        portfolio: null,
        isActive: true,
        deleted: false,
      },
      {
        oid: "7735af60-d9c5-4987-90a2-a961d5f4c3b6",
        name: "000003-6YN-000002",
        displayName: "CACCIA_POD1",
        description: "",
        portfolio: null,
        isActive: false,
        deleted: false,
      },
      {
        oid: "14929b1e-f07a-4924-a536-cfa0cc565977",
        name: "000003-D0R-000001",
        displayName: "DOORS_N3",
        description: "test",
        portfolio: null,
        isActive: true,
        deleted: false,
      },
    ],
    isCaseValidationImpossible: false,
  },
  userReducer: userReducerData,
};

describe("tests role search modal", () => {
  beforeEach(() => {
    const useLocation = ReactRouterDom.useLocation as jest.MockedFunction<
      typeof ReactRouterDom.useLocation
    >;
    useLocation.mockImplementation(() => {
      return {
        pathname: "/sub_teams",
      } as ReactRouterDom.Location;
    });
    const useParams = ReactRouterDom.useParams as jest.MockedFunction<
      typeof ReactRouterDom.useParams
    >;
    useParams.mockImplementation(() => {
      return {
        teamOid: "52f4fdcf-f07e-4385-a29c-c059c524a171",
      };
    });
  });
  test("testing RoleSearchModal component", async () => {
    render(<RoleSearchModal teamOid={""} />, null, { store: data });

    const openButton = screen.getByTestId("open-modal");
    fireEvent.click(openButton);

    const textInput: HTMLInputElement = screen.getByLabelText("text-input");

    fireEvent.change(textInput, { target: { value: "" } });
    expect(textInput.value).toBe("");
    act(() => textInput.focus());
    expect(textInput).toHaveFocus();

    fireEvent.change(textInput, { target: { value: "12" } });
    const notFoundItem = screen.getByText(MESSAGES.NO_ROLE_FOUND);
    expect(notFoundItem).toBeInTheDocument();

    fireEvent.change(textInput, { target: { value: "2234" } });
    expect(textInput.value).toBe("2234");
    fireEvent.keyDown(textInput, { key: "Enter", code: "Enter", charCode: 13 });

    const notFoundItem2 = screen.getByText(MESSAGES.NO_ROLE_FOUND);
    expect(notFoundItem2).toBeInTheDocument();

    fireEvent.change(textInput, { target: { value: "caccia" } });
    expect(textInput.value).toBe("caccia");
    fireEvent.keyDown(textInput, { key: "Enter", code: "Enter", charCode: 13 });

    const searchedItemList = await waitFor(() =>
      screen.getAllByLabelText("searched-role-item"),
    );

    const searchedItem = searchedItemList[0];
    fireEvent.click(searchedItem);

    const ajouterButtonApi = await waitFor(() =>
      screen.getByTestId("ajouter-button-api"),
    );
    fireEvent.click(ajouterButtonApi);
  });

  test("test deleting item in waiting list", async () => {
    render(<RoleSearchModal teamOid={""} />, null, { store: data });
    const openButton = screen.getByTestId("open-modal");
    fireEvent.click(openButton);
    const textInput: HTMLInputElement = screen.getByLabelText("text-input");

    fireEvent.change(textInput, { target: { value: "caccia" } });
    expect(textInput.value).toBe("caccia");
    fireEvent.keyDown(textInput, { key: "Enter", code: "Enter", charCode: 13 });

    const searchedItemList = await waitFor(() =>
      screen.getAllByLabelText("searched-role-item"),
    );

    const searchedItem = searchedItemList[0];
    fireEvent.click(searchedItem);

    const deleteIconList = screen.getAllByTestId("delete-icon");
    fireEvent.click(deleteIconList[0]);
  });

  test("add the same item in waiting list and close modal", async () => {
    render(<RoleSearchModal teamOid={""} />, null, { store: data });

    const openButton = screen.getByTestId("open-modal");
    fireEvent.click(openButton);

    const textInput: HTMLInputElement = screen.getByLabelText("text-input");
    fireEvent.change(textInput, { target: { value: "caccia" } });
    expect(textInput.value).toBe("caccia");
    fireEvent.keyDown(textInput, { key: "Enter", code: "Enter", charCode: 13 });

    const searchedItemList = await waitFor(() =>
      screen.getAllByLabelText("searched-role-item"),
    );

    const searchedItem = searchedItemList[0];
    fireEvent.click(searchedItem);

    //add the same item

    fireEvent.change(textInput, { target: { value: "caccia" } });
    expect(textInput.value).toBe("caccia");
    fireEvent.keyDown(textInput, { key: "Enter", code: "Enter", charCode: 13 });

    const searchedItemList2 = await waitFor(() =>
      screen.getAllByLabelText("searched-role-item"),
    );

    const searchedItem2 = searchedItemList2[0];
    fireEvent.click(searchedItem2);

    const closeModal = screen.getByTestId("close-modal");
    fireEvent.click(closeModal);
  });
  test("add role with mock data api addRoleToTeam", async () => {
    jest
      .spyOn(TeamService, "addRoleToTeam") //1st param can be path or parent instance of child method which we want to mock
      .mockResolvedValue({ data: "ok" } as AxiosResponse<string>);

    render(<RoleSearchModal teamOid={""} />, null, { store: data });

    const openButton = screen.getByTestId("open-modal");
    fireEvent.click(openButton);

    const textInput: HTMLInputElement = screen.getByLabelText("text-input");
    fireEvent.change(textInput, { target: { value: "caccia" } });
    expect(textInput.value).toBe("caccia");
    fireEvent.keyDown(textInput, { key: "Enter", code: "Enter", charCode: 13 });

    const searchedItemList = await waitFor(() =>
      screen.getAllByLabelText("searched-role-item"),
    );

    const searchedItem = searchedItemList[0];
    fireEvent.click(searchedItem);

    const ajouterButtonApi = await waitFor(() =>
      screen.getByTestId("ajouter-button-api"),
    );
    waitFor(() => {
      fireEvent.click(ajouterButtonApi);
    });
  });

  test("test adding a role with status disabled in waiting searching table", async () => {
    jest
      .spyOn(TeamService, "addRoleToTeam") //1st param can be path or parent instance of child method which we want to mock
      .mockResolvedValue({ data: "ok" } as AxiosResponse<string>);

    render(<RoleSearchModal teamOid={""} />, null, { store: data });

    const openButton = screen.getByTestId("open-modal");
    fireEvent.click(openButton);

    const textInput: HTMLInputElement = screen.getByLabelText("text-input");
    fireEvent.change(textInput, { target: { value: "caccia" } });
    expect(textInput.value).toBe("caccia");
    fireEvent.keyDown(textInput, { key: "Enter", code: "Enter", charCode: 13 });

    const searchedItemList = await waitFor(() =>
      screen.getAllByLabelText("searched-role-item"),
    );

    const searchedItem = searchedItemList[1];
    fireEvent.click(searchedItem);

    const ajouterButtonApi = await waitFor(() =>
      screen.getByTestId("ajouter-button-api"),
    );
    waitFor(() => {
      fireEvent.click(ajouterButtonApi);
    });
  });

  test("test roles searching with keyword @", async () => {
    jest
      .spyOn(TeamService, "addRoleToTeam") //1st param can be path or parent instance of child method which we want to mock
      .mockResolvedValue({ data: "ok" } as AxiosResponse<string>);

    render(<RoleSearchModal teamOid={""} />, null, { store: data });

    const openButton = screen.getByTestId("open-modal");
    fireEvent.click(openButton);

    const textInput = screen.getByLabelText("text-input");

    fireEvent.change(textInput, { target: { value: "@" } });
    const notFoundItem = screen.getByText(MESSAGES.NO_ROLE_FOUND);
    expect(notFoundItem).toBeInTheDocument();
  });

  test("test adding the role CACCIA_ZCE_v2 existed in the team ", async () => {
    jest
      .spyOn(TeamService, "addRoleToTeam") //1st param can be path or parent instance of child method which we want to mock
      .mockResolvedValue({ data: "ok" } as AxiosResponse<string>);

    render(<RoleSearchModal teamOid={""} />, null, { store: data });

    const openButton = screen.getByTestId("open-modal");
    fireEvent.click(openButton);

    const textInput = screen.getByLabelText("text-input");

    fireEvent.change(textInput, { target: { value: "CACCIA_ZCE_v2" } });

    const searchedItemList = await waitFor(() =>
      screen.getAllByLabelText("searched-role-item"),
    );

    const searchedItem = searchedItemList[0];
    fireEvent.click(searchedItem);
  });
});
