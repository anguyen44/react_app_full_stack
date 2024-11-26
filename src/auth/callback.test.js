import { render } from "test/utils";

import { Callback } from "./callback";
const userExample = {
  id_token:
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDc3NDE0MDgsImF1dGhfdGltZSI6MTcwNzcyNjQ3OCwiYXpwIjoiaWhtIiwiYXVkIjpbImlobSJdLCJhdF9oYXNoIjoiRWVFc2VsMlpkUExhZU04MHhKa2IydyIsImV4cCI6MTcwNzc0NTAwOCwiYWNyIjoibG9hLTIiLCJzdWIiOiJyZzE0M2MzbCIsImlzcyI6Imh0dHBzOi8vYXV0aC5kZXYuZDByLmRpZ2l0aWFtLmNsb3VkLnN0YXJnYXRlLW5vZS5lbmVkaXMuZnIvIn0.J60uo86dM3R9yBwdWfoqNUSpWD1mQ6zjG0KgXsJHsMlrF3_XfFMjgohSj-Stetyl62QPCz6DmUJFcLzBfzDx6wRjrcC7DQRFJvs0wBoWNt1l4Vjp3OC4DF8x8o5UlvIbbemHhCJjv0-GQj1gdi8Oy1L74QUY1CJpbWfhpQUt3wQLb-75AX2YV0ocC5E_TWgPIPlF3fxVaD1r_0JPCPrTb-YGx7Er2t7WyxKHK2fuzKehlhIejudXCvvG11HPFDRxPhZYkCCIeMz5WDVyjLlMtAxDvFmGAJYbgllFDUfWfgyvMB7IPwAZGm5eJGLF6q6RH87hzEQKk9RlGRfEKFh0Cqo_SuZHpEN6c28aNppMlZmJFk5wo39cwx_0igpk4ncHojnSDbKpdI5IxRVWgFNEugv61Q17zvfFjIaBX3x3BU1_pwAjixmu4j9VsvkeHFpGml8WMLGVrKuCNfsI4Qzx4QQ6nD0_eXaaIvvMPSF87xuUSPk3-RXCgAbfTy4HtPhypLm9KpWF0uMw_TEVF7nc6lVeTB4i84Zf8oULsd6EjlS_trVvRZA2CQA0KtcVWCDgPUb003SUb4oX0k1bSaF44ltc3sxHhMRVjL1QH7ZDM1bjwnEst2gvtW9baHl9pxAFChKppU3m4ToiSeY1DBYiK8UZxttCFw7VMfp4pP2Oqno",
  session_state:
    "rkazYcuP/Y1mCNXF3wh8B/V2y0DACN0465P1bYo/2sc=.cU9BRnNEU3hubzJkbCtwUU9HMzl2T29MSzYzb1luYjhIbWR4WnYydUNoYXpvNnlaWE84a3dFaEdTeWcwWlBCQXBzR3VjOW04NEFSWUNOU1A5aEN6MUE9PQ",
  access_token:
    "4c7693420121f3d20c5759df14a685c2a728913d314d7c65c8958f04f5452773",
  token_type: "Bearer",
  scope: "openid profile",
  profile: {
    iat: 1707741408,
    aud: ["ihm"],
    exp: 1707745008,
    sub: "rg143c3l",
    iss: "https://auth.dev.d0r.digitiam.cloud.stargate-noe.enedis.fr/",
    name: "RAPHAEL GOMES",
    permissions: {
      "Role-00001-D0R-GFFV6L": {
        name: "Role-00001-D0R-GFFV6L",
        permission: [
          "DOR_ZSEv2-POD1-ZA_Qualification_Doors-LemonLDAP_Admin",
          "DOR_ZSEv2-POD1-ZA_Qualification_Doors-Midpoint_Admin",
        ],
        cn: ["Role-00001-D0R-GFFV6L"],
      },
      "Role-00001-D0R-V38CLV": {
        cn: ["Role-00001-D0R-V38CLV"],
        permission: ["DOR_ZSEv2-POD1-ZA_Qualification_Doors-Midpoint_Admin"],
        name: "Role-00001-D0R-V38CLV",
      },
    },
    email: "raphael-externe.gomes@enedis.fr",
  },
  expires_at: 1707745008,
};
describe("Test Callback Component", () => {
  it("Render Callback without user", () => {
    const store = {
      userReducer: {
        token: "myToken",
        user: null,
        teams: [],
      },
    };
    render(<Callback />, null, store);
  });
  it("Render Callback with user", () => {
    const store = {
      userReducer: {
        token: "myToken",
        user: userExample,
        teams: [],
      },
    };
    render(<Callback />, null, { store });
  });
});
