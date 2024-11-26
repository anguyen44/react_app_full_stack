import { fireEvent, screen } from "@testing-library/react";
import { render } from "test/utils";

const { useLocation, useParams } = require("react-router-dom");

import DashboardView from "./dashboard.view";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
  useParams: jest.fn(),
}));

export const userReducerData = {
  teams: [
    {
      oid: "2922a073-03d7-43d0-a04b-55810b36d675",
      name: "TEAM-000003",
      displayName: "IAM",
      createTimestamp: "",
      validateTimestamp: "",
      description: "Identity Access Management team",
      members: [
        {
          oid: "e201f906-75de-4eb9-bdf5-8591ed285b5b",
          nni: "G02470",
          name: "OUEDRAOGO",
          givenName: "Abdul rasmane a",
          email: "abdul-rasmane-a.ouedraogo@enedis.fr",
          isActive: true,
          lastSuccessfulLogin: "06 juin 2023",
          lastFailedLogin: "06 juin 2023",
          lastModifyPassword: "06 juin 2023",
          description: "",
          deleted: true,
        },
        {
          oid: "e201f906-75de-4eb9-bdf5-8591ed285b5b",
          nni: "G02471",
          name: "OUEDRAOGO",
          givenName: "Abdul rasmane a 2",
          email: "abdul-rasmane-a.ouedraogo@enedis.fr",
          isActive: true,
          lastSuccessfulLogin: "06 juin 2023",
          lastFailedLogin: "06 juin 2023",
          lastModifyPassword: "06 juin 2023",
          description: "",
          deleted: true,
        },
      ],
      roles: [],
      subTeams: [
        {
          oid: "e827cc0c-efac-46ce-9392-3a0dac5185e8",
          name: "TEAM-000003-000001",
          displayName: "Administrateurs CACCIA",
          createTimestamp: "2023-06-06T09:34:42.053+02:00",
          isActive: true,
          description: "Administrateurs de la Solution CACCIA",
          subTeams: null,
          members: [
            {
              oid: "e201f906-75de-4eb9-bdf5-8591ed285b5b",
              nni: "G02470",
              name: "OUEDRAOGO",
              givenName: "Abdul rasmane a",
              email: "abdul-rasmane-a.ouedraogo@enedis.fr",
              isActive: true,
              lastSuccessfulLogin: "06 juin 2023",
              lastFailedLogin: "06 juin 2023",
              lastModifyPassword: "06 juin 2023",
              description: "",
              deleted: true,
            },
            {
              oid: "e201f906-75de-4eb9-bdf5-8591ed285b5b",
              nni: "G02471",
              name: "OUEDRAOGO",
              givenName: "Abdul rasmane a 2",
              email: "abdul-rasmane-a.ouedraogo@enedis.fr",
              isActive: true,
              lastSuccessfulLogin: "06 juin 2023",
              lastFailedLogin: "06 juin 2023",
              lastModifyPassword: "06 juin 2023",
              description: "",
              deleted: false,
            },
          ],
          roles: null,
        },
        {
          oid: "3e1cb3b1-f608-4282-bf81-04dfaed98f8d",
          name: "TEAM-000003-000004",
          displayName: "Développeurs CACCIA",
          createTimestamp: null,
          isActive: true,
          description: "Développeurs de la Solution CACCIA",
          subTeams: null,
          members: null,
          roles: null,
        },
        {
          oid: "8bb0b47c-e3ba-4391-8fcd-a1ba6ca35e51",
          name: "TEAM-000003-000002",
          displayName: "Administrateurs PGS",
          createTimestamp: null,
          isActive: true,
          description: "Administrateurs de la Solution PGS",
          subTeams: null,
          members: null,
          roles: null,
        },
        {
          oid: "3509a288-e7b0-4e9e-80e3-b297bdc501b9",
          name: "TEAM-000003-000003",
          displayName: "Administrateurs DOORS",
          createTimestamp: "2023-03-30T16:24:22.919+02:00",
          isActive: true,
          description: "Administrateurs de la Solution DOORS",
          subTeams: null,
          members: null,
          roles: null,
        },
      ],
    },
    {
      oid: "157e9d3d-7446-4d47-a225-1a6c237f9cbc",
      name: "TEAM-000001",
      displayName: "SOLSEC",
      createTimestamp: "",
      validateTimestamp: "",
      description: "l'équipe solsec",
      members: [],
      roles: [],
      subTeams: [],
    },
    {
      oid: "7f5b7c08-2fd7-4961-8e41-bdfec9f10a2f",
      name: "TEAM-000002",
      displayName: "BSR",
      createTimestamp: "",
      validateTimestamp: "",
      description: "description de la team BSR",
      members: [
        {
          oid: "e201f906-75de-4eb9-bdf5-8591ed285b5b",
          nni: "G02470",
          name: "OUEDRAOGO",
          givenName: "Abdul rasmane a",
          email: "abdul-rasmane-a.ouedraogo@enedis.fr",
          isActive: true,
          lastSuccessfulLogin: "06 juin 2023",
          lastFailedLogin: "06 juin 2023",
          lastModifyPassword: "06 juin 2023",
          description: "",
          deleted: true,
        },
        {
          oid: "e201f906-75de-4eb9-bdf5-8591ed285b5b",
          nni: "G02471",
          name: "OUEDRAOGO",
          givenName: "Abdul rasmane a 2",
          email: "abdul-rasmane-a.ouedraogo@enedis.fr",
          isActive: true,
          lastSuccessfulLogin: "06 juin 2023",
          lastFailedLogin: "06 juin 2023",
          lastModifyPassword: "06 juin 2023",
          description: "",
          deleted: false,
        },
      ],
      roles: [],
      subTeams: [],
    },
  ],
  user: {
    id_token:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTAyMjQ5NzMsImF6cCI6ImlobSIsImF1dGhfdGltZSI6MTcxMDIxNzAxOCwiaWF0IjoxNzEwMjIxMzczLCJpc3MiOiJodHRwczovL2F1dGguZGV2LmQwci5kaWdpdGlhbS5jbG91ZC5zdGFyZ2F0ZS1ub2UuZW5lZGlzLmZyLyIsInN1YiI6ImZrN2VmZTVuIiwiYWNyIjoibG9hLTIiLCJhdF9oYXNoIjoiTjV6YzkzWDVZSVNrVUhBVWw2aUs3QSIsImF1ZCI6WyJpaG0iXX0.AQWteeWgYa0RhQi3S341ixDG9P3Fo2vgcM647CNpq1xT3vbM94oUmJX7bP03xPkiNWxKzCX_Zr7Ap9hykFNGXRzFilOpfqBQFlPc3P_JkPcwSysR_f1rPF5nEfdiuWzAiPDwKhiZrGXwFCw4js_yqGsoyXTz7SXw_SmWxtO4wL67YweqDsSUK2vELs5DNJTg3W9wiUkpS7EomcT9V8c96jaRFat3cFRlOV5A5oxuE5IRwVzcCZcOA7Ym29lOSgzInoYj5_MXawFVMgNaf1KyQa-AozTa4dDblFPmWjfiBn8a_fti4cDGq9pZ8FjK8UvsggECQ1HiWBpk_II0qlqNXfPXDN23lG0n6XFTY7ZB3TK0G27aeqCqTesVe_Whx27YIrlcP6ngccNiRGYtxf_cJYBqOdpLmED7Mt45subS77cEorck7g-rSICKUwsOs8Ca2dsKzZpCA_RhkPPSDray_RTPMAnm6--VNWuDaco4GBGj1HKeF-tlHCgTzVCsscGRXNo5VL8Thni1AjuYJ6bejAMtaFNqXRN11LdZM6FxwuYfAu2X2g5s65xc79ksM9j9PdNYrCcIAruU7IQ-cunMsn1OAKKMeIieIBCdWTKeUsRYHwy2FZLIXxrPC76KxPAPPsVfklHjiqWPAEoeOaSh9SaMeHcRw6mlNcobHOdT50c",
    session_state:
      "SZ0Ujeb8WnYsrjhvPjU5hBKFbMWnSR03bjUiJUZbFds=.VkR0cVhnaFVaV2N6M3dBaVY5VC9paitDQ2kwSHZnekJrWkhYMEw5VXpuMXlEVEViL1c5U0ZQY3RQY09IZ2RsMzJnblovWHNQTG0yUkoyVHViT216alE9PQ",
    access_token:
      "8abb7031b20a3bdf8d3cffde5c9def3338cfd9e8bb9563fbee83d5ff016d1f4c",
    token_type: "Bearer",
    scope: "openid profile",
    profile: {
      exp: 1710224973,
      iat: 1710221373,
      iss: "https://auth.dev.d0r.digitiam.cloud.stargate-noe.enedis.fr/",
      sub: "fk7efe5n",
      aud: ["ihm"],
      email: "fadjimba-externe.kouyate@enedis.fr",
      name: "KOUYATE FADJIMBA",
      permissions: {
        "Role-00001-D0R-GFFV6L": {
          permission: [
            "DOR_ZSEv2-POD1-ZA_Qualification_Doors-LemonLDAP_Admin",
            "DOR_ZSEv2-POD1-ZA_Qualification_Doors-Midpoint_Admin",
          ],
          cn: ["Role-00001-D0R-GFFV6L"],
          name: "Role-00001-D0R-GFFV6L",
        },
        "Role-00003-D0R-YKAIPD": {
          name: "Role-00003-D0R-YKAIPD",
          cn: ["Role-00003-D0R-YKAIPD"],
          permission: ["DOR_ZSEv2-POD1-ZA_Qualification_Doors-LemonLDAP_Admin"],
        },
        "Role-00003-D0R-QWH7WB": {
          name: "Role-00003-D0R-QWH7WB",
          permission: [],
          cn: ["Role-00003-D0R-QWH7WB"],
        },
        "Role-00001-D0R-V38CLV": {
          name: "Role-00001-D0R-V38CLV",
          cn: ["Role-00001-D0R-V38CLV"],
          permission: ["DOR_ZSEv2-POD1-ZA_Qualification_Doors-Midpoint_Admin"],
        },
      },
    },
    expires_at: 1710224973,
    deleted: false,
    oid: "d147ba23-725d-41b4-b7d3-29e518e89059",
    nni: "FK7EFE5N",
    name: "KOUYATE",
    givenName: "FADJIMBA",
    email: "fadjimba-externe.kouyate@enedis.fr",
    isActive: true,
    lastSuccessfulLogin: "12/03/2024",
    lastFailedLogin: "12/03/2024",
    lastModifyPassword: "12/03/2024",
  },
  modeSuperManagerEnable: false,
};

