import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import MESSAGES from "shared/config/constants/message.config";
import UserService from "shared/services/user/user.service";
import { render } from "test/utils";

import UsersSearchModal from "./usersSearchModal.component";
import { UserModel } from "shared/model/user.model";

jest.mock("axios", () => {
  return {
    create: jest.fn(() => ({
      get: jest.fn(),
      interceptors: {
        request: {
          use: jest.fn(),
        },
        response: {
          use: jest.fn(),
        },
      },
    })),
  };
});

jest.mock("../../../../shared/services/user/user.service", () => {
  return {
    getMemberByNniOrEmail: jest.fn(),
  };
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/sub_teams",
  }),
}));

const getMemberByNniOrEmail =
  UserService.getMemberByNniOrEmail as jest.MockedFunction<
    typeof UserService.getMemberByNniOrEmail
  >;

describe("List tests for testing UsersSearchModal component", () => {
  beforeEach(async () => {
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
      ]),
    );
  });
  test("UsersSearchModal testing d'ajout des membres", async () => {
    render(<UsersSearchModal teamOid={""} />);
    const openModal = screen.getByTestId("open-modal");
    fireEvent.click(openModal);

    const textInput: HTMLInputElement = screen.getByLabelText("text-input");

    fireEvent.change(textInput, { target: { value: "" } });
    expect(textInput.value).toBe("");
    act(() => textInput.focus());
    expect(textInput).toHaveFocus();
    const searchUserIcon = screen.getByLabelText("search-user-icon");
    fireEvent.click(searchUserIcon);

    fireEvent.change(textInput, { target: { value: "DFD9D78N" } });
    expect(textInput.value).toBe("DFD9D78N");
    fireEvent.keyDown(textInput, { key: "Enter", code: "Enter", charCode: 13 });

    const searchedItemList = await waitFor(() =>
      screen.getAllByLabelText("searched-user-item"),
    );

    const searchedItem = searchedItemList[0];
    fireEvent.click(searchedItem);
  });

  test("UsersSearchModal testing l'ouvert et la fermeture de modal", async () => {
    render(<UsersSearchModal teamOid={""} />);
    const openModal = screen.getByTestId("open-modal");
    fireEvent.click(openModal);

    const textInput: HTMLInputElement = screen.getByLabelText("text-input");
    fireEvent.change(textInput, { target: { value: "DFD9D78N" } });
    expect(textInput.value).toBe("DFD9D78N");
    fireEvent.keyDown(textInput, { key: "Enter", code: "Enter", charCode: 13 });
    const searchedItemList2 = await waitFor(() =>
      screen.getAllByLabelText("searched-user-item"),
    );
    fireEvent.click(searchedItemList2[0]);

    const closeModal = screen.getByTestId("close-modal");
    fireEvent.click(closeModal);
  });

  test("UsersSearchModal testing keydown different from enter", async () => {
    render(<UsersSearchModal teamOid={""} />);
    const openModal = screen.getByTestId("open-modal");
    fireEvent.click(openModal);

    const textInput: HTMLInputElement = screen.getByLabelText("text-input");
    fireEvent.keyDown(textInput, {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      charCode: 27,
    });
  });
});

describe("Test UsersSEarchModal when being failed to search no users", () => {
  beforeEach(async () => {
    getMemberByNniOrEmail.mockImplementation(() => Promise.resolve([]));
  });
  test("UsersSearchModal testing fetching aucune information", async () => {
    render(<UsersSearchModal teamOid={""} />);
    const openModal = screen.getByTestId("open-modal");
    fireEvent.click(openModal);

    const textInput: HTMLInputElement = screen.getByLabelText("text-input");
    fireEvent.change(textInput, { target: { value: "abc123" } });
    fireEvent.change(textInput, { target: { value: "" } });
    fireEvent.change(textInput, { target: { value: "abc123" } });
    expect(textInput.value).toBe("abc123");
    expect(() => {
      fireEvent.keyDown(textInput, {
        key: "Enter",
        code: "Enter",
        charCode: 13,
      });
    }).not.toThrow();

    const notFoundItem = await waitFor(() =>
      screen.getByText(MESSAGES.USER_NOT_FOUND),
    );
    expect(notFoundItem).toBeInTheDocument();
  });
});

describe("Test UsersSEarchModal when fetching failed 404", () => {
  beforeEach(async () => {
    getMemberByNniOrEmail.mockImplementation(() =>
      Promise.reject({
        response: {
          status: 404,
        },
      }),
    );
  });
  test("UsersSearchModal testing fetching aucune information", async () => {
    render(<UsersSearchModal teamOid={""} />);
    const openModal = screen.getByTestId("open-modal");
    fireEvent.click(openModal);

    /**Test with keyword being an inexisted code */
    const textInput: HTMLInputElement = screen.getByLabelText("text-input");
    fireEvent.change(textInput, { target: { value: "DFD9D" } });
    expect(textInput.value).toBe("DFD9D");
    expect(() => {
      fireEvent.keyDown(textInput, {
        key: "Enter",
        code: "Enter",
        charCode: 13,
      });
    }).not.toThrow();

    const notFoundItem = await waitFor(() =>
      screen.getByText(MESSAGES.USER_NOT_FOUND),
    );
    expect(notFoundItem).toBeInTheDocument();
  });
});

describe("Test UsersSEarchModal when fetching failed 404", () => {
  beforeEach(async () => {
    getMemberByNniOrEmail.mockImplementation(() =>
      Promise.reject({
        response: {
          status: 400,
        },
      }),
    );
  });
  test("UsersSearchModal testing fetching aucune information", async () => {
    render(<UsersSearchModal teamOid={""} />);
    const openModal = screen.getByTestId("open-modal");
    fireEvent.click(openModal);

    /**Test with keyword being an inexisted code */
    const textInput: HTMLInputElement = screen.getByLabelText("text-input");
    fireEvent.change(textInput, { target: { value: "DFD9DDDDD" } });
    expect(textInput.value).toBe("DFD9DDDDD");
    expect(() => {
      fireEvent.keyDown(textInput, {
        key: "Enter",
        code: "Enter",
        charCode: 13,
      });
    }).not.toThrow();

    const notFoundItem = await waitFor(() =>
      screen.getByText("Requête erronée - NNI ou email incorrect"),
    );
    expect(notFoundItem).toBeInTheDocument();
  });
});

describe("Test UsersSEarchModal when fetching failed 500", () => {
  beforeEach(async () => {
    getMemberByNniOrEmail.mockImplementation(() =>
      Promise.reject({
        response: {
          status: 500,
        },
      }),
    );
  });
  test("UsersSearchModal testing fetching aucune information", async () => {
    render(<UsersSearchModal teamOid={""} />);
    const openModal = screen.getByTestId("open-modal");
    fireEvent.click(openModal);

    /**Test with keyword being an inexisted code */
    const textInput: HTMLInputElement = screen.getByLabelText("text-input");
    fireEvent.change(textInput, { target: { value: "DFD9" } });
    expect(textInput.value).toBe("DFD9");
    expect(() => {
      fireEvent.keyDown(textInput, {
        key: "Enter",
        code: "Enter",
        charCode: 13,
      });
    }).not.toThrow();
  });
});
