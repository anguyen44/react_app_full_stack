import { render } from "@testing-library/react";

import Divider from "./divider.component";

test("Divider basic component testing", () => {
  const { container } = render(<Divider />);
  expect(container.firstChild).toHaveStyle("border-bottom: 1px solid #E9E9E9");
});
