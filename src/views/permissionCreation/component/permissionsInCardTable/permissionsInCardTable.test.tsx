import { fireEvent, screen } from "@testing-library/react";
import { render, mockWindowMatchMedia } from "test/utils";

import PermissionsInCardTable from "./permissionsInCardTable.component";
import { mockPortfolio } from "test/mocks/mockPortfolio.utils";
import { buildPermissionDetailsModelMock } from "test/mocks/mockPermission.utils";

describe("test PermissionsInCardTable component", () => {
  beforeAll(() => {
    mockWindowMatchMedia();
  });
  test("render PermissionsInCardTable component", () => {
    let mockStore = {
      store: {
        permissionCreationReducer: {
          permissionsPosibilitiesInCart: [
            buildPermissionDetailsModelMock(
              "D0R_ZA_prod_Midpoint-menu1_auditeur",
            ),
            buildPermissionDetailsModelMock(
              "D0R_ZA_dev_Midpoint-menu1_lecteur",
            ),
          ],
        },
      },
    };
    const { container } = render(
      <PermissionsInCardTable portfolioOid={mockPortfolio.oid} />,
      null,
      mockStore,
    );

    const deleteIcons = container.getElementsByClassName("deleteIcon");
    expect(deleteIcons.length).toBe(2);

    fireEvent.click(deleteIcons[0]);
    expect(deleteIcons.length).toBe(1);
    const allDeleteButton = screen.getByTestId("allDeleteButton");
    fireEvent.click(allDeleteButton);
  });
});
