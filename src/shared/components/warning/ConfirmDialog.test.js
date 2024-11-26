import { render } from "test/utils";

import ConfirmDialog from "./ConfirmDialog.component";

describe("Tests for ConfirmDialog component", () => {
  it("test ConfirmDialog showing", () => {
    const modalDiv = document.createElement("div");
    modalDiv.setAttribute("id", "portal");
    document.body.appendChild(modalDiv);
    render(
      <ConfirmDialog
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
        show
        title={"title"}
        text={"text"}
        type="danger"
      />,
    );
  });

  it("test ConfirmDialog not showing", () => {
    render(
      <ConfirmDialog
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
        show={false}
        title={"title"}
        text={"text"}
        type="danger"
      />,
    );
  });
});
