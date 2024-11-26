import { screen } from "@testing-library/react";
import { render } from "test/utils";

import Layout from "./layout.component";

test("correct rendering layout", () => {
  render(<Layout>Text</Layout>);
  const layoutComponentChilren = screen.getByText("Text");
  expect(layoutComponentChilren).toBeInTheDocument();
});
