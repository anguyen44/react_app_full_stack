import { fireEvent, screen } from "@testing-library/react";
import { render } from "test/utils";
import RolesOrgComponent from "./rolesOrg.component";
import { TeamPageReducer } from "shared/store/slices/teamPage/teamPage.slice";
import RoleModel from "shared/model/role.model";
import PortfolioModel from "shared/model/portfolio.model";

const mockTeamPageReducer = {
  readOnly: true,
  isWriting: false,
  roles: [
    {
      oid: "7735af60-d9c5-4987-90a2-a961d5f4c3b6",
      name: "000003-6YN-000002",
      displayName: "CACCIA_ACCES_POD1",
      description: null,
      portfolio: {
        oid: "3f23107a-c25c-49a6-ac0b-5b4c5fb2e0ff",
        name: "6YN",
        displayName: "6YN",
        description: "CACCIA",
        owner: {
          oid: "5f677741-7618-41d8-aa7c-24ab95c79934",
          nni: "A66978",
          givenName: "Vivien",
          email: "vivien.duflot@enedis.fr",
          familyName: "DUFLOT",
          fullName: "Vivien DUFLOT",
        },
      },
      isActive: true,
      deleted: true,
    },
    {
      oid: "bf84d674-027f-4861-8429-d77ae46eb978",
      name: "000003-6YN-000001",
      displayName: "CACCIA N3",
      description: null,
      portfolio: {
        oid: "3f23107a-c25c-49a6-ac0b-5b4c5fb2e0ff",
        name: "6YN",
        displayName: "6YN",
        description: "CACCIA",
        owner: {
          oid: "5f677741-7618-41d8-aa7c-24ab95c79934",
          nni: "A66978",
          givenName: "Vivien",
          email: "vivien.duflot@enedis.fr",
          familyName: "DUFLOT",
          fullName: "Vivien DUFLOT",
        },
      },
      isActive: true,
      deleted: false,
    },
  ],
} as unknown as TeamPageReducer;

