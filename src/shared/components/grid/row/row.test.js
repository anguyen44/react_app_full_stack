import { render, screen } from "@testing-library/react";

import Row from "./row.component";

test("testing props, correctly rendering of ROW component", () => {
  render(<Row>Testing</Row>);
  const textRender = screen.getByText("Testing");

  expect(textRender).toBeInTheDocument();
  expect(textRender).toHaveStyle("display: flex");
});
