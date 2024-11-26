import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import * as ReactRouterDom from "react-router-dom";
import CaseService from "shared/services/case/case.service";
import { addMonths } from "shared/utils/global.utils";
import { render } from "test/utils";
import { userReducerData } from "views/dashboardView/dashboardView.test.js";

import UserCasesView from "./userCases.view";

jest.mock("../../shared/services/case/case.service", () => {
  return {
    getSelfCasesOpenToValidate: jest.fn(),
    proccessCase: jest.fn(),
  };
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
  useParams: jest.fn(),
}));

const casesOpenToValidateMock = [
  {
    oid: "d04f81f0-0e0c-41ac-887a-ff847f78b886",
    state: "open",
    createTimestamp: "2024-03-12T04:16:00.864+01:00",
    objects: [
      {
        oid: "9f53b2ac-8b9e-4697-849f-5c2cab42c8ea",
        name: "role_test_anh",
        type: "ROLE",
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
      oid: "d147ba23-725d-41b4-b7d3-29e518e89059",
      nni: "FK7EFE5N",
      givenName: "FADJIMBA",
      email: "fadjimba-externe.kouyate@enedis.fr",
      familyName: "KOUYATE",
      fullName: "KOUYATE FADJIMBA",
    },
    approvers: [
      {
        oid: "93265e94-ac17-458e-b0d5-a81dd7c08c66",
        nni: "JW1E54EL",
        givenName: "JULIA",
        email: "julia-externe.wildenberg@enedis.fr",
        familyName: "WILDENBERG",
        fullName: "JULIA WILDENBERG",
      },
      {
        oid: "84f79148-9772-4b2e-81ac-cc50be8dc246",
        nni: "PCABA25N",
        givenName: "PATRICK",
        email: "patrick-externe.chavas@enedis.fr",
        familyName: "CHAVAS",
        fullName: "PATRICK CHAVAS",
      },
      {
        oid: "7737dd66-7481-4cf4-a14b-3f3359dd27ce",
        nni: "RG143C3L",
        givenName: "RAPHAEL",
        email: "raphael-externe.gomes@enedis.fr",
        familyName: "GOMES",
        fullName: "RAPHAEL GOMES",
      },
      {
        oid: "116225a4-eed7-4f1f-812b-65832d2f6eeb",
        nni: "SGDDE25N",
        givenName: "SEBASTIEN",
        email: "sebastien-externe.gaspard@enedis.fr",
        familyName: "GASPARD",
        fullName: "SEBASTIEN GASPARD",
      },
      {
        oid: "05d07c3b-7ea8-4bdb-883b-c281a880dd7d",
        nni: "A66978",
        givenName: "VIVIEN",
        email: "vivien.duflot@enedis.fr",
        familyName: "DUFLOT",
        fullName: "VIVIEN DUFLOT",
      },
      {
        oid: "6c977b42-0fc6-46be-bdbd-c86dca2ce4c5",
        nni: "AN0F039L",
        givenName: "ANH",
        email: "anh-externe.nguyen@enedis.fr",
        familyName: "NGUYEN",
        fullName: "ANH NGUYEN",
      },
    ],
    actionType: "ADD",
  },
  {
    oid: "04d48ae7-7317-41d1-ac74-108b7d0baa07",
    state: "open",
    createTimestamp: "2024-01-18T10:32:19.854+01:00",
    objects: [
      {
        oid: "57d8712e-29b5-4e3c-a6fd-2f8fb18530d2",
        name: "MOHAMMED BOUAMAMA",
        type: "APPROVER",
      },
    ],
    targets: [
      {
        oid: "ec46e1b5-99f6-40e9-bb3f-32385ee834d0",
        name: "D0R - Team",
        type: "TEAM",
      },
    ],
    asker: {
      oid: "d147ba23-725d-41b4-b7d3-29e518e89059",
      nni: "FK7EFE5N",
      givenName: "FADJIMBA",
      email: "fadjimba-externe.kouyate@enedis.fr",
      familyName: "KOUYATE",
      fullName: "KOUYATE FADJIMBA",
    },
    approvers: [
      {
        oid: "93265e94-ac17-458e-b0d5-a81dd7c08c66",
        nni: "JW1E54EL",
        givenName: "JULIA",
        email: "julia-externe.wildenberg@enedis.fr",
        familyName: "WILDENBERG",
        fullName: "JULIA WILDENBERG",
      },
      {
        oid: "84f79148-9772-4b2e-81ac-cc50be8dc246",
        nni: "PCABA25N",
        givenName: "PATRICK",
        email: "patrick-externe.chavas@enedis.fr",
        familyName: "CHAVAS",
        fullName: "PATRICK CHAVAS",
      },
      {
        oid: "7737dd66-7481-4cf4-a14b-3f3359dd27ce",
        nni: "RG143C3L",
        givenName: "RAPHAEL",
        email: "raphael-externe.gomes@enedis.fr",
        familyName: "GOMES",
        fullName: "RAPHAEL GOMES",
      },
      {
        oid: "116225a4-eed7-4f1f-812b-65832d2f6eeb",
        nni: "SGDDE25N",
        givenName: "SEBASTIEN",
        email: "sebastien-externe.gaspard@enedis.fr",
        familyName: "GASPARD",
        fullName: "SEBASTIEN GASPARD",
      },
      {
        oid: "05d07c3b-7ea8-4bdb-883b-c281a880dd7d",
        nni: "A66978",
        givenName: "VIVIEN",
        email: "vivien.duflot@enedis.fr",
        familyName: "DUFLOT",
        fullName: "VIVIEN DUFLOT",
      },
      {
        oid: "6c977b42-0fc6-46be-bdbd-c86dca2ce4c5",
        nni: "AN0F039L",
        givenName: "ANH",
        email: "anh-externe.nguyen@enedis.fr",
        familyName: "NGUYEN",
        fullName: "ANH NGUYEN",
      },
    ],
    actionType: "ADD",
  },
];

const casesReduxMockData = {
  casesGestionPageReducer: {
    casesOpenToValidate: casesOpenToValidateMock,
    casesOpenCurrent: null,
    minimumValidationDate: addMonths(new Date(), -7),
    maximumValidationDate: new Date(),
    closedValidationCases: null,
    closedTreatedCases: null,
  },
  userReducer: userReducerData,
};

describe("Testing UserCasesView component", () => {
  beforeEach(() => {
    ReactRouterDom.useLocation.mockImplementation(() => {
      return {
        pathname: "localhost:3000/user_cases",
      };
    });

    ReactRouterDom.useParams.mockImplementation(() => {
      return {
        teamOid: "",
        roleOid: "",
      };
    });

    CaseService.getSelfCasesOpenToValidate.mockImplementation(
      () => casesOpenToValidateMock,
    );
  });

  test("Testing getSelfCasesOpenToValidate api with success and refuse the demande with succes", async () => {
    render(<UserCasesView />, null, {
      store: casesReduxMockData,
    });
    const cancelCaseBtn = await waitFor(() =>
      screen.getByTestId(`cancelCaseBtn-${casesOpenToValidateMock[0].oid}`),
    );
    act(() => {
      fireEvent.click(cancelCaseBtn);
    });
  });

  test("Testing getSelfCasesOpenToValidate api with success and validate the demande with succes", async () => {
    render(<UserCasesView />, null, { store: casesReduxMockData });
    const validateCaseBtn = await waitFor(() =>
      screen.getByTestId(`validateCaseBtn-${casesOpenToValidateMock[0].oid}`),
    );
    act(() => {
      fireEvent.click(validateCaseBtn);
    });
  });

  test("Testing getSelfCasesOpenToValidate api with success and validate the demande with failure, code 403, user is not authorized", async () => {
    CaseService.proccessCase.mockImplementation(() =>
      Promise.reject({
        response: {
          status: 403,
          data: "The user not authorized for operation !",
        },
      }),
    );
    render(<UserCasesView />, null, { store: casesReduxMockData });

    const validateCaseBtn = await waitFor(() =>
      screen.getByTestId(`validateCaseBtn-${casesOpenToValidateMock[0].oid}`),
    );
    act(() => {
      fireEvent.click(validateCaseBtn);
    });
  });

  test("Testing getSelfCasesOpenToValidate api with success and validate the demande with failure, code 403, asker and approver for the same", async () => {
    CaseService.proccessCase.mockImplementation(() =>
      Promise.reject({
        response: {
          status: 403,
          data: "Can not be asker and approver for the same request!",
        },
      }),
    );
    render(<UserCasesView />, null, { store: casesReduxMockData });
    const validateCaseBtn = await waitFor(() =>
      screen.getByTestId(`validateCaseBtn-${casesOpenToValidateMock[0].oid}`),
    );
    act(() => {
      fireEvent.click(validateCaseBtn);
    });
  });

  test("Testing getSelfCasesOpenToValidate api with success and validate the demande with failure, code not 403, asker and approver for the same", async () => {
    CaseService.proccessCase.mockImplementation(() =>
      Promise.reject({
        response: {
          status: 404,
          data: "Inconnu",
        },
      }),
    );
    render(<UserCasesView />, null, { store: casesReduxMockData });

    const validateCaseBtn = await waitFor(() =>
      screen.getByTestId(`validateCaseBtn-${casesOpenToValidateMock[0].oid}`),
    );
    act(() => {
      fireEvent.click(validateCaseBtn);
    });
  });

  test("Testing getSelfCasesOpenToValidate api with failure", () => {
    CaseService.getSelfCasesOpenToValidate.mockImplementation(() =>
      Promise.reject({ error: "error" }),
    );
    render(<UserCasesView />, null, { store: casesReduxMockData });
  });
});
