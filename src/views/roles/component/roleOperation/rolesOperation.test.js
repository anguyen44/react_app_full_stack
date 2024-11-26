import { fireEvent, screen } from "@testing-library/react";
import { render } from "test/utils";

import RoleOperationComponent from "./RolesOperation.component";

test("Testing RoleOperationComponent component", () => {
  render(<RoleOperationComponent />);

  const returnButton = screen.getByTestId("returnButton");
  fireEvent.click(returnButton);
});