const dataForTest = (dashboardPageReducerData) => {
  return {
    dashboardPageReducer: {
      ...dashboardPageReducerData,
    },
    oidcReducer: {
      user: {
        id_token:
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTAyMjQ5NzMsImF6cCI6ImlobSIsImF1dGhfdGltZSI6MTcxMDIxNzAxOCwiaWF0IjoxNzEwMjIxMzczLCJpc3MiOiJodHRwczovL2F1dGguZGV2LmQwci5kaWdpdGlhbS5jbG91ZC5zdGFyZ2F0ZS1ub2UuZW5lZGlzLmZyLyIsInN1YiI6ImZrN2VmZTVuIiwiYWNyIjoibG9hLTIiLCJhdF9oYXNoIjoiTjV6YzkzWDVZSVNrVUhBVWw2aUs3QSIsImF1ZCI6WyJpaG0iXX0.AQWteeWgYa0RhQi3S341ixDG9P3Fo2vgcM647CNpq1xT3vbM94oUmJX7bP03xPkiNWxKzCX_Zr7Ap9hykFNGXRzFilOpfqBQFlPc3P_JkPcwSysR_f1rPF5nEfdiuWzAiPDwKhiZrGXwFCw4js_yqGsoyXTz7SXw_SmWxtO4wL67YweqDsSUK2vELs5DNJTg3W9wiUkpS7EomcT9V8c96jaRFat3cFRlOV5A5oxuE5IRwVzcCZcOA7Ym29lOSgzInoYj5_MXawFVMgNaf1KyQa-AozTa4dDblFPmWjfiBn8a_fti4cDGq9pZ8FjK8UvsggECQ1HiWBpk_II0qlqNXfPXDN23lG0n6XFTY7ZB3TK0G27aeqCqTesVe_Whx27YIrlcP6ngccNiRGYtxf_cJYBqOdpLmED7Mt45subS77cEorck7g-rSICKUwsOs8Ca2dsKzZpCA_RhkPPSDray_RTPMAnm6--VNWuDaco4GBGj1HKeF-tlHCgTzVCsscGRXNo5VL8Thni1AjuYJ6bejAMtaFNqXRN11LdZM6FxwuYfAu2X2g5s65xc79ksM9j9PdNYrCcIAruU7IQ-cunMsn1OAKKMeIieIBCdWTKeUsRYHwy2FZLIXxrPC76KxPAPPsVfklHjiqWPAEoeOaSh9SaMeHcRw6mlNcobHOdT50c",
        session_state:
          "SZ0Ujeb8WnYsrjhvPjU5hBKFbMWnSR03bjUiJUZbFds=.VkR0cVhnaFVaV2N6M3dBaVY5VC9paitDQ2kwSHZnekJrWkhYMEw5VXpuMXlEVEViL1c5U0ZQY3RQY09IZ2RsMzJnblovWHNQTG0yUkoyVHViT216alE9PQ",
        access_token:
          "8abb7031b20a3bdf8d3cffde5c9def3338cfd9e8bb9563fbee83d5ff016d1f4c",
        token_type: "Bearer",
        scope: "openid profile",
        profile: {
          exp: 1710224973,
          iat: 1710221373,
          iss: "https://auth.dev.d0r.digitiam.cloud.stargate-noe.enedis.fr/",
          sub: "fk7efe5n",
          aud: ["ihm"],
          email: "fadjimba-externe.kouyate@enedis.fr",
          name: "KOUYATE FADJIMBA",
          permissions: {
            "Role-00001-D0R-GFFV6L": {
              permission: [
                "DOR_ZSEv2-POD1-ZA_Qualification_Doors-LemonLDAP_Admin",
                "DOR_ZSEv2-POD1-ZA_Qualification_Doors-Midpoint_Admin",
              ],
              cn: ["Role-00001-D0R-GFFV6L"],
              name: "Role-00001-D0R-GFFV6L",
            },
            "Role-00003-D0R-YKAIPD": {
              name: "Role-00003-D0R-YKAIPD",
              cn: ["Role-00003-D0R-YKAIPD"],
              permission: [
                "DOR_ZSEv2-POD1-ZA_Qualification_Doors-LemonLDAP_Admin",
              ],
            },
            "Role-00003-D0R-QWH7WB": {
              name: "Role-00003-D0R-QWH7WB",
              permission: [],
              cn: ["Role-00003-D0R-QWH7WB"],
            },
            "Role-00001-D0R-V38CLV": {
              name: "Role-00001-D0R-V38CLV",
              cn: ["Role-00001-D0R-V38CLV"],
              permission: [
                "DOR_ZSEv2-POD1-ZA_Qualification_Doors-Midpoint_Admin",
              ],
            },
          },
        },
        expires_at: 1710224973,
        deleted: false,
        oid: "d147ba23-725d-41b4-b7d3-29e518e89059",
        nni: "FK7EFE5N",
        name: "KOUYATE",
        givenName: "FADJIMBA",
        email: "fadjimba-externe.kouyate@enedis.fr",
        isActive: true,
        lastSuccessfulLogin: "12/03/2024",
        lastFailedLogin: "12/03/2024",
        lastModifyPassword: "12/03/2024",
      },
    },
    userReducer: userReducerData,
  };
};

