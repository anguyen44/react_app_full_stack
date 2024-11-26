import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as ReactRouterDom from "react-router-dom";
import { render } from "test/utils";

import ItemOperationsComponent from "./itemOperations.component";

jest.mock("../../../../shared/services/team/team.service", () => {
  return {
    updateTeamInfos: jest.fn(),
  };
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
  useParams: jest.fn(),
}));

describe("Testing ItemOperations component", () => {
  beforeEach(() => {
    ReactRouterDom.useLocation.mockImplementation(() => {
      return {
        state: {
          previousUrl: "/abc",
        },
        pathname: "/sub_teams",
      };
    });
    ReactRouterDom.useParams.mockImplementation(() => {
      return {
        teamOid: "52f4fdcf-f07e-4385-a29c-c059c524a171",
      };
    });
  });
  test("Testing ItemOperationsComponent component and running updateTeamInfos with success", () => {
    render(
      <ItemOperationsComponent
        writingModeEnable={true}
        isChangingInfo={true}
        onUpdateInfo={jest.fn()}
      />,
      null,
      {
        store: {
          teamPageReducer: {
            readOnly: false,
            isWriting: true,
            searchedMembers: [],
            isChangingInfo: true,
            changingInfo: { displayName: "abc", description: "anc" },
          },
        },
      },
    );

    waitFor(() => {
      const validateButton = screen.getByTestId("validateButton");
      fireEvent.click(validateButton);

      const handleBackButton = screen.getByTestId("handleBackButton");
      fireEvent.click(handleBackButton);
    });
  });
});
