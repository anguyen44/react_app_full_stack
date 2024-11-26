import "jest-styled-components";

import { screen } from "@testing-library/react";
import { render } from "test/utils";

import Modal from "./modal.component";

describe("Modal testing", () => {
  test("Modal component invisible testing", () => {
    const { container } = render(
      <Modal
        visible={false}
        onCancel={jest.fn()}
        title={<p style={{ margin: 0 }}>Title</p>}
      >
        Content Text
      </Modal>,
    );

    expect(container.firstChild).not.toBeInTheDocument();
  });
  test("Modal component visible testing", () => {
    render(
      <Modal
        visible
        onCancel={jest.fn()}
        title={<p style={{ margin: 0 }}>Title</p>}
        width={800}
        headerDivider
        footer={<button>close</button>}
      >
        Content Text
      </Modal>,
    );

    const modalDiv = screen.getByTestId("modal-section");
    expect(modalDiv).toHaveStyleRule("width", "800px");
  });

  test("Modal component visible testing without width param", () => {
    render(
      <Modal
        visible
        onCancel={jest.fn()}
        title={<p style={{ margin: 0 }}>Title</p>}
        headerDivider
        footer={<button>close</button>}
      >
        Content Text
      </Modal>,
    );

    const modalDiv = screen.getByTestId("modal-section");
    expect(modalDiv).not.toHaveStyleRule("min-width", "900px");
  });
});