const mockRoles: RoleModel[] = [
  {
    oid: "004ac026-5d7e-45cd-a5a7-fb867ed1a8d2",
    name: "Role-00007-02H-1PTHOV",
    description: "ROLE DE TEST DE PERMISSIONS",
    displayName: "TEST PERMISSION GENERATION",
    isActive: true,
    portfolio: {
      oid: "e82febaf-40d5-4cc4-840c-54ec33b456f3",
      name: "02H",
      description: "3",
      displayName: "SIG Elec",
      owner: {
        nni: null,
        givenName: null,
        email: null,
        description: null,
        fullName: null,
        name: null,
        formatDate: null,
        oid: null,
        lastSuccessfulLogin: "30/07/2024",
        lastFailedLogin: "30/07/2024",
        lastModifyPassword: "30/07/2024",
        deleted: false,
        isActive: true,
      },
      permissionTemplate: null,
      isActive: true,
    } as unknown as PortfolioModel,
    deleted: false,
    permissions: [],
    createTimestamp: "",
    modifyTimestamp: "",
    owner: undefined,
  },
  {
    oid: "8ae628ce-9a64-41eb-8089-6d5268a97684",
    name: "Role-00007-02H-T0XKLO",
    description: "Role de création de permission",
    displayName: "Test Permission Role",
    isActive: true,
    portfolio: {
      oid: "e82febaf-40d5-4cc4-840c-54ec33b456f3",
      name: "02H",
      description: "3",
      displayName: "SIG Elec",
      owner: {
        lastSuccessfulLogin: "30/07/2024",
        lastFailedLogin: "30/07/2024",
        lastModifyPassword: "30/07/2024",
        deleted: false,
        nni: "",
        givenName: "",
        email: "",
        isActive: true,
        description: "",
        fullName: "",
        formatDate: function (): string {
          throw new Error("Function not implemented.");
        },
        name: "",
        oid: "",
      },
      permissionTemplate: null,
      isActive: true,
    } as unknown as PortfolioModel,
    deleted: false,
    permissions: [],
    createTimestamp: "",
    modifyTimestamp: "",
    owner: undefined,
  },
  {
    oid: "1121d435-db90-4150-9108-44fe7b06f255",
    name: "Role-00007-D0R-HCXBVH",
    description: "test",
    displayName: "Test Role",
    isActive: true,
    portfolio: {
      oid: "75296e99-216c-4498-8cd0-15b1cae1dc5b",
      name: "D0R",
      description: "2",
      displayName: "THE DOORS",
      owner: {
        lastSuccessfulLogin: "30/07/2024",
        lastFailedLogin: "30/07/2024",
        lastModifyPassword: "30/07/2024",
        deleted: false,
        nni: "",
        givenName: "",
        email: "",
        isActive: true,
        description: "",
        fullName: "",
        formatDate: function (): string {
          throw new Error("Function not implemented.");
        },
        name: "",
        oid: "",
      },
      permissionTemplate: null,
      isActive: true,
    } as unknown as PortfolioModel,
    deleted: false,
    permissions: [],
    createTimestamp: "",
    modifyTimestamp: "",
    owner: undefined,
  },
  {
    oid: "aeeef031-77f7-49c8-aa21-23fb5d628d9f",
    name: "Role-00007-02B-X10VNE",
    description: "test",
    displayName: "Test Role Julia",
    isActive: true,
    portfolio: {
      oid: "0025b145-b77f-4db6-abef-e8f34c085c5a",
      name: "02B",
      description: "3",
      displayName: "IPILOT",
      owner: {
        lastSuccessfulLogin: "30/07/2024",
        lastFailedLogin: "30/07/2024",
        lastModifyPassword: "30/07/2024",
        deleted: false,
        nni: "",
        givenName: "",
        email: "",
        isActive: true,
        description: "",
        fullName: "",
        formatDate: function (): string {
          throw new Error("Function not implemented.");
        },
        name: "",
        oid: "",
      },
      permissionTemplate: null,
      isActive: true,
    } as unknown as PortfolioModel,
    deleted: false,
    permissions: [],
    createTimestamp: "",
    modifyTimestamp: "",
    owner: undefined,
  },
  {
    oid: "d382b22e-6737-4c61-b795-80bab347de93",
    name: "Role-00007-02H-D5KFUO",
    description: "test génération",
    displayName: "Test génération permissions",
    isActive: true,
    portfolio: {
      oid: "e82febaf-40d5-4cc4-840c-54ec33b456f3",
      name: "02H",
      description: "3",
      displayName: "SIG Elec",
      owner: {
        lastSuccessfulLogin: "30/07/2024",
        lastFailedLogin: "30/07/2024",
        lastModifyPassword: "30/07/2024",
        deleted: false,
        nni: "",
        givenName: "",
        email: "",
        isActive: true,
        description: "",
        fullName: "",
        formatDate: function (): string {
          throw new Error("Function not implemented.");
        },
        name: "",
        oid: "",
      },
      permissionTemplate: null,
      isActive: true,
    } as unknown as PortfolioModel,
    deleted: false,
    permissions: [],
    createTimestamp: "",
    modifyTimestamp: "",
    owner: undefined,
  },
  {
    oid: "a63cea39-8b51-4f91-87bd-1ae0b68f6412",
    name: "Role-00007-SWB-SUKX3T",
    description: "test",
    displayName: "role anh test alex",
    isActive: true,
    portfolio: {
      oid: "841fb05b-ba4b-49c9-ae69-a44aa66f55f7",
      name: "SWB",
      description: "3",
      displayName: "ALEX",
      owner: {
        lastSuccessfulLogin: "30/07/2024",
        lastFailedLogin: "30/07/2024",
        lastModifyPassword: "30/07/2024",
        deleted: false,
        nni: "",
        givenName: "",
        email: "",
        isActive: true,
        description: "",
        fullName: "",
        formatDate: function (): string {
          throw new Error("Function not implemented.");
        },
        name: "",
        oid: "",
      },
      permissionTemplate: null,
      isActive: true,
    } as unknown as PortfolioModel,
    deleted: false,
    permissions: [],
    createTimestamp: "",
    modifyTimestamp: "",
    owner: undefined,
  },
];

const mockTeamPageReducerWithWriting = {
  readOnly: false,
  isWriting: true,
  teamInfo: {
    oid: "123",
    name: "name",
  },
  roles: [
    {
      oid: "7735af60-d9c5-4987-90a2-a961d5f4c3b6",
      name: "000003-6YN-000002",
      displayName: "CACCIA_ACCES_POD1",
      description: null,
      portfolio: null,
      isActive: true,
      deleted: true,
    },
    {
      oid: "bf84d674-027f-4861-8429-d77ae46eb978",
      name: "000003-6YN-000001",
      displayName: "CACCIA N3",
      description: null,
      portfolio: null,
      isActive: true,
      deleted: false,
    },
  ],
} as TeamPageReducer;