describe("Testing dashboard view", () => {
  const props = {
    user: {
      profile: {
        sub: "administrator",
        name: "test",
      },
    },
  };
  test("Dashboard View testing with user mock data", () => {
    useLocation.mockImplementation(() => {
      return {
        pathname: "/dashboard",
      };
    });
    useParams.mockImplementation(() => {
      return {
        teamOid: "",
        roleOid: "",
      };
    });
    render(<DashboardView {...props} />, null, {
      store: dataForTest({ teamsNumber: 2, casesNumber: 2 }),
    });

    const title = screen.getByText("Bienvenue au tableau de bord,");

    const demandeSection = screen.getByTestId("demandeSection");
    fireEvent.click(demandeSection);

    const rolesSection = screen.getByTestId("rolesSection");
    fireEvent.click(rolesSection);

    const profilSection = screen.getByTestId("profilSection");
    fireEvent.click(profilSection);

    const teamSection = screen.getByTestId("teamSection");
    fireEvent.click(teamSection);

    expect(title).toBeInTheDocument();
  });

  test("Dashboard View testing with user mock data no data dashboardPageReducerData", () => {
    render(<DashboardView {...props} />, null, {
      store: dataForTest({ teamsNumber: null, casesNumber: null }),
    });

    const title = screen.getByText("Bienvenue au tableau de bord,");

    expect(title).toBeInTheDocument();
  });
});
