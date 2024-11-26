import { fireEvent, screen } from "@testing-library/react";
import { render, mockWindowMatchMedia } from "test/utils";

import PermissionsGenerationTable from "./permissionsGenerationTable.component";
import PermissionModel from "shared/model/permission.model";
import PermissionDetailsModel from "shared/model/permissionTemplate/permissionDetails.model";
import PermissionElementModel from "shared/model/permissionTemplate/permissionElement.model";
import { buildPermissionDetailsModelMock } from "test/mocks/mockPermission.utils";

describe("test PermissionsGenerationTable component", () => {
  beforeAll(() => {
    mockWindowMatchMedia();
  });
  test("render PermissionsGenerationTable component", () => {
    let mockStore = {
      store: {
        permissionCreationReducer: {
          permissionsGeneration: [
            buildPermissionDetailsModelMock(
              "D0R-NULL_ZA_prod_Midpoint-menu1_auditeur",
            ),
            buildPermissionDetailsModelMock(
              "D0R-NULL_ZA_dev_Midpoint-menu1_lecteur",
            ),
            buildPermissionDetailsModelMock(
              "D0R-NULL_ZA_prod_Midpoint-menu1_lecteur",
            ),
            buildPermissionDetailsModelMock(
              "D0R-NULL_ZA_dev_Midpoint-menu1_auditeur",
            ),
            buildPermissionDetailsModelMock(
              "D0R-NULL_ZA_dev_Midpoint-menu1_editeur",
            ),
          ],
          selectedPermissionPosibilities: [
            "D0R-NULL_ZA_prod_Midpoint-menu1_auditeur",
            "D0R-NULL_ZA_dev_Midpoint-menu1_lecteur",
          ],
          permissionsPosibilitiesInCart: [],
        },
      },
    };
    const { container } = render(
      <PermissionsGenerationTable />,
      null,
      mockStore,
    );

    const addPermissionsToCardButton = screen.getByTestId(
      "addPermissionsToCardButton",
    );
    fireEvent.click(addPermissionsToCardButton);

    expect(container.getElementsByClassName("table-row-light").length).toBe(2);
  });
});
