import { fireEvent, screen } from "@testing-library/react";
import { render } from "test/utils";

import ApproverSearchModal from "./approverSearchModal.component";
import { UserModel } from "shared/model/user.model";
import { RootState } from "shared/store";
import { TeamPageReducer } from "shared/store/slices/teamPage/teamPage.slice";

const mock_store = {
  store: {
    teamPageReducer: {
      isOwner: true,
      searchedMembers: [
        new UserModel(
          "A66978",
          "DUFLOT",
          "VIVIEN",
          "vivien.duflot@enedis.fr",
          true,
          "bf7e85ac-95e6-4c79-a3e4-85581843e90d",
        ),
        new UserModel(
          "FK7EFE5N",
          "KOUYATE",
          "FADJIMBA",
          "fadjimba-externe.kouyate@enedis.fr",
          true,
          "9986cb40-bf1c-4f95-9657-49505c2bfdf0",
        ),
      ] as UserModel[],
    } as TeamPageReducer,
  } as RootState,
};

const mockUser1 = new UserModel(
  "AN0F039L",
  "NGUYEN",
  "ANH",
  "anh-externe.nguyen@enedis.fr",
  true,
  "b76da5b7-5d5c-45fa-8575-13bcc152bad0",
);

const mockUser2 = new UserModel(
  "SGDDE25N",
  "GASPARD",
  "SEBASTIEN",
  "sebastien-externe.gaspard@enedis.fr",
  true,
  "12609f71-7de4-4966-8abf-920abc61e565",
);

describe("test ApproverSearchModal component", () => {
  test("render ApproverSearchModal component and being team Owner", () => {
    render(
      <ApproverSearchModal
        orgOid={"254785df-f081-4e91-9bc6-bded6743cff9"}
        currentUsers={[mockUser1, mockUser2]}
        reducerState={mock_store.store.teamPageReducer}
      />,
      null,
      mock_store,
    );

    const openModalButton = screen.getByTestId("open-modal");
    fireEvent.click(openModalButton);

    const addApproverButton = screen.getByTestId("ajouter-button-api");
    fireEvent.click(addApproverButton);
  });

  test("render ApproverSearchModal component and not being team Owner", () => {
    const storeWithoutOwner = {
      ...mock_store,
      store: {
        ...mock_store.store,
        teamPageReducer: {
          ...mock_store.store.teamPageReducer,
          isOwner: false,
        },
      },
    };
    render(
      <ApproverSearchModal
        orgOid={"254785df-f081-4e91-9bc6-bded6743cff9"}
        currentUsers={[mockUser1, mockUser2]}
        reducerState={storeWithoutOwner.store.teamPageReducer}
      />,
      null,
      storeWithoutOwner,
    );

    const openModalButton = screen.getByTestId("open-modal");
    fireEvent.click(openModalButton);

    const addApproverButton = screen.getByTestId("ajouter-button-api");
    fireEvent.click(addApproverButton);
  });
});
