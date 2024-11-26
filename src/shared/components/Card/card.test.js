import { render } from "test/utils";

import Card from "./Card";

describe("Test Card Component", () => {
  const defaultProps = {
    open: false,
    type: "error",
    message: "test me",
    duration: 5000,
  };

  it("Render Card closed", () => {
    const { queryByText } = render(<Card {...defaultProps} />);
    const message = queryByText("test me");
    expect(message).not.toBeInTheDocument();
  });

  it("Render Card open", () => {
    const { getByText } = render(<Card {...defaultProps} open />);
    const message = getByText("test me");
    expect(message).toBeInTheDocument();
  });
});
