import { render } from "test/utils";

import RoleInfosComponent from "./RoleInfos.component";

const data = {
  rolePageReducer: {
    baseInfo: {
      oid: "bf84d674-027f-4861-8429-d77ae46eb978",
      name: "000003-6YN-000001",
      displayName: "CACCIA_N3",
      description: "description",
      portfolio: null,
      isActive: true,
      createTimestamp: "2023-01-23T14:44:45.072+01:00",
      deleted: false,
    },
  },
};

const noData = {
  rolePageReducer: {
    baseInfo: null,
  },
};

const dataNoDescription = {
  rolePageReducer: {
    baseInfo: {
      oid: "bf84d674-027f-4861-8429-d77ae46eb978",
      name: "000003-6YN-000001",
      displayName: "CACCIA_N3",
      description: "",
      portfolio: null,
      isActive: false,
      deleted: false,
    },
  },
};

describe("testing roleInfos component", () => {
  test("testing roleInfos component without data", () => {
    render(<RoleInfosComponent />, null, { store: noData });
  });

  test("testing roleInfos component with data", () => {
    render(<RoleInfosComponent />, null, { store: data });
  });

  test("testing roleInfos component with data no description", () => {
    render(<RoleInfosComponent />, null, { store: dataNoDescription });
  });
});