describe("Testint TeamRolesComponent component", () => {
  test("Testing TeamRolesComponent component with redux mock data", async () => {
    const data = {
      teamPageReducer: mockTeamPageReducerWithWriting,
      rolePageReducer: {
        baseInfo: {
          deleted: false,
          oid: "ff650ba8-177d-4f9d-a4c5-ae3b12e22624",
          name: "Role-00003-D0R-64G98P",
          displayName: "role_sans_validation",
          description: "test 444",
          portfolio: {
            oid: "1e381534-42f5-48e5-a3ed-c6ea59ec31da",
            name: "D0R",
            displayName: "D0R",
            description: "Actifs de DOORS",
            owner: {
              deleted: false,
              oid: "d147ba23-725d-41b4-b7d3-29e518e89059",
              nni: "FK7EFE5N",
              name: "KOUYATE",
              givenName: "FADJIMBA",
              email: "fadjimba-externe.kouyate@enedis.fr",
              isActive: false,
              lastSuccessfulLogin: "12/03/2024",
              lastFailedLogin: "12/03/2024",
              lastModifyPassword: "12/03/2024",
              description: null,
              fullName: "KOUYATE FADJIMBA",
            },
          },
          isActive: true,
          createTimestamp: "2024-01-24T10:18:46.552+01:00",
          modifyTimestamp: "2024-01-24T10:18:52.306+01:00",
          owner: {
            deleted: false,
            oid: "93265e94-ac17-458e-b0d5-a81dd7c08c66",
            nni: "JW1E54EL",
            name: "WILDENBERG",
            givenName: "JULIA",
            email: "julia-externe.wildenberg@enedis.fr",
            isActive: false,
            lastSuccessfulLogin: "12/03/2024",
            lastFailedLogin: "12/03/2024",
            lastModifyPassword: "12/03/2024",
            description: null,
            fullName: "JULIA WILDENBERG",
          },
        },
      },
    };
    render(
      <RolesOrgComponent
        confirmRemoveRole={jest.fn()}
        orgOid={"123"}
        isLoadingDeleteRoleInOrgByOidList={[]}
        reducerState={mockTeamPageReducerWithWriting}
      />,
      null,
      { store: data },
    );

    const rowsPerPageButton = await screen.getByTestId(
      `deletRoleBtn-${data.teamPageReducer.roles[0].oid}`,
    );
    fireEvent.click(rowsPerPageButton);
  });

  test("Testing TeamRolesComponent component with redux mock data and not in writing mode", async () => {
    render(
      <RolesOrgComponent
        confirmRemoveRole={jest.fn()}
        orgOid={"123"}
        isLoadingDeleteRoleInOrgByOidList={[]}
        reducerState={mockTeamPageReducer}
      />,
      null,
      {
        store: {
          teamPageReducer: mockTeamPageReducer,
          rolePageReducer: {
            baseInfo: {
              deleted: false,
              oid: "ff650ba8-177d-4f9d-a4c5-ae3b12e22624",
              name: "Role-00003-D0R-64G98P",
              displayName: "role_sans_validation",
              description: "test 444",
              portfolio: {
                oid: "1e381534-42f5-48e5-a3ed-c6ea59ec31da",
                name: "D0R",
                displayName: "D0R",
                description: "Actifs de DOORS",
                owner: {
                  deleted: false,
                  oid: "d147ba23-725d-41b4-b7d3-29e518e89059",
                  nni: "FK7EFE5N",
                  name: "KOUYATE",
                  givenName: "FADJIMBA",
                  email: "fadjimba-externe.kouyate@enedis.fr",
                  isActive: false,
                  lastSuccessfulLogin: "12/03/2024",
                  lastFailedLogin: "12/03/2024",
                  lastModifyPassword: "12/03/2024",
                  description: null,
                  fullName: "KOUYATE FADJIMBA",
                },
              },
              isActive: true,
              createTimestamp: "2024-01-24T10:18:46.552+01:00",
              modifyTimestamp: "2024-01-24T10:18:52.306+01:00",
              owner: {
                deleted: false,
                oid: "93265e94-ac17-458e-b0d5-a81dd7c08c66",
                nni: "JW1E54EL",
                name: "WILDENBERG",
                givenName: "JULIA",
                email: "julia-externe.wildenberg@enedis.fr",
                isActive: false,
                lastSuccessfulLogin: "12/03/2024",
                lastFailedLogin: "12/03/2024",
                lastModifyPassword: "12/03/2024",
                description: null,
                fullName: "JULIA WILDENBERG",
              },
            },
          },
        },
      },
    );
  });
});
