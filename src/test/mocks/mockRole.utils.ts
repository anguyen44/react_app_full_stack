import RoleModel from "shared/model/role.model";
import { mockPermission } from "./mockPermission.utils";
import { mockPortfolio } from "./mockPortfolio.utils";

export const mockRole = {
  oid: "7735af60-d9c5-4987-90a2-a961d5f4c3b6",
  name: "000003-6YN-000002",
  displayName: "CACCIA_ACCES_POD1",
  createTimestamp: "2023-01-23T14:44:45.072+01:00",
  modifyTimestamp: "2023-01-23T14:44:45.072+01:00",
  isActive: true,
  description: null,
  portfolio: null,
  owner: null,
  permissions: [mockPermission],
} as RoleModel;

export const mockRoleWithPortfolio = {
  ...mockRole,
  portfolio: mockPortfolio,
};
