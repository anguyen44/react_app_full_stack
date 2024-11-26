import { screen, waitFor } from "@testing-library/react";
import { BlueSectionTitle } from "shared/components/text/text.component";
import RoleService from "shared/services/role/role.service";
import { render } from "test/utils";

import TeamPermission, {
  PermissionsSectionTitle,
  PermissionsTable,
  SectionWrapper,
  SpanContent,
  StrongLabel,
  TableWrapper,
} from "./teamPermissions.component";

jest.mock("../../../../shared/services/role/role.service", () => {
  return {
    getRoleByOid: jest.fn(),
  };
});

describe("Testing the component in TeamPermissions view", () => {
  test("Tesing SectionWrapper component", () => {
    render(<SectionWrapper>abc</SectionWrapper>);
    const content = screen.getByText("abc");
    expect(content).toHaveStyle("padding-bottom:10px");
  });

  test("Tesing TableWrapper component", () => {
    render(<TableWrapper>abc</TableWrapper>);
    const content = screen.getByText("abc");
    expect(content).toHaveStyle("padding-top:10px");
  });

  test("Tesing PermissionsSectionTitle component", () => {
    render(<PermissionsSectionTitle>abc</PermissionsSectionTitle>);
    const content = screen.getByText("abc");
    expect(content).toHaveStyle("color:#248BC0");
  });

  test("Tesing BlueSectionTitle component with size", () => {
    render(<BlueSectionTitle size="10px">abc</BlueSectionTitle>);
    const content = screen.getByText("abc");
    expect(content).toHaveStyle("font-size:10px");
  });

  test("Tesing BlueSectionTitle component with no size", () => {
    render(<BlueSectionTitle>abc</BlueSectionTitle>);
    const content = screen.getByText("abc");
    expect(content).toHaveStyle("font-weight:600");
  });

  test("Tesing StrongLabel component", () => {
    render(<StrongLabel>abc</StrongLabel>);
    const content = screen.getByText("abc");
    expect(content).toHaveStyle("color: rgba(0, 0, 0, 0.5411764706)");
  });

  test("Tesing SpanContent component", () => {
    render(<SpanContent>abc</SpanContent>);
    const content = screen.getByText("abc");
    expect(content).toHaveStyle("font-size: 14px");
  });

  test("Tesing PermissionsTable component with mode admin", () => {
    render(
      <PermissionsTable
        permissions={[
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
          {
            oid: "e13b1885-5e51-4d77-9762-b10de9de7282",
            name: "6YN_ZSEv2-ZA_POD1_Kyss-appli_Read_2",
            isActive: false,
            type: null,
            zone: null,
            value: null,
            environment: null,
            description: null,
            deleted: true,
          },
        ]}
        mode="admin"
      />,
    );
  });

  test("Tesing PermissionsTable component with mode lamda", () => {
    render(<PermissionsTable permissions={[]} mode="lamda" />);
  });

  test("Tesing PermissionsTable component with mode admin and permissions data", () => {
    render(
      <PermissionsTable
        permissions={[
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
        ]}
        mode="admin"
      />,
    );
  });

  test("Tesing TeamPermission component and getRoleByOid api launched with success", () => {
    RoleService.getRoleByOid.mockImplementation(() =>
      Promise.resolve({
        oid: "7735af60-d9c5-4987-90a2-a961d5f4c3b6",
        name: "000003-6YN-000002",
        displayName: "CACCIA_ACCES_POD1",
        description: null,
        portfolio: null,
        isActive: true,
        permissions: [
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
          {
            oid: "e13b1885-5e51-4d77-9762-b10de9de7282",
            name: "6YN_ZSEv2-ZA_POD1_Kyss-appli_Read_2",
            isActive: false,
            type: null,
            zone: null,
            value: null,
            environment: null,
            description: null,
            deleted: true,
          },
        ],
        deleted: false,
      }),
    );
    waitFor(() => {
      render(
        <TeamPermission roleOid="abc" onCloseModal={jest.fn()} showModal />,
      );
    });
  });

  test("Tesing TeamPermission component and getRoleByOid api launched with failure", () => {
    RoleService.getRoleByOid.mockImplementation(() =>
      Promise.reject({ error: "error" }),
    );
    render(<TeamPermission roleOid="abc" onCloseModal={jest.fn()} showModal />);
  });
  test("Tesing TeamPermission component no roleId parameter and getRoleByOid api launched with failure", () => {
    RoleService.getRoleByOid.mockImplementation(() =>
      Promise.reject({ error: "error" }),
    );
    render(<TeamPermission onCloseModal={jest.fn()} showModal />);
  });
});
