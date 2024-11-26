import React from "react";
import { render } from "test/utils";

import App from "./App";
import Routing from "./routing";

describe("unit-test for app routes", () => {
  it("renders the right component with following path '/dashboard'", () => {
    render(<Routing />);
  });

  it("renders the App component ", () => {
    render(<App />);
  });
});
