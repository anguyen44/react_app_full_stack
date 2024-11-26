import CaseService, { casesResponseBody } from "./case.service";

jest.mock("../global/global.service", () => {
  const getCase1 = jest.fn(() => Promise.resolve({ data: [] }));
  const getCase2 = jest.fn(() => Promise.resolve({ data: 0 }));
  return {
    ...jest.requireActual("../global/global.service"),
    getInstance: jest.fn(() => ({
      get: (endpoint) => {
        switch (endpoint) {
          case "/cases/self/open-to-validate":
            return getCase1();
          case "/cases/read-work-items-number":
            return getCase2();
        }
      },
      post: jest.fn(() => Promise.resolve({ data: "ok" })),
    })),
  };
});

describe("Testing case service api", () => {
  test("Test getSelfCasesOpenToValidate with success", async () => {
    try {
      await CaseService.getSelfCasesOpenToValidate(true);
      expect(CaseService.getSelfCasesOpenToValidate).toHaveBeenCalledTimes(1);
    } catch (error) {
      const res = await CaseService.getSelfCasesOpenToValidate(true);
      expect(res).toEqual([]);
      console.error("Testing getSelfCasesOpenToValidate api", error);
    }
  });

  test("Test casesResponseBody function", () => {
    const returnFromFunction = casesResponseBody({
      data: [
        {
          oid: "bffca590-e524-44d0-a742-5aa76a46f212",
          state: "open",
          createTimestamp: "2024-02-01T16:57:39.568+01:00",
          objects: [
            {
              oid: "12609f71-7de4-4966-8abf-920abc61e565",
              name: "SEBASTIEN GASPARD",
              type: "USER",
            },
          ],
          targets: [
            {
              oid: "15c2465f-5fe0-40c0-96fe-16ecf53a14ab",
              name: "Doors Administrators",
              type: "SUBTEAM",
            },
          ],
          asker: {
            oid: "12609f71-7de4-4966-8abf-920abc61e565",
            nni: "SGDDE25N",
            givenName: "SEBASTIEN",
            email: "sebastien-externe.gaspard@enedis.fr",
            familyName: "GASPARD",
            fullName: "SEBASTIEN GASPARD",
          },
          approvers: [
            {
              oid: "12609f71-7de4-4966-8abf-920abc61e565",
              nni: "SGDDE25N",
              givenName: "SEBASTIEN",
              email: "sebastien-externe.gaspard@enedis.fr",
              familyName: "GASPARD",
              fullName: "SEBASTIEN GASPARD",
            },
          ],
          actionType: "DELETE",
        },
        {
          oid: "aabdbb5c-6e1a-4f36-8136-c62d40408d07",
          state: "open",
          createTimestamp: "2024-02-19T22:32:56.057+01:00",
          objects: [
            {
              oid: "1d0b5cf3-bca9-4455-91e6-20da13e525b2",
              name: "MOHAMMED BOUAMAMA",
              type: "USER",
            },
          ],
          targets: [
            {
              oid: "c7ed0eb8-319f-47d0-9ecb-82caa813ad3e",
              name: "Caccia Admininstrators",
              type: "SUBTEAM",
            },
          ],
          asker: {
            oid: "12609f71-7de4-4966-8abf-920abc61e565",
            nni: "SGDDE25N",
            givenName: "SEBASTIEN",
            email: "sebastien-externe.gaspard@enedis.fr",
            familyName: "GASPARD",
            fullName: "SEBASTIEN GASPARD",
          },
          approvers: [
            {
              oid: "c91fadbd-4891-47b2-b4ab-337b389afabd",
              nni: "EP4353BN",
              givenName: "ESTEBAN",
              email: "esteban-externe.pereira@enedis.fr",
              familyName: "PEREIRA",
              fullName: "ESTEBAN PEREIRA",
            },
            {
              oid: "bf7e85ac-95e6-4c79-a3e4-85581843e90d",
              nni: "A66978",
              givenName: "VIVIEN",
              email: "vivien.duflot@enedis.fr",
              familyName: "DUFLOT",
              fullName: "VIVIEN DUFLOT",
            },
          ],
          actionType: "ADD",
        },
        {
          oid: "6833c3b3-55d4-4f24-852d-5906939fbcf4",
          state: "open",
          createTimestamp: "2024-02-23T14:40:47.589+01:00",
          objects: [
            {
              oid: "cf4a35ef-7d5d-43ca-90cf-924efae021bb",
              name: "RAPHAEL GOMES",
              type: "USER",
            },
          ],
          targets: [
            {
              oid: "b20717ae-95e9-4280-9d54-670698c3a0bb",
              name: "Sous-équipe test",
              type: "SUBTEAM",
            },
          ],
          asker: {
            oid: "1d0b5cf3-bca9-4455-91e6-20da13e525b2",
            nni: "MB14CD8L",
            givenName: "MOHAMMED",
            email: "mohammed-externe.bouamama@enedis.fr",
            familyName: "BOUAMAMA",
            fullName: "MOHAMMED BOUAMAMA",
          },
          approvers: [
            {
              oid: "409a27aa-5718-4e9a-bbcb-cebc65d0b707",
              nni: "DFD9D78N",
              givenName: "DAMIEN",
              email: "damien-externe.feche@enedis.fr",
              familyName: "FECHE",
              fullName: "DAMIEN FECHE",
            },
            {
              oid: "12609f71-7de4-4966-8abf-920abc61e565",
              nni: "SGDDE25N",
              givenName: "SEBASTIEN",
              email: "sebastien-externe.gaspard@enedis.fr",
              familyName: "GASPARD",
              fullName: "SEBASTIEN GASPARD",
            },
          ],
          actionType: "ADD",
        },
      ],
      status: 200,
      statusText: "",
      headers: {
        "content-type": "application/json",
      },
      config: {
        transitional: {
          silentJSONParsing: true,
          forcedJSONParsing: true,
          clarifyTimeoutError: false,
        },
        transformRequest: [null],
        transformResponse: [null],
        timeout: 0,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        maxContentLength: -1,
        maxBodyLength: -1,
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiRwSnpRb25jVkZkV2Qtbm9RIiwic3ViIjoiYWRtaW5pc3RyYXRvciIsImF6cCI6Im1pZHBvaW50IiwiYXVkIjpbIm1pZHBvaW50Il0sImF1dGhfdGltZSI6MTY5MDc5MTg1NiwiZXhwIjoxNjkwNzk1NTQ2LCJhY3IiOiJsb2EtMiIsImlzcyI6Imh0dHBzOi8vYXV0aC5kb29ycy1sZW1vbmxkYXAtdGVzdHMuZGlnaXRpYW0uY2xvdWQuc3RhcmdhdGUtcGFjeS5lbmVkaXMuZnIvIn0.LTiGmsJhDTtIZhNZMchNo2XArKEFyLUzQNFZynxD8OKyA0G_kCfxem2cXY33wO4vPzb0H6Xbp3NCGtUgkwshNisXYOtHozllPgRdWC_aELjevbGk5p-Qq_aUWeivgSB0AI95vmx5eZRysbv1lAmCmSS8WDLktDS0ZBksSyNB3JIjksLzhiGMIEoWEIQU6PI-HQKYH1sWzpodzq4zeGu0Mx2jCSxKj_lO9uBjbIwXHdu28MP3yeR9wggvo8CrZk89hNfJuXJ-soxW0aC-6iviznJ2pmB9sWfh_Ixd9vf7lFGd89CYHF9FpRDA_DPXSUEC9wngu0ZTLRh_oOyK70WXCg",
        },
        baseURL: "http://localhost:8080/doors-api/",
        method: "get",
        url: "/users/self-teams-roles",
      },
      request: {},
    });
    expect(returnFromFunction).toEqual([
      {
        actionType: "DELETE",
        approvers: [
          {
            email: "sebastien-externe.gaspard@enedis.fr",
            familyName: "GASPARD",
            fullName: "SEBASTIEN GASPARD",
            givenName: "SEBASTIEN",
            nni: "SGDDE25N",
            oid: "12609f71-7de4-4966-8abf-920abc61e565",
          },
        ],
        asker: {
          email: "sebastien-externe.gaspard@enedis.fr",
          familyName: "GASPARD",
          fullName: "SEBASTIEN GASPARD",
          givenName: "SEBASTIEN",
          nni: "SGDDE25N",
          oid: "12609f71-7de4-4966-8abf-920abc61e565",
        },
        createTimestamp: "2024-02-01T16:57:39.568+01:00",
        objects: [
          {
            name: "SEBASTIEN GASPARD",
            oid: "12609f71-7de4-4966-8abf-920abc61e565",
            type: "USER",
          },
        ],
        oid: "bffca590-e524-44d0-a742-5aa76a46f212",
        state: "open",
        targets: [
          {
            name: "Doors Administrators",
            oid: "15c2465f-5fe0-40c0-96fe-16ecf53a14ab",
            type: "SUBTEAM",
          },
        ],
      },
      {
        actionType: "ADD",
        approvers: [
          {
            email: "esteban-externe.pereira@enedis.fr",
            familyName: "PEREIRA",
            fullName: "ESTEBAN PEREIRA",
            givenName: "ESTEBAN",
            nni: "EP4353BN",
            oid: "c91fadbd-4891-47b2-b4ab-337b389afabd",
          },
          {
            email: "vivien.duflot@enedis.fr",
            familyName: "DUFLOT",
            fullName: "VIVIEN DUFLOT",
            givenName: "VIVIEN",
            nni: "A66978",
            oid: "bf7e85ac-95e6-4c79-a3e4-85581843e90d",
          },
        ],
        asker: {
          email: "sebastien-externe.gaspard@enedis.fr",
          familyName: "GASPARD",
          fullName: "SEBASTIEN GASPARD",
          givenName: "SEBASTIEN",
          nni: "SGDDE25N",
          oid: "12609f71-7de4-4966-8abf-920abc61e565",
        },
        createTimestamp: "2024-02-19T22:32:56.057+01:00",
        objects: [
          {
            name: "MOHAMMED BOUAMAMA",
            oid: "1d0b5cf3-bca9-4455-91e6-20da13e525b2",
            type: "USER",
          },
        ],
        oid: "aabdbb5c-6e1a-4f36-8136-c62d40408d07",
        state: "open",
        targets: [
          {
            name: "Caccia Admininstrators",
            oid: "c7ed0eb8-319f-47d0-9ecb-82caa813ad3e",
            type: "SUBTEAM",
          },
        ],
      },
      {
        actionType: "ADD",
        approvers: [
          {
            email: "damien-externe.feche@enedis.fr",
            familyName: "FECHE",
            fullName: "DAMIEN FECHE",
            givenName: "DAMIEN",
            nni: "DFD9D78N",
            oid: "409a27aa-5718-4e9a-bbcb-cebc65d0b707",
          },
          {
            email: "sebastien-externe.gaspard@enedis.fr",
            familyName: "GASPARD",
            fullName: "SEBASTIEN GASPARD",
            givenName: "SEBASTIEN",
            nni: "SGDDE25N",
            oid: "12609f71-7de4-4966-8abf-920abc61e565",
          },
        ],
        asker: {
          email: "mohammed-externe.bouamama@enedis.fr",
          familyName: "BOUAMAMA",
          fullName: "MOHAMMED BOUAMAMA",
          givenName: "MOHAMMED",
          nni: "MB14CD8L",
          oid: "1d0b5cf3-bca9-4455-91e6-20da13e525b2",
        },
        createTimestamp: "2024-02-23T14:40:47.589+01:00",
        objects: [
          {
            name: "RAPHAEL GOMES",
            oid: "cf4a35ef-7d5d-43ca-90cf-924efae021bb",
            type: "USER",
          },
        ],
        oid: "6833c3b3-55d4-4f24-852d-5906939fbcf4",
        state: "open",
        targets: [
          {
            name: "Sous-équipe test",
            oid: "b20717ae-95e9-4280-9d54-670698c3a0bb",
            type: "SUBTEAM",
          },
        ],
      },
    ]);
  });

  test("Test getCasesNumber with success", async () => {
    try {
      await CaseService.getCasesNumber(true);
      expect(CaseService.getCasesNumber).toHaveBeenCalledTimes(1);
    } catch (error) {
      const res = await CaseService.getCasesNumber(true);
      expect(res).toEqual(0);
      console.error("Testing getCasesNumber api", error);
    }
  });

  test("Test proccessCase with success", async () => {
    try {
      await CaseService.proccessCase("caseOid", "isApproved");
      expect(CaseService.proccessCase).toHaveBeenCalledTimes(1);
    } catch (error) {
      const res = await CaseService.proccessCase();
      expect(res).toEqual({ data: "ok" });
      console.error("Testing proccessCase api", error);
    }
  });
});
