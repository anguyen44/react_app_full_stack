import { fireEvent } from "@testing-library/react";
import { render } from "test/utils";

import Header from "./header.component";

const location = new URL("http://localhost:3000");
location.assign = jest.fn();
location.replace = jest.fn();
location.reload = jest.fn();

delete window.location;
window.location = location;

describe("all test header", () => {
  test("header navbar link testing with location no port", () => {
    const url = "http://localhost";
    Object.defineProperty(window, "location", {
      value: new URL(url),
    });
    const { getByText, getByLabelText } = render(<Header />);
    const menuLink = getByText("Menu");
    fireEvent.click(menuLink);

    const userProfilSection = getByLabelText("profilSection");

    fireEvent.click(userProfilSection);

    const deconnectButton = getByText("Déconnexion");
    fireEvent.click(deconnectButton);
  });
  test("header navbar link testing with location port 3000", () => {
    const url = "http://localhost:3000";
    Object.defineProperty(window, "location", {
      value: new URL(url),
    });
    const { getByText, getByLabelText } = render(<Header />);
    const menuLink = getByText("Menu");
    fireEvent.click(menuLink);

    const userProfilSection = getByLabelText("profilSection");

    fireEvent.click(userProfilSection);

    const deconnectButton = getByText("Déconnexion");
    fireEvent.click(deconnectButton);

    const modifyPasswordButton = getByText("Modifier mon mot de passe");
    fireEvent.click(modifyPasswordButton);
  });
});
