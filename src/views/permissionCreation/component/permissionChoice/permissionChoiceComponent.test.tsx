import { mockWindowMatchMedia, render } from "test/utils";

import {
  mockPermissionType1,
  mockPermissionType2,
} from "test/mocks/mockPermission.utils";
import PermissionChoiceComponent from "./permissionChoice.component";
import { mockPortfolio } from "test/mocks/mockPortfolio.utils";
import { fireEvent } from "@testing-library/react";
import PermissionService from "shared/services/permission/permission.service";

jest.mock("shared/services/permission/permission.service", () => {
  return {
    getPermissionsGeneration: jest.fn(),
  };
});

const mockStore = {
  store: {
    permissionCreationReducer: {
      permissionTypes: [mockPermissionType1, mockPermissionType2],
      resourceTypeOid: mockPermissionType2.oid,
      subType: "menu1",
      subPerimeter: "B001",
      environments: ["dev", "prod"],
      zones: ["ZA"],
      values: ["lecteur", "editeur", "auditeur"],
      permissionsGeneration: [],
      selectedPermissionPosibilities: [],
      permissionsPosibilitiesInCart: [],
    },
  },
};

describe("Test PermissionChoiceComponent", () => {
  beforeAll(() => {
    mockWindowMatchMedia();
  });

  test("Render PermissionChoiceComponent with selected permission template elements", () => {
    const { getByTestId } = render(
      <PermissionChoiceComponent portfolio={mockPortfolio} />,
      null,
      mockStore,
    );

    const filterButton = getByTestId("filterButton");
    fireEvent.click(filterButton);
    expect(PermissionService.getPermissionsGeneration).toHaveBeenCalledTimes(1);
  });
});
