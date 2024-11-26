import { render } from "@testing-library/react";
import { mockPermission } from "test/mocks/mockPermission.utils";
import PermissionTooltipComponent from "./permissionTooltip.component";

describe("Test PermissionTooltip component", () => {
  test("render PermissionTooltip component", () => {
    const { getByTestId } = render(
      <PermissionTooltipComponent
        permissions={[mockPermission]}
        permissionOid={mockPermission.oid}
      />,
    );
    testHasValue("Périmètre", mockPermission.perimeter, getByTestId);
    testHasValue("Sous-périmètre", mockPermission.subPerimeter, getByTestId);
    testHasValue("Zone", mockPermission.zone, getByTestId);
    testHasValue("Environnement", mockPermission.environment, getByTestId);
    testHasValue("Type", mockPermission.type, getByTestId);
    testHasValue("Sous-type", mockPermission.subType, getByTestId);
    testHasValue("Valeur", mockPermission.value, getByTestId);
  });
});

const testHasValue = (
  testId: string,
  value: string,
  getByTestId: (id: string) => HTMLElement,
) => {
  const element = getByTestId(testId);
  expect(element).toBeInTheDocument();
  expect(element.lastChild.textContent).toBe(value);
};
