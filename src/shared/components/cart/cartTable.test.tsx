import { fireEvent, screen } from "@testing-library/react";
import { render } from "test/utils";

import { UserModel } from "shared/model/user.model";
import { deleteSearchedMember } from "shared/store/slices/teamPage/teamPage.slice";
import CartTableComponent from "./cartTable.component";
import { usersSearchColumns } from "views/users/components/searchTemplateModal/useUsersSearchTemplateModal";

test("CartTable testing", () => {
  const mockUsers = [
    new UserModel(
      "FK7EFE5N",
      "KOUYATE",
      "Fadjimba",
      "fadjimba-externe.kouyate@enedis.fr",
      true,
      "OID_1",
    ),
    new UserModel(
      "SGDDE25N",
      "GASPARD",
      "Sebastien",
      "sebastien-externe.gaspard@enedis.fr",
      true,
      "OID_2",
    ),
  ];
  render(
    <CartTableComponent
      data={mockUsers}
      deleteCartElement={deleteSearchedMember as any}
      deleteAllCartElements={jest.fn()}
      handleValidCart={jest.fn()}
      isLoadingAddElementApi={false}
      cartLabel={""}
      columns={usersSearchColumns}
      customNoContentTableName={""}
    />,
  );

  const deleteIconList = screen.getAllByTestId("delete-icon");
  expect(deleteIconList).toHaveLength(2);
  fireEvent.click(deleteIconList[0]);
});
