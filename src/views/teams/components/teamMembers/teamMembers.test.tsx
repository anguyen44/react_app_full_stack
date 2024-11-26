import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "test/utils";
import { userReducerData } from "views/dashboardView/dashboardView.test.js";

import TeamMembersComponent from "./TeamMembers.component";
import { UserModel } from "shared/model/user.model";

test("Testing TeamMembersComponent component", async () => {
  let mockUserDeleted = new UserModel(
    "G02476",
    "OUEDRAOGO",
    "Abdul rasmane a 7",
    "abdul-rasmane-a.ouedraogo@enedis.fr",
    true,
    "e201f906-75de-4eb9-bdf5-8591ed285b5f",
  );
  mockUserDeleted.deleted = true;

  render(
    <TeamMembersComponent
      confirmRemoveMember={jest.fn()}
      members={[
        new UserModel(
          "G02470",
          "OUEDRAOGO",
          "Abdul rasmane a",
          "abdul-rasmane-a.ouedraogo@enedis.fr",
          true,
          "e201f906-75de-4eb9-bdf5-8591ed285b5b",
        ),
        new UserModel(
          "G02471",
          "OUEDRAOGO",
          "Abdul rasmane a 2",
          "abdul-rasmane-a.ouedraogo@enedis.fr",
          true,
          "e201f906-75de-4eb9-bdf5-8591ed285b5m",
        ),
        new UserModel(
          "G02472",
          "OUEDRAOGO",
          "Abdul rasmane a 3",
          "abdul-rasmane-a.ouedraogo@enedis.fr",
          true,
          "e201f906-75de-4eb9-bdf5-8591ed285b5n",
        ),
        new UserModel(
          "G02473",
          "OUEDRAOGO",
          "Abdul rasmane a 4",
          "abdul-rasmane-a.ouedraogo@enedis.fr",
          true,
          "e201f906-75de-4eb9-bdf5-8591ed285b5s",
        ),
        new UserModel(
          "G02474",
          "OUEDRAOGO",
          "Abdul rasmane a 5",
          "abdul-rasmane-a.ouedraogo@enedis.fr",
          true,
          "e201f906-75de-4eb9-bdf5-8591ed285b5i",
        ),
        new UserModel(
          "G02475",
          "OUEDRAOGO",
          "Abdul rasmane a 6",
          "abdul-rasmane-a.ouedraogo@enedis.fr",
          true,
          "e201f906-75de-4eb9-bdf5-8591ed285b5z",
        ),
        mockUserDeleted,
      ]}
      teamOid={""}
      isSubTeamPage={false}
      isLoadingdeleteUserInTeamByOidList={[]}
      isLoading={false}
    />,
    null,
    {
      store: {
        teamPageReducer: {
          readOnly: false,
          isWriting: true,
          searchedMembers: [],
        },
        userReducer: userReducerData,
      },
    },
  );

  const nextPageButton = await screen.getByTitle("Go to next page");
  fireEvent.click(nextPageButton);

  waitFor(async () => {
    const rowsPerPageButton = await screen.getByRole("combobox", {
      name: "Rows per page:",
    });
    fireEvent.click(rowsPerPageButton);
  });
});
