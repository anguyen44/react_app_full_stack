import { render, mockWindowMatchMedia } from "test/utils";

import PermissionCreationView from "./permissionCreation.view";
import { mockRoleWithPortfolio } from "test/mocks/mockRole.utils";
import PermissionTypesService from "shared/services/permissionTypes/permissionTypes.service";
import {
  mockPermissionType1,
  mockPermissionType2,
} from "test/mocks/mockPermission.utils";

jest.mock("shared/services/permissionTypes/permissionTypes.service", () => {
  return {
    getPermissionTypes: jest.fn(),
  };
});

const mockStore = {
  store: {
    rolePageReducer: {
      baseInfo: mockRoleWithPortfolio,
    },
  },
};

describe("Test PermissionCreationView component", () => {
  beforeAll(() => {
    mockWindowMatchMedia();
    const getPermissionTypesMock =
      PermissionTypesService.getPermissionTypes as jest.MockedFunction<
        typeof PermissionTypesService.getPermissionTypes
      >;
    getPermissionTypesMock.mockImplementation(() =>
      Promise.resolve([mockPermissionType1, mockPermissionType2]),
    );
  });

  test("Render PermissionCreationView", () => {
    render(<PermissionCreationView />, null, mockStore);
  });
});
