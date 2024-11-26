import { render, screen } from "@testing-library/react";

import Col from "./col.component";

test("testing props, correctly rendering of Col component", () => {
  render(<Col spanPercent={"20%"}>Hello</Col>);
  const textSample = screen.getByText("Hello");
  expect(textSample).toBeInTheDocument();
  expect(textSample).toHaveStyle("flex-basis: 20%");
});
