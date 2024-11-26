import { fireEvent } from "@testing-library/react";
import { render } from "test/utils";

import OrgApproversComponent from "./orgApprovers.component";
import { TeamPageReducer } from "shared/store/slices/teamPage/teamPage.slice";
import { UserModel } from "shared/model/user.model";

describe("test OrgApproversComponent", () => {
  test("render OrgApproversComponent", () => {
    const mock_store = {
      store: {
        teamPageReducer: {
          isOwner: true,
          readOnly: false,
          isWriting: true,
          approvers: [
            new UserModel(
              "AN0F039L",
              "NGUYEN",
              "ANH",
              "anh-externe.nguyen@enedis.fr",
              true,
              "b76da5b7-5d5c-45fa-8575-13bcc152bad0",
            ),
            new UserModel(
              "SGDDE25N",
              "GASPARD",
              "SEBASTIEN",
              "sebastien-externe.gaspard@enedis.fr",
              true,
              "12609f71-7de4-4966-8abf-920abc61e565",
            ),
          ],
          searchedMembers: [],
        } as TeamPageReducer,
      },
    };

    const { container } = render(
      <OrgApproversComponent
        orgOid={"2a93d191-35d2-4d09-8c36-a2d9b8e9e7fb"}
        confirmRemoveApprover={jest.fn()}
        isLoadingDeleteApproverInOrgByOidList={[]}
        reducerState={mock_store.store.teamPageReducer}
      />,
      null,
      mock_store,
    );

    const buttonDeletesAllRow = container.getElementsByClassName("deleteIcon");
    expect(buttonDeletesAllRow.length).toBe(2);
    fireEvent.click(buttonDeletesAllRow[0]);
  });
});
