import { fireEvent } from "@testing-library/react";
import { render } from "test/utils";

import AlertDialog from "./AlertDialog";

const defaultProps = {
  open: false,
  titleButtonAction: "No title button",
  title: "No title button",
  description: "No description",
};

const dataProps = {
  dataActions: {
    memberOid: "05d07c3b-7ea8-4bdb-883b-c281a880dd7d",
    memberFullName: "DUFLOT VIVIEN",
  },
  titleButtonAction: "Supprimer",
  title: "Test title",
  description: "Test description",
  open: true,
  handleAction: jest.fn(),
};

describe("Render Alert Component", () => {
  it("Should be not displayed", () => {
    const { queryByText } = render(<AlertDialog {...defaultProps} />);

    const title = queryByText(defaultProps.title);
    expect(title).not.toBeInTheDocument();

    const titleButtonAction = queryByText(defaultProps.titleButtonAction);
    expect(titleButtonAction).not.toBeInTheDocument();

    const description = queryByText(defaultProps.description);
    expect(description).not.toBeInTheDocument();
  });

  it("Should be displayed", () => {
    const { getByText } = render(<AlertDialog {...dataProps} />);

    const title = getByText(dataProps.title);
    expect(title).toBeInTheDocument();

    const titleButtonAction = getByText(dataProps.titleButtonAction);
    expect(titleButtonAction).toBeInTheDocument();

    const description = getByText(dataProps.description);
    expect(description).toBeInTheDocument();
  });

  it("Should trigger function once", () => {
    const { getByText } = render(<AlertDialog {...dataProps} />);
    const button = getByText(dataProps.titleButtonAction);

    expect(dataProps.handleAction).toHaveBeenCalledTimes(0);
    fireEvent.click(button);
    expect(dataProps.handleAction).toHaveBeenCalledTimes(1);
  });
});
