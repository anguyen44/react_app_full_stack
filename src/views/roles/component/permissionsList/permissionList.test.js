import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "test/utils";

import PermissionsListComponent from "./PermissionsList.component";

const data = {
  rolePageReducer: {
    permissions: [
      {
        oid: "6b8ab1eb-1b60-4348-b4df-d654bd456d05",
        name: "6YN_ZSEv2-ZA_PROD_Kyss_appli_Read",
        isActive: true,
        type: null,
        zone: null,
        value: null,
        environment: null,
        description: null,
        deleted: true,
      },
      {
        oid: "e13b1885-5e51-4d77-9762-b10de9de7286",
        name: "6YN_ZSEv2-ZA_POD1_Kyss-appli_Read",
        isActive: true,
        type: null,
        zone: null,
        value: null,
        environment: null,
        description: null,
        deleted: false,
      },
    ],
  },
};

test("test function  getPermissionAction", async () => {
  render(
    <PermissionsListComponent
      permissions={data.rolePageReducer.permissions}
      confirmRemovePermission={jest.fn()}
    />,
    null,
    { store: data },
  );

  const confirmRemoveButton = await waitFor(() =>
    screen.getByTestId(
      `deletePermissionBtn-${data.rolePageReducer.permissions[0].oid}`,
    ),
  );
  act(() => {
    fireEvent.click(confirmRemoveButton);
  });
});
