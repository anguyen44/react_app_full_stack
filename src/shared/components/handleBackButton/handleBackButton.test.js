import { fireEvent } from "@testing-library/react";
import { render } from "test/utils";

import { HandleBackButton } from "./handleBackButton.component";

describe("test handleBackButton component", () => {
  it("test rendering handleBackButton component", () => {
    const { getByTestId } = render(<HandleBackButton />);

    const backButton = getByTestId("back-button");
    fireEvent.click(backButton);
  });

  it("test rendering handleBackButton component with customBackButtonFunc param", () => {
    const { getByTestId } = render(
      <HandleBackButton customBackButtonFunc={jest.fn()} />,
    );

    const backButton = getByTestId("back-button");
    fireEvent.click(backButton);
  });
});
